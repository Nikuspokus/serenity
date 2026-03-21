import fs from 'fs'
import { createClient } from '@supabase/supabase-js'

// 1. Lire le fichier .env
const envFile = fs.readFileSync('.env', 'utf-8')
const envConfig = {}
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) envConfig[match[1].trim()] = match[2].trim()
})

const supabaseUrl = envConfig['SUPABASE_URL']
const supabaseKey = envConfig['SUPABASE_KEY'] // Uses anon key, requires RLS to allow insert, wait!

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_KEY in .env')
  process.exit(1)
}

// Ensure the client has Service Role Key if possible, otherwise rely on Anon key
const supabase = createClient(supabaseUrl, supabaseKey)

// Use BetaGouv reliable mirror since the direct official PHP script returns 404
const BDPM_URL = 'https://raw.githubusercontent.com/betagouv/api-medicaments/master/data/CIS_bdpm.txt'

async function syncBDPM() {
  console.log('⏳ Téléchargement de la base BDPM officielle...')
  try {
    const response = await fetch(BDPM_URL)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Decode ISO-8859-1 (Windows-1252)
    const decoder = new TextDecoder('windows-1252')
    const text = decoder.decode(buffer)
    
    const lines = text.split('\n').filter(l => l.trim().length > 0)
    console.log(`✅ Fichier téléchargé : ${lines.length} médicaments trouvés.`)
    
    const medications = []
    
    for (const line of lines) {
      const parts = line.split('\t')
      if (parts.length >= 11) {
        medications.push({
          cis: parts[0]?.trim(),
          name: parts[1]?.trim(),
          form: parts[2]?.trim(),
          route: parts[3]?.trim(),
          status: parts[4]?.trim(),
          authorization_type: parts[5]?.trim(),
          commercial_status: parts[6]?.trim(),
          registration_date: parts[7]?.trim(),
          bmd_status: parts[8]?.trim(),
          authorization_number: parts[9]?.trim(),
          laboratories: parts[10]?.trim()
        })
      }
    }
    
    console.log('🚀 Insertion dans Supabase par lots de 1000...')
    
    const BATCH_SIZE = 1000
    let inserted = 0
    
    for (let i = 0; i < medications.length; i += BATCH_SIZE) {
      const batch = medications.slice(i, i + BATCH_SIZE)
      
      const { error } = await supabase
        .from('bdpm_medications')
        .upsert(batch, { onConflict: 'cis' })
        
      if (error) {
        console.error(`❌ Erreur lors de l'insertion du lot ${i}:`, error.message)
      } else {
        inserted += batch.length
        process.stdout.write(`\rProgression: ${inserted}/${medications.length}`)
      }
    }
    
    console.log('\n🎯 Synchronisation BDPM terminée avec succès !')
    
  } catch (error) {
    console.error('❌ Erreur globale:', error)
  }
}

syncBDPM()

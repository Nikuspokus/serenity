import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { imageBase64 } = await req.json()

    if (!imageBase64) {
      return new Response(JSON.stringify({ error: 'No image provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
    if (!GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: 'GEMINI_API_KEY is not set in Edge Function secrets' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Prepare the prompt for the AI
    const prompt = `
Tu es un assistant médical intelligent intégré à l'application "Serenity". 
Ton rôle est d'analyser cette ordonnance médicale et d'en extraire les informations clés pour remplir un pilulier numérique.

Consignes STRICTES :
1. Identifie le nom du médicament principal prescrit (ex: "Levothyrox 75µg", "Doliprane 1000mg").
2. Identifie la fréquence ou posologie (ex: "1 fois par jour", "Matin et Soir", "1 comprimé si douleur").
3. Si des dates de début et de fin de traitement sont indiquées, extrais-les au format YYYY-MM-DD. Sinon, utilise la date d'aujourd'hui comme date de début, et ajoute 30 jours pour la date de fin.

Tu DOIS retourner UNIQUEMENT un objet JSON valide, sans markdown, sans \`\`\`json, avec cette structure exacte :
{
  "name": "Nom du médicament",
  "frequency": "Fréquence précise",
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD"
}
`

    // Remove the data URL prefix if it exists (e.g. "data:image/jpeg;base64,...")
    const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '')

    // Call Gemini API (gemini-1.5-flash)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`
    
    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: 'image/jpeg',
                  data: cleanBase64
                }
              }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    })

    const data = await geminiResponse.json()

    if (data.error) {
      console.error('Gemini API Error:', data.error)
      throw new Error(`Erreur Gemini: ${data.error.message}`)
    }

    // Extract the text part (which should be perfectly formatted JSON thanks to responseMimeType)
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text
    
    if (!aiText) {
      throw new Error("L'IA n'a retourné aucun texte.")
    }

    // Parse the JSON string
    const extractedData = JSON.parse(aiText)

    return new Response(JSON.stringify(extractedData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Edge Function Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

/**
 * Server-side API Route for AI Chatbot
 * 
 * Proxies requests to Gemini/Groq APIs so that API keys
 * are never exposed to the browser.
 */

export async function POST(request) {
  try {
    const { messages, systemPrompt, context, userMessage } = await request.json();

    if (!userMessage || typeof userMessage !== 'string') {
      return Response.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Try Gemini first, then Groq fallback
    let responseText;

    try {
      responseText = await callGemini(messages, systemPrompt, context, userMessage);
    } catch (geminiError) {
      console.warn('Gemini failed, trying Groq:', geminiError.message);

      try {
        responseText = await callGroq(messages, systemPrompt, context, userMessage);
      } catch (groqError) {
        console.warn('Groq also failed:', groqError.message);
        return Response.json({ error: 'AI providers unavailable' }, { status: 503 });
      }
    }

    return Response.json({ text: responseText });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}


async function callGemini(history, systemPrompt, context, userMessage) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw new Error('Gemini API key not configured');
  }

  const contents = [];

  // Add conversation history
  for (const msg of (history || [])) {
    contents.push({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    });
  }

  // Add current message with context
  const augmentedMessage = `[CONTEXT FROM KNOWLEDGE BASE]\n${context}\n\n[USER'S QUESTION]\n${userMessage}`;
  contents.push({
    role: 'user',
    parts: [{ text: augmentedMessage }]
  });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents,
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 500,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        ]
      })
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Gemini API error ${response.status}: ${errorData?.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('Empty response from Gemini');
  }

  return text.trim();
}


async function callGroq(history, systemPrompt, context, userMessage) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey === 'your_groq_api_key_here') {
    throw new Error('Groq API key not configured');
  }

  const messages = [
    { role: 'system', content: systemPrompt }
  ];

  // Add conversation history
  for (const msg of (history || [])) {
    messages.push({ role: msg.role, content: msg.content });
  }

  // Add current message with context
  messages.push({
    role: 'user',
    content: `[CONTEXT FROM KNOWLEDGE BASE]\n${context}\n\n[USER'S QUESTION]\n${userMessage}`
  });

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.7,
      max_tokens: 500,
      top_p: 0.9,
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Groq API error ${response.status}: ${errorData?.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error('Empty response from Groq');
  }

  return text.trim();
}

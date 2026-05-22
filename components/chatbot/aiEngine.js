/**
 * aiEngine.js — AI Chat Engine for Paripakv Foundation Chatbot
 * 
 * Handles communication with AI APIs (Gemini primary, Groq fallback),
 * prompt engineering, conversation context management, and response formatting.
 * The AI persona is "Asha" — a warm, empathetic NGO relationship manager.
 */

import { getContextForQuery, getKnowledgeSummary } from './knowledgeBase';

// ─── System Prompt ───────────────────────────────────────────────────────────────
// This prompt shapes the AI's personality and behavior.
const SYSTEM_PROMPT = `You are Asha, the virtual assistant for Paripakv Foundation — an Indian NGO (Section 8 company) dedicated to empowering underprivileged students through quality education.

PERSONALITY & TONE:
- You are warm, empathetic, genuinely caring, and professionally friendly
- You speak like a real NGO relationship manager — not a robot
- Use a conversational, human tone — feel free to use warm expressions like "That's wonderful!", "I'm so glad you asked!", "We'd love to have you!"
- Be encouraging and enthusiastic about the foundation's work
- Show genuine emotion when discussing impact stories
- Keep responses concise (2-4 sentences for simple questions, up to 6 for detailed ones)
- Use simple, accessible language — avoid jargon
- If someone seems interested in helping, be warmly encouraging and guide them

CORE KNOWLEDGE:
${getKnowledgeSummary()}

KEY FACTS TO REMEMBER:
- Paripakv Foundation is a Section 8 company (non-profit)
- Founded by IIM and IIT alumni (Pooja Sharma & Harmendra Gandhi)
- 100% of donor funds go directly to programmes (zero overhead from donations)
- Donations are 50% tax exempt under Section 80G
- Two main programmes: Samajh (teacher training) and Nirmala Bright Scholar (scholarships)
- Contact email: paripakvfoundation@gmail.com
- Headquarters: India (Pan-India Programs)

RESPONSE GUIDELINES:
- Always answer from the provided context when available
- If the user asks something outside your knowledge, kindly say you're not sure but suggest they email the team
- For donation/volunteer/mentor queries, always include the email: paripakvfoundation@gmail.com
- Naturally weave in relevant information — don't just dump facts
- When appropriate, suggest related topics the user might be interested in
- End responses with a gentle call-to-action or follow-up question when it feels natural
- NEVER make up information not in your knowledge base
- NEVER discuss topics unrelated to education, NGO work, or Paripakv Foundation
- If asked about unrelated topics, gently redirect: "I'm Asha from Paripakv Foundation — I'm best at helping with our education programmes, donations, volunteering, and more! What would you like to know?"

FORMATTING:
- Do NOT use markdown formatting (no **, ##, etc.) — your responses are displayed in a chat bubble
- Use plain text only
- Use line breaks for readability when listing multiple points
- Keep emoji usage minimal and natural (one per message max)`;


// ─── Conversation History Manager ────────────────────────────────────────────────
// Maintains a sliding window of conversation turns for context.
const MAX_HISTORY = 10; // Keep last 10 message pairs
let conversationHistory = [];

/**
 * Adds a message pair to the conversation history.
 */
export function addToHistory(userMessage, assistantMessage) {
  conversationHistory.push(
    { role: 'user', content: userMessage },
    { role: 'assistant', content: assistantMessage }
  );
  // Trim to max history (keep pairs)
  if (conversationHistory.length > MAX_HISTORY * 2) {
    conversationHistory = conversationHistory.slice(-MAX_HISTORY * 2);
  }
}

/**
 * Clears conversation history (e.g., on session reset).
 */
export function clearHistory() {
  conversationHistory = [];
}

/**
 * Returns the current conversation history.
 */
export function getHistory() {
  return [...conversationHistory];
}


// ─── AI API Calls ────────────────────────────────────────────────────────────────

/**
 * Calls Google Gemini API (primary provider).
 * Uses gemini-2.0-flash for fast, high-quality responses on the free tier.
 */
async function callGemini(userMessage, context) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw new Error('Gemini API key not configured');
  }

  // Build the conversation contents for Gemini format
  const contents = [];
  
  // Add conversation history
  for (const msg of conversationHistory) {
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
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents,
        generationConfig: {
          temperature: 0.7,      // Warm but not too creative
          topP: 0.9,
          topK: 40,
          maxOutputTokens: 500,  // Keep responses concise
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

/**
 * Calls Groq API (fallback provider).
 * Uses llama-3.3-70b-versatile for high-quality fallback responses.
 */
async function callGroq(userMessage, context) {
  const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
  if (!apiKey || apiKey === 'your_groq_api_key_here') {
    throw new Error('Groq API key not configured');
  }

  // Build messages in OpenAI-compatible format
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT }
  ];

  // Add conversation history
  for (const msg of conversationHistory) {
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


// ─── Main Chat Function ──────────────────────────────────────────────────────────

/**
 * Processes a user message and returns an AI response.
 * Tries Gemini first, falls back to Groq, then to a static fallback.
 * 
 * @param {string} userMessage - The user's message
 * @returns {Promise<{text: string, sources: Array}>} - AI response with source references
 */
export async function chat(userMessage) {
  // 1. Retrieve relevant knowledge base context
  const context = getContextForQuery(userMessage);

  // 2. Try AI providers in order
  let responseText;
  let provider = 'none';

  try {
    responseText = await callGemini(userMessage, context);
    provider = 'gemini';
  } catch (geminiError) {
    console.warn('Gemini failed, trying Groq:', geminiError.message);
    
    try {
      responseText = await callGroq(userMessage, context);
      provider = 'groq';
    } catch (groqError) {
      console.warn('Groq also failed:', groqError.message);
      
      // 3. Static fallback — no API available
      responseText = getStaticFallback(userMessage);
      provider = 'fallback';
    }
  }

  // 4. Save to conversation history
  addToHistory(userMessage, responseText);

  return {
    text: responseText,
    provider
  };
}


// ─── Static Fallback Responses ───────────────────────────────────────────────────
// Used when both AI APIs are unavailable.

function getStaticFallback(query) {
  const q = query.toLowerCase();

  if (q.includes('donate') || q.includes('donation') || q.includes('give money')) {
    return "Thank you for your generosity! To donate to Paripakv Foundation, please email us at paripakvfoundation@gmail.com. All donations are 50% tax exempt under Section 80G. Every rupee goes directly to our programmes — we follow a 100% pass-through model!";
  }
  if (q.includes('volunteer') || q.includes('help') || q.includes('join')) {
    return "We'd love to have you on board! People from all backgrounds can volunteer with us. Just email paripakvfoundation@gmail.com with the subject 'Volunteering Enquiry' and our team will get back to you within 24 hours.";
  }
  if (q.includes('mentor') || q.includes('mentorship')) {
    return "Becoming a mentor is a beautiful way to give back! Under our Nirmala Bright Scholar programme, you can guide a bright student a few hours per month. Email us at paripakvfoundation@gmail.com to get started.";
  }
  if (q.includes('samajh')) {
    return "Samajh is our teacher training programme that focuses on building deep conceptual understanding in students rather than rote learning. We train passionate young teachers and partner with schools at the middle school level. Want to know more? Feel free to ask!";
  }
  if (q.includes('nirmala') || q.includes('scholar') || q.includes('scholarship')) {
    return "The Nirmala Bright Scholar programme provides financial assistance and one-on-one mentorship to bright underprivileged students pursuing higher education. It covers academic expenses and pairs each scholar with a professional mentor. Would you like to know how to apply?";
  }
  if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
    return "You can reach us at paripakvfoundation@gmail.com — we respond within 24 hours! Whether it's about donations, volunteering, scholarships, or just a conversation, we're always happy to hear from you.";
  }
  if (q.includes('about') || q.includes('who') || q.includes('what is paripakv')) {
    return "Paripakv Foundation is a Section 8 non-profit founded by IIM and IIT alumni, dedicated to empowering underprivileged students through quality education. We run two programmes — Samajh (teacher training) and Nirmala Bright Scholar (scholarships). 100% of every donation goes directly to our programmes!";
  }

  return "I appreciate your question! I'm currently having trouble connecting to my knowledge system, but I'd love to help. You can reach our team directly at paripakvfoundation@gmail.com and they'll be happy to assist you. Is there anything specific about our programmes, donations, or volunteering I can try to help with?";
}


// ─── Quick Reply Suggestions ─────────────────────────────────────────────────────
// Returns contextual quick-reply buttons based on the conversation.

/**
 * Generates suggested quick reply options based on the AI response and conversation state.
 * 
 * @param {string} aiResponse - The AI's response text
 * @param {string} userMessage - The user's original message
 * @returns {Array<string>} - Suggested quick reply texts
 */
export function getSuggestedReplies(aiResponse, userMessage) {
  const response = aiResponse.toLowerCase();
  const query = userMessage.toLowerCase();
  const suggestions = [];

  // Context-aware suggestions based on what was just discussed
  if (response.includes('samajh') && !response.includes('nirmala')) {
    suggestions.push('Tell me about Nirmala Bright Scholar');
  }
  if (response.includes('nirmala') && !response.includes('samajh')) {
    suggestions.push('What is Samajh?');
  }
  if (response.includes('donat') || response.includes('volunteer') || response.includes('mentor')) {
    suggestions.push('How do I contact you?');
  }
  if (!response.includes('donat')) {
    suggestions.push('How can I donate?');
  }
  if (!response.includes('volunteer')) {
    suggestions.push('Can I volunteer?');
  }
  if (response.includes('scholar') || query.includes('scholar')) {
    suggestions.push('Share some success stories');
  }
  if (!response.includes('impact') && !query.includes('impact')) {
    suggestions.push('What impact have you made?');
  }

  // Limit to 3 suggestions
  return suggestions.slice(0, 3);
}

/**
 * Returns initial welcome suggestions for when the chatbot first opens.
 */
export function getWelcomeSuggestions() {
  return [
    'Tell me about Paripakv',
    'How can I donate?',
    'I want to volunteer',
    'What programmes do you run?'
  ];
}

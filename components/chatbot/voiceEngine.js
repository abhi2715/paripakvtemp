/**
 * voiceEngine.js — Browser-Native Voice Engine
 * 
 * Provides speech-to-text (STT) and text-to-speech (TTS) using the
 * Web Speech API. 100% free, no external dependencies.
 * 
 * Supports:
 * - Continuous speech recognition with interim results
 * - Text-to-speech with preferred Indian English voice
 * - Voice activity detection
 * - Graceful fallback when browser doesn't support speech APIs
 */

// ─── Feature Detection ───────────────────────────────────────────────────────────

/**
 * Checks if the browser supports the Speech Recognition API.
 */
export function isSpeechRecognitionSupported() {
  if (typeof window === 'undefined') return false;
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

/**
 * Checks if the browser supports the Speech Synthesis (TTS) API.
 */
export function isSpeechSynthesisSupported() {
  if (typeof window === 'undefined') return false;
  return !!window.speechSynthesis;
}


// ─── Speech-to-Text (STT) ────────────────────────────────────────────────────────

let recognitionInstance = null;
let isListening = false;

/**
 * Creates and configures a SpeechRecognition instance.
 * 
 * @param {object} callbacks - Event callbacks
 * @param {function} callbacks.onResult - Called with final transcript text
 * @param {function} callbacks.onInterim - Called with interim (partial) transcript
 * @param {function} callbacks.onStart - Called when listening starts
 * @param {function} callbacks.onEnd - Called when listening ends
 * @param {function} callbacks.onError - Called with error information
 * @returns {SpeechRecognition|null} - The recognition instance, or null if unsupported
 */
export function createRecognition(callbacks = {}) {
  if (!isSpeechRecognitionSupported()) {
    console.warn('Speech Recognition not supported in this browser');
    return null;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // Configuration
  recognition.lang = 'en-IN';           // Indian English for better accent recognition
  recognition.continuous = false;        // Stop after one utterance
  recognition.interimResults = true;     // Show partial results as user speaks
  recognition.maxAlternatives = 1;       // Just the best result

  // ── Event Handlers ──
  recognition.onstart = () => {
    isListening = true;
    callbacks.onStart?.();
  };

  recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }

    if (finalTranscript) {
      callbacks.onResult?.(finalTranscript.trim());
    } else if (interimTranscript) {
      callbacks.onInterim?.(interimTranscript.trim());
    }
  };

  recognition.onend = () => {
    isListening = false;
    callbacks.onEnd?.();
  };

  recognition.onerror = (event) => {
    isListening = false;
    // 'no-speech' and 'aborted' are normal — user just didn't say anything
    if (event.error !== 'no-speech' && event.error !== 'aborted') {
      console.warn('Speech recognition error:', event.error);
      callbacks.onError?.(event.error);
    } else {
      callbacks.onEnd?.();
    }
  };

  recognitionInstance = recognition;
  return recognition;
}

/**
 * Starts listening for speech input.
 */
export function startListening() {
  if (recognitionInstance && !isListening) {
    try {
      recognitionInstance.start();
    } catch (e) {
      // Already started — ignore
      console.warn('Recognition already active:', e.message);
    }
  }
}

/**
 * Stops listening for speech input.
 */
export function stopListening() {
  if (recognitionInstance && isListening) {
    try {
      recognitionInstance.stop();
    } catch (e) {
      console.warn('Recognition stop error:', e.message);
    }
  }
  isListening = false;
}

/**
 * Returns whether the recognition engine is currently listening.
 */
export function getIsListening() {
  return isListening;
}


// ─── Text-to-Speech (TTS) ────────────────────────────────────────────────────────

let isSpeaking = false;
let currentUtterance = null;

/**
 * Gets the best available voice for TTS.
 * Prefers Indian English female voices, falls back to any English voice.
 */
function getBestVoice() {
  if (!isSpeechSynthesisSupported()) return null;

  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  // Priority order for voice selection
  const preferences = [
    // Indian English female voices (best match for Avya persona)
    v => v.lang === 'en-IN' && v.name.toLowerCase().includes('female'),
    v => v.lang === 'en-IN',
    // Any English female voice
    v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female'),
    // Google voices tend to be high quality
    v => v.lang.startsWith('en') && v.name.toLowerCase().includes('google'),
    // Microsoft voices are also good
    v => v.lang.startsWith('en') && v.name.toLowerCase().includes('microsoft'),
    // Any English voice
    v => v.lang.startsWith('en'),
    // Absolute fallback
    () => true
  ];

  for (const pref of preferences) {
    const match = voices.find(pref);
    if (match) return match;
  }

  return voices[0];
}

/**
 * Speaks text aloud using the browser's speech synthesis.
 * 
 * @param {string} text - The text to speak
 * @param {object} options - TTS options
 * @param {function} options.onStart - Called when speaking starts
 * @param {function} options.onEnd - Called when speaking ends
 * @param {number} options.rate - Speaking rate (0.1 to 10, default 0.95)
 * @param {number} options.pitch - Voice pitch (0 to 2, default 1.05)
 * @returns {Promise<void>}
 */
export function speak(text, options = {}) {
  return new Promise((resolve, reject) => {
    if (!isSpeechSynthesisSupported()) {
      reject(new Error('Speech synthesis not supported'));
      return;
    }

    // Cancel any ongoing speech
    stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Voice configuration for warm, natural sound
    const voice = getBestVoice();
    if (voice) utterance.voice = voice;
    
    utterance.rate = options.rate ?? 0.95;    // Slightly slower for warmth
    utterance.pitch = options.pitch ?? 1.05;  // Slightly higher for friendliness
    utterance.volume = 1.0;
    utterance.lang = 'en-IN';

    utterance.onstart = () => {
      isSpeaking = true;
      options.onStart?.();
    };

    utterance.onend = () => {
      isSpeaking = false;
      currentUtterance = null;
      options.onEnd?.();
      resolve();
    };

    utterance.onerror = (event) => {
      isSpeaking = false;
      currentUtterance = null;
      // 'interrupted' and 'canceled' are normal when user stops early
      if (event.error !== 'interrupted' && event.error !== 'canceled') {
        console.warn('TTS error:', event.error);
        reject(new Error(event.error));
      } else {
        resolve();
      }
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  });
}

/**
 * Stops any ongoing speech synthesis.
 */
export function stopSpeaking() {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
  isSpeaking = false;
  currentUtterance = null;
}

/**
 * Returns whether the TTS engine is currently speaking.
 */
export function getIsSpeaking() {
  return isSpeaking;
}

/**
 * Loads voices (some browsers load them asynchronously).
 * Call this on component mount to ensure voices are ready.
 * 
 * @returns {Promise<SpeechSynthesisVoice[]>}
 */
export function loadVoices() {
  return new Promise((resolve) => {
    if (!isSpeechSynthesisSupported()) {
      resolve([]);
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }

    // Chrome loads voices async
    window.speechSynthesis.onvoiceschanged = () => {
      resolve(window.speechSynthesis.getVoices());
    };

    // Timeout fallback
    setTimeout(() => resolve(window.speechSynthesis.getVoices()), 1000);
  });
}

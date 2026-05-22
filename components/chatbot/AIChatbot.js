'use client';

/**
 * AIChatbot.js — Premium Floating AI Voice Chatbot
 * 
 * The main chatbot component for Paripakv Foundation. Features:
 * - Floating action button (FAB) with pulse animation
 * - Glassmorphism chat panel with smooth open/close
 * - Real-time voice interaction (STT + TTS)
 * - AI-powered responses via Gemini/Groq
 * - Quick reply suggestions
 * - Typing indicator
 * - Mobile-responsive (full-screen on mobile)
 * 
 * The AI persona is "Asha" — a warm, empathetic NGO relationship manager.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chat, getSuggestedReplies, getWelcomeSuggestions, clearHistory } from './aiEngine';
import {
  isSpeechRecognitionSupported,
  isSpeechSynthesisSupported,
  createRecognition,
  startListening,
  stopListening,
  speak,
  stopSpeaking,
  getIsSpeaking,
  loadVoices
} from './voiceEngine';
import styles from './AIChatbot.module.css';


// ─── Icons ───────────────────────────────────────────────────────────────────────
// Inline SVG icons for the chatbot UI.

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={styles.fabIcon}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={styles.fabIcon}>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    </svg>
  );
}

function VolumeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
    </svg>
  );
}

function VolumeOnIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <line x1="23" y1="9" x2="17" y2="15"/>
      <line x1="17" y1="9" x2="23" y2="15"/>
    </svg>
  );
}


// ─── Voice Waveform Component ────────────────────────────────────────────────────
function VoiceWaveform() {
  return (
    <div className={styles.voiceWave}>
      {[...Array(5)].map((_, i) => (
        <div key={i} className={styles.voiceBar} />
      ))}
    </div>
  );
}


// ─── Typing Indicator ────────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className={styles.typingRow}>
      <div className={`${styles.msgAvatar} ${styles.msgAvatarBot}`}>A</div>
      <div className={styles.typingBubble}>
        <div className={styles.typingDot} />
        <div className={styles.typingDot} />
        <div className={styles.typingDot} />
      </div>
    </div>
  );
}


// ─── Main Chatbot Component ──────────────────────────────────────────────────────

export default function AIChatbot() {
  // ── State ──
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]); // { id, role, text, timestamp }
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(getWelcomeSuggestions());
  const [isRecording, setIsRecording] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);
  const [voiceSupported, setVoiceSupported] = useState(false);

  // ── Refs ──
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // ── Initialize ──
  useEffect(() => {
    // Check voice support on mount
    setVoiceSupported(isSpeechRecognitionSupported() && isSpeechSynthesisSupported());
    
    // Pre-load TTS voices
    if (isSpeechSynthesisSupported()) {
      loadVoices();
    }
  }, []);

  // ── Auto-scroll to bottom ──
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // ── Focus input on open ──
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // ── Cleanup on unmount ──
  useEffect(() => {
    return () => {
      stopListening();
      stopSpeaking();
    };
  }, []);


  // ─── Send Message ──────────────────────────────────────────────────────────────

  const sendMessage = useCallback(async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || isLoading) return;

    // Clear input and interim text
    setInput('');
    setInterimText('');
    setSuggestions([]);

    // Add user message
    const userMsg = {
      id: Date.now(),
      role: 'user',
      text: trimmed,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Get AI response
      const response = await chat(trimmed);

      // Add bot message
      const botMsg = {
        id: Date.now() + 1,
        role: 'bot',
        text: response.text,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);

      // Generate suggestions
      const newSuggestions = getSuggestedReplies(response.text, trimmed);
      setSuggestions(newSuggestions);

      // Auto-speak if enabled
      if (autoSpeak && isSpeechSynthesisSupported()) {
        setSpeakingMsgId(botMsg.id);
        try {
          await speak(response.text, {
            onEnd: () => setSpeakingMsgId(null)
          });
        } catch {
          setSpeakingMsgId(null);
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = {
        id: Date.now() + 1,
        role: 'bot',
        text: "I'm sorry, I'm having a bit of trouble right now. Please try again in a moment, or feel free to email us at paripakvfoundation@gmail.com!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, autoSpeak]);


  // ─── Handle Key Press ──────────────────────────────────────────────────────────

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);


  // ─── Voice Recording ───────────────────────────────────────────────────────────

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      // Stop recording
      stopListening();
      setIsRecording(false);
      setInterimText('');
    } else {
      // Start recording
      stopSpeaking(); // Stop any TTS first

      const recognition = createRecognition({
        onStart: () => setIsRecording(true),
        onResult: (transcript) => {
          setIsRecording(false);
          setInterimText('');
          setInput(transcript);
          // Auto-send after voice input
          setTimeout(() => sendMessage(transcript), 100);
        },
        onInterim: (interim) => {
          setInterimText(interim);
        },
        onEnd: () => {
          setIsRecording(false);
          setInterimText('');
        },
        onError: (error) => {
          setIsRecording(false);
          setInterimText('');
          console.warn('Voice error:', error);
        }
      });

      if (recognition) {
        recognitionRef.current = recognition;
        startListening();
      }
    }
  }, [isRecording, sendMessage]);


  // ─── Speak a Message ───────────────────────────────────────────────────────────

  const speakMessage = useCallback(async (msg) => {
    if (getIsSpeaking() && speakingMsgId === msg.id) {
      // Toggle off
      stopSpeaking();
      setSpeakingMsgId(null);
    } else {
      // Start speaking
      stopSpeaking();
      setSpeakingMsgId(msg.id);
      try {
        await speak(msg.text, {
          onEnd: () => setSpeakingMsgId(null)
        });
      } catch {
        setSpeakingMsgId(null);
      }
    }
  }, [speakingMsgId]);


  // ─── Toggle Chat ───────────────────────────────────────────────────────────────

  const toggleChat = useCallback(() => {
    if (isOpen) {
      stopSpeaking();
      stopListening();
      setIsRecording(false);
    }
    setIsOpen(prev => !prev);
  }, [isOpen]);


  // ─── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className={styles.fabContainer}>
      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatPanel}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.avatarWrap}>
                A
                <div className={styles.onlineDot} />
              </div>
              <div className={styles.headerInfo}>
                <div className={styles.headerName}>Asha</div>
                <div className={styles.headerStatus}>Paripakv Foundation Assistant</div>
              </div>
              <div className={styles.headerActions}>
                {/* Auto-speak toggle */}
                {voiceSupported && (
                  <button
                    className={`${styles.headerBtn} ${autoSpeak ? styles.headerBtnActive : ''}`}
                    onClick={() => {
                      setAutoSpeak(prev => !prev);
                      if (autoSpeak) stopSpeaking();
                    }}
                    title={autoSpeak ? 'Mute voice replies' : 'Enable voice replies'}
                    aria-label={autoSpeak ? 'Mute voice replies' : 'Enable voice replies'}
                  >
                    {autoSpeak ? <VolumeOffIcon /> : <VolumeOnIcon />}
                  </button>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className={styles.messagesArea}>
              {/* Welcome state */}
              {messages.length === 0 && (
                <div className={styles.welcomeWrap}>
                  <div className={styles.welcomeEmoji}>🙏</div>
                  <div className={styles.welcomeTitle}>Hi, I&apos;m Asha!</div>
                  <div className={styles.welcomeSubtitle}>
                    Your friendly guide at Paripakv Foundation. Ask me about our programmes, how to donate, volunteer, or anything else!
                  </div>
                </div>
              )}

              {/* Message bubbles */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${styles.messageRow} ${
                    msg.role === 'user' ? styles.messageRowUser : styles.messageRowBot
                  }`}
                >
                  <div className={`${styles.msgAvatar} ${
                    msg.role === 'user' ? styles.msgAvatarUser : styles.msgAvatarBot
                  }`}>
                    {msg.role === 'user' ? 'Y' : 'A'}
                  </div>
                  <div className={`${styles.bubble} ${
                    msg.role === 'user' ? styles.bubbleUser : styles.bubbleBot
                  }`}>
                    {msg.text}
                    {/* Speaker button for bot messages */}
                    {msg.role === 'bot' && voiceSupported && (
                      <button
                        className={`${styles.speakBtn} ${
                          speakingMsgId === msg.id ? styles.speakBtnActive : ''
                        }`}
                        onClick={() => speakMessage(msg)}
                        title="Listen to this message"
                        aria-label="Listen to this message"
                      >
                        <SpeakerIcon />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && <TypingIndicator />}

              {/* Interim voice text */}
              {interimText && (
                <div className={styles.interimText}>🎙️ {interimText}...</div>
              )}

              {/* Quick reply chips */}
              {suggestions.length > 0 && !isLoading && (
                <div className={styles.quickReplies}>
                  {suggestions.map((text, i) => (
                    <button
                      key={i}
                      className={styles.quickReply}
                      onClick={() => sendMessage(text)}
                    >
                      {text}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Powered by */}
            <div className={styles.poweredBy}>PARIPAKV FOUNDATION</div>

            {/* Input area */}
            <div className={styles.inputArea}>
              {/* Voice recording wave or input */}
              {isRecording ? (
                <div className={styles.inputWrap}>
                  <VoiceWaveform />
                </div>
              ) : (
                <div className={styles.inputWrap}>
                  <input
                    ref={inputRef}
                    type="text"
                    className={styles.input}
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    autoComplete="off"
                  />
                </div>
              )}

              {/* Mic button */}
              {voiceSupported && (
                <button
                  className={`${styles.actionBtn} ${styles.micBtn} ${
                    isRecording ? styles.micBtnActive : ''
                  }`}
                  onClick={toggleRecording}
                  title={isRecording ? 'Stop recording' : 'Start voice input'}
                  aria-label={isRecording ? 'Stop recording' : 'Start voice input'}
                >
                  <MicIcon />
                </button>
              )}

              {/* Send button */}
              <button
                className={`${styles.actionBtn} ${styles.sendBtn}`}
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                title="Send message"
                aria-label="Send message"
              >
                <SendIcon />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Email FAB Button ── */}
      <a
        href="mailto:paripakvfoundation@gmail.com"
        className={styles.emailFab}
        title="Email Paripakv Foundation"
        aria-label="Email Paripakv Foundation"
      >
        <svg viewBox="0 0 24 24" fill="none" className={styles.fabIcon} style={{ width: '22px', height: '22px' }}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>

      {/* ── Chat FAB Button ── */}
      <motion.button
        className={`${styles.fab} ${isOpen ? styles.fabOpen : ''}`}
        onClick={toggleChat}
        whileTap={{ scale: 0.92 }}
        title={isOpen ? 'Close chat' : 'Chat with Asha'}
        aria-label={isOpen ? 'Close chat' : 'Chat with Asha - Paripakv Foundation AI Assistant'}
        id="chatbot-fab"
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </motion.button>
    </div>
  );
}

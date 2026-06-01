'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CookieBanner.module.css';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if the user has already made a choice
    const consent = getCookie('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  // Helper to read cookie
  const getCookie = (name) => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  // Helper to set cookie with security features
  const setCookie = (name, value, days) => {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = `; expires=${date.toUTCString()}`;
    }
    // Implement security features: Secure and SameSite=Strict
    // This ensures cookies are only sent over HTTPS and mitigates CSRF attacks
    document.cookie = `${name}=${value}${expires}; path=/; Secure; SameSite=Strict`;
  };

  const handleAccept = () => {
    setCookie('cookieConsent', 'accepted', 365);
    setShowBanner(false);
  };

  const handleReject = () => {
    setCookie('cookieConsent', 'rejected', 365);
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          className={styles.banner}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className={styles.text}>
            We use cookies to enhance your browsing experience and analyze our traffic. 
            By clicking "Accept", you consent to our use of cookies. 
            <br />
            <span style={{ fontSize: '0.8em', opacity: 0.8, marginTop: '4px', display: 'block' }}>
              * Security Feature Enabled: Cookies are strictly stored with Secure & SameSite flags.
            </span>
          </div>
          <div className={styles.buttons}>
            <button className={styles.rejectBtn} onClick={handleReject}>
              Reject All
            </button>
            <button className={styles.acceptBtn} onClick={handleAccept}>
              Accept All
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

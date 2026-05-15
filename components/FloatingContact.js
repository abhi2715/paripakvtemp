'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FloatingContact.module.css';

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.tooltip}
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ duration: 0.22 }}
          >
            <p>Have a question? Email us!</p>
            <a href="mailto:paripakvfoundation@gmail.com">
              paripakvfoundation@gmail.com
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className={styles.fab}
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        title="Contact via Email"
        aria-label="Contact via Email"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="m2 7 10 6 10-6"/>
        </svg>
      </motion.button>
    </div>
  );
}

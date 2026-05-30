'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './HeroSection.module.css';

// Hindi syllable units for the intro animation
const HINDI_SYLLABLES = ['प', 'रि', 'प', 'क्व'];

export default function HeroSection() {
  const [phase, setPhase] = useState('intro'); // intro | collage
  const [lettersDone, setLettersDone] = useState(false);

  // After letters animate in, wait then show collage
  useEffect(() => {
    const t1 = setTimeout(() => setLettersDone(true), HINDI_SYLLABLES.length * 180 + 800);
    const t2 = setTimeout(() => setPhase('collage'), HINDI_SYLLABLES.length * 180 + 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Using the user-provided images
  const localImages = [
    '/images/Hero section images/image 2.png',
    '/images/Hero section images/image 3.png',
    '/images/Hero section images/image 4.png',
    '/images/Hero section images/image 5.png',
    '/images/Hero section images/image 6.png',
    '/images/Hero section images/image 7.png',
    '/images/Hero section images/image 8.png',
    '/images/Hero section images/image 9.png',
  ];
  
  // Duplicate images to create a seamless infinite scrolling loop
  const seamlessImages = [...localImages, ...localImages, ...localImages];

  return (
    <section className={styles.hero} id="home">
      {/* Background */}
      <div className={styles.bg} style={{ backgroundImage: 'url(/images/background.jpeg)' }} />
      <div className={styles.overlay} />

      <AnimatePresence mode="wait">
        {/* ── Phase 1: Name Animation ── */}
        {phase === 'intro' && (
          <motion.div
            key="intro"
            className={styles.introWrap}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className={styles.tagline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Empowering Education. Transforming Lives.
            </motion.p>

            <div className={styles.nameRow}>
              {HINDI_SYLLABLES.map((syllable, i) => (
                <motion.span
                  key={i}
                  className={styles.hindiLetter}
                  initial={{ opacity: 0, y: 50, scale: 0.7, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  transition={{
                    delay: i * 0.18,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {syllable}
                </motion.span>
              ))}
            </div>

            {/* English transliteration below */}
            <motion.p
              className={styles.transliteration}
              initial={{ opacity: 0, y: 10 }}
              animate={lettersDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              PARIPAKV
            </motion.p>

            <motion.p
              className={styles.foundationText}
              initial={{ opacity: 0, y: 20 }}
              animate={lettersDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Foundation
            </motion.p>
          </motion.div>
        )}

        {/* ── Phase 2: Collage ── */}
        {phase === 'collage' && (
          <motion.div
            key="collage"
            className={styles.collageWrap}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated Marquee Collage Background */}
            <div className={styles.marqueeContainer}>
              <div className={styles.marqueeTrack}>
                {seamlessImages.map((src, i) => (
                  <div key={i} className={styles.marqueeItem}>
                    <Image src={src} alt="Paripakv Work" fill sizes="33vw" style={{ objectFit: 'cover' }} priority={i < 4} />
                    <div className={styles.cellOverlay} />
                  </div>
                ))}
              </div>
            </div>

            {/* Title overlay - Centered */}
            <motion.div
              className={styles.collageTitle}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <h1>
                <span className={styles.peach}>Paripakv</span> <span className={styles.foundationGrey}>Foundation</span>
              </h1>
              <p>Empowering underprivileged students through quality education</p>
              <div className={styles.heroBtns}>
                <a href="#about" className={styles.btnOutline}>Our Story</a>
                <a href="#contact" className={styles.btnPrimary}>Get Involved</a>
              </div>
            </motion.div>

            <motion.a
              href="#about"
              className={styles.scrollIndicator}
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              style={{ display: 'block', cursor: 'pointer' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12l7 7 7-7" stroke="#E8A87C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

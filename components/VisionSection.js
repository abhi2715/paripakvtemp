'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ParallaxBackground from './ParallaxBackground';
import styles from './VisionSection.module.css';

export default function VisionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section className={`${styles.section} section`} id="vision" ref={ref}>
      <ParallaxBackground targetRef={ref} image="/images/programmes-bg.jpeg" opacity={0.15} />
      <div className="max-width" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className={styles.title}>Our Vision</h2>
          <p className={styles.text}>
            Paripakv Foundation is committed to making <strong>schools</strong> and <strong>communities future-ready</strong> where every <strong>child and youth</strong> has the <strong>education, tools and opportunities</strong> to thrive in an ever-changing world.
          </p>
        </motion.div>

        <motion.div 
          className={styles.hexGrid}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          {[
            {
              title: "Quality\nEducation",
              num: "#4",
              icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            },
            {
              title: "Gender\nEquality",
              num: "#5",
              icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="5"/><path d="M12 15v7M9 19h6"/></svg>
            },
            {
              title: "Decent Work &\nGrowth",
              num: "#8",
              icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 9l-5 5-4-4-5 5"/></svg>
            },
            {
              title: "Reduced\nInequalities",
              num: "#10",
              icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 10h8M8 14h8"/></svg>
            },
            {
              title: "Partnerships\nFor Goals",
              num: "#17",
              icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><circle cx="8" cy="15" r="5"/><circle cx="16" cy="15" r="5"/></svg>
            }
          ].map((item, index) => (
            <motion.div 
              key={index} 
              className={styles.hexWrapper}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + (index * 0.1), type: "spring" }}
            >
              <div className={styles.hexagon} />
              <div className={styles.hexContent}>
                <div className={styles.hexIcon}>{item.icon}</div>
                <div className={styles.hexDivider} />
                <div className={styles.hexTitle}>{item.title.split('\n').map((line, i) => <span key={i} style={{display: 'block'}}>{line}</span>)}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

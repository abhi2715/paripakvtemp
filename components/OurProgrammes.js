'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TiltCard from './TiltCard';
import ParallaxBackground from './ParallaxBackground';
import styles from './OurProgrammes.module.css';

const programs = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d4845a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
      </svg>
    ),
    title: 'समझ',
    desc: 'Training and mentoring middle school teachers in core subjects to build a strong conceptual foundation for students.',
    color: '#d4845a',
    link: '#samajh'
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d4845a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'निर्मला BRIGHT SCHOLARS',
    desc: 'Mentorship and financial support for exceptionally bright underprivileged youth pursuing higher education.',
    color: '#d4845a',
    link: '#nirmala'
  }
];

export default function OurProgrammes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section" id="programmes" ref={ref} style={{ background: 'var(--dark-mid)', position: 'relative', overflow: 'hidden' }}>
      <ParallaxBackground targetRef={ref} image="/images/Hero section images/image 8.png" opacity={0.07} />
      <div className="max-width" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="section-title-wrap"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="section-title" style={{ color: 'var(--white)', fontFamily: "'Outfit', sans-serif", fontWeight: 800, textTransform: 'uppercase' }}>Our Programmes</h2>
        </motion.div>

        <div className={styles.grid}>
          {programs.map((prog, i) => (
            <TiltCard
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
            >
              <div className={styles.iconBox} style={{ backgroundColor: `${prog.color}33` }}>
                {prog.icon}
              </div>
              <div className={styles.textGroup}>
                <h3 className={styles.title} style={{ color: prog.color }}>
                  {prog.title}
                  <span className={styles.underline} style={{ backgroundColor: prog.color }}></span>
                </h3>
                <p className={styles.desc}>{prog.desc}</p>
                <a href={prog.link} className={styles.readMore}>
                  Read More →
                </a>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

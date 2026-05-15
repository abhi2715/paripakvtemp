'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TiltCard from './TiltCard';
import ParallaxBackground from './ParallaxBackground';
import styles from './FoundersSection.module.css';

const founders = [
  {
    name: 'Pooja Sharma',
    role: 'Co-Founder',
    initials: 'PS',
    bio: 'Pooja Sharma has spent 25 years being a technologist for the banking industry. She holds an MBA from Indian Institute of Management, Bangalore in Finance & International Business. Besides work, she actively supports the causes of education and women empowerment. She has been associated with schools for the underprivileged in the Gurgaon area for the last 2 years.',
  },
  {
    name: 'Harmendra Gandhi',
    role: 'Co-Founder',
    initials: 'HG',
    bio: 'Harmendra Gandhi is an IIT Kanpur and IIM Bangalore graduate who has worked in areas of finance and portfolio management for the past 25 years. He has also been deeply involved in NGOs in the education sector, specially in fund raising and governance.',
  },
];

export default function FoundersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className={`${styles.founders} section`} id="founders" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      <ParallaxBackground targetRef={ref} />
      <div className="max-width" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="section-title-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`section-title ${styles.title}`}>Our Founders</h2>
        </motion.div>

        <div className={styles.grid}>
          {founders.map((f, i) => (
            <TiltCard
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 100, rotateX: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.2 + i * 0.2, duration: 0.9, type: 'spring', bounce: 0.4 }}
            >
              {/* Avatar */}
              <div className={styles.avatar}>{f.initials}</div>
              <h3 className={styles.name}>{f.name}</h3>
              <span className={styles.role}>{f.role}</span>
              <p className={styles.bio}>{f.bio}</p>

              {/* Email button */}
              <a
                href="mailto:paripakvfoundation@gmail.com"
                className={styles.emailBtn}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m2 7 10 6 10-6"/>
                </svg>
                Connect via Email
              </a>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

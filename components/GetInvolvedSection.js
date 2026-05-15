'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './GetInvolvedSection.module.css';

const cards = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#E8A87C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Volunteer',
    desc: 'We invite you to make a difference in the lives of children in need of care and protection by contributing your time and talent to volunteering with us. Individuals from different backgrounds, skills and experiences can volunteer for various programmes, projects and campaigns.',
    cta: 'Volunteer with us',
    subject: 'Volunteering Enquiry',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#E8A87C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
        <path d="M16 8h-4a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
        <path d="M12 6v2M12 16v2"/>
      </svg>
    ),
    title: 'Donate',
    desc: 'Your donation, no matter how small, will make a big difference. All donations to Paripakv Foundation are 50% Tax Exempt under section 80G of IT Act, 1961. We follow a 100% pass-through model – every rupee of your donation goes directly toward the program.',
    cta: 'Make a Donation',
    subject: 'Donation Enquiry',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#E8A87C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: 'Mentor',
    desc: 'Become a mentor under our Nirmala Bright Scholar program. Share your professional expertise with a bright, deserving student. A few hours per month can transform a young life and build a future leader. We match mentors based on career streams and student aspirations.',
    cta: 'Become a Mentor',
    subject: 'Mentorship Enquiry',
  },
];

export default function GetInvolvedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className={`${styles.section} section`} id="get-involved" ref={ref}>
      <div className="max-width">
        <motion.div
          className="section-title-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`section-title ${styles.title}`}>Get Involved</h2>
        </motion.div>

        <div className={styles.grid}>
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
              whileHover={{ scale: 1.02, y: -4, borderColor: 'rgba(232,168,124,0.5)', boxShadow: '0 15px 30px rgba(0,0,0,0.3)' }}
            >
              <div className={styles.iconWrap}>{card.icon}</div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDesc}>{card.desc}</p>
              <a
                href={`mailto:paripakvfoundation@gmail.com?subject=${card.subject}`}
                className={styles.cardBtn}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m2 7 10 6 10-6"/>
                </svg>
                {card.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

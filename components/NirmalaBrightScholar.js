'use client';
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import ParallaxBackground from './ParallaxBackground';
import styles from './NirmalaBrightScholar.module.css';

const testimonials = [
  {
    name: 'Yashashwini',
    role: 'Commerce Student',
    initials: 'YM',
    quote:
      'I am grateful to the Nirmala Bright Scholarship Program for supporting my education. This scholarship motivated me to study harder and move closer to my career goals. The financial assistance, guidance, and mentor support helped me grow not just academically but as a person.',
  },
  {
    name: 'Shakthi',
    role: 'BBA Student',
    initials: 'S',
    quote:
      'During a difficult time financially and personally, the support and encouragement I received helped me continue my studies and believe in myself. The trainers and mentors were very supportive, motivating, and always ready to help us grow both personally and professionally. I am truly grateful for this opportunity and the positive impact it has made on my life.',
  },
  {
    name: 'Umapathy R.',
    role: 'Parent & Educator',
    initials: 'UR',
    quote:
      'When I was struggling to pay the fees for my daughter, the Nirmala Bright Scholarship program joined hands with us. They gave my daughter a new life, instilled confidence in her, and showed us the right path forward on our journey. I will always be grateful for their kindness.',
  },
  {
    name: 'Megha',
    role: 'Engineering Student',
    initials: 'M',
    quote:
      'This scholarship gave me the support and financial assistance I needed to shape my goals and build a strong foundation for my career in engineering. It helped me focus on my studies without worrying about finances, and I am thankful for every opportunity it opened up.',
  },
];

export default function NirmalaBrightScholar() {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [isDragging, setIsDragging] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <section className={`${styles.section} section`} id="nirmala" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      <ParallaxBackground targetRef={ref} />
      <div className="max-width" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="section-title-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`section-title ${styles.title}`}>Nirmala Bright Scholar</h2>
        </motion.div>

        {/* Program Description */}
        <motion.div
          className={styles.programGrid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className={styles.programText}>
            <motion.p variants={itemVariants}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. The Nirmala Bright Scholar program
              is a holistic initiative that combines <strong>financial assistance</strong> with{' '}
              <strong>dedicated mentorship</strong> from industry professionals to empower bright, deserving
              students to reach their full potential.
            </motion.p>
            <motion.p variants={itemVariants}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
              Each scholar is carefully matched with a mentor based on their career aspirations, creating a
              personalised roadmap for success in their chosen field.
            </motion.p>
            <motion.p variants={itemVariants}>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
              magni dolores eos qui ratione voluptatem sequi nesciunt. Our scholars demonstrate remarkable
              resilience and academic excellence.
            </motion.p>
          </div>

          <div className={styles.programPoints}>
            {[
              { num: '01', text: 'Financial scholarship covering academic expenses – internet, books, stationery, and coaching fees.' },
              { num: '02', text: 'One-on-one mentorship from professionals from IIM, IIT and top industry leaders.' },
              { num: '03', text: 'Career counselling and life skills sessions every month with your assigned mentor.' },
              { num: '04', text: 'Aptitude-based selection ensuring maximum impact for every rupee donated.' },
            ].map((p, i) => (
              <motion.div
                key={i}
                className={styles.point}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
              >
                <span className={styles.pointNum}>{p.num}</span>
                <span className={styles.pointText}>{p.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Email CTA */}
        <motion.div
          className={styles.emailCta}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <a href="mailto:paripakvfoundation@gmail.com?subject=Nirmala Bright Scholar Enquiry" className="btn-primary">
            Contact Us
          </a>
        </motion.div>
      </div>

      {/* ── Testimonials ── */}
      <div className={styles.testimonialsWrap}>
        <motion.h3
          className={styles.testimonialsHeading}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          What Our Scholars Say
        </motion.h3>

        <motion.div
          className={styles.trackContainer}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className={styles.track} style={{ animationPlayState: isInView ? 'running' : 'paused' }}>
            {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className={styles.testimonialCard}>
              <div className={styles.quoteIcon}>&ldquo;</div>
              <p className={styles.quote}>{t.quote}</p>
              <div className={styles.author}>
                <div className={styles.authorAvatar} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #E8A87C, #d4845a)', color: '#1d1d1d', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.5px' }}>
                  {t.initials}
                </div>
                <div>
                  <div className={styles.authorName}>{t.name}</div>
                  <div className={styles.authorRole}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </motion.div>
      </div>
    </section>
  );
}

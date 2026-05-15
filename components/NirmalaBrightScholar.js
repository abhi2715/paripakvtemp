'use client';
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import ParallaxBackground from './ParallaxBackground';
import Image from 'next/image';
import styles from './NirmalaBrightScholar.module.css';

const testimonials = [
  {
    name: 'Priya Mehta',
    role: 'Class XII Student, Delhi',
    initials: 'PM',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&h=120&fit=crop&crop=face',
    quote:
      'The Nirmala Bright Scholar program changed my life. After losing my father, I thought my dreams of becoming a doctor were over. Paripakv not only provided financial support but also connected me with a mentor who guided me through my NEET preparation. Today I am in my first year of MBBS!',
  },
  {
    name: 'Arjun Singh',
    role: 'Engineering Student, Pune',
    initials: 'AS',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face',
    quote:
      'I never imagined I could get into IIT. The mentorship I received through Paripakv was incredible. My mentor spent hours every week guiding me on problem-solving strategies. The scholarship covered my coaching fees and I cleared JEE Advanced!',
  },
  {
    name: 'Kavita Nair',
    role: 'Commerce Student, Mumbai',
    initials: 'KN',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face',
    quote:
      'Being a first-generation student from my family to pursue higher education, I was lost. The Nirmala Bright Scholar program paired me with an amazing mentor from IIM who helped me understand career paths in finance. I am now pursuing CA.',
  },
  {
    name: 'Rahul Verma',
    role: 'Science Student, Lucknow',
    initials: 'RV',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
    quote:
      'The scholarship covered my internet and books, which was crucial for my online coaching. The program is transparent and efficient. Every rupee goes directly to helping students like me. I qualified for JEE Mains and received a call from NIT.',
  },
  {
    name: 'Sunita Gupta',
    role: 'Arts Student, Jaipur',
    initials: 'SG',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face',
    quote:
      "I was struggling to find direction after my mother passed away. Paripakv's mentors helped me discover my passion for design. They supported me with resources and confidence. I am now pursuing a degree in graphic design at a top college.",
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
                <div className={styles.authorAvatar}>
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={48}
                    height={48}
                    draggable={false}
                    style={{ objectFit: 'cover' }}
                  />
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

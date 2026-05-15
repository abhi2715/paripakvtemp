'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ParallaxBackground from './ParallaxBackground';
import styles from './SamajhSection.module.css';

export default function SamajhSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const features = [
    { 
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E8A87C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>, 
      title: 'Quality Teachers', 
      desc: 'Young adults passionate about teaching, mentored continuously by an expert panel of advisors.' 
    },
    { 
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E8A87C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, 
      title: 'Partnership Model', 
      desc: 'Works with local initiatives providing dedicated teachers with quality training and mentoring.' 
    },
    { 
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E8A87C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>, 
      title: 'Deep Understanding', 
      desc: 'Focuses on Samajh (understanding) as against rote exam-focused learning — a unique approach.' 
    },
    { 
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E8A87C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, 
      title: 'Expert Panel', 
      desc: 'Experienced teachers, professionals & educators continuously mentor teachers to bring the best.' 
    },
  ];

  return (
    <section className={`${styles.section} section`} id="samajh" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      <ParallaxBackground targetRef={ref} />
      <div className="max-width" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="section-title-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`section-title ${styles.title}`}>Samajh</h2>
        </motion.div>

        <div className={styles.content}>
          {/* Top Row: Image + Description */}
          <div className={styles.topRow}>
            <motion.div
              className={styles.imageCol}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
            >
              <img src="/images/Dreams-on-Streets.jpg" alt="Samajh" className={styles.dummyImage} />
            </motion.div>
            <motion.div
              className={styles.description}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <motion.p variants={itemVariants}>
                Samajh is an endeavour to augment the quality and capacity of local educational initiatives
                by providing dedicated teachers with quality training and mentoring in core subjects. Operating
                in a partnership model with schools at the middle school level, Samajh bridges the gap between
                traditional rote learning and conceptual understanding.
              </motion.p>
              <motion.p variants={itemVariants}>
                Our teachers are young adults who are passionate and willing to be molded into exceptional
                educators. They demonstrate social commitment besides being experts in their subject areas.
                The combination brings together the technology competence of the youth with the traditional
                education experience of the mentors.
              </motion.p>
            </motion.div>
          </div>

          {/* Feature cards */}
          <div className={styles.featureGrid}>
            {features.map((f, i) => (
              <motion.div
                key={i}
                className={styles.featureCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
                whileHover={{ scale: 1.02, y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
              >
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Email CTA */}
        <motion.div
          className={styles.emailCta}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <a href="mailto:paripakvfoundation@gmail.com?subject=Samajh Program Enquiry" className="btn-primary">
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}

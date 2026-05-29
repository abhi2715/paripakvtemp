'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import ParallaxBackground from './ParallaxBackground';
import styles from './NirmalaBrightScholar.module.css';
import { testimonialsData as fallbackTestimonials } from '../lib/testimonialsData';

const MaleIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM18 21v-2a4 4 0 0 0-4-4H10a4 4 0 0 0-4 4v2"/>
  </svg>
);

const FemaleIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM18 21v-2a4 4 0 0 0-4-4H10a4 4 0 0 0-4 4v2"/>
    <path d="M8.5 7.5v4c0 1.5.5 2 1.5 3M15.5 7.5v4c0 1.5-.5 2-1.5 3"/>
  </svg>
);

export default function NirmalaBrightScholar() {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const scrollRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isTestimonialsInView = useInView(trackRef, { once: true, margin: '-80px' });
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
    fetch('https://paripakv-admin.vercel.app/api/public/testimonials', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        console.log("Fetched testimonials:", data);
        if (Array.isArray(data) && data.length > 0) {
          // Merge: API testimonials first, then hardcoded ones
          setTestimonials([...data, ...fallbackTestimonials]);
        }
      })
      .catch((e) => { console.error("Testimonial fetch error:", e); });
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350; // card width + gap
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

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
    <>
      <section className={`${styles.section} section`} id="nirmala" ref={ref} style={{ position: 'relative', overflow: 'hidden', paddingBottom: '60px' }}>
        <ParallaxBackground targetRef={ref} image="/images/nirmala-bg.png" opacity={0.15} />
        <div className="max-width" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="section-title-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`section-title ${styles.title}`}>निर्मला Bright Scholars</h2>
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
              The objective of this program is to provide <strong>financial assistance &amp; education support services</strong> to
              students who have financial constraints and yet have a clear demonstration of ambition, goal and
              capability towards building a career for themselves. <a href="#contact" style={{ color: '#E8A87C', textDecoration: 'underline' }}>Apply Now</a>
            </motion.p>
            <motion.p variants={itemVariants}>
              It is a <strong>dual program</strong> which combines financial assistance with{' '}
              <strong>mentorship from professionals</strong>. Students studying in Class 11 and 12 will be
              entitled to receive a scholarship to cover their academic expenses and mentorship from a
              professional for Coaching, Career Counselling and Life Skills.
            </motion.p>
            <motion.p variants={itemVariants}>
              This is an <strong>aptitude-based scholarship</strong> for students who are studying in 11th or 12th class,
              enrolled and continuing their education, and open for Indian nationals only. Allowance for academic
              expenses is provided on a monthly basis for purposes such as internet, device, books, stationery,
              and online learning.
            </motion.p>
            <motion.p variants={itemVariants}>
              Duration of the scholarship is annual, coinciding with the academic year, subject to review of performance,
              utilisation pattern and continued state of crisis/need. The student should <strong>not</strong> be a recipient
              of any other scholarships or financial assistance of any kind.
            </motion.p>
          </div>

          <div className={styles.programPoints}>
            {[
              { num: '01', text: 'Financial scholarship covering academic expenses – internet, device, books, stationery, online learning & coaching fees on a monthly basis.' },
              { num: '02', text: 'One-on-one mentorship from professionals (IIM, IIT & top industry leaders) for Career Counselling and Life Skills.' },
              { num: '03', text: 'Multi-stage aptitude-based selection combining need assessment with academic rigour, soft skills evaluation, and video/in-person interviews.' },
              { num: '04', text: 'Students must demonstrate clarity of goal, maintain minimum performance standards, proactively connect with mentors monthly, and show integrity in fund utilisation.' },
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

        {/* Eligibility & Documents */}
        <motion.div
          className={styles.detailsGrid}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
        >
          <div className={styles.detailCard}>
            <h4 className={styles.detailTitle}>Selection Process</h4>
            <ul className={styles.detailList}>
              <li>Initial shortlisting by school based on academic performance &amp; soft skills assessment</li>
              <li>Qualitative evaluation of clarity of thought, attitude &amp; problem-solving ability</li>
              <li>Video / in-person interview of shortlisted candidates</li>
              <li>Document verification for final selection</li>
            </ul>
          </div>
          <div className={styles.detailCard}>
            <h4 className={styles.detailTitle}>Documents Required</h4>
            <ul className={styles.detailList}>
              <li>Last 4 years mark sheets</li>
              <li>10th Board mark sheet</li>
              <li>Latest mark sheet certified by school</li>
              <li>Short essay (500–1000 words) on &ldquo;What I want to be and how the scholarship will help&rdquo;</li>
              <li>Aadhaar &amp; bank details</li>
              <li>Demand proof – bill from college/school</li>
            </ul>
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
    </section>

      {/* ── Testimonials ── */}
      <section className={styles.testimonialsWrap} ref={trackRef} style={{ position: 'relative', overflow: 'hidden' }}>
        <ParallaxBackground targetRef={trackRef} image="/images/testimonials-bg.png" opacity={0.15} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.h3
            className={styles.testimonialsHeading}
            initial={{ opacity: 0, y: 20 }}
            animate={isTestimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            What Our Scholars Say
          </motion.h3>

          <motion.div
            className={styles.trackContainer}
            initial={{ opacity: 0 }}
            animate={isTestimonialsInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <button className={`${styles.navBtn} ${styles.navBtnLeft}`} onClick={() => scroll('left')} aria-label="Previous testimonials">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <div className={styles.track} ref={scrollRef}>
              {testimonials.map((t, i) => (
              <div key={i} className={styles.testimonialCard}>
                <div className={styles.quoteIcon}>&ldquo;</div>
                <p className={styles.quote}>{t.quote}</p>
                <div className={styles.author}>
                  <div className={styles.authorAvatar} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #E8A87C, #d4845a)', color: '#1d1d1d', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.5px' }}>
                    {t.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
                  </div>
                  <div>
                    <div className={styles.authorName}>{t.name}</div>
                    <div className={styles.authorRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
            </div>
            <button className={`${styles.navBtn} ${styles.navBtnRight}`} onClick={() => scroll('right')} aria-label="Next testimonials">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}

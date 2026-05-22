'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ParallaxBackground from './ParallaxBackground';
import Image from 'next/image';
import styles from './AboutSection.module.css';

export default function AboutSection() {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <section className={`${styles.about} section`} id="about" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      <ParallaxBackground targetRef={ref} image="/images/about-bg.png" opacity={0.15} />
      <div className="max-width" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="section-title-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Paripakv</h2>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.imageCol}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className={styles.dummyImageWrap}>
              <Image src="/images/about-bg.png" alt="About Paripakv" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover', borderRadius: '16px' }} />
            </div>
          </motion.div>
          <motion.div
            className={styles.textCol}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <motion.p variants={itemVariants}>
              Paripakv Foundation is a <strong>Section 8 company</strong> set up with the exclusive objective
              of providing quality education to underprivileged students via various targeted intervention programs.
            </motion.p>
            <motion.p variants={itemVariants}>
              Using its own custom-built programs, it partners with other agencies in the field of education to
              transform the quality of education being provided to students, empowering them to realise their
              true potential in life.
            </motion.p>
            <motion.p variants={itemVariants}>
              Paripakv has been founded and is run by professionals from top-notch institutions like{' '}
              <span className={styles.highlight}>IIM, IIT and BIT</span>, on the fundamentals of ensuring the
              highest levels of transparency. Its founding principle is{' '}
              <span className={styles.highlight}>100% use of donor funds</span> towards the specific program,
              ensuring maximum benefit for every rupee funded.
            </motion.p>
            <motion.p variants={itemVariants}>
              All people associated with Paripakv share a common passion towards{' '}
              <span className={styles.highlight}>empowerment via education!</span>
            </motion.p>

            <motion.div 
              className={styles.emailCta}
              variants={itemVariants}
            >
              <a href="mailto:paripakvfoundation@gmail.com" className="btn-primary">
                Contact Us
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

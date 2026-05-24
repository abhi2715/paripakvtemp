'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ParallaxBackground from './ParallaxBackground';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    program: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, program, message } = formData;
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${formData.phone}\nProgram of Interest: ${program}\n\nMessage:\n${message}`;
    window.location.href = `mailto:paripakvfoundation@gmail.com?subject=${encodeURIComponent(subject || 'Paripakv Foundation Enquiry')}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <section className={`${styles.section} section`} id="contact" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      <ParallaxBackground targetRef={ref} image="/images/Extra-image for background.png" opacity={0.15} />
      <div className="max-width" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="section-title-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`section-title ${styles.title}`}>Contact Us</h2>
          <p className={styles.subtitle} style={{ marginTop: '30px' }}>We&rsquo;d love to hear from you. Reach out and we&rsquo;ll respond within 24 hours.</p>
        </motion.div>

        <div className={styles.grid}>
          {/* Info column */}
          <motion.div
            className={styles.infoCol}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <motion.h3 variants={itemVariants}>Get In Touch</motion.h3>
            <motion.p variants={itemVariants}>Whether you want to donate, volunteer, apply for a scholarship, or simply learn more about our work – we are here for you.</motion.p>

            <motion.div className={styles.contactItem} variants={itemVariants}>
              <div className={styles.contactIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8A87C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m2 7 10 6 10-6"/>
                </svg>
              </div>
              <div>
                <span className={styles.contactLabel}>Email</span>
                <a href="mailto:paripakvfoundation@gmail.com" className={styles.contactValue}>
                  paripakvfoundation@gmail.com
                </a>
              </div>
            </motion.div>

            <motion.div className={styles.contactItem} variants={itemVariants}>
              <div className={styles.contactIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8A87C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <span className={styles.contactLabel}>Headquarters</span>
                <span className={styles.contactValue}>India (Pan-India Programs)</span>
              </div>
            </motion.div>

            <motion.div className={styles.contactItem} variants={itemVariants}>
              <div className={styles.contactIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#E8A87C">
                  <path d="M22.23 0H1.77C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.77 24h20.46c.978 0 1.77-.773 1.77-1.729V1.729C24 .774 23.208 0 22.23 0zM7.069 20.452H3.554V9.034h3.515v11.418zM5.312 7.542c-1.127 0-2.041-.912-2.041-2.04 0-1.127.913-2.04 2.041-2.04s2.04.913 2.04 2.04c0 1.128-.913 2.04-2.04 2.04zm15.14 12.91h-3.515v-5.559c0-1.326-.026-3.037-1.848-3.037-1.85 0-2.134 1.445-2.134 2.938v5.658H9.44V9.034h3.373v1.56h.048c.47-.887 1.618-1.821 3.33-1.821 3.563 0 4.223 2.343 4.223 5.39v6.289h-.001z"/>
                </svg>
              </div>
              <div>
                <span className={styles.contactLabel}>Social</span>
                <a href="https://www.linkedin.com/in/paripakv-foundation-753653410/" target="_blank" rel="noreferrer" className={styles.contactValue}>
                  Paripakv Foundation
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Form column */}
          <motion.div
            className={styles.formCol}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          >
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 XXXXXXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="program">Program of Interest</label>
                  <select
                    id="program"
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                  >
                    <option value="">Select a program</option>
                    <option value="Nirmala Bright Scholar">Nirmala Bright Scholar</option>
                    <option value="Samajh">Samajh</option>
                    <option value="Volunteer">Volunteering</option>
                    <option value="Donation">Donation</option>
                    <option value="Mentorship">Mentorship</option>
                    <option value="General">General Enquiry</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject *</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What is your message about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about yourself and how you'd like to connect with Paripakv..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>

              <motion.button
                type="submit"
                className={styles.submitBtn}
                whileHover={{ y: -2, boxShadow: '0 8px 28px rgba(232,168,124,0.4)' }}
                whileTap={{ scale: 0.97 }}
              >
                {submitted ? '✓ Opening Email...' : 'Send Message via Email'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

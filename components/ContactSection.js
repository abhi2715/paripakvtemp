'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
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

  return (
    <section className={`${styles.section} section`} id="contact" ref={ref}>
      <div className="max-width">
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
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
          >
            <h3>Get In Touch</h3>
            <p>Whether you want to donate, volunteer, apply for a scholarship, or simply learn more about our work – we are here for you.</p>

            <div className={styles.contactItem}>
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
            </div>

            <div className={styles.contactItem}>
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
            </div>

            <div className={styles.socialRow}>
              <a
                href="https://github.com/paripakvfoundation"
                target="_blank"
                rel="noreferrer"
                className={styles.socialBtn}
                aria-label="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
            </div>
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

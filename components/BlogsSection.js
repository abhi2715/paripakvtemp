'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TiltCard from './TiltCard';
import ParallaxBackground from './ParallaxBackground';
import Image from 'next/image';
import styles from './BlogsSection.module.css';

import { blogsData } from '../lib/blogsData';

export default function BlogsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Use the static blogs imported from blogsData
  const blogsToDisplay = blogsData;

  return (
    <section className="section" id="blogs" ref={ref} style={{ background: '#f9f4ef', position: 'relative', overflow: 'hidden' }}>
      <ParallaxBackground targetRef={ref} image="/images/background.jpeg" opacity={0.15} />
      <div className="max-width" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="section-title-wrap"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="section-title" style={{ color: '#1d1d1d' }}>Latest Insights</h2>
        </motion.div>

        <motion.div
          className={styles.trackContainer}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className={styles.track}>
            {blogsToDisplay.map((blog, i) => (
              <TiltCard key={i} className={styles.blogCard}>
                <div className={styles.imageWrap}>
                  <Image src={blog.image} alt={blog.title} fill sizes="350px" style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.contentWrap}>
                  <div className={styles.date}>{blog.date}</div>
                  <h3 className={styles.title}>{blog.title}</h3>
                  <p className={styles.excerpt}>{blog.excerpt}</p>
                  <a href={blog.slug ? `/blog/${blog.slug}` : "#blogs"} className={styles.readMore}>Read More →</a>
                </div>
              </TiltCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

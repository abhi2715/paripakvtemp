'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TiltCard from './TiltCard';
import ParallaxBackground from './ParallaxBackground';
import Image from 'next/image';
import styles from './BlogsSection.module.css';

const dummyBlogs = [
  {
    image: '/images/education.jpg',
    date: 'March 12, 2024',
    title: 'The Future of Digital Classrooms in Rural Areas',
    excerpt: 'Exploring how technology is bridging the gap in quality education across remote villages.',
  },
  {
    image: '/images/Dreams-on-Streets.jpg',
    date: 'February 28, 2024',
    title: 'Stories from the Streets: Empowering the Unheard',
    excerpt: 'A deep dive into our on-ground initiatives and the amazing children we meet every day.',
  },
  {
    image: '/images/banner-1-1.jpg',
    date: 'February 15, 2024',
    title: 'Healthcare Initiatives Making a Difference',
    excerpt: 'How our mobile clinics are providing essential medical care to vulnerable communities.',
  },
  {
    image: '/images/image1.jpg',
    date: 'January 30, 2024',
    title: 'Skill Development: A Pathway to Livelihood',
    excerpt: 'Training programs that are transforming the lives of youth and ensuring sustainable futures.',
  },
];

export default function BlogsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Duplicate for seamless loop
  const seamlessBlogs = [...dummyBlogs, ...dummyBlogs, ...dummyBlogs];

  return (
    <section className="section" id="blogs" ref={ref} style={{ background: '#f9f4ef', position: 'relative', overflow: 'hidden' }}>
      <ParallaxBackground targetRef={ref} opacity={0.05} />
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
          <div className={styles.track} style={{ animationPlayState: isInView ? 'running' : 'paused' }}>
            {seamlessBlogs.map((blog, i) => (
              <TiltCard key={i} className={styles.blogCard}>
                <div className={styles.imageWrap}>
                  <Image src={blog.image} alt={blog.title} fill sizes="350px" style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.contentWrap}>
                  <div className={styles.date}>{blog.date}</div>
                  <h3 className={styles.title}>{blog.title}</h3>
                  <p className={styles.excerpt}>{blog.excerpt}</p>
                  <a href="#blogs" className={styles.readMore}>Read More →</a>
                </div>
              </TiltCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

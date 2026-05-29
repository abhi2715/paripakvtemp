'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import TiltCard from './TiltCard';
import ParallaxBackground from './ParallaxBackground';
import Image from 'next/image';
import styles from './BlogsSection.module.css';

import { blogsData } from '../lib/blogsData';

export default function BlogsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Use the static blogs imported from blogsData as initial state
  const [blogsToDisplay, setBlogsToDisplay] = useState(blogsData);

  useEffect(() => {
    fetch('https://paripakv-admin.vercel.app/api/public/blogs', { cache: 'no-store' })
      .then(res => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mappedBlogs = data.map((b) => ({
            slug: b.slug || b._id,
            image: b.coverImage || '/images/Hero section images/image 2.png',
            date: b.publishedAt ? new Date(b.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown Date',
            title: b.title,
            excerpt: b.excerpt || (b.content
              ? b.content
                  .replace(/<[^>]+>/g, ' ')
                  .replace(/&nbsp;/g, ' ')
                  .replace(/&amp;/g, '&')
                  .replace(/&lt;/g, '<')
                  .replace(/&gt;/g, '>')
                  .replace(/&quot;/g, '"')
                  .replace(/&#39;/g, "'")
                  .replace(/\s+/g, ' ')
                  .trim()
                  .substring(0, 150) + '...'
              : 'No excerpt available'),
            content: b.content
          }));
          // Merge API blogs first, then hardcoded ones
          setBlogsToDisplay([...mappedBlogs, ...blogsData]);
        }
      })
      .catch(err => {
        console.warn('Failed to fetch blogs from admin API, falling back to static data:', err);
      });
  }, []);

  return (
    <section className="section" id="blogs" ref={ref} style={{ background: 'var(--dark-mid)', position: 'relative', overflow: 'hidden' }}>
      <ParallaxBackground targetRef={ref} image="/images/Hero section images/image 4.png" opacity={0.15} />
      <div className="max-width" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="section-title-wrap"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="section-title" style={{ color: 'var(--white)' }}>Latest Insights</h2>
        </motion.div>

        <motion.div
          className={styles.trackContainer}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className={blogsToDisplay.length > 3 ? styles.marqueeInner : styles.staticInner}>
            {/* First Set (Always Rendered) */}
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
            {/* Duplicate Set for Seamless Loop (Only when animating) */}
            {blogsToDisplay.length > 3 && (
              <div className={styles.track} aria-hidden="true">
                {blogsToDisplay.map((blog, i) => (
                  <TiltCard key={`dup-${i}`} className={styles.blogCard}>
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
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

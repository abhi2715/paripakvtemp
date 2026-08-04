'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import TiltCard from './TiltCard';
import ParallaxBackground from './ParallaxBackground';
import Image from 'next/image';
import styles from './BlogsSection.module.css';

import { blogsData } from '../lib/blogsData';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mql.matches);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);
  return isMobile;
}

export default function BlogsSection() {
  const ref = useRef(null);
  const scrollRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const autoScrollPaused = useRef(false);
  const pauseTimeout = useRef(null);

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
            image: b.coverImage || '/images/Hero section images/image 2.webp',
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

  // ── Auto-scroll on mobile ──
  const scrollToIndex = useCallback((index) => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll('[data-blog-card]');
    if (!cards[index]) return;
    const card = cards[index];
    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const scrollLeft = card.offsetLeft - (containerRect.width / 2) + (cardRect.width / 2);
    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!isMobile || blogsToDisplay.length <= 1) return;

    const interval = setInterval(() => {
      if (autoScrollPaused.current) return;
      setActiveIndex(prev => {
        const next = (prev + 1) % blogsToDisplay.length;
        scrollToIndex(next);
        return next;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isMobile, blogsToDisplay.length, scrollToIndex]);

  // Pause auto-scroll on user touch, resume 5s after release
  const handleTouchStart = useCallback(() => {
    autoScrollPaused.current = true;
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => {
      autoScrollPaused.current = false;
    }, 5000);
  }, []);

  // Update activeIndex from manual scroll position
  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll('[data-blog-card]');
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIdx = 0;
    let closestDist = Infinity;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(containerCenter - cardCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i;
      }
    });
    setActiveIndex(closestIdx);
  }, []);

  return (
    <section className="section" id="blogs" ref={ref} style={{ background: 'var(--dark-mid)', position: 'relative', overflowX: 'clip', overflowY: 'hidden' }}>
      <ParallaxBackground targetRef={ref} image="/images/Hero section images/image 4.webp" opacity={0.15} />
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
          ref={scrollRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          onTouchStart={isMobile ? handleTouchStart : undefined}
          onTouchEnd={isMobile ? handleTouchEnd : undefined}
          onScroll={isMobile ? handleScroll : undefined}
        >
          <div className={!isMobile && blogsToDisplay.length > 3 ? styles.marqueeInner : styles.staticInner}>
            {/* First Set (Always Rendered) */}
            <div className={styles.track}>
              {blogsToDisplay.map((blog, i) => {
                const CardWrapper = isMobile ? 'div' : TiltCard;
                return (
                  <CardWrapper key={i} className={styles.blogCard} data-blog-card>
                    <div className={styles.imageWrap}>
                      <Image src={blog.image} alt={blog.title} fill sizes="(max-width: 768px) 75vw, 350px" style={{ objectFit: 'cover' }} />
                    </div>
                    <div className={styles.contentWrap}>
                      <div className={styles.date}>{blog.date}</div>
                      <h3 className={styles.title}>{blog.title}</h3>
                      <p className={styles.excerpt}>{blog.excerpt}</p>
                      <a href={blog.slug ? `/blog/${blog.slug}` : "#blogs"} className={styles.readMore}>Read More →</a>
                    </div>
                  </CardWrapper>
                );
              })}
            </div>
            {/* Duplicate Set for Seamless Loop (Only on desktop with many blogs) */}
            {!isMobile && blogsToDisplay.length > 3 && (
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

        {/* Dot indicators (mobile only) */}
        {isMobile && blogsToDisplay.length > 1 && (
          <div className={styles.dots}>
            {blogsToDisplay.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                onClick={() => { scrollToIndex(i); setActiveIndex(i); }}
                aria-label={`Go to blog ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

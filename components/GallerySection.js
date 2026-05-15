'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './GallerySection.module.css';

const galleryItems = [
  { src: '/images/Dreams-on-Streets.jpg', text: 'Street Education' },
  { src: '/images/MASK-1.jpg', text: 'Health & Safety' },
  { src: '/images/banner-1-1.jpg', text: 'Community Building' },
  { src: '/images/education.jpg', text: 'Quality Learning' },
  { src: '/images/image1.jpg', text: 'Skill Development' },
  { src: '/images/images.jpeg', text: 'Empowering Youth' },
];

function GalleryCard({ item, onClick }) {
  return (
    <div className={styles.card} onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className={styles.imageWrap}>
        <Image src={item.src} alt={item.text} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
        <div className={styles.overlay} />
      </div>
      <div className={styles.textWrap}>
        <h3>{item.text}</h3>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const ref = useRef(null);
  
  // Parallax effect for the section background
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

  return (
    <section className="section" id="gallery" style={{ background: '#1d1d1d', position: 'relative', overflow: 'hidden' }} ref={ref}>
      <motion.div 
        style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundImage: 'url(/images/background.jpeg)', 
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.05,
          y 
        }} 
      />
      <div className="max-width" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-title-wrap">
          <h2 className="section-title" style={{ color: '#E8A87C' }}>Impact in Action</h2>
        </div>
        <div className={styles.grid}>
          {galleryItems.map((item, i) => (
            <GalleryCard key={i} item={item} onClick={() => setSelectedImage(item)} />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className={styles.lightboxContent}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={() => setSelectedImage(null)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>
              <div className={styles.lightboxImageWrap}>
                <Image src={selectedImage.src} alt={selectedImage.text} fill style={{ objectFit: 'contain' }} />
              </div>
              <div className={styles.lightboxText}>
                <h3>{selectedImage.text}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

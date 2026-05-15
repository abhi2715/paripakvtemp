'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#founders', label: 'Founders' },
  { href: '#nirmala', label: 'Nirmala Bright Scholar' },
  { href: '#samajh', label: 'Samajh' },
  { href: '#get-involved', label: 'Get Involved' },
  { href: '#contact', label: 'Contact Us' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);

    // Active link highlighting
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(`#${entry.target.id}`);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is in top half
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = navLinks.map((link) => document.querySelector(link.href)).filter(Boolean);
    sections.forEach((sec) => observer.observe(sec));

    return () => {
      window.removeEventListener('scroll', onScroll);
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  const handleLinkClick = (href) => {
    setActiveLink(href);
    setMenuOpen(false);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <a href="#home" className={styles.logo}>
          <Image src="/images/logo.png" alt="Paripakv Foundation" width={52} height={52} priority />
          <span className={styles.logoText}>Paripakv</span>
        </a>

        {/* Desktop Menu */}
        <ul className={styles.menu}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`${styles.link} ${activeLink === link.href ? styles.active : ''}`}
                onClick={() => handleLinkClick(link.href)}
              >
                <span className={styles.linkText}>{link.label}</span>
                <span className={styles.linkUnderline} />
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
          >
            <ul>
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <a
                    href={link.href}
                    className={styles.mobileLink}
                    onClick={() => handleLinkClick(link.href)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

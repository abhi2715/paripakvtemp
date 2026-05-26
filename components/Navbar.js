'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#founders', label: 'Founders' },
  { href: '#nirmala', label: 'निर्मला Bright Scholars' },
  { href: '#samajh', label: 'समझ' },
  { href: '#get-involved', label: 'Get Involved' },
  { href: '#contact', label: 'Contact Us' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.map(link => document.querySelector(link.href)).filter(Boolean);
      let currentActive = '';

      sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        // The last section whose top is above the middle of the viewport becomes active
        if (rect.top <= window.innerHeight / 2) {
          currentActive = `#${sec.id}`;
        }
      });

      if (currentActive) {
        setActiveLink(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
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

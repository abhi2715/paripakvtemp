'use client';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Image src="/images/logo.png" alt="Paripakv Foundation" width={52} height={52} className={styles.logo} />
          <div>
            <div className={styles.name}>Paripakv Foundation</div>
            <div className={styles.tagline}>Empowering Education. Transforming Lives.</div>
          </div>
        </div>

        <div className={styles.links}>
          {[
            { label: 'About', href: '#about' },
            { label: 'Founders', href: '#founders' },
            { label: 'निर्मला Bright Scholars', href: '#nirmala' },
            { label: 'समझ', href: '#samajh' },
            { label: 'Get Involved', href: '#get-involved' },
            { label: 'Contact', href: '#contact' },
          ].map((l) => (
            <a key={l.href} href={l.href} className={styles.link}>
              {l.label}
            </a>
          ))}
        </div>

        <div className={styles.right}>
          <a href="mailto:paripakvfoundation@gmail.com" className={styles.emailLink}>
            paripakvfoundation@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/paripakv-foundation-753653410/"
            target="_blank"
            rel="noreferrer"
            className={styles.ghLink}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.23 0H1.77C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.77 24h20.46c.978 0 1.77-.773 1.77-1.729V1.729C24 .774 23.208 0 22.23 0zM7.069 20.452H3.554V9.034h3.515v11.418zM5.312 7.542c-1.127 0-2.041-.912-2.041-2.04 0-1.127.913-2.04 2.041-2.04s2.04.913 2.04 2.04c0 1.128-.913 2.04-2.04 2.04zm15.14 12.91h-3.515v-5.559c0-1.326-.026-3.037-1.848-3.037-1.85 0-2.134 1.445-2.134 2.938v5.658H9.44V9.034h3.373v1.56h.048c.47-.887 1.618-1.821 3.33-1.821 3.563 0 4.223 2.343 4.223 5.39v6.289h-.001z"/>
            </svg>
            LinkedIn
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>&copy; {new Date().getFullYear()} Paripakv Foundation. All rights reserved.</span>
        <span>Disclaimer: Images used on this website are AI-generated for illustrative purposes.</span>
      </div>
    </footer>
  );
}

import { Inter, Noto_Serif_Devanagari, Outfit, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const notoSerifDevanagari = Noto_Serif_Devanagari({ subsets: ['devanagari'], variable: '--font-noto-serif', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const metadata = {
  title: 'Paripakv Foundation – Empowering Through Education',
  description:
    'Paripakv Foundation is a Section 8 company providing quality education to underprivileged students through targeted intervention programs across India.',
  keywords: 'Paripakv, NGO, education, scholarship, India, empowerment, Nirmala Bright Scholar, Samajh',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSerifDevanagari.variable} ${outfit.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}

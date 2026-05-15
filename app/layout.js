import './globals.css';

export const metadata = {
  title: 'Paripakv Foundation – Empowering Through Education',
  description:
    'Paripakv Foundation is a Section 8 company providing quality education to underprivileged students through targeted intervention programs across India.',
  keywords: 'Paripakv, NGO, education, scholarship, India, empowerment, Nirmala Bright Scholar, Samajh',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}

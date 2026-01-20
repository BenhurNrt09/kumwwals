import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kumwals - Çocuklar İçin Eğlenceli Kum Oyun Alanı ve Atölye",
  description: "Kumwals, çocukların yaratıcılıklarını geliştirdikleri, hijyenik ve güvenli bir kum oyun alanı ve çocuk atölyesidir.",
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Baloo+2:wght@400..800&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />

        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/fontawesome.min.css" />
        <link rel="stylesheet" href="/assets/css/magnific-popup.min.css" />
        <link rel="stylesheet" href="/assets/css/swiper-bundle.css" />
        <link rel="stylesheet" href="/assets/css/animate.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

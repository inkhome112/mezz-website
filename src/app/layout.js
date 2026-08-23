import './globals.css';

export const metadata = {
  title: 'Mezz Group | Innovative Melbourne Architectural & Property Development Firm',
  description: 'Mezz Group is an innovative Melbourne-based architectural and property development studio specializing in luxury residential townhouses, commercial spaces, and hospitality venues.',
  keywords: 'Mezz Group, Architecture Melbourne, Property Development, Luxury Townhouses, Glen Iris, Malvern East, Ashburton, Commercial Fitout',
  openGraph: {
    title: 'Mezz Group | Architectural & Property Development Studio',
    description: 'Elevating spaces with contemporary sophistication, thoughtful design, and timeless craftsmanship.',
    url: 'https://mezzgroup.com.au',
    siteName: 'Mezz Group',
    images: [
      {
        url: 'https://www.mezzgroup.com.au/wp-content/uploads/2022/05/ivori-living-closeup-5K-edited.jpg',
        width: 1600,
        height: 1200,
        alt: 'Mezz Group Architectural Portfolio',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0A0A0B] text-[#F7F6F2] antialiased min-h-screen flex flex-col selection:bg-[#C5A880] selection:text-[#0A0A0B]">
        {children}
      </body>
    </html>
  );
}

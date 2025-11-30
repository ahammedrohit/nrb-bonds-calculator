import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  structuredData?: object;
}

const DEFAULT_KEYWORDS = 'NRB bond calculator, Bangladesh diaspora bond, WEDB calculator, wage earner development bond, US dollar investment bond, USDIB, USDPB, US dollar premium bond, Bangladesh government bond, expatriate investment Bangladesh, NRB investment, remittance investment Bangladesh, non-resident Bangladeshi bonds, Bangladesh Bank bonds, tax-free investment Bangladesh';

const SITE_NAME = 'NRB Bond Calculator';
const SITE_URL = 'https://nrb.kwaski.tech';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const Layout = ({ 
  children, 
  title, 
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  structuredData
}: LayoutProps) => {
  const pageTitle = title 
    ? `${title} | ${SITE_NAME}` 
    : `${SITE_NAME} | Bangladesh Diaspora Bond Investment Calculator`;
  
  const pageDescription = description || 
    'Free online calculator for Bangladesh NRB Bonds - Wage Earner Development Bond (WEDB) with up to 12% returns, US Dollar Investment Bond (USDIB), and US Dollar Premium Bond (USDPB). Calculate your investment returns with official 2024 rates.';

  const pageKeywords = keywords || DEFAULT_KEYWORDS;
  const pageUrl = canonicalUrl || SITE_URL;
  const pageOgImage = ogImage || DEFAULT_OG_IMAGE;

  // Default structured data for the website
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': SITE_NAME,
    'description': pageDescription,
    'url': SITE_URL,
    'applicationCategory': 'FinanceApplication',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'author': {
      '@type': 'Organization',
      'name': 'NRB Bond Calculator'
    }
  };

  const jsonLd = structuredData || defaultStructuredData;

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="author" content="NRB Bond Calculator" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageOgImage} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageOgImage} />
        
        {/* Additional SEO */}
        <meta name="theme-color" content="#059669" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
        
        {/* Geo Tags for Bangladesh */}
        <meta name="geo.region" content="BD" />
        <meta name="geo.country" content="Bangladesh" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      <Header />
      <main className="flex-1 pt-16 md:pt-18">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

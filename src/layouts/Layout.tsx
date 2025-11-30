import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export const Layout = ({ children, title, description }: LayoutProps) => {
  const pageTitle = title 
    ? `${title} | NRB Bond Calculator` 
    : 'NRB Bond Calculator | Bangladesh Diaspora Bond Investment Calculator';
  
  const pageDescription = description || 
    'Calculate returns on Bangladesh NRB Bonds - Wage Earner Development Bond (WEDB), US Dollar Investment Bond (USDIB), and US Dollar Premium Bond (USDPB). Free online calculator with official rates.';

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
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

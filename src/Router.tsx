import { HomePage } from '@/pages/Home/HomePage';
import { AboutPage } from '@/pages/About/AboutPage';
import { BondsPage } from '@/pages/Bonds/BondsPage';
import { GuidelinesPage } from '@/pages/Guidelines/GuidelinesPage';
import { FAQPage } from '@/pages/FAQ/FAQPage';
import { GlossaryPage } from '@/pages/Glossary/GlossaryPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/bonds" element={<BondsPage />} />
        <Route path="/guidelines" element={<GuidelinesPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
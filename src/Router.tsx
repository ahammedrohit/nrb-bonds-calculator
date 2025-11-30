import { HomePage } from '@/pages/Home/HomePage';
import { BondsPage } from '@/pages/Bonds/BondsPage';
import { GuidelinesPage } from '@/pages/Guidelines/GuidelinesPage';
import { FAQPage } from '@/pages/FAQ/FAQPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bonds" element={<BondsPage />} />
        <Route path="/guidelines" element={<GuidelinesPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </BrowserRouter>
  );
}
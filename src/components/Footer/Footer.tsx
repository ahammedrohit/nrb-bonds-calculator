import { NavLink } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-400">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">NRB</span>
              </div>
              <span className="font-display font-semibold text-white">Bond Calculator</span>
            </div>
            <p className="text-sm leading-relaxed">
              Calculate returns on Bangladesh Diaspora Bonds. Free, accurate, and always up-to-date with official rates.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <NavLink to="/" className="text-sm hover:text-white transition-colors">
                  Calculator
                </NavLink>
              </li>
              <li>
                <NavLink to="/bonds" className="text-sm hover:text-white transition-colors">
                  Bond Types
                </NavLink>
              </li>
              <li>
                <NavLink to="/guidelines" className="text-sm hover:text-white transition-colors">
                  Investment Guide
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" className="text-sm hover:text-white transition-colors">
                  FAQ
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Bond Types */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Bond Types</h4>
            <ul className="space-y-3">
              <li>
                <NavLink to="/bonds#wedb" className="text-sm hover:text-white transition-colors">
                  Wage Earner Development Bond
                </NavLink>
              </li>
              <li>
                <NavLink to="/bonds#usdib" className="text-sm hover:text-white transition-colors">
                  US Dollar Investment Bond
                </NavLink>
              </li>
              <li>
                <NavLink to="/bonds#usdpb" className="text-sm hover:text-white transition-colors">
                  US Dollar Premium Bond
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Official Resources */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Official Resources</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.bb.org.bd/en/index.php/Investfacility/nrbbond"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  Bangladesh Bank
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.bb.org.bd/en/index.php/investfacility/wedbond"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  WEDB Official Page
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.bb.org.bd/en/index.php/investfacility/investbond"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  USDIB Official Page
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              © {currentYear} NRB Bond Calculator. For informational purposes only.
            </p>
            <p className="text-xs text-neutral-500">
              Rates subject to change. Always verify with official sources.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

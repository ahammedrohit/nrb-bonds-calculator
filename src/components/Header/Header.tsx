import { ReactNode, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface HeaderProps {
  children?: ReactNode;
}

const navigation = [
  { name: 'Calculator', href: '/' },
  { name: 'Bond Types', href: '/bonds' },
  { name: 'Guidelines', href: '/guidelines' },
  { name: 'FAQ', href: '/faq' },
];

export const Header = ({ }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-neutral-200/50 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span className="text-white font-display font-bold text-sm">NRB</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-semibold text-neutral-900">Bond Calculator</span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-brand-700 bg-brand-50'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://www.bb.org.bd/en/index.php/Investfacility/nrbbond"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Official Info
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200/50 animate-slide-down">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? 'text-brand-700 bg-brand-50'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              <a
                href="https://www.bb.org.bd/en/index.php/Investfacility/nrbbond"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-2 justify-center"
              >
                Official Info
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

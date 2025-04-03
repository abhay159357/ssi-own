
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X, User, Shield, Wallet, Home } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: <Home className="h-4 w-4 mr-2" /> },
    { path: '/dashboard', label: 'Dashboard', icon: <Shield className="h-4 w-4 mr-2" /> },
    { path: '/wallet', label: 'My Wallet', icon: <Wallet className="h-4 w-4 mr-2" /> },
    { path: '/verify-identity', label: 'Verify Identity', icon: <Shield className="h-4 w-4 mr-2" /> },
    { path: '/profile', label: 'Profile', icon: <User className="h-4 w-4 mr-2" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-semibold text-xl text-primary">
            Identity Hub
          </Link>
          
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`px-3 py-2 text-sm rounded-md flex items-center ${
                  location.pathname === link.path ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-background border-b shadow-lg">
          <nav className="container py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`px-4 py-3 rounded-md flex items-center ${
                  location.pathname === link.path ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;


import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Wallet, 
  FileText, 
  Scan, 
  User, 
  Menu, 
  X,
  Shield,
  ShieldAlert,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/shared/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const navLinks = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Wallet', path: '/wallet', icon: Wallet },
    { name: 'Add Credential', path: '/add-credential', icon: FileText },
    { name: 'Verify', path: '/verification', icon: Scan },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Admin', path: '/admin', icon: ShieldAlert },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={cn(
      "sticky top-0 z-40 w-full transition-all duration-300",
      scrolled 
        ? "bg-white/90 dark:bg-black/60 backdrop-blur-lg shadow-sm" 
        : "bg-white/60 dark:bg-black/20 backdrop-blur-md"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold tracking-tight">Identity Hub</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Main navigation */}
                {navLinks.slice(0, 4).map((link) => (
                  <NavigationMenuItem key={link.path}>
                    <Link to={link.path}>
                      <NavigationMenuLink
                        className={cn(
                          "flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                          isActive(link.path)
                            ? "bg-secondary text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                        )}
                      >
                        <link.icon className="h-4 w-4" />
                        <span>{link.name}</span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
                
                {/* Account dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="flex items-center space-x-1 px-3 py-2 text-sm font-medium">
                    <User className="h-4 w-4 mr-1" />
                    <span>Account</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-1 p-2">
                      {navLinks.slice(4).map((link) => (
                        <li key={link.path}>
                          <Link to={link.path}>
                            <NavigationMenuLink
                              className={cn(
                                "flex w-full items-center space-x-2 rounded-md p-2 text-sm hover:bg-secondary/80",
                                isActive(link.path) && "bg-secondary"
                              )}
                            >
                              <link.icon className="h-4 w-4" />
                              <span>{link.name}</span>
                            </NavigationMenuLink>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <div className="ml-3">
              <ThemeToggle />
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/70 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden glass-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? 'bg-secondary text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/70'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

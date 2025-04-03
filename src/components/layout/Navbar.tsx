
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
  ChevronDown,
  LogOut,
  Settings,
  CreditCard
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const travelerNavLinks = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Wallet', path: '/wallet', icon: Wallet },
    { name: 'Add Credential', path: '/add-credential', icon: FileText },
    { name: 'Verify', path: '/verification', icon: Scan },
  ];
  
  const authorityNavLinks = [
    { name: 'Admin Dashboard', path: '/admin', icon: ShieldAlert },
  ];
  
  const accountLinks = [
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
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
  const isAdminPage = location.pathname.startsWith('/admin');

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
                {/* Dashboard Type Selector */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="flex items-center space-x-1 px-3 py-2 text-sm font-medium">
                    <Shield className="h-4 w-4 mr-1" />
                    <span>{isAdminPage ? "Authority" : "Traveler"}</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-1 p-2">
                      <li>
                        <Link to="/">
                          <NavigationMenuLink
                            className={cn(
                              "flex w-full items-center space-x-2 rounded-md p-2 text-sm hover:bg-secondary/80",
                              !isAdminPage && "bg-secondary"
                            )}
                          >
                            <CreditCard className="h-4 w-4" />
                            <span>Traveler Dashboard</span>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin">
                          <NavigationMenuLink
                            className={cn(
                              "flex w-full items-center space-x-2 rounded-md p-2 text-sm hover:bg-secondary/80",
                              isAdminPage && "bg-secondary"
                            )}
                          >
                            <ShieldAlert className="h-4 w-4" />
                            <span>Authority Dashboard</span>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                {/* Main navigation links based on current dashboard */}
                {(isAdminPage ? authorityNavLinks : travelerNavLinks).map((link) => (
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
              </NavigationMenuList>
            </NavigationMenu>
            
            <div className="ml-3 flex items-center space-x-2">
              <ThemeToggle />
              
              {/* User Account Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-secondary text-muted-foreground">
                      <User className="h-4 w-4" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {accountLinks.map((link) => (
                    <DropdownMenuItem key={link.path} asChild>
                      <Link to={link.path} className="flex items-center">
                        <link.icon className="mr-2 h-4 w-4" />
                        <span>{link.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
              <div className="border-b border-border pb-2 mb-2">
                <p className="px-3 py-2 text-sm font-medium text-muted-foreground">Switch Dashboard</p>
                <Link
                  to="/"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium ${
                    !isAdminPage ? 'bg-secondary text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/70'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Traveler Dashboard</span>
                </Link>
                <Link
                  to="/admin"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium ${
                    isAdminPage ? 'bg-secondary text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/70'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShieldAlert className="h-5 w-5" />
                  <span>Authority Dashboard</span>
                </Link>
              </div>
              
              <div className="border-b border-border pb-2 mb-2">
                <p className="px-3 py-2 text-sm font-medium text-muted-foreground">
                  {isAdminPage ? "Authority Navigation" : "Traveler Navigation"}
                </p>
                {(isAdminPage ? authorityNavLinks : travelerNavLinks).map((link) => (
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
              
              <div>
                <p className="px-3 py-2 text-sm font-medium text-muted-foreground">Account</p>
                {accountLinks.map((link) => (
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
                <Link
                  to="/logout"
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Log out</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;


import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  UserCheck, 
  FileCheck, 
  LockKeyhole, 
  Globe, 
  Fingerprint,
  ChevronRight,
  User,
  Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="w-full overflow-auto">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/5 overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Shield className="h-24 w-24 text-primary" />
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute inset-0 h-24 w-24 bg-primary/10 rounded-full -z-10"
              />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight gradient-text mb-6">
            Sovereign Identity Hub
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12">
            A secure platform for managing and verifying digital identity credentials across borders
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="gap-2 text-lg px-8">
                <User className="h-5 w-5" />
                <span>Traveler Dashboard</span>
                <ChevronRight className="h-4 w-4 ml-1 opacity-70" />
              </Button>
            </Link>
            
            <Link to="/admin">
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 text-lg px-8 border-2"
              >
                <Building className="h-5 w-5" />
                <span>Authority Dashboard</span>
                <ChevronRight className="h-4 w-4 ml-1 opacity-70" />
              </Button>
            </Link>
          </div>
        </motion.div>
        
        <div className="absolute bottom-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-background fill-current">
            <path fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,229.3C672,224,768,192,864,186.7C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              How It Works
            </motion.h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform streamlines identity verification with secure, blockchain-backed digital credentials
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: UserCheck,
                title: "Identity Issuance",
                description: "Authorities issue tamper-proof digital credentials that citizens store in their secure digital wallet"
              },
              {
                icon: FileCheck,
                title: "Secure Storage",
                description: "Credentials are cryptographically secured and controlled entirely by the individual"
              },
              {
                icon: LockKeyhole,
                title: "Instant Verification",
                description: "Present only the required credentials for instant verification without revealing unnecessary data"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="glass-card h-full">
                  <CardContent className="pt-6">
                    <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mb-6 mx-auto">
                      <item.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-3 text-center">{item.title}</h3>
                    <p className="text-muted-foreground text-center">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="relative rounded-2xl overflow-hidden glass-card p-1">
            <div className="rounded-xl overflow-hidden bg-secondary/50 p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Trusted, Verified, Sovereign</h3>
                  <ul className="space-y-4">
                    {[
                      { icon: Globe, text: "Cross-border identity verification without compromising privacy" },
                      { icon: Shield, text: "Military-grade encryption keeps your credentials secure" },
                      { icon: Fingerprint, text: "Biometric protection ensures only you can access your data" }
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + (index * 0.1), duration: 0.4 }}
                        className="flex items-start"
                      >
                        <div className="bg-primary/10 rounded-full p-2 mr-4 mt-0.5">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <span>{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div className="relative rounded-xl overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=fotis-fotopoulos-DuHKoV44prg-unsplash.jpg" 
                      alt="Digital Identity Technology" 
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-sm font-medium">Powered by blockchain and zero-knowledge cryptography</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* User Journeys Section */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Choose Your Journey
            </motion.h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access the dashboard that matches your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass-card overflow-hidden h-full border-primary/10 hover:shadow-lg hover:border-primary/20 transition-all">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold">Traveler Dashboard</h3>
                      <User className="h-10 w-10 text-white/80" />
                    </div>
                    <p className="text-white/90">For individuals managing their digital identity credentials</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <ul className="space-y-3">
                      {["Store all your credentials securely", "Share only what's needed for verification", "Control your digital identity"].map((text, i) => (
                        <li key={i} className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/wallet" className="block mt-6">
                      <Button size="lg" className="w-full">
                        Access Traveler Dashboard
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="glass-card overflow-hidden h-full border-primary/10 hover:shadow-lg hover:border-primary/20 transition-all">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-violet-600 to-violet-800 p-6 text-white">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold">Authority Dashboard</h3>
                      <Building className="h-10 w-10 text-white/80" />
                    </div>
                    <p className="text-white/90">For governments and organizations that issue and verify credentials</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <ul className="space-y-3">
                      {["Issue tamper-proof digital credentials", "Verify documents instantly", "Manage credential types and schemas"].map((text, i) => (
                        <li key={i} className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/admin" className="block mt-6">
                      <Button variant="outline" size="lg" className="w-full border-2">
                        Access Authority Dashboard
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-muted/30 py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-6 md:mb-0">
              <Shield className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-semibold">Sovereign Identity Hub</span>
            </div>
            
            <div>
              <p className="text-muted-foreground text-center md:text-right">
                © {new Date().getFullYear()} Sovereign Identity Hub. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

'use client';

import { LogoFacebook, LogoLinkedin } from '@gravity-ui/icons';
import { Mail, MapPin, Phone, X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-mint via-mint/50 to-background mt-20 pt-16 overflow-hidden border-t border-primary/10">
      
      {}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/images/recipehub_logo_2.png"
                width={160}
                height={56}
                alt="RecipeHub Logo"
                className="object-contain"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Your premium destination for discovering, sharing, and creating delicious healthy recipes. Join our community and elevate your everyday cooking.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="p-2.5 bg-white text-primary rounded-full hover:bg-primary hover:text-white shadow-sm hover:shadow-md transition-all duration-300">
                <LogoFacebook size={18} />
              </a>
              <a href="#" className="p-2.5 bg-white text-primary rounded-full hover:bg-primary hover:text-white shadow-sm hover:shadow-md transition-all duration-300">
                <X size={18} />
              </a>
              <a href="#" className="p-2.5 bg-white text-primary rounded-full hover:bg-primary hover:text-white shadow-sm hover:shadow-md transition-all duration-300">
                <LogoLinkedin size={18} />
              </a>
            </div>
          </div>

          {}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground">Explore</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="text-primary/0 group-hover:text-primary transition-colors -ml-4 group-hover:ml-0" /> Home
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="text-primary/0 group-hover:text-primary transition-colors -ml-4 group-hover:ml-0" /> Browse Recipes
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="text-primary/0 group-hover:text-primary transition-colors -ml-4 group-hover:ml-0" /> My Profile
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="text-primary/0 group-hover:text-primary transition-colors -ml-4 group-hover:ml-0" /> About Us
                </Link>
              </li>
            </ul>
          </div>

          {}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground">Contact Us</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>1/a, Dhanmondi, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+88 100 000 1445</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span>support@recipehub.com</span>
              </li>
            </ul>
          </div>

          {}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground">Newsletter</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Subscribe to get the latest recipe updates and cooking tips delivered to your inbox.
            </p>
            <form className="flex flex-col space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-3 rounded-xl bg-white border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                required
              />
              <button 
                type="submit" 
                className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary/90 shadow-sm hover:shadow-md transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>
      </div>

      {}
      <div className="border-t border-primary/10 bg-mint/50 py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} RecipeHub. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
'use client'
import React from 'react';
import NavLink from './NavLinks';
import Image from 'next/image';
import Link from 'next/link';
import { ToggolBtn } from './ToggolBtn';
import { MobileNavbar } from './MobileNavbar';


import { authClient } from '@/lib/auth-client';
import { Button } from '@heroui/react';

const Navbar =  ({user})  => {
 
  const navLinks = [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'Browse Recipes',
      href: '/recipes'
    },

  ]
  if(user){
    navLinks.push({
      label: 'Dashboard',
      href: `/${user.role}Dashboard`,
      
    })
  }
  return (
    <header className="sticky top-0 z-50 w-full bg-surface/80 backdrop-blur-xl border-b border-border/40 shadow-xs transition-all duration-300">
      <div className='flex justify-between items-center w-11/12 mx-auto gap-2 sm:gap-4 py-3 px-2'>
        <div className='block md:hidden flex-shrink-0'>
            <MobileNavbar navLinks={navLinks} />
        </div>
      
        <div className='flex-shrink-0'>
          <Link href={'/'} className="flex items-center gap-2">
            <Image
              src={'/images/recipehub_logo_2.png'}
              height={100}
              width={500}
              alt='RecipeHub'
              className='h-12 w-auto object-contain transition-transform hover:scale-105'
            />
          </Link>
        </div>
        
        <nav className='space-x-1 hidden md:flex items-center bg-slate-50/80 dark:bg-slate-800/50 px-1.5 py-1 rounded-xl border border-slate-200/60 dark:border-slate-700/50 shadow-[0_1px_3px_rgba(99,102,241,0.06)]'>
            {navLinks.map( ({label, href}) => <NavLink key={href} label={label} href={href}></NavLink> )} 
        </nav>
        
        <div className='flex gap-3 sm:gap-4 items-center justify-center flex-shrink-0'>
          {user ? 
              <div className='hidden md:flex space-x-3 items-center justify-center'>
                <Link 
                  className='text-foreground/80 hover:text-primary font-medium text-sm transition-colors' 
                  href={'/profile'}
                >
                  Profile
                </Link>
                <button 
                  className='bg-mint text-mint-foreground px-5 py-2 rounded-xl font-medium text-sm hover:bg-primary hover:text-white transition-all duration-300 shadow-sm border border-primary/10' 
                  onClick={async() => {
                    await authClient.signOut();
                    window.location.href = '/signin';
                  }} 
                >
                  Sign Out
                </button>
              </div>
          :
          <div className='hidden md:flex items-center space-x-3'>
            <Link 
              className='text-foreground/80 hover:text-primary font-medium text-sm transition-colors' 
              href={'/signin'}
            >
              Log in
            </Link>
            <Link 
              className='bg-primary px-5 py-2 rounded-xl font-semibold text-sm text-white hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300 border border-primary/10' 
              href={'/signup'}
            >
              Sign up
            </Link>
          </div>
          }
          {}
          <ToggolBtn></ToggolBtn>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
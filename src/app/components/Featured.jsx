'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RecipeCardFeatured from './RecipeCardFeatured';

const Featured = ({ recipes = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);  
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);  
      } else {
        setVisibleCount(3);  
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  useEffect(() => {
    if (recipes.length <= visibleCount) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % recipes.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [recipes.length, visibleCount]);

  
  const getVisibleRecipes = () => {
    if (recipes.length === 0) return [];
    const visibleItems = [];
    for (let i = 0; i < visibleCount; i++) {
      visibleItems.push(recipes[(currentIndex + i) % recipes.length]);
    }
    return visibleItems;
  };

  if (!recipes || recipes.length === 0) return null;

  return (
    <div className="w-full py-10 overflow-hidden bg-gradient-to-b from-transparent to-amber-50/20">
      
      {}
      <div className="text-center mb-10 space-y-2">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary"
        >
          Featured Recipes
        </motion.h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="h-1 bg-amber-500 mx-auto rounded-full"
        />
      </div>

      {}
      <div className="max-w-7xl mx-auto px-4 relative">
        <div 
          className="grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${visibleCount}, minmax(0, 1fr))`
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {getVisibleRecipes().map((recipe, index) => (
              <motion.div
                
                key={`${recipe._id}-${currentIndex}-${index}`}
                layout
                initial={{ opacity: 0, x: 100 }} 
                animate={{ opacity: 1, x: 0 }}    
                exit={{ opacity: 0, x: -100 }}   
                transition={{ 
  ease: "easeInOut", 
  duration: 0.8     
}}
                className="w-full h-full"
              >
                <div className="hover:scale-[1.02] transition-transform duration-300 h-full">
                  <RecipeCardFeatured recipe={recipe} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Featured;
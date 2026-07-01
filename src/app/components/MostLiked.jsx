"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Heart } from "lucide-react";
import Image from "next/image";

const MostLiked = ({ recipes }) => {
  if (!recipes || recipes.length === 0) return null;

  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case "easy":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "medium":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "hard":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 bg-background text-foreground">
      {}
      <div className="text-center mb-12 space-y-3">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary"
        >
          Our Most Liked Recipes
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="h-1 bg-primary mx-auto rounded-full"
        />
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          Discover the most beloved recipes by our community
        </p>
      </div>

      {}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {recipes.map((recipe, index) => (
          <motion.div
            key={recipe._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <Link
              href={`/recipes/${recipe._id}`}
              className="group block bg-surface rounded-2xl border border-border shadow-soft overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-hover"
            >
              {}
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={
                    recipe.recipeImage ||
                    "https://images.unsplash.com/photo-1633945274405-b6c8069047b0"
                  }
                  alt={recipe.recipeName}
                  width={600}
                  height={338}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {}
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-primary bg-mint/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                  {recipe.category}
                </span>

                {}
                <span className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-semibold text-rose-500 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                  <Heart size={12} fill="currentColor" />
                  {recipe.likesCount || 0}
                </span>
              </div>

              {}
              <div className="p-4 md:p-5 space-y-3">
                {}
                <h3 className="font-bold text-base md:text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {recipe.recipeName}
                </h3>

                {}
                {(recipe.shortDescription || recipe.description) && (
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {recipe.shortDescription || recipe.description}
                  </p>
                )}

                {}
                <p className="text-xs text-muted-foreground">
                  by{" "}
                  <span className="font-medium text-foreground/80">
                    {recipe.authorName}
                  </span>
                </p>

                {}
                <div className="flex items-center flex-wrap gap-2 pt-1">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground bg-mint/50 px-2 py-1 rounded-md">
                    <Clock size={12} className="text-primary" />
                    {recipe.preparationTime}m
                  </span>

                  <span
                    className={`text-[10px] font-medium px-2 py-1 rounded-full border ${getDifficultyColor(
                      recipe.difficultyLevel,
                    )}`}
                  >
                    {recipe.difficultyLevel}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MostLiked;

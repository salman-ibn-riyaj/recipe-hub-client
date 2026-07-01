"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Users,
  Heart,
  ChefHat,
  Globe,
  Crown,
  BookOpen,
  MessageCircle,
  Search,
  Star,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";

const features = [
  {
    icon: ChefHat,
    title: "Curated Recipes",
    description:
      "Every recipe on RecipeHub is hand-picked and kitchen-tested by our team of culinary experts. No guesswork — just delicious results every time.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
    borderColor: "border-emerald-200 dark:border-emerald-500/20",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Join a thriving community of food lovers from around the world. Share your creations, exchange tips, and connect with people who share your passion.",
    color: "text-sky-500",
    bgColor: "bg-sky-50 dark:bg-sky-500/10",
    borderColor: "border-sky-200 dark:border-sky-500/20",
  },
  {
    icon: Heart,
    title: "Personalized Experience",
    description:
      "Save your favorite recipes, like the ones you love, and build a personal collection tailored to your unique taste and dietary preferences.",
    color: "text-rose-500",
    bgColor: "bg-rose-50 dark:bg-rose-500/10",
    borderColor: "border-rose-200 dark:border-rose-500/20",
  },
  {
    icon: BookOpen,
    title: "Easy to Follow",
    description:
      "Each recipe comes with clear, step-by-step instructions, detailed ingredient lists, and helpful tips so anyone can cook with confidence.",
    color: "text-violet-500",
    bgColor: "bg-violet-50 dark:bg-violet-500/10",
    borderColor: "border-violet-200 dark:border-violet-500/20",
  },
  {
    icon: Globe,
    title: "Global Cuisines",
    description:
      "Explore a world of flavors — from traditional Bengali dishes to Italian classics, Mexican street food to Japanese delicacies and beyond.",
    color: "text-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-500/10",
    borderColor: "border-amber-200 dark:border-amber-500/20",
  },
  {
    icon: Crown,
    title: "Premium Recipes",
    description:
      "Unlock exclusive premium recipes crafted by top chefs. Purchase individual recipes and expand your culinary repertoire with unique dishes.",
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-500/10",
    borderColor: "border-purple-200 dark:border-purple-500/20",
  },
  {
    icon: Search,
    title: "Smart Discovery",
    description:
      "Find exactly what you're craving with powerful search and category filters. Discover new favorites based on cuisine, difficulty, and preparation time.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-500/10",
    borderColor: "border-cyan-200 dark:border-cyan-500/20",
  },
  {
    icon: MessageCircle,
    title: "Share & Inspire",
    description:
      "Post your own recipes, get feedback from the community, and inspire others with your culinary creativity. Everyone has a recipe to share.",
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-500/10",
    borderColor: "border-orange-200 dark:border-orange-500/20",
  },
  {
    icon: Star,
    title: "Quality You Can Trust",
    description:
      "Every recipe includes ratings, reviews, and likes so you can see what the community loves. Cook with confidence knowing others have tried and approved.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-500/10",
    borderColor: "border-yellow-200 dark:border-yellow-500/20",
  },
];

const highlights = [
  {
    icon: Sparkles,
    value: "500+",
    label: "Hand-Crafted Recipes",
  },
  {
    icon: Users,
    value: "10K+",
    label: "Active Community Members",
  },
  {
    icon: Globe,
    value: "15+",
    label: "Global Cuisines",
  },
  {
    icon: Star,
    value: "4.9",
    label: "Average Rating",
  },
];

const WhyRecipeHub = ({ user }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/5 to-background py-20 px-4 sm:px-6 lg:px-8">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-0 w-72 h-72 rounded-full bg-primary/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-accent/[0.06] blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-mint/30 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-surface border border-primary/20 px-4 py-1.5 shadow-sm"
          >
            <ChefHat className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Why Choose Us
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Why{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              RecipeHub
            </span>
            ?
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"
          />

          <p className="max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg leading-relaxed">
            We&apos;re on a mission to make cooking accessible, enjoyable, and
            inspiring for everyone. Here&apos;s why thousands of home cooks
            choose RecipeHub as their go-to recipe platform.
          </p>
        </motion.div>

        {/* Highlights Stats Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group bg-surface rounded-2xl border border-border shadow-soft p-5 md:p-6 text-center hover:shadow-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent rounded-2xl pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-mint flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="block text-2xl md:text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {item.value}
                  </span>
                  <span className="block text-xs md:text-sm text-muted-foreground font-medium leading-tight">
                    {item.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-surface rounded-2xl border border-border shadow-soft p-6 hover:shadow-hover hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${feature.bgColor} ${feature.borderColor} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10`}
                >
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>

                {/* Number */}
                <span className="absolute top-4 right-4 text-5xl font-black text-foreground/[0.03] select-none pointer-events-none">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors relative z-10">
                  {feature.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-br from-primary/10 via-surface to-secondary/10 rounded-3xl border border-border shadow-soft p-8 md:p-12 relative overflow-hidden text-center"
        >
          {/* Decorative blurs */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-mint flex items-center justify-center mx-auto shadow-sm">
              <ChefHat className="w-8 h-8 text-primary" />
            </div>

            <h3 className="text-2xl md:text-3xl font-extrabold text-foreground">
              Ready to Start Your{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Culinary Journey
              </span>
              ?
            </h3>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Join RecipeHub today and discover a world of flavors waiting for
              you. Whether you&apos;re a seasoned chef or a complete beginner,
              there&apos;s always something new to create.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              {!user && (
                <Link href="/signup">
                  <Button
                    radius="full"
                    className="bg-primary px-8 py-6 text-base font-bold text-white shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all"
                  >
                    Join RecipeHub Free
                  </Button>
                </Link>
              )}
              <Link href="/recipes">
                <Button
                  radius="full"
                  variant="bordered"
                  className="border-primary/30 px-8 py-6 text-base font-bold text-primary hover:bg-mint transition-all"
                >
                  Browse Recipes
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Bottom Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-muted-foreground/60 tracking-widest uppercase flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-border" />
            <span>Discover Food, Eat & Live Happy</span>
            <span className="w-8 h-px bg-border" />
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyRecipeHub;

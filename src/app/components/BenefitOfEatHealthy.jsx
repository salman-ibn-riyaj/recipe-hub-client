"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Heart,
  Apple,
  Zap,
  Moon,
  Brain,
  Bone,
  Sparkles,
  Smile,
  Salad,
  Timer,
  Shield,
} from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Heart Health",
    description:
      "A diet rich in fruits, vegetables, and whole grains helps lower blood pressure, reduce cholesterol, and cut the risk of heart disease by up to 30%.",
    color: "text-rose-500",
    bgColor: "bg-rose-50 dark:bg-rose-500/10",
    borderColor: "border-rose-200 dark:border-rose-500/20",
  },
  {
    icon: Apple,
    title: "Weight Management",
    description:
      "Nutrient-dense foods keep you fuller longer with fewer calories. Healthy eating makes maintaining a balanced weight effortless and sustainable.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
    borderColor: "border-emerald-200 dark:border-emerald-500/20",
  },
  {
    icon: Brain,
    title: "Sharper Mind",
    description:
      "Omega-3 fatty acids, antioxidants, and B vitamins found in healthy foods boost brain function, improve memory, and reduce the risk of cognitive decline.",
    color: "text-violet-500",
    bgColor: "bg-violet-50 dark:bg-violet-500/10",
    borderColor: "border-violet-200 dark:border-violet-500/20",
  },
  {
    icon: Zap,
    title: "Sustained Energy",
    description:
      "Complex carbs, lean proteins, and healthy fats provide steady energy throughout the day — no more sugar crashes or mid-afternoon slumps.",
    color: "text-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-500/10",
    borderColor: "border-amber-200 dark:border-amber-500/20",
  },
  {
    icon: Shield,
    title: "Stronger Immunity",
    description:
      "Vitamins C, D, zinc, and antioxidants from fresh produce strengthen your immune system, helping you fight off infections and recover faster.",
    color: "text-sky-500",
    bgColor: "bg-sky-50 dark:bg-sky-500/10",
    borderColor: "border-sky-200 dark:border-sky-500/20",
  },
  {
    icon: Bone,
    title: "Strong Bones & Teeth",
    description:
      "Calcium, vitamin D, and magnesium from leafy greens, dairy, and nuts build and maintain strong bones, reducing the risk of osteoporosis.",
    color: "text-teal-500",
    bgColor: "bg-teal-50 dark:bg-teal-500/10",
    borderColor: "border-teal-200 dark:border-teal-500/20",
  },
  {
    icon: Smile,
    title: "Better Mood",
    description:
      "Gut-healthy foods produce serotonin — the 'happy hormone.' A nutritious diet is linked to lower rates of depression, anxiety, and stress.",
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-500/10",
    borderColor: "border-orange-200 dark:border-orange-500/20",
  },
  {
    icon: Sparkles,
    title: "Glowing Skin",
    description:
      "Antioxidants, healthy fats, and hydration from whole foods fight inflammation, delay aging, and give your skin a natural, radiant glow.",
    color: "text-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-500/10",
    borderColor: "border-pink-200 dark:border-pink-500/20",
  },
  {
    icon: Moon,
    title: "Restful Sleep",
    description:
      "Nutrients like magnesium, tryptophan, and melatonin from healthy foods regulate sleep cycles, helping you fall asleep faster and wake up refreshed.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-500/10",
    borderColor: "border-indigo-200 dark:border-indigo-500/20",
  },
  {
    icon: Timer,
    title: "Longevity & Vitality",
    description:
      "A balanced diet reduces inflammation, slows cellular aging, and lowers the risk of chronic diseases — adding years to your life and life to your years.",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-500/10",
    borderColor: "border-green-200 dark:border-green-500/20",
  },
];

const stats = [
  { value: "30%", label: "Lower heart disease risk" },
  { value: "40%", label: "Reduced cancer risk" },
  { value: "8+", label: "Years added to lifespan" },
  { value: "50%", label: "Better mood regulation" },
];

const tips = [
  "Eat a rainbow — variety of colors means variety of nutrients.",
  "Prioritize whole foods over processed foods whenever possible.",
  "Stay hydrated — water is essential for every bodily function.",
  "Cook at home more often to control ingredients and portions.",
  "Listen to your body's hunger and fullness cues.",
];

const BenefitOfEatHealthy = () => {
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
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-mint/30 to-background py-20 px-4 sm:px-6 lg:px-8">
      {/* Decorative background blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-64 h-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

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
            className="inline-flex items-center gap-2 rounded-full bg-mint border border-primary/20 px-4 py-1.5 shadow-sm"
          >
            <Salad className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Nourish Your Body
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Benefits of{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Eating Healthy
            </span>
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"
          />

          <p className="max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg leading-relaxed">
            Eating well isn&apos;t just about nutrition — it&apos;s a
            transformation that touches every part of your life. Discover how
            small changes on your plate can create a healthier, happier you.
          </p>
        </motion.div>

        {/* Stats Counter Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group bg-surface rounded-2xl border border-border shadow-soft p-5 md:p-6 text-center hover:shadow-hover hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent rounded-2xl pointer-events-none" />
              <div className="relative z-10">
                <span className="block text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="block text-xs md:text-sm text-muted-foreground mt-1.5 font-medium leading-tight">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-surface rounded-2xl border border-border shadow-soft p-6 hover:shadow-hover hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                {/* Icon circle */}
                <div
                  className={`w-12 h-12 rounded-xl ${benefit.bgColor} ${benefit.borderColor} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-6 h-6 ${benefit.color}`} />
                </div>

                {/* Benefit number */}
                <span className="absolute top-4 right-4 text-4xl font-black text-foreground/[0.03] select-none pointer-events-none">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-surface rounded-3xl border border-border shadow-soft p-8 md:p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
              <h3 className="text-2xl font-bold text-foreground">
                Quick Tips to Get Started
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-mint/50 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm text-xs font-bold">
                    {index + 1}
                  </div>
                  <span className="text-sm text-muted-foreground leading-relaxed pt-0.5">
                    {tip}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">
            Remember, every healthy meal is a step toward a better you.
            Start small, stay consistent, and watch the transformation unfold.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitOfEatHealthy;

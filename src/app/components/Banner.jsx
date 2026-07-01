"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { motion } from "motion/react";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-mint via-background to-background min-h-[90vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      {}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl w-full grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {}
        <motion.div
          className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-mint bg-surface px-4 py-2 shadow-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {}
            <span className="text-sm font-semibold text-primary">
              Be Creative in the Kitchen
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
            Discover Food,
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Eat & Live Happy
            </span>
          </h1>

          <p className="max-w-2xl text-lg sm:text-xl text-muted-foreground">
            Join our community of food lovers. Discover fresh, organic,
            delicious recipes and make every meal unforgettable.
          </p>

          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <Link href="/recipes">
              <Button
                radius="full"
                className="bg-primary px-8 py-6 text-lg font-bold text-white"
              >
                Explore Recipes
              </Button>
            </Link>

            <Link href="/signup">
              <Button
                radius="full"
                variant="bordered"
                className="border-primary/30 px-8 py-6 text-lg font-bold text-primary hover:bg-mint"
              >
                Join Community
              </Button>
            </Link>
          </div>
        </motion.div>

        {}
        <div className="order-1 lg:order-2 relative flex justify-center items-center h-[400px] sm:h-[500px] lg:h-[600px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <div
              className="absolute w-full max-w-md h-full bg-center bg-contain bg-no-repeat"
              style={{
                backgroundImage: "url('/images/recipe-tree-transparent.png')",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

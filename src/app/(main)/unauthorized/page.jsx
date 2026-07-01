"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";

const UnauthorizedPage = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background px-4 py-8 sm:px-6 lg:px-8">
      {/* Decorative background blurs */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-danger/10 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-[450px] h-[450px] rounded-full bg-warning/15 blur-[90px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[200px] h-[200px] rounded-full bg-danger/5 blur-[60px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[250px] h-[250px] rounded-full bg-secondary/10 blur-[70px]" />
      </div>

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-danger/[0.03] via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-[520px]"
      >
        <div className="glass rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-2xl shadow-danger/5 text-center">
          {/* Lock Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.15,
              type: "spring",
              stiffness: 200,
            }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-danger/10 flex items-center justify-center mx-auto">
                <Icon
                  icon="lucide:shield-alert"
                  className="w-10 h-10 sm:w-12 sm:h-12 text-danger"
                />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-warning/20 flex items-center justify-center"
              >
                <Icon icon="lucide:lock" className="w-3.5 h-3.5 text-warning" />
              </motion.div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="space-y-2 mb-6"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Access Denied
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
              You do not have permission to view this page. Please contact an
              administrator if you believe this is a mistake.
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6"
          />

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link href="/" className="w-full">
              <Button
                className="bg-gradient-to-r from-primary to-secondary text-white font-semibold h-11 px-8 rounded-xl 
                  shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 
                hover:-translate-y-0.5 active:translate-y-0 
                transition-all duration-200 text-[15px] w-full"
              >
                <Icon icon="lucide:home" className="w-4 h-4 mr-2 shrink-0" />
                Go Home
              </Button>
            </Link>
          </motion.div>

          {/* Help text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-xs text-muted-foreground/60 mt-6"
          >
            Need help?{" "}
            <Link
              href="/"
              className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors"
            >
              Contact support
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default UnauthorizedPage;

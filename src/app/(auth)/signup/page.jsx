"use client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import { Eye, EyeClosed } from "@gravity-ui/icons";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { authClient, signUp } from "@/lib/auth-client";

const SignUpPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);

    try {
      const { data, error: authError } = await signUp.email({
        email,
        password,
        name,
        image: photo,
        callbackURL: "/",
      });

      if (authError) {
        setAuthError(authError.message);
        toast.warning("Signup Failed!", {
          description: authError.message,
          actionProps: {
            children: "Retry",
            className: "bg-warning text-warning-foreground",
          },
        });
        return;
      } else {
        toast.success("Account Created!", {
          description: "Welcome to RecipeHub. You can now explore recipes.",
          actionProps: {
            children: "Home",
            className: "bg-success text-success-foreground",
          },
        });
        router.push("/");
        return;
      }
    } catch (err) {
      console.error(err);
      setAuthError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background px-4 py-8 sm:px-6 lg:px-8">
      {}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-[450px] h-[450px] rounded-full bg-accent/20 blur-[90px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-mint/15 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[200px] h-[200px] rounded-full bg-primary/5 blur-[60px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[250px] h-[250px] rounded-full bg-secondary/10 blur-[70px]" />
      </div>

      {}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/[0.03] via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-[600px]"
      >
        {}
        <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl shadow-primary/5">
          <Form
            className="flex flex-col gap-5"
            render={(props) => <form {...props} />}
            onSubmit={onSubmit}
          >
            {}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center sm:items-start space-y-1 mb-2"
            >
              <Link href="/">
                <Image
                  src="/images/recipehub_logo_2.png"
                  width={150}
                  height={50}
                  alt="RecipeHub"
                  className="h-10 w-auto object-contain mb-5"
                />
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                Join RecipeHub
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Create an account to start sharing recipes.
              </p>
            </motion.div>

            {}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <TextField
                isRequired
                name="name"
                type="text"
                onChange={setName}
                className="w-full"
              >
                <Label className="text-foreground font-medium text-sm mb-1.5 block">
                  Full Name
                </Label>
                <Input
                  placeholder="John Doe"
                  className="bg-background/50 border-border focus:border-primary rounded-xl h-11 
                    data-[focus=true]:border-primary data-[focus=true]:ring-2 data-[focus=true]:ring-primary/20 
                    transition-all duration-200"
                />
                <FieldError className="text-danger text-xs mt-1" />
              </TextField>
            </motion.div>

            {}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TextField
                name="photo"
                type="url"
                onChange={setPhoto}
                className="w-full"
              >
                <Label className="text-foreground font-medium text-sm mb-1.5 block">
                  Photo URL{" "}
                  <span className="text-muted-foreground/50 font-normal">
                    (Optional)
                  </span>
                </Label>
                <Input
                  placeholder="https://example.com/photo.jpg"
                  className="bg-background/50 border-border focus:border-primary rounded-xl h-11 
                    data-[focus=true]:border-primary data-[focus=true]:ring-2 data-[focus=true]:ring-primary/20 
                    transition-all duration-200"
                />
                <FieldError className="text-danger text-xs mt-1" />
              </TextField>
            </motion.div>

            {}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <TextField
                isRequired
                name="email"
                type="email"
                onChange={setEmail}
                className="w-full"
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Please enter a valid email address";
                  }
                  return null;
                }}
              >
                <Label className="text-foreground font-medium text-sm mb-1.5 block">
                  Email
                </Label>
                <Input
                  placeholder="john@example.com"
                  className="bg-background/50 border-border focus:border-primary rounded-xl h-11 
                    data-[focus=true]:border-primary data-[focus=true]:ring-2 data-[focus=true]:ring-primary/20 
                    transition-all duration-200"
                />
                <FieldError className="text-danger text-xs mt-1" />
              </TextField>
            </motion.div>

            {}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <TextField
                isRequired
                minLength={8}
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={setPassword}
                className="w-full"
              >
                <Label className="text-foreground font-medium text-sm mb-1.5 block">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="bg-background/50 border-border focus:border-primary rounded-xl h-11 pr-11
                      data-[focus=true]:border-primary data-[focus=true]:ring-2 data-[focus=true]:ring-primary/20
                      transition-all duration-200 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 h-full flex items-center justify-center w-11 text-muted-foreground hover:text-primary transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeClosed className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <FieldError className="text-danger text-xs mt-1" />
              </TextField>
            </motion.div>

            {}
            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-danger/10 border border-danger/20 px-4 py-3 text-sm text-danger font-medium"
              >
                {authError}
              </motion.div>
            )}

            {}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-col gap-3 mt-1"
            >
              <Button
                type="submit"
                isLoading={loading}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold h-11 rounded-xl 
                  shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 
                  hover:-translate-y-0.5 active:translate-y-0 
                  transition-all duration-200 text-[15px]"
              >
                Create Account
              </Button>

              {}
              <div className="relative flex items-center py-1">
                <div className="flex-grow border-t border-border/60" />
                <span className="flex-shrink-0 mx-4 text-muted-foreground/60 text-[11px] uppercase tracking-[0.12em] font-medium">
                  Or continue with
                </span>
                <div className="flex-grow border-t border-border/60" />
              </div>

              <Button
                onClick={handleGoogleLogin}
                variant="bordered"
                className="w-full border-border/70 bg-background/30 text-foreground 
                  hover:bg-mint/30 hover:border-primary/40 font-medium h-11 rounded-xl 
                  transition-all duration-200 text-[15px]"
              >
                <Icon icon="devicon:google" className="w-5 h-5 mr-2 shrink-0" />
                Sign up with Google
              </Button>
            </motion.div>

            {}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm text-muted-foreground text-center mt-2"
            >
              Already have an account?{" "}
              <Link
                className="font-semibold text-primary hover:text-primary/80 hover:underline transition-colors"
                href={"/signin"}
              >
                Log in
              </Link>
            </motion.p>
          </Form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;

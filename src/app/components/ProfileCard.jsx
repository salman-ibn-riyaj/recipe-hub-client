"use client";
import React, { useState } from "react";
import { Card, Chip, toast } from "@heroui/react";
import Image from "next/image";
import {
  Crown,
  CheckCircle,
  ArrowRight,
  User,
  Mail,
  Shield,
  Calendar,
  Heart,
  ToggleLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/action/updateProfile";
import { CircleFill } from "@gravity-ui/icons";

export default function ProfileCard({ user }) {
  const router = useRouter();
  const [userData, setUserData] = useState({ ...user });

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userData?.name || "");
  const [editImage, setEditImage] = useState(userData?.image || "");
  const isPremium = userData.plan === "Recipehub_Premium";

  const formatDate = (dateInput) => {
    if (!dateInput) return "N/A";
    const dateObj = dateInput.$date
      ? new Date(dateInput.$date)
      : new Date(dateInput);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateData = {
      ...userData,
      name: editName,
      image: editImage,
    };

    setUserData(updateData);

    try {
      const uploadData = await updateProfile(`/api/user`, updateData, "PATCH");

      if (uploadData) {
        toast.success("Profile Updated successfully!");
        router.refresh();
      }
    } catch (error) {
      console.error("Error uploading profile:", error);
      toast.error(error?.message || "Failed to update profile.");
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-background text-foreground flex flex-col lg:flex-row items-stretch justify-center gap-6 p-4 max-w-6xl mx-auto min-h-[500px] transition-colors duration-200">
      {}
      <Card className="flex-1 flex flex-col justify-between bg-surface border border-border rounded-3xl shadow-soft p-2 sm:p-4">
        <div className="w-full">
          <Card.Header className="flex flex-col sm:flex-row gap-6 items-center sm:items-start justify-between w-full p-4 sm:p-6 border-b border-border/50">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start w-full text-center sm:text-left">
              <div className="relative w-32 h-32 md:w-36 md:h-36 shrink-0 rounded-full bg-mint flex items-center justify-center border-4 border-surface shadow-sm overflow-hidden z-10">
                <Image
                  src={
                    userData?.image ||
                    "https://res.cloudinary.com/dto6szvn9/image/upload/v1777614286/samples/smile.jpg"
                  }
                  alt={userData?.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-3 mt-2 sm:mt-4">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <h2 className="text-3xl font-bold tracking-tight text-foreground">
                    {userData?.name}
                  </h2>
                  {userData?.plan === "free" ? (
                    <Chip
                      size="sm"
                      variant="flat"
                      className="bg-mint text-primary capitalize font-medium"
                    >
                      <span className="flex items-center gap-1.5">
                        <CircleFill width={8} className="text-primary" />{" "}
                        {userData.plan}
                      </span>
                    </Chip>
                  ) : (
                    <Chip
                      size="sm"
                      variant="shadow"
                      className="bg-gradient-to-r from-amber-400 to-amber-500 text-white capitalize font-medium border-0 shadow-amber-500/30"
                    >
                      <span className="flex items-center gap-1.5">
                        <Crown className="w-3.5 h-3.5" /> {userData.plan}
                      </span>
                    </Chip>
                  )}
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-sm font-semibold text-primary uppercase tracking-wider bg-mint/50 px-3 py-1 rounded-full w-fit mx-auto sm:mx-0">
                  <Shield className="w-4 h-4" /> Role: {userData?.role}
                </div>
              </div>
            </div>
          </Card.Header>

          <Card.Content className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              {}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-mint/10 border border-mint/20 hover:border-primary/20 hover:bg-mint/20 transition-colors">
                <div className="p-2.5 bg-mint rounded-xl text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden flex-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
                    Email Address
                  </p>
                  <p className="truncate text-foreground font-semibold">
                    {userData?.email}
                  </p>
                </div>
                {userData?.emailVerified && (
                  <span className="shrink-0 px-2 py-1 rounded-md text-[10px] font-bold bg-success/10 text-success uppercase">
                    Verified
                  </span>
                )}
              </div>

              {}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-mint/10 border border-mint/20 hover:border-primary/20 hover:bg-mint/20 transition-colors">
                <div className="p-2.5 bg-rose-50 rounded-xl text-rose-500 shrink-0">
                  <Heart className="w-5 h-5 fill-rose-500/20" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
                    Total Likes Received
                  </p>
                  <p className="text-foreground font-bold text-base">
                    {userData?.likesCount || 0} Likes
                  </p>
                </div>
              </div>

              {}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-mint/10 border border-mint/20 hover:border-primary/20 hover:bg-mint/20 transition-colors">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-500 shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
                    Joined On
                  </p>
                  <p className="text-foreground font-semibold">
                    {formatDate(userData?.createdAt)}
                  </p>
                </div>
              </div>

              {}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-mint/10 border border-mint/20 hover:border-primary/20 hover:bg-mint/20 transition-colors">
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${userData?.banned || userData?.blocked ? "bg-danger/10 text-danger" : "bg-success/10 text-success"}`}
                >
                  <ToggleLeft className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
                    Account Status
                  </p>
                  <p
                    className={`font-semibold ${userData?.banned || userData?.blocked ? "text-danger" : "text-success"}`}
                  >
                    {userData?.banned || userData?.blocked
                      ? "Restricted"
                      : "Active"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-background border border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span className="font-semibold">USER ID:</span>
              <span className="select-all text-foreground bg-muted px-2 py-1 rounded">
                {userData?._id?.$oid || userData?.id}
              </span>
            </div>
          </Card.Content>
        </div>

        <Card.Footer className="w-full flex flex-col items-stretch pt-2 px-6 pb-6 gap-4">
          <div className="w-full flex justify-end">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 text-sm shadow-sm border ${
                isEditing
                  ? "bg-surface text-foreground border-border hover:bg-muted/50"
                  : "bg-primary text-white border-transparent hover:bg-primary/90 hover:-translate-y-0.5"
              }`}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {isEditing && (
            <div className="w-full pt-6 border-t border-border/50 animate-in fade-in slide-in-from-top-2">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
                Update Profile Info
              </h3>
              <form onSubmit={handleUpdate} className="space-y-5 max-w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Profile Image URL
                    </label>
                    <input
                      type="url"
                      value={editImage}
                      onChange={(e) => setEditImage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 hover:shadow-hover hover:-translate-y-0.5 transition-all text-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </Card.Footer>
      </Card>

      {}
      <Card
        className={`flex-1 flex flex-col justify-between border-2 p-8 rounded-3xl shadow-soft transition-all duration-300 relative overflow-hidden ${
          isPremium
            ? "border-amber-200 bg-gradient-to-br from-amber-50/80 to-amber-100/50"
            : "border-border bg-surface hover:border-amber-200 hover:shadow-lg hover:shadow-amber-500/5"
        }`}
      >
        <div
          className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${isPremium ? "bg-amber-300/30" : "bg-amber-300/10"}`}
        ></div>

        <Card.Header className="flex flex-col items-start gap-5 pb-6 relative z-10">
          <div
            className={`p-4 rounded-2xl transition-all duration-300 ${
              isPremium
                ? "bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-lg shadow-amber-500/30"
                : "bg-mint text-primary group-hover:scale-110"
            }`}
          >
            <Crown className="w-8 h-8" />
          </div>
          <div className="text-left">
            <Card.Title className="text-3xl font-bold tracking-tight text-foreground mb-1.5">
              {isPremium ? "Premium Member" : "Upgrade to Premium"}
            </Card.Title>
            <Card.Description className="text-sm font-medium text-muted-foreground">
              {isPremium
                ? "Exclusive features are currently active."
                : "Unlock the ultimate RecipeHub experience."}
            </Card.Description>
          </div>
        </Card.Header>

        <Card.Content className="py-6 flex-grow relative z-10">
          <ul className="space-y-4 text-sm font-medium text-foreground">
            <li className="flex items-center gap-3">
              <div className="p-1 rounded-full bg-success/10 text-success shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
              <span>Unlimited recipe creations & uploads</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="p-1 rounded-full bg-success/10 text-success shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
              <span>Get a Premium Badge on your profile</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="p-1 rounded-full bg-success/10 text-success shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
              <span>Ad-free cooking & browsing experience</span>
            </li>
          </ul>
        </Card.Content>

        <Card.Footer className="pt-6 mt-4 border-t border-border/50 relative z-10">
          {isPremium ? (
            <div className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold bg-amber-500/10 text-amber-600 border-2 border-amber-500/20 shadow-sm">
              <CheckCircle className="w-5 h-5" />
              Premium Active
            </div>
          ) : (
            <div className="w-full">
              <form
                action="/api/checkout_sessions"
                method="POST"
                className="w-full"
              >
                <input
                  type="hidden"
                  name="plan_id"
                  value={"Recipehub_Premium"}
                />
                <button
                  type="submit"
                  role="link"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white hover:-translate-y-1 transition-all duration-200 shadow-lg shadow-amber-500/25 text-base"
                >
                  Go Premium
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
              <p className="text-xs text-center text-muted-foreground mt-4 font-medium">
                Cancel or change your plan anytime.
              </p>
            </div>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
}

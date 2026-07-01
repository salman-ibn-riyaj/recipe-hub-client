import Reaction from "@/app/components/Reaction";
import { serverFetch, protectedFetch } from "@/lib/action/core/serverFetch";
import { getSessionData } from "@/lib/action/getSession";
import { makeFavorite } from "@/lib/action/makeFavorite";
import { ThumbsUpFill, TriangleExclamationFill } from "@gravity-ui/icons";
import { Button, Chip, toast } from "@heroui/react";
import {
  Heart,
  Clock,
  Utensils,
  Users,
  CheckCircle2,
  AlertTriangle,
  ChefHat,
} from "lucide-react";
import Image from "next/image";

const RecipeDetailsPage = async ({ params }) => {
  const { id } = await params;
  const recipe = await serverFetch(`/api/recipes/${id}`);
  const user = await getSessionData();

  // Determine recipe ownership and purchase status
  let isOwner = false;
  let isPurchased = false;

  if (user) {
    isOwner = user.id === recipe?.authorId;

    if (!isOwner) {
      try {
        const purchaseCheck = await protectedFetch(
          `/api/check-purchase?recipeId=${recipe?._id}`
        );
        isPurchased = purchaseCheck?.canPurchase === false;
      } catch (e) {
        // If the check fails, default to not purchased
        console.error("Failed to check purchase status:", e);
      }
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto bg-surface rounded-[2rem] border border-border overflow-hidden shadow-soft">
        {}
        <div className="relative h-[250px] sm:h-[350px] md:h-[450px] w-full">
          <Image
            src={recipe?.recipeImage || '/images/default-recipe.jpg'}
            alt={recipe?.recipeName || 'Recipe image'}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 text-white flex flex-col sm:flex-row justify-between items-end gap-6 z-10">
            <div className="w-full sm:w-2/3">
              <Chip
                className="bg-primary text-white font-bold mb-4 shadow-sm border-0"
                size="md"
                radius="sm"
              >
                {recipe?.category}
              </Chip>
              <h1 className="text-3xl sm:text-5xl font-extrabold capitalize tracking-tight leading-tight mb-3">
                {recipe?.recipeName}
              </h1>
              <p className="text-sm sm:text-base text-white/80 font-medium flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-primary" />
                Recipe by{" "}
                <span className="font-bold text-white">
                  {recipe?.authorName}
                </span>
              </p>
            </div>

            <div className="w-full sm:w-auto flex justify-start sm:justify-end shrink-0">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
                <Reaction user={user} recipe={recipe} isOwner={isOwner} isPurchased={isPurchased} />
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 p-6 sm:p-10">
          {}
          <div className="lg:col-span-2 space-y-10">
            {}
            <div className="grid grid-cols-3 gap-4 p-4 bg-mint/30 border border-mint/50 rounded-2xl">
              <div className="flex flex-col items-center justify-center p-2 text-center">
                <div className="bg-white p-2.5 rounded-full shadow-sm text-primary mb-2">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">
                  Time
                </span>
                <span className="text-sm sm:text-base font-semibold text-foreground">
                  {recipe?.preparationTime}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 text-center border-x border-mint/50">
                <div className="bg-white p-2.5 rounded-full shadow-sm text-primary mb-2">
                  <Utensils className="w-5 h-5" />
                </div>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">
                  Cuisine
                </span>
                <span className="text-sm sm:text-base font-semibold text-foreground capitalize">
                  {recipe?.cuisineType}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 text-center">
                <div className="bg-white p-2.5 rounded-full shadow-sm text-primary mb-2">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">
                  Difficulty
                </span>
                <span className="text-sm sm:text-base font-semibold text-foreground capitalize">
                  {recipe?.difficultyLevel}
                </span>
              </div>
            </div>

            {}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-primary rounded-full"></div>
                <h2 className="text-2xl font-bold text-foreground">
                  Ingredients
                </h2>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm sm:text-base">
                {recipe?.ingredients?.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-mint/20"
                  >
                    <div className="w-6 h-6 rounded-full bg-mint text-primary flex items-center justify-center shrink-0 mt-0.5 shadow-sm border border-primary/10">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="leading-tight pt-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-primary rounded-full"></div>
                <h2 className="text-2xl font-bold text-foreground">
                  Instructions
                </h2>
              </div>
              <div className="bg-background border border-border rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-mint/50 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10"></div>
                <p className="text-base text-muted-foreground leading-loose whitespace-pre-line relative z-10">
                  {recipe?.instructions}
                </p>
              </div>
            </div>
          </div>

          {}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-24 space-y-6">
              {}
              <div className="p-6 bg-success/5 border border-success/20 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-success/10 rounded-xl text-success">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-success uppercase tracking-wide">
                    What to do
                  </h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                  Thoroughly clean hands and surfaces. Always use separate
                  cutting boards for raw chicken to prevent cross-contamination.
                  Check the internal temperature.
                </p>
              </div>

              {}
              <div className="p-6 bg-danger/5 border border-danger/20 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-danger/10 rounded-xl text-danger">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-danger uppercase tracking-wide">
                    What not to do
                  </h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                  Do not thaw chicken at room temperature; instead, thaw it
                  inside the refrigerator. Do not overcrowd the roasting pan to
                  ensure even cooking.
                </p>
              </div>

              {}
              <div className="p-6 bg-surface border border-border rounded-2xl shadow-sm text-center">
                <h4 className="font-bold text-foreground mb-2">
                  Love this recipe?
                </h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Save it to your favorites or share it with friends!
                </p>
                <Button className="w-full bg-mint text-primary hover:bg-primary hover:text-white font-bold py-5 rounded-xl transition-colors">
                  Share Recipe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RecipeDetailsPage;

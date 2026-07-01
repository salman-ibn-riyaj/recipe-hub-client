'use client'
import { protectedFetch } from '@/lib/action/core/serverFetch';
import { makeFavorite } from '@/lib/action/makeFavorite';
import { ThumbsUpFill, TriangleExclamationFill } from '@gravity-ui/icons';
import { Button, toast, Tooltip } from '@heroui/react';
import { Heart } from 'lucide-react';
import React from 'react';
import { ReportRecipe } from './ReportRecipe';
import { makeLiked } from '@/lib/action/makeLiked';
import { useRouter } from 'next/navigation';


const Reaction = ({ user, recipe, isOwner = false, isPurchased = false }) => {
  const router = useRouter()

  const handleFavorite = async () => {
    const favoriteRecipe = {
      ...recipe,
      userId : user.id 
    }
    try {
      const uploadData = await makeFavorite('/app/myFavorites', favoriteRecipe)
      console.log(uploadData, 'data from client');
      
      if (uploadData.success) {
        toast.success(uploadData.message || "Recipe Favorited successfully!");
      } else {
        toast.danger(uploadData.message)
      }
    } catch (error) {
      toast.error(error?.message || "Failed to Favorite recipe.");
    } finally {
      console.log("Submission process completed.");
    }
  }

  
 const handleFormSubmit = async (e) => {
  e.preventDefault(); 

  // Prevent submission for owners or already-purchased users
  if (isOwner || isPurchased) {
    return;
  }

  const form = e.target;
  const recipeId = form.recipeId.value; 
  const customerEmail = user?.email; 

  if (!customerEmail) {
    toast.error("Please log in first to purchase.");
    return;
  }

  try {
    const checkData = await protectedFetch(`/api/check-purchase?recipeId=${recipeId}`);

    if (!checkData.canPurchase) {
      toast.danger(checkData.message || "You cannot purchase this recipe.");
      return;
    }

    form.submit();

  } catch (error) {
    console.error("Checking error:", error);
    toast.danger("Something went wrong. Please try again.");
  }
};

const handleLike = async () => {
  const likedRecipe = {
      recipeId: recipe._id,
      userId : user.id,
      creatorId : recipe.authorId
    }
    try {
      const uploadData = await makeLiked('/app/liked', likedRecipe)
      console.log(uploadData, 'data from client');
      
      if (uploadData.success) {
        toast.success(uploadData.message || "Recipe Liked successfully!");
        router.refresh()
      } else {
        toast.danger(uploadData.message)
      }
    } catch (error) {
      toast.error(error?.message || "Failed to Like recipe.");
    } finally {
      console.log("Submission process completed.");
    }
}

  // Determine button state
  const isDisabled = isOwner || isPurchased;
  let buttonText = "Buy Recipe";
  let tooltipText = "";

  if (isOwner) {
    buttonText = "Your Recipe";
    tooltipText = "You cannot purchase your own recipe.";
  } else if (isPurchased) {
    buttonText = "Already Purchased";
    tooltipText = "You have already purchased this recipe.";
  }

  return (
  <div>
  <div className="flex gap-2 mb-4">
    {}
    <Tooltip>
      <Tooltip.Trigger>
        <Button
          isIconOnly
          variant="light"
          className="text-muted hover:text-primary transition-colors"
          onClick={handleLike}
        >
          <ThumbsUpFill className="w-6 h-6 fill-primary text-primary" />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <Tooltip.Arrow />
        Like
      </Tooltip.Content>
    </Tooltip>
    
    {}
    <Tooltip>
      <Tooltip.Trigger>
        <Button
          isIconOnly
          onClick={handleFavorite}
          variant="light"
          className="text-muted hover:text-primary transition-colors"
        >
          <Heart className="w-6 h-6 fill-primary text-primary" />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <Tooltip.Arrow />
        Make favorite
      </Tooltip.Content>
    </Tooltip>
    
    {}
    <Tooltip>
      <Tooltip.Trigger>
        <ReportRecipe user={user} recipe={recipe}/>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <Tooltip.Arrow />
        Report
      </Tooltip.Content>
    </Tooltip>
  </div>

  {}
  <form onSubmit={handleFormSubmit} action="/api/checkout_sessions" method="POST">
    <input type='hidden' name='plan_id' value={'Recipehub_Random_Recipe'} />
    <input type='hidden' name='recipeId' value={recipe?._id} />
    <input type='hidden' name='recipeName' value={recipe?.recipeName} />
    <section>
      {isDisabled ? (
        <Tooltip>
          <Tooltip.Trigger>
            <div>
              <button
                type="button"
                disabled
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-primary/60 text-primary-foreground/70 cursor-not-allowed text-sm"
              >
                {buttonText}
              </button>
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Tooltip.Arrow />
            {tooltipText}
          </Tooltip.Content>
        </Tooltip>
      ) : (
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-primary text-primary-foreground hover:opacity-95 hover:scale-[1.01] transition-all duration-150 shadow-md shadow-primary/20 text-sm"
        >
          {buttonText}
        </button>
      )}
    </section>
  </form>
</div>
  );
};

export default Reaction;
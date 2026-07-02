import { getFavoriteRecipes } from "@/lib/action/getFavoriteRecipes";
import { getRecipeByAuthorID } from "@/lib/action/getRecipeByAuthorID";
import { getSessionData } from "@/lib/action/getSession";
import { Button, Table } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { ChefHat, Heart, ThumbsUp, UserCheck, Crown } from "lucide-react";
import { CircleChevronRight } from "@gravity-ui/icons";

const userDashboard = async () => {
  const user = await getSessionData();
  const data = await getRecipeByAuthorID(
    `/api/recipe/authorId?authorId=${user.id}`,
  );
  const recipes = data;
  const userId = user.id;
  const favoriteRecipes = await getFavoriteRecipes(
    `/app/myFavorites?userId=${userId}`,
  );

  return (
    <div className="w-11/12 mx-auto py-4">
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-primary font-extralight">
          User Dashboard
        </h1>
        <p className="text-sm font-bold text-secondary">
          Welcome, Visit your Recipe and activities
        </p>
      </div>

      {/* Stats Cards */}
      <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-background rounded-2xl">
        <div className="bg-surface border border-border/70 rounded-xl p-5 flex items-center justify-between shadow-soft transition-all hover:shadow-hover hover:-translate-y-0.5">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Recipes</p>
            <h3 className="text-2xl font-bold text-foreground mt-1">
              {recipes.length}
            </h3>
          </div>
          <div className="p-3 bg-mint rounded-lg text-primary">
            <ChefHat className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-surface border border-border/70 rounded-xl p-5 flex items-center justify-between shadow-soft transition-all hover:shadow-hover hover:-translate-y-0.5">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Favorite Recipes
            </p>
            <h3 className="text-2xl font-bold text-foreground mt-1">
              {favoriteRecipes.length}
            </h3>
          </div>
          <div className="p-3 bg-rose-50 dark:bg-rose-500/10 rounded-lg text-rose-500">
            <Heart className="w-6 h-6 fill-current" />
          </div>
        </div>

        <div className="bg-surface border border-border/70 rounded-xl p-5 flex items-center justify-between shadow-soft transition-all hover:shadow-hover hover:-translate-y-0.5">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Likes</p>
            <h3 className="text-2xl font-bold text-foreground mt-1">
              {user.likesCount}
            </h3>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-500">
            <ThumbsUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-surface border border-border/70 rounded-xl p-5 flex items-center justify-between shadow-soft transition-all hover:shadow-hover hover:-translate-y-0.5">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Membership</p>
            <div className="mt-2">
              {user.plan === "Recipehub_Premium" ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-sm">
                  <Crown className="w-3 h-3" /> Premium
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  Regular
                </span>
              )}
            </div>
          </div>
          <div className="p-3 bg-mint rounded-lg text-primary">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* My Recipes Section */}
      <div className="mt-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="font-extralight text-primary text-2xl">My Recipes</h1>
          <div className="flex gap-1 text-primary items-center">
            <span className="text-sm font-normal">All Recipes</span>
            <Link href="/userDashboard/myRecipes">
              <CircleChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="border border-border rounded-2xl overflow-hidden bg-background">
          <Table>
            <Table.ScrollContainer className="max-h-[400px] overflow-auto">
              <Table.Content>
                <Table.Header>
                  <Table.Column isRowHeader>Recipe Name</Table.Column>
                  <Table.Column>Cuisine Type</Table.Column>
                  <Table.Column>Category</Table.Column>
                </Table.Header>
                <Table.Body>
                  {recipes.slice(0, 5).map((recipe) => (
                    <Table.Row key={recipe._id}>
                      <Table.Cell className="font-medium">
                        {recipe.recipeName}
                      </Table.Cell>
                      <Table.Cell>{recipe.cuisineType}</Table.Cell>
                      <Table.Cell>{recipe.category}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
      </div>

      {/* My Favorites Section */}
      <div className="mt-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="font-extralight text-primary text-2xl">My Favorite</h1>
          <div className="flex gap-1 text-primary items-center">
            <span className="text-sm font-normal">All Favorites</span>
            <Link href="/userDashboard/favorites">
              <CircleChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="border border-border rounded-2xl overflow-hidden bg-background">
          <Table>
            <Table.ScrollContainer className="max-h-[400px] overflow-auto">
              <Table.Content>
                <Table.Header>
                  <Table.Column isRowHeader>Recipe Name</Table.Column>
                  <Table.Column>Cuisine Type</Table.Column>
                  <Table.Column>Category</Table.Column>
                </Table.Header>
                <Table.Body>
                  {favoriteRecipes.map((recipe) => (
                    <Table.Row key={recipe._id}>
                      <Table.Cell className="font-medium">
                        {recipe.recipeName}
                      </Table.Cell>
                      <Table.Cell>{recipe.cuisineType}</Table.Cell>
                      <Table.Cell>{recipe.category}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default userDashboard;

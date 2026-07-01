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
      <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-background rounded-2xl border border-border">
        <div className="bg-primary/20 border border-border rounded-xl p-5 flex items-center justify-between shadow-sm transition-all hover:shadow-md">
          <div>
            <p className="text-sm font-medium text-foreground">Total Recipes</p>
            <h3 className="text-2xl font-bold text-foreground mt-1">
              {recipes.length}
            </h3>
          </div>
          <div className="p-3 bg-[#f99f1d]/10 rounded-lg text-[#f99f1d]">
            <ChefHat className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-primary/20 border border-border rounded-xl p-5 flex items-center justify-between shadow-sm transition-all hover:shadow-md">
          <div>
            <p className="text-sm font-medium text-foreground">
              Favorite Recipes
            </p>
            <h3 className="text-2xl font-bold text-foreground mt-1">
              {favoriteRecipes.length}
            </h3>
          </div>
          <div className="p-3 bg-red-500/20 rounded-lg text-red-500">
            <Heart className="w-6 h-6 fill-current" />
          </div>
        </div>

        <div className="bg-primary/20 border border-border rounded-xl p-5 flex items-center justify-between shadow-sm transition-all hover:shadow-md">
          <div>
            <p className="text-sm font-medium text-foreground">Total Likes</p>
            <h3 className="text-2xl font-bold text-foreground mt-1">
              {user.likesCount}
            </h3>
          </div>
          <div className="p-3 bg-blue-500/20 rounded-lg text-blue-500">
            <ThumbsUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-primary/20 border border-border rounded-xl p-5 flex items-center justify-between shadow-sm transition-all hover:shadow-md">
          <div>
            <p className="text-sm font-medium text-foreground">Membership</p>
            <div className="mt-2">
              {user.plan === "Recipehub_Premium" ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-[#f99f1d] text-white shadow-sm">
                  <Crown className="w-3 h-3" /> Premium
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-[#3d403f] text-white">
                  Regular
                </span>
              )}
            </div>
          </div>
          <div className="p-3 bg-[#3d403f]/10 rounded-lg text-foreground">
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

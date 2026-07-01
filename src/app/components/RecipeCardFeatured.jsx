import { Card, Button } from "@heroui/react";
import {Heart} from '@gravity-ui/icons';
import Image from "next/image";
import Link from "next/link";

export default function RecipeCardFeatured({ recipe }) {
  const { recipeName, cuisineType, likesCount, recipeId, _id, recipeImage } = recipe;

  return (
    <Card className="group relative h-[320px] sm:h-[400px] md:h-[550px] overflow-hidden border-none bg-card rounded-3xl shadow-soft hover:shadow-hover hover:-translate-y-2 transition-all duration-300">
      {}
      <div className="absolute inset-0 w-full h-full">
        <Image
          alt={recipeName}
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={recipeImage || '/images/default-recipe.jpg'}
        />
      </div>

      {}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

      {}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
        <div className="flex flex-col gap-2">
          <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm">
            Featured
          </span>
          <span className="bg-mint/90 backdrop-blur-md text-primary px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm inline-block w-max">
            {cuisineType || 'General'}
          </span>
        </div>
        <button className="bg-white/20 backdrop-blur-md p-2.5 rounded-full hover:bg-primary/20 transition-colors">
          <Heart className="w-6 h-6 text-white group-hover:fill-primary group-hover:text-primary transition-colors" />
        </button>
      </div>

      {}
      <Card.Footer className="absolute bottom-0 z-10 flex flex-col items-start w-full p-8">
        <div className="w-full text-white">
          <h3 className="text-2xl font-bold sm:text-4xl line-clamp-2 leading-tight mb-3 group-hover:text-mint transition-colors">
            {recipeName}
          </h3>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full mt-4 gap-4">
            <div className="flex items-center gap-2 text-sm text-white/90">
              <span className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Heart className="w-5 h-5 fill-primary text-primary" /> 
                <span className="font-semibold text-base">{likesCount || 0} Likes</span>
              </span>
            </div>
            
            <Link href={`/recipes/${recipeId || _id}`}>
              <Button 
                className="w-full sm:w-auto bg-primary text-white font-bold rounded-full px-8 py-6 shadow-sm hover:bg-mint hover:text-primary transition-all duration-300 text-lg"
              >
                View Recipe
              </Button>
            </Link>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
}
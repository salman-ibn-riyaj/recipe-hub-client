import { Card, Button } from "@heroui/react";
import {Heart} from '@gravity-ui/icons';
import Image from "next/image";
import Link from "next/link";

export default function RecipeCard({ recipe }) {
  const { recipeName, cuisineType, likesCount, _id, recipeImage } = recipe;

  return (
    <Card className="group relative h-[320px] sm:h-[380px] md:h-[420px] overflow-hidden border-none bg-card rounded-3xl shadow-soft hover:shadow-hover hover:-translate-y-2 transition-all duration-300">
      {}
      <div className="absolute inset-0 w-full h-full">
        <Image
          alt={recipeName}
          width={600}
          height={600}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={recipeImage || '/images/default-recipe.jpg'}
        />
      </div>

      {}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

      {}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
        <span className="bg-mint/90 backdrop-blur-md text-primary px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm">
          {cuisineType || 'General'}
        </span>
        <button className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-primary/20 transition-colors">
          <Heart className="w-5 h-5 text-white group-hover:fill-primary group-hover:text-primary transition-colors" />
        </button>
      </div>

      {}
      <Card.Footer className="absolute bottom-0 z-10 flex flex-col items-start w-full p-6">
        <div className="w-full text-white">
          <h3 className="text-xl font-bold sm:text-2xl line-clamp-2 leading-tight mb-2 group-hover:text-mint transition-colors">
            {recipeName}
          </h3>
          
          <div className="flex items-center justify-between w-full mt-4">
            <div className="flex items-center gap-2 text-sm text-white/90">
              <span className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
                <Heart className="w-4 h-4 fill-primary text-primary" /> 
                <span className="font-semibold">{likesCount || 0}</span>
              </span>
            </div>
            
            <Link href={`/recipes/${_id}`}>
              <Button 
                className="bg-primary text-white font-semibold rounded-full px-5 py-2 shadow-sm hover:bg-mint hover:text-primary transition-all duration-300"
                size="sm"
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
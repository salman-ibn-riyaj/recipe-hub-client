import CategoryFilter from '@/app/components/CateogryFilter';
import RecipeCard from '@/app/components/RecipeCard';
import RecipeList from '@/app/components/RecipeList';
import { serverFetch } from '@/lib/action/core/serverFetch';

import React from 'react';







const RecipesPage = async ({ searchParams }) => {
  
  const resolvedSearchParams = await searchParams;
  
  
  const page = resolvedSearchParams.page || '1';
  const size = 6;
  
  
  const category = resolvedSearchParams.category || ''; 


  const data = await serverFetch(`/api/recipes?page=${page}&size=${size}&category=${category}`);
 
  const recipes = data?.recipes || [];
  const totalData = data?.totalRecipes || 0;
 console.log(data, recipes, totalData, 'data from recipe page')
  return (
    <div className='w-11/12 mx-auto'>

      <div className='text-center md:text-left flex flex-col md:flex-row justify-between items-center mb-6'>
       <div className='mb-6 space-y-1'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl text-primary font-extralight'>Browse Recipes</h1>
        <p className='text-sm font-bold text-secondary'>Best Recipe for Your Next Meal!</p>
        <h1>Total {totalData} Recipes found {category ? `in ${category} category` : ""}</h1>
      </div> 

     <CategoryFilter category={category}></CategoryFilter>

      </div>
      

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {recipes.map(recipe => (
          <div key={recipe._id}>
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
      
      {}
      <div className='mt-8'>
        <RecipeList 
          totalData={totalData} 
          currentPage={parseInt(page)} 
          size={parseInt(size)} 
        />
      </div>
    </div>
  );
};

export default RecipesPage;
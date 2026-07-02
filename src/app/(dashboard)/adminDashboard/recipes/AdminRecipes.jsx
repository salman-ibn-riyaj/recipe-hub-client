
'use client'
import React from 'react';
import { Button, Table, toast } from '@heroui/react';

import { PencilToLine, TrashBin, Star, StarFill } from '@gravity-ui/icons'; 
import Image from 'next/image';
import { EditRecipe } from '@/app/components/EditRecipe';
import { deleteRecipe } from '@/lib/action/deleteRecipe';
import { protectedFetch } from '@/lib/action/core/serverFetch';
import { serverMutate } from '@/lib/action/core/serverMutate';
import { useRouter } from 'next/navigation';


const AdminRecipes = ({recipes, user}) => {
  const router = useRouter()
  return (
    <div className='w-11/12 mx-auto'>
      <div className='mb-6 mt-4 space-y-1'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl text-primary font-extralight'>All Recipes</h1>
        <p className='text-sm font-bold text-secondary'>Recipe Management Table</p>
      </div>

      {}
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Recipe management table">
            <Table.Header>
              <Table.Column isRowHeader >Recipe</Table.Column>
              <Table.Column>Category</Table.Column>
              <Table.Column>Cuisine</Table.Column>
              <Table.Column>Author</Table.Column>
              <Table.Column>Time (Min)</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {recipes && recipes.map((recipe) => (
                <Table.Row key={recipe?._id}>
                  {}
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                    
                      <span className="font-medium text-foreground capitalize">{recipe?.recipeName}</span>
                    </div>
                  </Table.Cell>

                  {}
                  <Table.Cell className="text-muted-foreground">{recipe?.category}</Table.Cell>

                  {}
                  <Table.Cell className="text-muted-foreground">{recipe?.cuisineType}</Table.Cell>

                  {}
                  <Table.Cell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{recipe?.authorName}</span>
                      <span className="text-xs text-muted-foreground">{recipe?.authorEmail}</span>
                    </div>
                  </Table.Cell>

                  {}
                  <Table.Cell className="text-muted-foreground font-mono">{recipe?.preparationTime}</Table.Cell>

                  {}
                  <Table.Cell>
                    <span className={`text-xs px-2.5 py-1 rounded-lg font-semibold capitalize ${
                      recipe?.status === 'published' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {recipe?.status}
                    </span>
                  </Table.Cell>

                  {}
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      {}
                     <EditRecipe recipe={recipe} user={user}></EditRecipe>

                      {}
                      <Button 
                        title={recipe.isFeatured ? "Unfeature" : "Feature"} 
                        onClick={async () =>
                        {
                          const updated =  await serverMutate('/api/featuring', recipe)
                          if(updated.success){
                            toast.success(updated.message)
                            router.refresh()
                          }
                        }
                          
                         }
                        className={`p-1.5 bg-surface hover:bg-mint rounded-lg transition-colors border border-border/40 ${
                          recipe.isFeatured ? 'text-amber-500' : 'text-muted-foreground hover:text-amber-500'
                        }`}
                      >
                        {recipe.isFeatured ? <StarFill width={16} height={16} /> : <Star width={16} height={16} />}
                      </Button>

                      {}
                       <Button 
                                            isIconOnly 
                                            variant="light" 
                                            color="danger" 
                                            aria-label="Delete recipe"
                                            onClick={async() => 
                                              
                                             await deleteRecipe(recipe._id)
                                            }
                                          >
                                            <TrashBin width={16} height={16} style={{ color: '#e53935' }} />
                                          </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer>
          {}
        </Table.Footer>
      </Table>
    </div>
  );
};

export default AdminRecipes;
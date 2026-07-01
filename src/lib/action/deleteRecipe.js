'use server'
import { revalidatePath } from "next/cache";
import { deleteServer } from "./core/deleteServer";

export const deleteRecipe = async (recipeId) => {
  console.log(recipeId, 'Deleting this recipe ID');

  try {
    
    const result = await deleteServer(`/api/recipes?id=${recipeId}`);

    console.log(result, 'Data after delete');

    
    if (result && result.deletedCount > 0) {
      revalidatePath('/userDashboard/myRecipes');
      return { success: true, message: 'Recipe Deleted Successfully!' };
    }

    return { success: false, message: "No recipe found to delete" };

  } catch (error) {
    console.error("Delete Action Error:", error.message);
    return { success: false, error: error.message };
  }
}
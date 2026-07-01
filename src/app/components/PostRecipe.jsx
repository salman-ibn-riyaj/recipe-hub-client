"use client";

import { postRecipe } from "@/lib/action/postRecipe";
import { authClient } from "@/lib/auth-client";
import {CirclePlus, TrashBin, PaperPlane} from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
  Select,
  ListBox,
  toast
} from "@heroui/react";
import { useState } from "react";
import { ImageUpload } from "./ImageUpload";
import { useRouter } from "next/navigation";








const categories = [
  "Main Course",
  "Appetizer",
  "Breakfast",
  "Soup",
  "Salad",
  "Dessert",
  "Snacks",
  "Beverage",
  "Bread and Bakery",
  "Rice and Biryani",
  "Curry",
  "Grill and BBQ",
  "Vegetarian",
  "Seafood",
  "Street Food",
];


const cuisineTypes = [
  "Bangladeshi",
  "Indian",
  "Chinese",
  "Thai",
  "Italian",
  "Mexican",
  "Continental",
  "Middle Eastern",
  "Japanese",
  "Korean",
  "Fusion",
];

const difficultyLevel =[ "Super", "Hard", "Medium", "Easy", "EasyPasy" ]


export function PostRecipe() {
   const router = useRouter()
  const { data: session, isPending, error } = authClient.useSession();
  const user = session?.user;
  const [ingredients, setIngredients] = useState([""]);
  const [imageUrl, setImageUrl] = useState("")
  const handleIngredientChange = (index, value) => {
  const updated = [...ingredients];
  updated[index] = value;
  setIngredients(updated);
};

const addIngredientField = () => {
  setIngredients([...ingredients, ""]);
};

const removeIngredientField = (index) => {
  if (ingredients.length === 1) return; // অন্তত একটা field থাকবে
  setIngredients(ingredients.filter((_, i) => i !== index));
};

const cleanIngredients = ingredients
  .map((item) => item.trim())
  .filter((item) => item !== "");

const onSubmit = async (e) => {
    e.preventDefault();
    
    const form = e.currentTarget; 
    const formData = new FormData(form);
    
    
    const formProps = Object.fromEntries(formData);
  
    const data = {
      ...formProps, 
      recipeImage: imageUrl,
      ingredients: cleanIngredients,
      authorId: user?.id,
      authorName: user?.name,
      authorEmail: user?.email,
      likesCount: 0,
      isFeatured: false,
      status: 'published'
    };


    try {
      const uploadData = await postRecipe(data);

      if (uploadData) {
        toast.success("Recipe published successfully!");
        form.reset(); 
        router.refresh();
      }

    } catch (error) {
      console.error("Error uploading recipe:", error);
      toast.error(error?.message || "Failed to publish recipe.");
    } finally {
      console.log("Submission process completed.");
    }
  };

  return (
    <Form className="w-full mx-auto" onSubmit={onSubmit}>
      <div className="flex flex-col gap-6">
        
        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {}
          <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-soft flex flex-col gap-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-mint flex items-center justify-center">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">Recipe Info</h3>
            </div>
            
            {}
            <TextField
              isRequired
              name="recipeName"
              className="w-full"
              validate={(value) => value.length < 3 ? "Name must be at least 3 characters" : null}
            >
              <Label className="text-foreground font-medium mb-1.5">Recipe Name</Label>
              <Input 
                placeholder="Chicken Biryani" 
                className="bg-background rounded-xl border-border focus:border-primary focus:ring-primary"
              />
              <FieldError className="text-danger text-xs mt-1" />
            </TextField>

            {}
            <Select className="w-full" placeholder="Select one" name="category">
              <Label className="text-foreground font-medium mb-1.5">Choose A Category</Label>
              <Select.Trigger className="bg-background border-border rounded-xl focus:border-primary">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {categories.map((c, ind) => (
                    <ListBox.Item key={ind} id={c} textValue={c}>
                      {c}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            {}
            <Select className="w-full" placeholder="Select one" name="cuisineType">
              <Label className="text-foreground font-medium mb-1.5">Cuisine Type</Label>
              <Select.Trigger className="bg-background border-border rounded-xl focus:border-primary">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {cuisineTypes.map((c, ind) => (
                    <ListBox.Item key={ind} id={c} textValue={c}>
                      {c}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {}
          <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-soft flex flex-col gap-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-mint flex items-center justify-center">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">Details & Timing</h3>
            </div>

            {}
            <Select className="w-full" placeholder="Select one" name="difficultyLevel">
              <Label className="text-foreground font-medium mb-1.5">Difficulty Level</Label>
              <Select.Trigger className="bg-background border-border rounded-xl focus:border-primary">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {difficultyLevel.map((c, ind) => (
                    <ListBox.Item key={ind} id={c} textValue={c}>
                      {c}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            {}
            <TextField isRequired name="preparationTime" className="w-full">
              <Label className="text-foreground font-medium mb-1.5">Preparation Time</Label>
              <Input 
                placeholder="90 Minutes / 1.5 Hour" 
                className="bg-background rounded-xl border-border focus:border-primary"
              />
              <FieldError className="text-danger text-xs mt-1" />
            </TextField>

            {}
            <div className="flex flex-col gap-1.5">
              <label className="text-foreground font-medium mb-1.5">Recipe Photo</label>
              <div className="border-2 border-dashed border-primary/30 rounded-2xl bg-mint/20 overflow-hidden hover:bg-mint/40 transition-colors">
                <ImageUpload value={imageUrl} onChange={(url) => setImageUrl(url)} />
              </div>
            </div>
          </div>

        </div>

        {}
        <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-soft">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-mint flex items-center justify-center">
              <span className="text-primary font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">Ingredients</h3>
          </div>
          <div className="flex flex-col gap-4">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-3">
                <Input
                  placeholder="e.g. 1 kg chicken"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  className="bg-background rounded-xl border-border focus:border-primary flex-1"
                />
                <Button
                  isIconOnly
                  className="text-danger bg-danger/10 hover:bg-danger hover:text-white min-w-12 h-12 rounded-xl transition-colors"
                  onPress={() => removeIngredientField(index)}
                >
                  <TrashBin size={20} />
                </Button>
              </div>
            ))}

            <Button 
              className="bg-mint text-primary hover:bg-primary hover:text-white rounded-xl font-medium mt-2 self-start px-6 transition-colors shadow-sm"
              onPress={addIngredientField}
              startContent={<CirclePlus size={18} />}
            >
              Add Ingredient
            </Button>
          </div>
        </div>

        {}
        <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-soft">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-mint flex items-center justify-center">
              <span className="text-primary font-bold">4</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">Instructions</h3>
          </div>
          <TextField
            isRequired
            name="instructions"
            className="w-full"
            validate={(value) => value.length < 10 ? "Instructions must be at least 10 characters" : null}
          >
            <Label className="sr-only">Instructions</Label>
            <TextArea 
              placeholder="How to Cook Your Recipe? Describe the steps clearly..." 
              className="bg-background rounded-xl border-border focus:border-primary min-h-[160px] p-2"
            />
            <Description className="text-muted-foreground text-sm mt-2">Minimum 10 characters. Tip: Use numbered steps.</Description>
            <FieldError className="text-danger text-xs mt-1" />
          </TextField>
        </div>

        {}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mt-6">
          <Button 
            type="reset" 
            className="w-full sm:w-auto bg-surface border-2 border-border text-foreground font-semibold px-8 py-6 rounded-xl hover:bg-muted/10 transition-all"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="w-full sm:w-auto bg-primary text-white font-bold px-8 py-6 rounded-xl shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all"
            startContent={<PaperPlane size={18} />}
          >
            Publish Recipe
          </Button>
        </div>

      </div>
    </Form>
  );
}
"use client";

import {CirclePlus, Envelope, PaperPlane, Pencil, TrashBin} from "@gravity-ui/icons";
import {Button, FieldError, Form, Input, Label, Modal, Surface, TextField, Select, ListBox, TextArea, Description, toast} from "@heroui/react";
import { ImageUpload } from "./ImageUpload";
import { useState } from "react";
import { updateRecipe } from "@/lib/action/updateRecipe";
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

export function EditRecipe({recipe, user}) {
  const router = useRouter()
    const [ingredients, setIngredients] = useState(recipe?.ingredients || []);
    const [imageUrl, setImageUrl] = useState(recipe.imageUrl || "")
    const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };
  
  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };
  
  const removeIngredientField = (index) => {
    if (ingredients.length === 1) return;
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
        id: recipe._id,
        ingredients: cleanIngredients,
        recipeImage: imageUrl,
        authorId: user?.id,
        authorName: user?.name,
        authorEmail: user?.email,
        likesCount: 0,
        isFeatured: false,
        status: 'published'
      };
  
  
      try {
        const uploadData = await updateRecipe(`/api/recipes`, data, "PATCH");
  
        if (uploadData) {
          toast.success("Recipe Updated successfully!");
          router.refresh()
        }
  
      } catch (error) {
        console.error("Error uploading recipe:", error);
        toast.error(error?.message || "Failed to publish recipe.");
      } finally {
        console.log("Submission process completed.");
      }
    };


  return (
    <div className="w-full">
     <Modal>
      <Button className={'bg-mint hover:bg-primary hover:text-white text-primary rounded-full transition-colors'} isIconOnly><Pencil className='w-4 h-4' /></Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="max-w-5xl rounded-3xl overflow-hidden border border-border">
            <Modal.CloseTrigger className="top-4 right-4 bg-mint text-primary rounded-full hover:bg-primary hover:text-white transition-colors" />
            <Modal.Header className="bg-surface border-b border-border p-6 flex items-center gap-3">
              <div className="bg-mint p-2 rounded-full">
                <Pencil className="size-5 text-primary" />
              </div>
              <Modal.Heading className="text-2xl font-bold text-foreground">Edit Recipe</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-0 bg-background max-h-[80vh] overflow-y-auto">
              <Surface variant="default" className="bg-background">
                <Form className="w-full mx-auto p-6 md:p-8" onSubmit={onSubmit}>
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
                          defaultValue={recipe.recipeName}
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
                        <Select 
                          className="w-full" 
                          placeholder="Select one" 
                          name="category"
                          defaultSelectedKeys={recipe?.category ? [recipe.category] : []}
                        >
                          <Label className="text-foreground font-medium mb-1.5">Choose A Category</Label>
                          <Select.Trigger className="bg-background border-border rounded-xl focus:border-primary">
                            <Select.Value />
                            <Select.Indicator />
                          </Select.Trigger>
                          <Select.Popover>
                            <ListBox 
                              selectionMode="single"
                              defaultSelectedKeys={recipe?.category ? [recipe.category] : []}
                            >
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
                        <Select 
                          className="w-full" 
                          placeholder="Select one" 
                          name="cuisineType"
                          defaultSelectedKeys={recipe?.cuisineType ? [recipe.cuisineType] : []}
                        >
                          <Label className="text-foreground font-medium mb-1.5">Cuisine Type</Label>
                          <Select.Trigger className="bg-background border-border rounded-xl focus:border-primary">
                            <Select.Value />
                            <Select.Indicator />
                          </Select.Trigger>
                          <Select.Popover>
                            <ListBox
                              selectionMode="single"
                              defaultSelectedKeys={recipe?.cuisineType ? [recipe.cuisineType] : []}
                            >
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
                        <Select 
                          className="w-full" 
                          placeholder="Select one" 
                          name="difficultyLevel"
                          defaultSelectedKeys={recipe?.difficultyLevel ? [recipe.difficultyLevel] : []}
                        >
                          <Label className="text-foreground font-medium mb-1.5">Difficulty Level</Label>
                          <Select.Trigger className="bg-background border-border rounded-xl focus:border-primary">
                            <Select.Value />
                            <Select.Indicator />
                          </Select.Trigger>
                          <Select.Popover>
                            <ListBox
                              selectionMode="single"
                              defaultSelectedKeys={recipe?.difficultyLevel ? [recipe.difficultyLevel] : []}
                            >
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
                        <TextField isRequired name="preparationTime" className="w-full" defaultValue={recipe.preparationTime}>
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
                        defaultValue={recipe.instructions}
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
                        type="submit" 
                        className="w-full sm:w-auto bg-primary text-white font-bold px-8 py-6 rounded-xl shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all"
                        startContent={<PaperPlane size={18} />}
                      >
                        Update Recipe
                      </Button>
                    </div>

                  </div>
                </Form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal> 
    </div>
  );
}
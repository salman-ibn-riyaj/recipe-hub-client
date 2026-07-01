"use client";

import { useState } from "react";
import { TriangleExclamationFill } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField, toast } from "@heroui/react";
import { postReport } from "@/lib/action/postReport";

export function ReportRecipe({ user, recipe }) {
  
  const [isOpen, setIsOpen] = useState(false);
  
  const [reason, setReason] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    

    const formData = new FormData(e.currentTarget);
    const message = formData.get("message");

    
    if (!reason) {
      alert("Please select a reason for reporting.");
      return;
    }

    
    const reportData = {
      userId: user?.id || "anonymous_id",
      userName: user?.name || "Anonymous",
      userEmail: user?.email || "No Email",
      recipeId: recipe?._id,
      recipeName: recipe.recipeName,
      reason: reason,
      message: message,
      createdAt: new Date().toISOString()
    };

    console.log("Submitted Report Data:", reportData);
    
    try {
      const uploaded = await postReport('/api/reports', reportData);
      if (uploaded && uploaded.success) {
        toast.success(uploaded.message);
        setReason(""); 
        setIsOpen(false); 
      } else {
        toast.danger(uploaded?.message || "Something went wrong");
      }
    } catch (error) {
      
      toast.danger(error.message || "Failed to submit report");
    }
  };

  return (
    
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      {}
      <Button
        isIconOnly
        variant="light"
        className="text-muted hover:text-primary transition-colors"
        onClick={() => setIsOpen(true)} 
      >
        <TriangleExclamationFill className="w-6 h-6 fill-primary text-primary" />
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            
            {}
            <Modal.Header>
              <Modal.Icon className="bg-background text-accent-soft-foreground">
                <TriangleExclamationFill className="w-6 h-6 bg-transparent fill-primary text-primary" />
              </Modal.Icon>
              <Modal.Heading>Report Recipe</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Help us understand what is wrong with this recipe.
              </p>
            </Modal.Header>

            {}
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form id="recipe-report-form" onSubmit={onSubmit} className="flex flex-col gap-4">
                  
                  {}
                  <TextField 
                    className="w-full opacity-70 pointer-events-none" 
                    name="name" 
                    type="text" 
                    variant="secondary"
                    defaultValue={user?.name || "Anonymous"}
                    isReadOnly
                  >
                    <Label>Your Name</Label>
                    <Input />
                  </TextField>

                  {}
                  <TextField 
                    className="w-full opacity-70 pointer-events-none" 
                    name="email" 
                    type="email" 
                    variant="secondary"
                    defaultValue={user?.email || "No Email"}
                    isReadOnly
                  >
                    <Label>Your Email</Label>
                    <Input />
                  </TextField>

                  {}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="reason-select" className="text-sm font-medium text-foreground">
                      Reason for Report
                    </label>
                    <select 
                      id="reason-select"
                      required
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-default-200 bg-secondary-soft text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                    >
                      <option value="" disabled>Select a reason</option>
                      <option value="Spam">Spam</option>
                      <option value="Offensive Content">Offensive Content</option>
                      <option value="Copyright Issue">Copyright Issue</option>
                    </select>
                  </div>

                  {}
                  <TextField className="w-full" name="message" variant="secondary">
                    <Label>Additional Details</Label>
                    <Input placeholder="Provide more details about the issue..." required />
                  </TextField>

                </form>
              </Surface>
            </Modal.Body>

            {}
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button type="submit" form="recipe-report-form" className={'bg-primary'}>
                Submit Report
              </Button>
            </Modal.Footer>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
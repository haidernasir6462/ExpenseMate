"use client";
import { usePostCreateCategory } from "@/features/categories/api/use-create-categories";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import { useUpdateCategory } from "@/features/categories/api/use-update-category";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useConfirm } from "@/components/use-confirm-modal";
import { insertCategorySchema } from "@/db/schema";

import { z } from "zod";
import { CategoryForm } from "./category-form";

const formSchema = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewCategorySheet = () => {
  const { isOpen, onClose, row } = useNewCategory();
  const createCategory = usePostCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    `This will delete the ${row.name}'s category`
  );

  const CreateCategory = (values: FormValues) => {
    createCategory.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  const UpdateCategory = (values: FormValues) => {
    const postData = {
      id: row.id,
      ...values,
    };
    updateCategory.mutate(postData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const DeleteCategory = async () => {
    const ok = await confirm();
    if (ok) {
      const id = row.id;
      deleteCategory.mutate({ id });
      onClose();
    }
  };

  return (
    <div>
      <ConfirmationDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>{row.id ? "Edit" : "New"} Category</SheetTitle>
            <SheetDescription>
              {row.id ? "Edit this" : "Create new"} Category to track your
              transaction
            </SheetDescription>
          </SheetHeader>
          <CategoryForm
            id={row.id}
            onsubmit={row.name ? UpdateCategory : CreateCategory}
            disable={
              row.name ? updateCategory.isPending : createCategory.isPending
            }
            defaultValues={{
              name: "" || row.name,
            }}
            onDelete={DeleteCategory}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

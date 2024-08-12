"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/components/use-confirm-modal";

import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";

type Props = {
  row: {
    name: string;
    id: string;
  };
};

export default function Actions({ row }: Props) {
  const { onOpen, setRow } = useNewCategory();
  const deleteCategory = useDeleteCategory();

  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    `This will delete the ${row.name}'s category`
  );
  return (
    <>
      <ConfirmationDialog />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              onOpen();
              setRow(row);
            }}
          >
            <Edit className="size-3 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              const ok = await confirm();
              if (ok) {
                const id = row.id;
                deleteCategory.mutate({ id });
              }
            }}
          >
            <Trash className="size-3 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

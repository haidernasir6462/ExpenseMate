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

import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";

type Props = {
  row: {
    name: string;
    id: string;
  };
};

export default function Actions({ row }: Props) {
  const { onOpen, setRow } = useNewTransaction();
  const deleteTransaction = useDeleteTransaction();

  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    `This will delete the ${row.name}'s transaction`
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
                deleteTransaction.mutate({ id });
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

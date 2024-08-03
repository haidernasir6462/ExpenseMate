"use client";
import React from "react";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete-accounts";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/components/use-confirm-modal";

import { Edit, MoreHorizontal, Trash } from "lucide-react";

type Props = {
  row: {
    name: string;
    id: string;
  };
};

export default function Actions({ row }: Props) {
  const { onOpen, setRow } = useNewAccount();
  const deleteAccount = useBulkDeleteAccounts();

  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    `This will delete the ${row.name}'s account`
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
                const ids = [row.id];
                deleteAccount.mutate({ ids });
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

"use client";
import React from "react";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Edit, MoreHorizontal, Trash } from "lucide-react";

type Props = {
  row: {
    name: string;
    id: string;
  };
};

export default function Actions({ row }: Props) {
  const { onOpen, setRow } = useNewAccount();

  return (
    <>
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
          <DropdownMenuItem>
            <Trash className="size-3 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

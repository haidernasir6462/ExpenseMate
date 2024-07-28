"use client";
import React from "react";
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

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
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

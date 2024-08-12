"use client";
import React from "react";
import { Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";
import { columns } from "./columns";

export default function CategoryPage() {
  const { onOpen } = useNewCategory();
  const { data: category, isLoading, error } = useGetCategories();
  const bulkdeleteCategories = useBulkDeleteCategories();
  if (isLoading || error) {
    return (
      <div className="mx-auto max-w-screen-2xl w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-none">
          <CardHeader className="">
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              {isLoading ? (
                <Loader2 className="size-6 animate-spin text-slate-300" />
              ) : error ? (
                <div>Error fetching accounts: {error.message}</div>
              ) : (
                ""
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <>
      <div className="mx-auto max-w-screen-2xl w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-none">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">Categories</CardTitle>
            <Button size="sm" onClick={() => onOpen()}>
              <Plus className="size- mr-2" />
              Add new
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={category || []}
              filterKey="name"
              onDelete={(rows) => {
                const ids = rows.map((row) => row.original.id);
                bulkdeleteCategories.mutate({
                  ids,
                });
              }}
              disabled={bulkdeleteCategories.isPending}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

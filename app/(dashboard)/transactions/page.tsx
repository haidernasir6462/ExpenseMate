"use client";
import React from "react";
import { Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { columns } from "./columns";

export default function TransactionPage() {
  const { onOpen } = useNewTransaction();
  const { data: transaction, isLoading, error } = useGetTransactions();
  const bulkdeleteTransactions = useBulkDeleteTransactions();
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
            <CardTitle className="text-xl line-clamp-1">Transactions</CardTitle>
            <Button size="sm" onClick={() => onOpen()}>
              <Plus className="size- mr-2" />
              Add new
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={transaction || []}
              filterKey="name"
              onDelete={(rows) => {
                const ids = rows.map((row) => row.original.id);
                bulkdeleteTransactions.mutate({
                  ids,
                });
              }}
              disabled={bulkdeleteTransactions.isPending}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

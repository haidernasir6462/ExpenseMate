"use client";
import React from "react";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { Loader2, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AccountPage() {
  const { data: accounts, isLoading, error } = useGetAccounts();
  const { onOpen } = useNewAccount();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-screen-2xl w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-none">
          <CardHeader className="">
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 animate-spin text-slate-300" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return <div>Error fetching accounts: {error.message}</div>;
  }

  return (
    <>
      <div className="mx-auto max-w-screen-2xl w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-none">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">Account</CardTitle>
            <Button size="sm" onClick={onOpen}>
              <Plus className="size- mr-2" />
              Add new
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={accounts || []}
              filterKey="email"
              onDelete={() => {}}
              disabled
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

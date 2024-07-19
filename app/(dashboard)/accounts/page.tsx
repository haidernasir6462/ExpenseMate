"use client";
import React from "react";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function AccountPage() {
  // const { data: accounts, isLoading, error } = useGetAccounts();
  const { onOpen } = useNewAccount();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error fetching accounts: {error.message}</div>;
  // }

  return (
    <>
      <div className="mx-auto max-w-screen-2xl w-full pb-10 -mt-24">
        
      <Card className="border-none drop-shadow-none">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Account</CardTitle>
          <Button size="sm" onClick={onOpen}>
            <Plus className="size- mr-2"/>
            Add new
          </Button>
        </CardHeader>
      </Card>
      </div>
    </>
  );
}

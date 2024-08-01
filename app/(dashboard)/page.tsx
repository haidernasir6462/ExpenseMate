"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

import { Plus } from "lucide-react";
import { columns } from "./accounts/columns";

export default function TransactionPage() {
  return (
    <>
      <div className="mx-auto max-w-screen-2xl w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-none">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">Account</CardTitle>
            <Button size="sm">
              <Plus className="size- mr-2" />
              Add new
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={[]}
              filterKey="name"
              onDelete={() => {}}
              disabled={true}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

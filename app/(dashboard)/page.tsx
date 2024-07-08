"use client";
import React from "react";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

export default function Home() {
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
      {/* <div>
        {accounts?.length ? (
          accounts.map((account) => (
            <div key={account.id}>
              <p>{account.name}</p>
            </div>
          ))
        ) : (
          <div>No accounts found.</div>
        )}
      </div> */}
      <Button onClick={onOpen}> Create a new transaction</Button>
    </>
  );
}

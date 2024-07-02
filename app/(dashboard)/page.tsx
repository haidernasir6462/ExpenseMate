import React from "react";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

export default function Home() {
  const { data: accounts, isLoading, error } = useGetAccounts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching accounts: {error.message}</div>;
  }

  return (
    <div>
      {accounts?.length ? (
        accounts.map((account) => (
          <div key={account.id}>
            <p>{account.name}</p>
          </div>
        ))
      ) : (
        <div>No accounts found.</div>
      )}
    </div>
  );
}

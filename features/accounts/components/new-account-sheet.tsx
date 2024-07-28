"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AccountForm } from "./account-form";
import { useNewAccount } from "../hooks/use-new-account";
import { usePostCreateAccount } from "../api/use-create-accounts";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useUpdateAccount } from "../api/use-update-account";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewAccountSheet = () => {
  const { isOpen, onClose, row } = useNewAccount();
  const createAccount = usePostCreateAccount();
  const updateAccount = useUpdateAccount();

  const CreateAccount = (values: FormValues) => {
    createAccount.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  const UpdateAccount = (values: FormValues) => {
    const postData = {
      id: row.id,
      ...values,
    };
    updateAccount.mutate(postData, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create new account to track your transcation
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          id={row.id}
          onsubmit={row.name ? UpdateAccount : CreateAccount}
          disable={row.name ? updateAccount.isPending : createAccount.isPending}
          defaultValues={{
            name: "" || row.name,
          }}
        />
      </SheetContent>
    </Sheet>
  );
};

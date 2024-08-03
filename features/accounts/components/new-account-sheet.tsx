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
import { useConfirm } from "../hooks/use-confirm-modal";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete-accounts";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewAccountSheet = () => {
  const { isOpen, onClose, row } = useNewAccount();
  const createAccount = usePostCreateAccount();
  const updateAccount = useUpdateAccount();
  const deleteAccount = useBulkDeleteAccounts();

  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    `This will delete the ${row.name}'s account`
  );

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

  const DeleteAccount = async () => {
    const ok = await confirm();
    if (ok) {
      const ids = [row.id];
      deleteAccount.mutate({ ids });
      onClose();
    }
  };

  return (
    <div>
      <ConfirmationDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>{row.id ? "Edit" : "New"} Account</SheetTitle>
            <SheetDescription>
              {row.id ? "Edit this" : "Create new"} account to track your
              transcation
            </SheetDescription>
          </SheetHeader>
          <AccountForm
            id={row.id}
            onsubmit={row.name ? UpdateAccount : CreateAccount}
            disable={
              row.name ? updateAccount.isPending : createAccount.isPending
            }
            defaultValues={{
              name: "" || row.name,
            }}
            onDelete={DeleteAccount}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

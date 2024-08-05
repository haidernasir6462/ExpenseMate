"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useConfirm } from "@/components/use-confirm-modal";

import { useUpdateTransaction } from "@/features/transactions/api/use-update-transaction";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";
import { usePostCreateTransaction } from "@/features/transactions/api/use-create-transactions";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";

import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";
import { TransactionForm } from "./transaction-form";

const formSchema = insertTransactionSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewTransactionSheet = () => {
  const { isOpen, onClose, row } = useNewTransaction();
  const createTransaction = usePostCreateTransaction();
  const updateTransaction = useUpdateTransaction();
  const deleteTransaction = useDeleteTransaction();

  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    `This will delete the ${row.name}'s transaction`
  );

  const CreateTransaction = (values: FormValues) => {
    createTransaction.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  const UpdateTransaction = (values: FormValues) => {
    const postData = {
      id: row.id,
      ...values,
    };
    updateTransaction.mutate(postData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const DeleteTransaction = async () => {
    const ok = await confirm();
    if (ok) {
      const id = row.id;
      deleteTransaction.mutate({ id });
      onClose();
    }
  };

  return (
    <div>
      <ConfirmationDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>{row.id ? "Edit" : "New"} Transaction</SheetTitle>
            <SheetDescription>
              {row.id ? "Edit this" : "Create new"} transaction to track your
              transcation
            </SheetDescription>
          </SheetHeader>
          <TransactionForm
            id={row.id}
            onsubmit={row.name ? UpdateTransaction : CreateTransaction}
            disable={
              row.name ? updateTransaction.isPending : createTransaction.isPending
            }
            defaultValues={{
              name: "" || row.name,
            }}
            onDelete={DeleteTransaction}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

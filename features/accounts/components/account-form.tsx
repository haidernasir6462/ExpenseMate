"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { insertAccountSchema } from "@/db/schema";
import { Trash } from "lucide-react";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onsubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disable?: boolean;
};

export const AccountForm = ({
  id,
  defaultValues,
  onsubmit,
  onDelete,
  disable,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onsubmit(values)
  };

  const handleDelete = () => {
    onDelete?.();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Card, Cash"
                  disabled={disable}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disable} type="submit">
          {id ? "Save Changes" : "Create Account"}
        </Button>
        {!!id && (
          <Button
            type="button"
            variant="outline"
            onSubmit={handleDelete}
            disabled={disable}
            className="w-full"
          >
            <Trash className="size-3" />
            <span className="ml-4">Delete</span>
          </Button>
        )}
      </form>
    </Form>
  );
};

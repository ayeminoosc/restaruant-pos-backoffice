"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { modifierModelSchema } from "@/lib/modifier-group-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CurrencyInput } from "./currency-input";

type ModifierFormData = z.infer<typeof modifierModelSchema>;

interface AddModifierModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (modifier: { name: string; price: string }) => void;
}

export function AddModifierModal({
  open,
  onOpenChange,
  onAdd,
}: AddModifierModalProps) {
  const form = useForm<ModifierFormData>({
    resolver: zodResolver(modifierModelSchema),
    defaultValues: {
      name: "",
      price: "",
    },
  });

  const onSubmit = (data: ModifierFormData) => {
    onAdd({ name: data.name, price: data.price });
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Modifier Item</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">
                    Modifier Item Name
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter modifier name"
                      type="text"
                      {...field}
                      className="h-[56px] md:text-lg placeholder:text-gray-300 placeholder:text-lg focus-visible:ring-0 focus:outline-none aria-invalid:border-[#cdcdcd]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">
                    Price <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <CurrencyInput
                      placeholder="0.00 Ks"
                      type="number"
                      step="0.01"
                      min="0"
                      {...field}
                      className="h-[56px] md:text-lg placeholder:text-gray-300 placeholder:text-lg focus-visible:ring-0 focus:outline-none aria-invalid:border-[#cdcdcd]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-[46px]"
              >
                Cancel
              </Button>
              <Button type="submit" className="h-[46px]">
                Add Modifier
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

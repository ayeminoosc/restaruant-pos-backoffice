"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { modifierGroupSchema } from "@/lib/modifier-group-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ModifierItem } from "../../../types/modifier-group";
import { ColorPicker } from "../color-picker";
import { AddModifierModal } from "./add-modifier-modal";
import { CurrencyInput } from "./currency-input";

type FormData = z.infer<typeof modifierGroupSchema>;

export function ModifierGroupForm() {
  const [modifierItems, setModifierItems] = useState<ModifierItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [showModifierError, setShowModifierError] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(modifierGroupSchema),
    defaultValues: {
      groupName: "",
      bilingualName: "",
      price: "",
      minSelection: "",
      maxSelection: "",
      selectionType: "single",
      required: "yes",
      buttonColor: "#FF5722",
      active: true,
    },
  });

  const addModifierItem = (modifier: { name: string; price: string }) => {
    const newItem: ModifierItem = {
      name: modifier.name,
      price: modifier.price,
    };
    setModifierItems([...modifierItems, newItem]);
    if (showModifierError) {
      setShowModifierError(false);
    }
  };

  const removeModifierItem = (idx: number) => {
    const newItems = modifierItems.filter((_, index) => index !== idx);
    setModifierItems(newItems);
    if (newItems.length === 0) {
      setShowModifierError(true);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modifierItems.length === 0) {
      setShowModifierError(true);
    } else {
      setShowModifierError(false);
    }
    form.handleSubmit(onSubmit, onError)();
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", {
      ...data,
      modifierItems,
    });
  };

  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);
  };
  return (
    <div className="max-w-[1025px] overflow-y-auto mx-auto mt-10">
      <Form {...form}>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* GROUP NAME */}
          <FormField
            control={form.control}
            name="groupName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-medium">
                  Create modifier group name
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter group name"
                    type="text"
                    {...field}
                    className="h-[56px] md:text-lg placeholder:text-lg placeholder:text-gray-300 focus-visible:ring-0 focus:outline-none aria-invalid:border-[#cdcdcd]"
                  />
                </FormControl>
                <FormMessage className="text-base" />
              </FormItem>
            )}
          />

          {/* BILLINGUAL NAME */}
          <FormField
            control={form.control}
            name="bilingualName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-medium">
                  Bilingual name
                  <span className="text-gray-400">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter translated name (e.g., 'Hta-min-kyaw')"
                    type="text"
                    {...field}
                    className="h-[56px] md:text-lg placeholder:text-lg placeholder:text-gray-300 focus-visible:ring-0 focus:outline-none aria-invalid:border-[#cdcdcd]"
                  />
                </FormControl>
                <FormMessage className="text-base" />
              </FormItem>
            )}
          />

          {/* MODIFIER ITEMS */}
          <div>
            <Label className="text-xl font-medium">
              Modifier Items <span className="text-red-500">*</span>
            </Label>
            <p className="text-base text-gray-500 mb-3">
              Add new customize modifier items
            </p>

            <div className="space-y-2">
              {!!modifierItems?.length &&
                modifierItems.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        value={item.name}
                        readOnly
                        className=" h-[56px] md:text-lg focus-visible:ring-0 focus:outline-none "
                        type="text"
                      />
                    </div>
                    <div className="flex-1">
                      <CurrencyInput
                        value={item.price}
                        readOnly
                        className="focus-visible:ring-0 focus:outline-none md:text-lg"
                        type="text"
                      />
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeModifierItem(idx)}
                      className="text-red-500 hover:text-red-700 hover:bg-transparent cursor-pointer"
                    >
                      <Trash2 className="size-7 " />
                    </Button>
                  </div>
                ))}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(true)}
              className="mt-3 text-[15px] font-normal border border-red-300  cursor-pointer"
            >
              <Plus className="size-6 mr-2" />
              Add Modifier
            </Button>
            {showModifierError && modifierItems.length === 0 && (
              <p className="text-sm text-red-500 mt-1">
                Please add at least one modifier item.
              </p>
            )}
          </div>

          {/* PRICE */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-medium">
                  Price <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <CurrencyInput
                    placeholder="00 Ks"
                    type="number"
                    step="0.01"
                    min="0"
                    {...field}
                    className="h-[56px] placeholder:text-gray-300 md:text-lg placeholder:text-lg focus-visible:ring-0 focus:outline-none aria-invalid:border-[#cdcdcd]"
                  />
                </FormControl>
                <FormMessage className="text-base" />
              </FormItem>
            )}
          />

          {/* MIN  SELECTION */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="minSelection"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-medium">
                    Min Selection <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      min="0"
                      {...field}
                      className="h-[56px] md:text-lg placeholder:text-lg placeholder:text-gray-300 focus-visible:ring-0 focus:outline-none aria-invalid:border-[#cdcdcd]"
                    />
                  </FormControl>
                  <FormMessage className="text-base" />
                </FormItem>
              )}
            />

            {/* MAX  SELECTION */}
            <FormField
              control={form.control}
              name="maxSelection"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-medium">
                    Max Selection <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        placeholder="1"
                        className="h-[56px] md:text-lg placeholder:text-lg placeholder:text-gray-300 focus-visible:ring-0 focus:outline-none aria-invalid:border-[#cdcdcd]"
                      />
                    </FormControl>
                  </FormControl>

                  <FormMessage className="text-base" />
                </FormItem>
              )}
            />
          </div>

          {/*   SELECTION TYPE */}
          <FormField
            control={form.control}
            name="selectionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-medium">
                  Selection Type <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    // className="flex gap-6"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="single" id="single" />
                      <Label htmlFor="single" className="text-lg">
                        Single
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="multiple" id="multiple" />
                      <Label htmlFor="multiple" className="text-lg">
                        Multiple
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-base" />
              </FormItem>
            )}
          />

          {/* REQUIRED */}
          <FormField
            control={form.control}
            name="required"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-medium">
                  Required <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    // className="flex gap-6"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes" className="text-lg">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no" className="text-lg">
                        No <span className="text-gray-400">(Optional)</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-base" />
              </FormItem>
            )}
          />

          {/* ADVANCED SETTING */}
          <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
              <span className="font-medium text-xl">Advanced Setting</span>
              <ChevronRight
                className={`size-4 transition-transform ${
                  isAdvancedOpen ? "rotate-90" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 pt-4">
              <FormField
                control={form.control}
                name="buttonColor"
                render={() => (
                  <FormItem>
                    <ColorPicker name="buttonColor" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CollapsibleContent>
          </Collapsible>

          {/* ACTIVE */}
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-xl">Active</FormLabel>
                </div>
              </FormItem>
            )}
          />

          {/* SUBMIT BUTTON */}
          <div className="flex gap-3 pt-4 mb-10">
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-orange-600 h-[56px] font-medium text-xl cursor-pointer transition-colors duration-200"
            >
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-[#dadada] h-[56px] font-medium text-xl cursor-pointer hover:bg-[#cfcfcf] transition-colors duration-200"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>

      {/* MODIFIER MODEL */}
      <AddModifierModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onAdd={addModifierItem}
      />
    </div>
  );
}

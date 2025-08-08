"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ModifierGroupsType } from "@/types/modifier-group";
import CustomButton from "../custom-button";

interface ModifierSectionProps {
  modifierGroups: ModifierGroupsType[];
  searchModifiers: string;
  setSearchModifiers: (value: string) => void;
  onAddNewModifierGroup?: () => void;
}

export function ModifierSection({ 
  modifierGroups, 
  searchModifiers, 
  setSearchModifiers,
  onAddNewModifierGroup
}: ModifierSectionProps) {
  const form = useFormContext();
  const router = useRouter();

  const handleAddNewModifierGroup = () => {
    if (onAddNewModifierGroup) {
      onAddNewModifierGroup();
    } else {
      router.push("/modifier-groups/new");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#2A2A2A]">Modifier</h2>
        <FormField
          control={form.control}
          name="modifiers.enabled"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-green-600 w-[64px] h-[28px] ml-2"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {form.watch("modifiers.enabled") && (
        <div className="space-y-4 border border-gray-200 rounded-lg p-4 bg-[#F9F9F9]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search modifier groups"
              value={searchModifiers}
              onChange={(e) => setSearchModifiers(e.target.value)}
              className="w-full h-[56px] px-4 py-2.5 border border-[#9C9C9C] 
              rounded-lg text-lg focus:outline-none bg-white focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-5 mb-6">
            {modifierGroups.length > 0 ? (
              (() => {
                const filteredModifierGroups = searchModifiers
                  ? modifierGroups.filter(group =>
                      group.groupName.toLowerCase().includes(searchModifiers.toLowerCase())
                    )
                  : modifierGroups;

                if (filteredModifierGroups.length === 0) {
                  return (
                    <div className="col-span-2 text-center py-8 text-gray-500">
                      No modifier groups found matching your search.
                    </div>
                  );
                }

                const midPoint = Math.ceil(filteredModifierGroups.length / 2);
                const leftColumn = filteredModifierGroups.slice(0, midPoint);
                const rightColumn = filteredModifierGroups.slice(midPoint);

                return (
                  <>
                    {/* Left Column */}
                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name="modifiers.modifierGroups"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="space-y-3">
                                {leftColumn.map((group) => (
                                  <div key={group.id} className="flex items-center space-x-3.5">
                                    <Checkbox
                                      checked={field.value?.includes(group.id || "")}
                                      onCheckedChange={(checked) => {
                                        const currentValues = field.value || [];
                                        if (checked) {
                                          field.onChange([...currentValues, group.id || ""]);
                                        } else {
                                          field.onChange(currentValues.filter((id: string) => id !== group.id));
                                        }
                                      }}
                                      className="size-4.5 border-2 border-black"
                                    />
                                    <div className="text-lg font-inter text-[20px] cursor-pointer text-black ml-2">
                                      {group.groupName} 
                                    </div>
                                    <div className="text-[20px] font-inter text-[#9C9C9C]">
                                      ({group.modifierItems.map(item => item.name).join(", ")})
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name="modifiers.modifierGroups"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="space-y-3">
                                {rightColumn.map((group) => (
                                  <div key={group.id} className="flex items-center space-x-3.5">
                                    <Checkbox
                                      checked={field.value?.includes(group.id || "")}
                                      onCheckedChange={(checked) => {
                                        const currentValues = field.value || [];
                                        if (checked) {
                                          field.onChange([...currentValues, group.id || ""]);
                                        } else {
                                          field.onChange(currentValues.filter((id: string) => id !== group.id));
                                        }
                                      }}
                                      className="size-4.5 border-2 border-black"
                                    />
                                    <div className="text-lg font-inter text-[20px] cursor-pointer text-black ml-2">
                                      {group.groupName} 
                                    </div>
                                    <div className="text-[20px] font-inter text-[#9C9C9C]">
                                      ({group.modifierItems.map(item => item.name).join(", ")})
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                );
              })()
            ) : (
              <div className="col-span-2 text-center py-8 text-gray-500">
                No modifier groups available. Please add modifier groups first.
              </div>
            )}
          </div>
          <CustomButton
            type="button"
            variant="outline"
            className="h-8.5 text-[16px] font-[400] border-1 border-[#FF6E30] rounded-[10px] w-fit"
            onClick={handleAddNewModifierGroup}
          >
            <Plus className="w-6 h-6 mr-1" />
            New modifier group
          </CustomButton>
        </div>
      )}
    </div>
  );
}

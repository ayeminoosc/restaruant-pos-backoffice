"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ModifierGroupsType } from "@/types/modifier-group";
import { Prefix } from "@/types/prefix";
import CustomButton from "../custom-button";

interface PrefixSectionProps {
  modifierGroups: ModifierGroupsType[];
  prefixes: Prefix[];
  searchPrefixes: string;
  setSearchPrefixes: (value: string) => void;
}

export function PrefixSection({ 
  modifierGroups, 
  prefixes, 
  searchPrefixes, 
  setSearchPrefixes 
}: PrefixSectionProps) {
  const form = useFormContext();
  const router = useRouter();

  return (
    <div className="space-y-4 rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-[500] text-[#2A2A2A]">Prefixes (Depending on modifier groups)</h2>
        <FormField
          control={form.control}
          name="prefixes.enabled"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={!form.watch("modifiers.modifierGroups")?.length}
                  className="data-[state=checked]:bg-green-600 w-[64px] h-[28px] ml-2"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {form.watch("prefixes.enabled") && form.watch("modifiers.modifierGroups")?.length > 0 && (
        <div className="space-y-4 max-w-[1023px] border border-gray-200 rounded-lg p-4 bg-[#F9F9F9]">
          {/* Modifier Items Grid */}
          <div className="">
            {(() => {
              // Get selected modifier groups
              const selectedModifierGroups = form.watch("modifiers.modifierGroups") || [];
              const selectedGroups = modifierGroups.filter(group => 
                selectedModifierGroups.includes(group.id || "")
              );

              if (selectedGroups.length === 0) {
                return (
                  <div className="text-center py-8 text-gray-500">
                    No modifier groups selected. Please select modifier groups first.
                  </div>
                );
              }

              // Get all modifier items from selected groups
              const allModifierItems = selectedGroups.flatMap(group => 
                group.modifierItems.map(item => ({
                  ...item,
                  groupName: group.groupName,
                  groupId: group.id
                }))
              );

              // Filter modifier items based on search
              const filteredModifierItems = searchPrefixes 
                ? allModifierItems.filter(item => 
                    item.name.toLowerCase().includes(searchPrefixes.toLowerCase()) ||
                    item.groupName.toLowerCase().includes(searchPrefixes.toLowerCase())
                  )
                : allModifierItems;

              if (filteredModifierItems.length === 0) {
                return (
                  <div className="text-center py-8 text-gray-500">
                    No modifier items found matching your search.
                  </div>
                );
              }

              // Group items by modifier group
              const groupedItems = selectedGroups.map(group => ({
                groupName: group.groupName,
                groupId: group.id,
                items: filteredModifierItems.filter(item => item.groupId === group.id)
              })).filter(group => group.items.length > 0);

              return groupedItems.map((group) => (
                <div key={group.groupId} className="">
                  <div className="grid grid-cols-3 gap-[132px]">
                    {group.items.map((item) => (
                      <div key={`${group.groupId}-${item.name}`} className="space-y-4 max-w-[242px] mb-6">
                        <div className="font-semibold text-[20px]">{item.name}</div>
                        <div className="space-y-3">
                          {prefixes.map((prefix) => (
                            <FormField
                              key={`${group.groupId}-${item.name}-${prefix.id}`}
                              control={form.control}
                              name="prefixes.selectedPrefixes"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="flex items-center space-x-3">
                                      <Checkbox
                                        checked={field.value?.includes(`${group.groupId}-${item.name}-${prefix.id}`)}
                                        onCheckedChange={(checked) => {
                                          const currentValues = field.value || [];
                                          if (checked) {
                                            field.onChange([...currentValues, `${group.groupId}-${item.name}-${prefix.id}`]);
                                          } else {
                                            field.onChange(currentValues.filter((name: string) => name !== `${group.groupId}-${item.name}-${prefix.id}`));
                                          }
                                        }}
                                        className="size-4.5 border-2 border-black"
                                      />
                                      <FormLabel className="text-base text-[20px] font-[400] cursor-pointer">{prefix.name}</FormLabel>
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ));
            })()}
          </div>

          <CustomButton
            type="button"
            variant="outline"
            className="h-8.5 text-[16px] font-[400] border-1 border-[#FF6E30] rounded-[10px] w-fit"
            onClick={() => router.push("/prefixes/new")}
          >
            <Plus className="w-6 h-6 mr-1" />
            Add new prefix
          </CustomButton>
        </div>
      )}
    </div>
  );
}

"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { menuItemFormSchema, MenuItemFormInput } from "@/lib/validations/menu-item-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { ArrowLeft, Camera, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import MenuItemInput from "./menu-item-input";
import MenuItemCurrencyInput from "./menu-item-currency-input";
import { MenuItemColorPicker } from "./menu-item-color-picker";
import MenuItemButton from "./menu-item-button";
import CategorySection from "./category-section";
import { useMenuItemStore } from "@/store/menu-item-store";
import { useModifierGroupStore } from "@/store/modifier-group-store";
import { usePrefixStore } from "@/store/prefix-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { inventoryApi, InventoryItem } from "@/utils/inventory-api";
import ImageBox from "@/common/image-box";
import { useMenuItemDraftStore } from "@/store/menu-item-draft-store";

interface MenuItemFormProps {
  defaultValues: Partial<MenuItemFormInput>;
  onSubmit: (data: MenuItemFormInput) => void;
  mode: "create" | "edit";
}

export function MenuItemForm({ defaultValues, onSubmit, mode }: MenuItemFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchModifiers, setSearchModifiers] = useState("");
  const [searchPrefixes, setSearchPrefixes] = useState("");
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const { 
    isSubmitting, 
    status, 
    resetStatus
  } = useMenuItemStore();
  const { modifierGroups, getModifierGroupsData } = useModifierGroupStore();
  const { prefixes, fetchPrefixes } = usePrefixStore();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useMenuItemDraftStore();

  const form = useForm<MenuItemFormInput>({
    resolver: zodResolver(menuItemFormSchema),
    defaultValues: draft || {
      name: "",
      bilingualName: "",
      barCode: "",
      price: "",
      categoryId: "",
      subcategoryId: "",
      photo: "",
      modifiers: {
        enabled: true,
        modifierGroups: [],
      },
      prefixes: {
        enabled: false,
        selectedPrefixes: [],
      },
      advancedSettings: {
        connectToRecipes: false,
        connectToInventory: false,
        inventoryItems: [],
      },
      buttonColor: "#FF6B35",
      active: false,
      ...defaultValues,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "advancedSettings.inventoryItems",
  });

  const modifiersEnabled = form.watch("modifiers.enabled");
  const selectedCategoryId = form.watch("categoryId");
  const connectToInventory = form.watch("advancedSettings.connectToInventory");

  useEffect(() => {
    getModifierGroupsData();
    fetchPrefixes();
  }, [getModifierGroupsData, fetchPrefixes]);

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const items = await inventoryApi.getInventoryItems();
        setInventoryItems(items);
      } catch (error) {
        console.error('Error fetching inventory items:', error);
      }
    };
    fetchInventoryItems();
  }, []);

  useEffect(() => {
    if (status === "success") {
      toast.success(mode === "create" ? "Menu item created successfully!" : "Menu item updated successfully!");
      resetStatus();
      router.push("/dashboard/menu-items");
    } else if (status === "error") {
      toast.error("Something went wrong!");
      resetStatus();
    }
  }, [status, mode, router, resetStatus]);

  // Sync form changes to draft
  useEffect(() => {
    const subscription = form.watch((values) => {
      setDraft(values);
    });
    return () => subscription.unsubscribe();
  }, [form, setDraft]);

  const handleSubmit = async (data: MenuItemFormInput) => {
    await onSubmit(data);
    clearDraft();
  };

  const handleCancel = () => {
    clearDraft();
    router.back();
  };

  const filteredModifierGroups = modifierGroups.filter(group =>
    group.groupName.toLowerCase().includes(searchModifiers.toLowerCase())
  );



  return (
    <div className="flex justify-center">
      <div className="w-[1025px] mx-auto pb-">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 p-4 w-full">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-semibold">Add new item</h1>
            </div>

            {/* Item Photo Section */}
            <div className="flex justify-center">
              <div className="w-[240px] h-[218px] mx-auto mt-10 mb-5 border-2 border-dashed border-gray-400 p-3">
                <ImageBox />
              </div>
            </div>

            {/* Basic Information */}
            <div className="space-y-6">
              
              <MenuItemInput
                control={form.control}
                name="name"
                label="Create new item name"
                placeholder="Enter item name"
                optional={false}
              />

              <MenuItemInput
                control={form.control}
                name="bilingualName"
                label="Bilingual name"
                placeholder="Enter translated name (e.g., '炒饭')"
                optional
              />

              <MenuItemInput
                control={form.control}
                name="barCode"
                label="Bar Code"
                placeholder="eg., ACF00--"
                optional={false}
              />

              <MenuItemCurrencyInput
                control={form.control}
                name="price"
                label="Price"
                placeholder="00 Ks"
                optional={false}
              />

              <CategorySection
                selectedCategory={form.watch("categoryId") || ""}
                setSelectedCategory={(value) => form.setValue("categoryId", value)}
                selectedSubCategory={form.watch("subcategoryId") || ""}
                setSelectedSubCategory={(value) => form.setValue("subcategoryId", value)}
              />
            </div>

            {/* Modifier Section */}
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
                          className="data-[state=checked]:bg-green-600"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {modifiersEnabled && (
                <div className="space-y-4 border border-gray-200 rounded-lg p-4 bg-[#F9F9F9]">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search modifier groups"
                      value={searchModifiers}
                      onChange={(e) => setSearchModifiers(e.target.value)}
                      className="w-full h-12 px-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {modifierGroups.length > 0 ? (
                      (() => {
                        const filteredModifierGroups = searchModifiers 
                          ? modifierGroups.filter(group => 
                              group.groupName.toLowerCase().includes(searchModifiers.toLowerCase())
                            )
                          : modifierGroups;
                        
                        // Split into left and right columns
                        const leftColumn = filteredModifierGroups.slice(0, Math.ceil(filteredModifierGroups.length / 2));
                        const rightColumn = filteredModifierGroups.slice(Math.ceil(filteredModifierGroups.length / 2));
                        
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
                                          <div key={group.id} className="flex items-center space-x-3">
                                            <Checkbox
                                              checked={field.value?.includes(group.id || "")}
                                              onCheckedChange={(checked) => {
                                                const currentValues = field.value || [];
                                                if (checked) {
                                                  field.onChange([...currentValues, group.id || ""]);
                                                } else {
                                                  field.onChange(currentValues.filter(id => id !== group.id));
                                                }
                                              }}
                                            />
                                            <FormLabel className="text-lg cursor-pointer">
                                              {group.groupName} ({group.modifierItems.map(item => item.name).join(", ")})
                                            </FormLabel>
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
                                          <div key={group.id} className="flex items-center space-x-3">
                                            <Checkbox
                                              checked={field.value?.includes(group.id || "")}
                                              onCheckedChange={(checked) => {
                                                const currentValues = field.value || [];
                                                if (checked) {
                                                  field.onChange([...currentValues, group.id || ""]);
                                                } else {
                                                  field.onChange(currentValues.filter(id => id !== group.id));
                                                }
                                              }}
                                            />
                                            <FormLabel className="text-lg cursor-pointer">
                                              {group.groupName} ({group.modifierItems.map(item => item.name).join(", ")})
                                            </FormLabel>
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

                    <MenuItemButton
                    type="button"
                    variant="outline"
                    className="w-fit h-8.5 text-lg border-2 border-[#FF6E30] rounded-lg"
                    onClick={() => router.push("/modifier-groups/new")}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    New modifier group
                  </MenuItemButton>
                </div>
              )}
            </div>

            {/* Prefixes Section */}
            <div className="space-y-4 rounded-lg ">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#2A2A2A]">Prefixes (Depending on modifier groups)</h2>
                <FormField
                  control={form.control}
                  name="prefixes.enabled"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-green-600"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {form.watch("prefixes.enabled") && (
                  <div className="space-y-4 border border-gray-200 rounded-lg p-4 bg-[#F9F9F9]">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search prefixes"
                        value={searchPrefixes}
                        onChange={(e) => setSearchPrefixes(e.target.value)}
                        className="w-full h-12 px-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    {/* Prefix Categories Grid */}
                    <div className="space-y-6">
                      {prefixes.length > 0 ? (
                        // Filter prefixes based on search
                        (() => {
                          const filteredPrefixes = searchPrefixes 
                            ? prefixes.filter(prefix => 
                                prefix.name.toLowerCase().includes(searchPrefixes.toLowerCase())
                              )
                            : prefixes;
                          
                          return Array.from({ length: Math.ceil(filteredPrefixes.length / 3) }, (_, rowIndex) => (
                            <div key={rowIndex} className="grid grid-cols-3 gap-6">
                              {filteredPrefixes.slice(rowIndex * 3, (rowIndex + 1) * 3).map((prefix) => (
                                <div key={prefix.id} className="p-4">
                                  <div className="font-bold text-lg mb-3">{prefix.name}</div>
                                  <div className="space-y-2">
                                    {["No", "Less", "Extra"].map((option) => (
                                      <FormField
                                        key={`${prefix.id}-${option}`}
                                        control={form.control}
                                        name="prefixes.selectedPrefixes"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormControl>
                                              <div className="flex items-center space-x-2">
                                                <Checkbox
                                                  checked={field.value?.includes(`${prefix.id}-${option}`)}
                                                  onCheckedChange={(checked) => {
                                                    const currentValues = field.value || [];
                                                    if (checked) {
                                                      field.onChange([...currentValues, `${prefix.id}-${option}`]);
                                                    } else {
                                                      field.onChange(currentValues.filter(name => name !== `${prefix.id}-${option}`));
                                                    }
                                                  }}
                                                />
                                                <FormLabel className="text-base cursor-pointer">{option}</FormLabel>
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
                          ));
                        })()
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          No prefixes available. Please add prefixes first.
                        </div>
                      )}
                    </div>

                    <MenuItemButton
                      type="button"
                      variant="outline"
                    className="w-fit h-8.5 text-lg border-2 border-[#FF6E30] rounded-lg"
                      onClick={() => router.push("/prefixes/new")}
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add new prefix
                    </MenuItemButton>
                  </div>
                )}
              </div>

            {/* Advanced Settings */}
            <div className="space-y-4">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <h2 className="text-xl font-semibold text-[#2A2A2A]">Advanced Setting</h2>
                {showAdvanced ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
              </div>

              {showAdvanced && (
                <div className="space-y-6 pl-4">
                  <FormField
                    control={form.control}
                    name="advancedSettings.connectToRecipes"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel className="text-lg">Connect to recipes</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-green-600"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="advancedSettings.connectToInventory"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel className="text-lg">Connect to inventory</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-green-600"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {connectToInventory && (
                    <div className="space-y-4">
                      {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-4 items-center">
                                      <div className="flex-1">
                            <FormField
                              control={form.control}
                              name={`advancedSettings.inventoryItems.${index}.inventoryName`}
                              render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                     <FormControl>
                                       <SelectTrigger className="w-full h-full px-4 text-base border border-input bg-background rounded-md shadow-sm flex items-center focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1">
                                         <SelectValue placeholder="Inventory name" />
                                       </SelectTrigger>
                                     </FormControl>
                                    <SelectContent>
                                      {inventoryItems.map((item) => (
                                        <SelectItem key={item.id} value={item.id}>
                                          {item.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                           </div>
                          
                            <div className="flex-1">
                            <MenuItemInput
                              control={form.control}
                              name={`advancedSettings.inventoryItems.${index}.stock`}
                              placeholder="Stock"
                              label=""
                            />
                           </div>
                          
                                                     <div className="flex-1">
                            <FormField
                              control={form.control}
                              name={`advancedSettings.inventoryItems.${index}.unit`}
                              render={({ field }) => (
                                <FormItem>
                                                                     <Select onValueChange={field.onChange} value={field.value}>
                                     <FormControl>
                                       <SelectTrigger className="w-full h-14 px-4 text-base border border-input bg-background rounded-md shadow-sm flex items-center focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1">
                                         <SelectValue placeholder="Unit" />
                                       </SelectTrigger>
                                     </FormControl>
                                    <SelectContent>
                                      <SelectItem value="kg">Kg</SelectItem>
                                      <SelectItem value="g">g</SelectItem>
                                      <SelectItem value="l">L</SelectItem>
                                      <SelectItem value="pcs">Pieces</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                           </div>
                          
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg flex items-center justify-center"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      
                      <MenuItemButton
                        type="button"
                        variant="outline"
                        onClick={() => append({
                          inventoryName: "",
                          stock: "",
                          unit: "",
                        })}
                        className="w-full h-12 text-lg"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Add new inventory
                      </MenuItemButton>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Button Color */}
            <div className="space-y-4">
              <MenuItemColorPicker control={form.control} name="buttonColor" />
            </div>

            {/* Active Status */}
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-lg">Active</FormLabel>
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <MenuItemButton
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-12 text-lg font-medium"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </MenuItemButton>
              <MenuItemButton
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1 h-12 text-lg"
              >
                Cancel
              </MenuItemButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
} 
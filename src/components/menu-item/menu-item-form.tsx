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
import MenuItemCurrencyInput from "./menu-item-currency-input";
import CategorySection from "./category-section";
import { useMenuItemStore } from "@/store/menu-item-store";
import { useModifierGroupStore } from "@/store/modifier-group-store";
import { usePrefixStore } from "@/store/prefix-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { inventoryApi, InventoryItem } from "@/utils/inventory-api";
import ImageBox from "@/components/custom-image-box";
import { useMenuItemDraftStore } from "@/store/menu-item-draft-store";
import CustomInput from "../custom-input";
import { ModifierSection } from "./modifier-section";
import { PrefixSection } from "./prefix-section";
import { ColorPicker } from "../color-picker";
import { MenuItemType } from "@/types/menu-item";
import CustomButton from "../custom-button";

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
  const [showModifierGroupForm, setShowModifierGroupForm] = useState(false);
  const [showPrefixForm, setShowPrefixForm] = useState(false);
  const { 
    isSubmitting, 
    status, 
    resetStatus
  } = useMenuItemStore();
  const { modifierGroups, getModifierGroupsData } = useModifierGroupStore();
  const { prefixes, fetchPrefixes } = usePrefixStore();
  const router = useRouter();
  const { draft, setDraft, clearDraft, clearDraftOnManualNavigation } = useMenuItemDraftStore();

  const handleAddNewModifierGroup = () => {
    router.push("/modifier-groups/new");
  };

  const handleAddNewPrefix = () => {
    router.push("/prefixes/new");
  };

  const handleModifierGroupCreated = () => {
    setShowModifierGroupForm(false);
    getModifierGroupsData(); // Refresh the list
  };

  const handlePrefixCreated = () => {
    setShowPrefixForm(false);
    fetchPrefixes(); // Refresh the list
  };

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

  // Sync form changes to draft (for browser navigation only)
  useEffect(() => {
    const subscription = form.watch((values) => {
      setDraft(values as Partial<MenuItemType>);
    });
    return () => subscription.unsubscribe();
  }, [form, setDraft]);

  const handleSubmit = async (data: MenuItemFormInput) => {
    console.log(data)
    await onSubmit(data);
    clearDraft();
  };

  const handleCancel = () => {
    clearDraftOnManualNavigation(); // Clear draft on manual cancel
    router.back();
  };

  const filteredModifierGroups = modifierGroups.filter(group =>
    group.groupName.toLowerCase().includes(searchModifiers.toLowerCase())
  );

  // Handler for when an image is cropped
  const handleImageCropped = (imageData: string) => {
    form.setValue('photo', imageData);
  };

  // Handler for when an image is removed
  const handleImageRemoved = () => {
    form.setValue('photo', '');
  };


  return (
    
      <div className="max-w-[1025px] overflow-y-auto mx-auto pb-24 mt-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className=" space-y-6">
            

            {/* Item Photo Section */}
            <div className="flex justify-center">
             
                <ImageBox
                  imageUrl={form.watch('photo') || undefined}
                  onImageCropped={handleImageCropped}
                  onImageRemoved={handleImageRemoved}
                />
              
            </div>

            {/* Basic Information */}
            <div className="space-y-6">
              
              <CustomInput
                control={form.control}
                name="name"
                label="Create new item name"
                placeholder="Enter item name"
                optional={false}
              />

              <CustomInput
                control={form.control}
                name="bilingualName"
                label="Bilingual name"
                placeholder="Enter translated name (e.g., 'Hta-min-kyaw')"
                optional
              />

              <CustomInput
                control={form.control}
                name="barCode"
                label="Bar Code"
                placeholder="eg., ACF00-0000"
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
            <ModifierSection 
              modifierGroups={modifierGroups}
              searchModifiers={searchModifiers}
              setSearchModifiers={setSearchModifiers}
              onAddNewModifierGroup={handleAddNewModifierGroup}
            />

            {/* Prefixes Section */}
            <PrefixSection 
              modifierGroups={modifierGroups}
              prefixes={prefixes}
              searchPrefixes={searchPrefixes}
              setSearchPrefixes={setSearchPrefixes}

            />

            {/* Advanced Settings */}
            <div className="space-y-4">
              <div 
                className="flex items-center justify-between cursor-pointer border-b"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <h2 className="text-xl font-semibold text-[#2A2A2A]">Advanced Setting</h2>
                {showAdvanced ? <ChevronUp className="w-8 h-8" /> : <ChevronDown className="w-8 h-8" />}
              </div>

              {showAdvanced && (
                <div className="space-y-6 mt-4">
                  <FormField
                    control={form.control}
                    name="advancedSettings.connectToRecipes"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel className="text-[20px]">Connect to recipes</FormLabel>
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

                  <FormField
                    control={form.control}
                    name="advancedSettings.connectToInventory"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel className="text-[20px] font-medium">Connect to inventory</FormLabel>
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
                                  <div className="relative">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        // Toggle dropdown logic here
                                      }}
                                      className="w-full h-14 px-4 text-base border border-[#9C9C9C] bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-black flex items-center justify-between"
                                    >
                                      <span className={field.value ? "text-black" : "text-gray-500"}>
                                        {field.value || "Inventory name"}
                                      </span>
                                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                      </svg>
                                    </button>
                                   
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="flex-1">
                            <CustomInput
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
                                  <div className="relative">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        // Toggle dropdown logic here
                                      }}
                                      className="w-full h-14 px-4 text-base border border-[#9C9C9C] bg-white rounded-lg focus:outline-none focus:ring-1 focus:ring-black flex items-center justify-between"
                                    >
                                      <span className={field.value ? "text-black" : "text-gray-500"}>
                                        {field.value || "Unit"}
                                      </span>
                                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                      </svg>
                                    </button>
                                    {/* Dropdown content would go here */}
                                  </div>
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
                      
                      <CustomButton
                        type="button"
                        variant="outline"
                        onClick={() => append({
                          inventoryName: "",
                          stock: "",
                          unit: ""
                        })}
                        className="h-8.5 text-[16px] font-[400] border-1 border-[#FF6E30] rounded-[10px] w-fit"
                      >
                        <Plus className="w-6 h-6 mr-1" />
                        Add new inventory
                      </CustomButton>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Button Color */}
            <div className="space-y-4">
              <ColorPicker name="button-color"/>
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
                      className="size-4.5 border-2 border-black"
                    />
                  </FormControl>
                  <FormLabel className="text-[20px]">Active</FormLabel>
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <CustomButton
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-12 text-lg font-medium"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </CustomButton>
              <CustomButton
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex-1 h-12 text-lg"
              >
                Cancel
              </CustomButton>
            </div>
          </form>
        </Form>
      </div>
   
  );
} 
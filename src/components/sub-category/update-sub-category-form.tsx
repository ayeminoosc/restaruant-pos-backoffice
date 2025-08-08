"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { subCategorySchema } from "@/lib/validations/sub-category-schema";
import { useCategoryStore } from "@/store/category-store";
import CustomInput from "@/components/custom-input";
import CustomButton from "@/components/custom-button";
import CustomAdvanceSetting from "@/components/custom-advance-setting";
import { ColorPicker } from "@/components/color-picker";
import CustomDropDownBox from "@/components/custom-drop-down-box";
import ImageBox from "@/components/custom-image-box";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { LoaderCircle } from "lucide-react";

type FormData = z.infer<typeof subCategorySchema>;

export function UpdateSubCategoryForm({ subCategoryId }: { subCategoryId: string }) {
  const router = useRouter();
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const {
    categories,
    subCategories,
    fetchCategories,
    fetchSubCategories,
    formSubCategoryImageUrl,
    setFormSubCategoryImageUrl,
    updateSubCategoryById,
    isSubmitting,
    error,
    status,
    resetStatus,
  } = useCategoryStore();

  useEffect(() => {
    if (categories.length === 0) fetchCategories();
    if (subCategories.length === 0) fetchSubCategories();
  }, [categories.length, subCategories.length, fetchCategories, fetchSubCategories]);

  const subCategory = subCategories.find(sub => sub.id === subCategoryId);

  const form = useForm<FormData>({
    mode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(subCategorySchema),
    defaultValues: {
      categoryName: subCategory?.category || "",
      subCategoryName: subCategory?.name || "",
      bilingualName: subCategory?.bilingualName || "",
      active: subCategory?.active ?? true,
      buttonColor: subCategory?.buttonColor || "#FF5722",
    },
  });

  useEffect(() => {
    if (subCategory) {
      setFormSubCategoryImageUrl(subCategory.imageUrl || null);
      form.reset({
        categoryName: subCategory.category || "",
        subCategoryName: subCategory.name || "",
        bilingualName: subCategory.bilingualName || "",
        active: subCategory.active ?? true,
        buttonColor: subCategory.buttonColor || "#FF5722",
      });
    }
  }, [subCategory, form, setFormSubCategoryImageUrl]);

  useEffect(() => {
    if (status === "success") {
      router.push("/dashboard/category");
      resetStatus();
    } else if (status === "error") {
      toast.error(error);
      resetStatus();
    }
  }, [status, error, resetStatus, router]);

  const onSubmit = async (data: FormData) => {
    if (isSubmitting) return;
    try {
      await updateSubCategoryById(subCategoryId, {
        category: data.categoryName,
        name: data.subCategoryName,
        bilingualName: data.bilingualName,
        active: data.active,
        imageUrl: formSubCategoryImageUrl,
        buttonColor: data.buttonColor,
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleImageCropped = (croppedImageData: string) => {
    if (!isSubmitting) setFormSubCategoryImageUrl(croppedImageData);
  };

  const handleImageRemoved = () => {
    if (!isSubmitting) setFormSubCategoryImageUrl(null);
  };

  if (!subCategory) {
    return (
      <div className="flex justify-center pt-40">
        <span>Loading sub-category data...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 max-w-[1025px] w-full overflow-visible mx-auto my-13 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-center">
              <ImageBox
                imageUrl={formSubCategoryImageUrl}
                onImageCropped={handleImageCropped}
                onImageRemoved={handleImageRemoved}
              />
            </div>
            <CustomDropDownBox
              control={form.control}
              name="categoryName"
              label="Choose Category"
              placeholder="Select a category"
              options={categories}
              editId={subCategoryId}
              optional={false}
            />
            <CustomInput
              control={form.control}
              name="subCategoryName"
              label="SubCategory Name"
              placeholder="Enter SubCategory Name..."
              optional={false}
            />
            <CustomInput
              control={form.control}
              name="bilingualName"
              label="Bilingual Name"
              placeholder="Enter Bilingual Name..."
              optional={true}
            />
            <CustomAdvanceSetting
              control={form.control}
              isAdvancedOpen={isAdvancedOpen}
              setIsAdvancedOpen={setIsAdvancedOpen}
            >
              <ColorPicker name="buttonColor" />
            </CustomAdvanceSetting>
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
            <div className="flex gap-3 pt-4 mb-10">
              <CustomButton
                type="submit"
                className="flex-1 bg-primary hover:bg-orange-600 h-14 font-medium text-xl cursor-pointer transition-colors duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex gap-2 items-center">
                    <LoaderCircle className="animate-spin size-6" />
                    <span>Updating...</span>
                  </div>
                ) : (
                  "Update"
                )}
              </CustomButton>
              <CustomButton
                type="button"
                onClick={() => router.back()}
                variant="outline"
                className="flex-1 bg-secondary h-14 font-medium text-xl cursor-pointer hover:bg-[#bfbfbf] transition-colors duration-200"
                disabled={isSubmitting}
              >
                Cancel
              </CustomButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
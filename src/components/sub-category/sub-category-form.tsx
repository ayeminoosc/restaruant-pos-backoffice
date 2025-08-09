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

interface SubCategoryFormProps {
  editId?: string;
}

export default function SubCategoryForm({ editId }: SubCategoryFormProps) {
  const router = useRouter();
  const isEditMode = !!editId;
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const {
    categories,
    subCategories,
    fetchCategories,
    fetchSubCategories,
    formSubCategoryImageUrl,
    setFormSubCategoryImageUrl,
    resetSubCategoryForm,
    addSubCategory,
    updateSubCategoryById,
    isSubmitting,
    error,
    status,
    resetStatus,
  } = useCategoryStore();

  const form = useForm<FormData>({
    mode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(subCategorySchema),
    defaultValues: {
      categoryName: "",
      subCategoryName: "",
      bilingualName: "",
      active: true,
      buttonColor: "#FF5722",
    },
  });

  useEffect(() => {
    if (categories.length === 0) fetchCategories();
    if (subCategories.length === 0) fetchSubCategories();
  }, [categories.length, subCategories.length, fetchCategories, fetchSubCategories]);

  useEffect(() => {
    if (isEditMode && editId && categories.length > 0 && subCategories.length > 0) {
      const subCategory = subCategories.find(sub => sub.id === editId);
      if (subCategory) {
        let categoryValue = subCategory.category || subCategory.categoryName || "";
        if (subCategory.categoryId) {
          const category = categories.find(cat => cat.id === subCategory.categoryId);
          categoryValue = category ? category.name : "";
        }
        setFormSubCategoryImageUrl(subCategory.imageUrl || null);
        form.reset({
          categoryName: categoryValue,
          subCategoryName: subCategory.name || "",
          bilingualName: subCategory.bilingualName || "",
          active: subCategory.active !== undefined ? subCategory.active : true,
          buttonColor: subCategory.buttonColor || "#FF5722",
        });
      }
    } else if (!isEditMode) {
      resetSubCategoryForm();
      form.reset();
      setFormSubCategoryImageUrl(null);
    }
  }, [isEditMode, editId, subCategories, categories, form, resetSubCategoryForm, setFormSubCategoryImageUrl]);

  useEffect(() => {
    if (status === "success") {
      toast.success(isEditMode ? "SubCategory updated!" : "SubCategory created!");
      router.push("/dashboard/category");
      resetStatus();
    } else if (status === "error") {
      toast.error(error);
      resetStatus();
    }
  }, [status, error, resetStatus, router, isEditMode]);

  const onSubmit = async (data: FormData) => {
    if (isSubmitting) return;
    try {
      const subcategoryData = {
        category: data.categoryName,
        name: data.subCategoryName,
        bilingualName: data.bilingualName,
        active: data.active,
        imageUrl: formSubCategoryImageUrl,
        buttonColor: data.buttonColor,
      };
      if (isEditMode && editId) {
        await updateSubCategoryById(editId, subcategoryData);
      } else {
        await addSubCategory(subcategoryData);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleImageCropped = (croppedImageData: string) => {
    console.log("Cropped image:", croppedImageData);
    if (isSubmitting) return;
    setFormSubCategoryImageUrl(croppedImageData);
    setCroppedImage(croppedImageData);
    setSelectedFile(null); 
  };

  const handleImageRemoved = () => {
    if (!isSubmitting) {
      setFormSubCategoryImageUrl(null);
      setCroppedImage(null); 
    }
  };

  const handleCancel = () => {
    resetSubCategoryForm();
    form.reset();
    router.back();
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 max-w-[1025px] w-full overflow-visible mx-auto my-13 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-center">
              <ImageBox
                selectedFile={selectedFile}
                croppedImage={croppedImage}
                imageUrl={formSubCategoryImageUrl}
                onFileChange={setSelectedFile}
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
              editId={editId}
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
                    <span>{isEditMode ? "Updating..." : "Saving..."}</span>
                  </div>
                ) : (
                  isEditMode ? "Update" : "Save"
                )}
              </CustomButton>
              <CustomButton
                type="button"
                onClick={handleCancel}
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
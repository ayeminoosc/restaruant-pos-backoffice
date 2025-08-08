"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { categorySchema } from "@/lib/validations/category-schema";
import { useCategoryStore } from "@/store/category-store";
import CustomInput from "@/components/custom-input";
import CustomButton from "@/components/custom-button";
import CustomAdvanceSetting from "@/components/custom-advance-setting";
import { ColorPicker } from "@/components/color-picker";
import ImageBox from "@/components/custom-image-box";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { LoaderCircle } from "lucide-react";

type FormData = z.infer<typeof categorySchema>;

export function UpdateCategoryForm({ categoryId }: { categoryId: string }) {
  const router = useRouter();
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const {
    categories,
    fetchCategories,
    formImageUrl,
    setFormImageUrl,
    updateCategoryById,
    isSubmitting,
    error,
    status,
    resetStatus,
  } = useCategoryStore();

  const category = categories.find(cat => cat.id === categoryId);

  const form = useForm<FormData>({
    mode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryName: category?.name || "",
      bilingualName: category?.bilingualName || "",
      active: category?.active ?? true,
      buttonColor: category?.buttonColor || "#FF5722",
    },
  });

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories.length, fetchCategories]);

  useEffect(() => {
    if (category) {
      setFormImageUrl(category.imageUrl || null);
      form.reset({
        categoryName: category.name || "",
        bilingualName: category.bilingualName || "",
        active: category.active ?? true,
        buttonColor: category.buttonColor || "#FF5722",
      });
    }
  }, [category, form, setFormImageUrl]);

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
      await updateCategoryById(categoryId, {
        name: data.categoryName,
        bilingualName: data.bilingualName,
        active: data.active,
        imageUrl: formImageUrl,
        buttonColor: data.buttonColor,
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleImageCropped = (croppedImageData: string) => {
    if (isSubmitting) return;
    setFormImageUrl(croppedImageData);
  };

  const handleImageRemoved = () => {
    if (isSubmitting) return;
    setFormImageUrl(null);
  };

  if (!category) {
    return (
      <div className="flex justify-center pt-40">
        <span>Loading category data...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 max-w-[1025px] w-full overflow-visible mx-auto my-13 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-center overflow-visible">
              <ImageBox
                imageUrl={formImageUrl}
                onImageCropped={handleImageCropped}
                onImageRemoved={handleImageRemoved}
              />
            </div>
            <CustomInput
              control={form.control}
              name="categoryName"
              label="Category Name"
              placeholder="Enter Category Name..."
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
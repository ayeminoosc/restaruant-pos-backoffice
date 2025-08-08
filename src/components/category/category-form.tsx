"use client";

import { useRouter } from "next/navigation";
import { useCategoryStore } from "@/store/category-store";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import CustomInput from "@/components/custom-input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import CustomButton from "@/components/custom-button";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import CustomAdvanceSetting from "@/components/custom-advance-setting";
import { ColorPicker } from "@/components/color-picker";
import ImageBox from "@/components/custom-image-box";
import CustomPageTitle from "@/components/custom-page-title";
import { categorySchema } from "@/lib/validations/category-schema";

type FormData = z.infer<typeof categorySchema>;

export default function CategoryForm() {
  const router = useRouter();
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const {
    categories,
    fetchCategories,
    formImageUrl,
    setFormImageUrl,
    resetForm,
    addCategory,
    isSubmitting,
    error,
    status,
    resetStatus,
  } = useCategoryStore();

  const form = useForm<FormData>({
    mode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryName: "",
      bilingualName: "",
      active: true,
      buttonColor: "#FF5722",
    },
  });

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories.length, fetchCategories]);

  useEffect(() => {
    resetForm();
    form.reset();
    setFormImageUrl(null);
  }, [resetForm, form, setFormImageUrl]);

  const onSubmit = async (data: FormData) => {
    if (isSubmitting) return;
    try {
      await addCategory({
        name: data.categoryName,
        bilingualName: data.bilingualName,
        active: data.active,
        imageUrl: formImageUrl,
        buttonColor: data.buttonColor,
      });
      router.push("/dashboard/category");
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

  const handleCancel = () => {
    resetForm();
    form.reset();
    router.back();
  };

  return (
      <div className="max-w-[1025px] overflow-visible mx-auto my-13 ">
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
                  </div>
                ) : (
                  "Save"
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
    
  );
}
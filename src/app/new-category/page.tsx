"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCategoryStore } from "@/store/category-store";
import { useEffect, Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import CustomInput from "@/components/custom-input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import CustomButton from "@/components/custom-button";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import CustomAdvanceSetting from "@/components/custom-advance-setting";
import { ColorPicker } from "@/components/color-picker";
import TitleBar from "@/components/category/title-bar";
import ImageBox from "@/components/custom-image-box";

// Form schema
const categorySchema = z.object({
    categoryName: z.string()
        .min(1, "Category name is required")
        .min(2, "Category name must be at least 2 characters"),
    bilingualName: z.string().optional(),
    active: z.boolean().default(true),
    buttonColor: z.string().default("#FF5722"), // Add this
});

type FormData = z.infer<typeof categorySchema>;

function CategoryPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get('id');
    const isEditMode = !!editId;
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

    const {
        categories,
        fetchCategories,
        formImageUrl,
        setFormImageUrl,
        resetForm,
        addCategory,
        updateCategoryById,
        isSubmitting,
        error,
        status,
        resetStatus,
    } = useCategoryStore();

    //handle image with store for preview and cropping
    // React Hook Form setup configuration
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

    //useEffect for Loading Data in Edit Mode
    useEffect(() => {
        if (isEditMode && editId && categories.length > 0) {
            const category = categories.find(cat => cat.id === editId);
            if (category) {
                setFormImageUrl(category.imageUrl || null);
                form.setValue("categoryName", category.name || '');
                form.setValue("bilingualName", category.bilingualName || '');
                form.setValue("active", category.active || false);
                form.setValue("buttonColor", category.buttonColor || "#FF5722"); // ← Add this

            }
        } else if (!isEditMode) {
            resetForm();
            form.reset();
        }
    }, [isEditMode, editId, categories, form, resetForm, setFormImageUrl]);


    const onSubmit = async (data: FormData) => {
        if (isSubmitting) {
            return;
        }

        try {
            if (isEditMode && editId) {
                await updateCategoryById(editId, {
                    name: data.categoryName,
                    bilingualName: data.bilingualName,
                    active: data.active,
                    imageUrl: formImageUrl,
                    buttonColor: data.buttonColor,
                });
            } else {
                await addCategory({
                    name: data.categoryName,
                    bilingualName: data.bilingualName,
                    active: data.active,
                    imageUrl: formImageUrl,
                    buttonColor: data.buttonColor,
                });
            }

            toast.success(isEditMode ? "Category updated!" : "Category created!");
            setTimeout(() => {
                router.push("/dashboard/category");
                resetStatus();
            }, 1000);

        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    // Handle image cropped
    const handleImageCropped = (croppedImageData: string) => {
        if (isSubmitting) {
            return;
        }
        setFormImageUrl(croppedImageData);
    };

    // Handle image removed
    const handleImageRemoved = () => {
        if (isSubmitting) {
            return;
        }

        setFormImageUrl(null);
    };

    const handleCancel = () => {
        resetForm();
        form.reset();
        router.back();
    };

    return (
        <div className="w-full h-screen">
            <div className="h-[10%]">
                <TitleBar
                    label={isEditMode ? "Edit Category" : "Add New Category"}
                    onClick={() => router.back()}
                />
            </div>

            <div className="max-w-[1025px] overflow-y-auto mx-auto mt-10 px-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        {/* IMAGE SECTION */}
                        <div className="flex justify-center">
                            <ImageBox
                                imageUrl={formImageUrl}
                                onImageCropped={handleImageCropped}
                                onImageRemoved={handleImageRemoved}
                            />
                        </div>

                        {/* CATEGORY NAME */}
                        <CustomInput
                            control={form.control}
                            name="categoryName"
                            label="Category Name"
                            placeholder="Enter Category Name..."
                            optional={false}
                        />

                        {/* BILINGUAL NAME */}
                        <CustomInput
                            control={form.control}
                            name="bilingualName"
                            label="Bilingual Name"
                            placeholder="Enter Bilingual Name..."
                            optional={true}
                        />

                        {/* ADVANCED SETTINGS */}
                        <CustomAdvanceSetting
                            control={form.control}
                            isAdvancedOpen={isAdvancedOpen}
                            setIsAdvancedOpen={setIsAdvancedOpen}
                        >
                            <ColorPicker name="buttonColor" />
                        </CustomAdvanceSetting>

                        {/* ACTIVE STATUS */}
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

                        {/* SUBMIT BUTTONS */}
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
        </div>
    );
}

export default function AddCategoryPg() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CategoryPageContent />
        </Suspense>
    );
}
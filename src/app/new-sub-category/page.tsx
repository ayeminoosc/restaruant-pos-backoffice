"use client";
import TitleBar from "@/components/category/title-bar";
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
import CustomDropDownBox from "@/components/custom-drop-down-box";
import ImageBox from "@/components/custom-image-box";
import CustomPageTitle from "@/components/custom-page-title";
import { subCategorySchema } from "@/lib/validations/sub-category-schema";

type FormData = z.infer<typeof subCategorySchema>;

function SubCategoryPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get('id');
    const isEditMode = !!editId;
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
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
        resetStatus,
    } = useCategoryStore();

    // React Hook Form setup
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

    // Fetch categories and subcategories if not loaded
    useEffect(() => {
        if (categories.length === 0) {
            fetchCategories();
        }
        if (subCategories.length === 0) {
            fetchSubCategories();
        }
    }, [categories.length, subCategories.length, fetchCategories, fetchSubCategories]);

    // Load subcategory data for editing
    useEffect(() => {
        if (isEditMode && editId && categories.length > 0 && subCategories.length > 0) {
            const subCategory = subCategories.find(sub => sub.id === editId);

            if (subCategory) {
                // Find the correct category value
                let categoryValue = subCategory.category || subCategory.categoryName || '';

                // If it's an ID, find the category name
                if (subCategory.categoryId) {
                    const category = categories.find(cat => cat.id === subCategory.categoryId);
                    categoryValue = category ? category.name : '';
                }

                setFormSubCategoryImageUrl(subCategory.imageUrl || null);

                // Reset form with subcategory data
                form.reset({
                    categoryName: categoryValue,
                    subCategoryName: subCategory.name || '',
                    bilingualName: subCategory.bilingualName || '',
                    active: subCategory.active !== undefined ? subCategory.active : true,
                    buttonColor: subCategory.buttonColor || "#FF5722",
                });
            }
        } else if (!isEditMode) {
            resetSubCategoryForm();
            form.reset();
        }
    }, [isEditMode, editId, subCategories, categories, form, resetSubCategoryForm, setFormSubCategoryImageUrl]);

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
            router.push("/dashboard/category");

        } catch (error) {
            console.error('Error in onSubmit:', error);
        }
    };

    const handleImageCropped = (croppedImageData: string) => {
        if (!isSubmitting) {
            setFormSubCategoryImageUrl(croppedImageData);
        }
    };

    const handleImageRemoved = () => {
        if (!isSubmitting) {
            setFormSubCategoryImageUrl(null);
        }
    };

    const handleCancel = () => {
        resetSubCategoryForm();
        form.reset();
        router.back();
    };

    return (
        <div className="w-full h-full flex flex-col">
            <CustomPageTitle title={isEditMode ? "Edit SubCategory" : "Add New SubCategory"} />


            <div className="flex-1 max-w-[1025px] w-full overflow-visible mx-auto my-13 ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        {/* IMAGE SECTION */}
                        <div className="flex justify-center">
                            <ImageBox
                                imageUrl={formSubCategoryImageUrl}
                                onImageCropped={handleImageCropped}
                                onImageRemoved={handleImageRemoved}
                            />
                        </div>

                        {/* CATEGORY DROPDOWN */}
                        <CustomDropDownBox
                            control={form.control}
                            name="categoryName"
                            label="Choose Category"
                            placeholder="Select a category"
                            options={categories}
                            editId={editId}
                            optional={false}
                        />

                        {/* SUBCATEGORY NAME */}
                        <CustomInput
                            control={form.control}
                            name="subCategoryName"
                            label="SubCategory Name"
                            placeholder="Enter SubCategory Name..."
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

                        {/* ADVANCED SETTING */}
                        <CustomAdvanceSetting
                            control={form.control}
                            isAdvancedOpen={isAdvancedOpen}
                            setIsAdvancedOpen={setIsAdvancedOpen}
                        >
                            <ColorPicker name="buttonColor" />
                        </CustomAdvanceSetting>

                        {/* ACTIVE CHECKBOX */}
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

                        {/* SAVE/CANCEL BUTTONS */}
                        <div className="flex gap-3 pt-4 mb-10">
                            <CustomButton
                                type="submit"
                                className="flex-1 bg-primary hover:bg-orange-600 h-14 font-medium text-xl cursor-pointer transition-colors duration-200"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div className="flex gap-2 items-center">
                                        <LoaderCircle className="animate-spin size-6" />
                                        <span>Saving...</span>
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

export default function AddSubCategoryPg() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SubCategoryPageContent />
        </Suspense>
    );
}
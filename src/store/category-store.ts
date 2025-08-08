import { create } from 'zustand';
import { ENDPOINTS } from "@/utils/api-endpoints";

export type Category = {
  id: string;
  name: string;
  imageUrl?: string;
  bilingualName?: string;
  active?: boolean;
  buttonColor?: string;
};

export type SubCategory = {
  id: string;
  category: string;
  name: string;
  imageUrl?: string;
  bilingualName?: string;
  active?: boolean;
  buttonColor?: string;
};

type CategoryStore = {
  categories: Category[];
  subCategories: SubCategory[];
  isLoading: boolean;
  isSubmitting: boolean;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  fetchCategories: () => Promise<void>;
  addCategory: (data: Partial<Category>) => Promise<void>;
  updateCategoryById: (id: string, data: Partial<Category>) => Promise<void>;
  deleteCategoryById: (id: string) => Promise<void>;
  fetchSubCategories: () => Promise<void>;
  addSubCategory: (data: Partial<SubCategory>) => Promise<void>;
  updateSubCategoryById: (id: string, data: Partial<SubCategory>) => Promise<void>;
  deleteSubCategoryById: (id: string) => Promise<void>;
  resetStatus: () => void;
  formImageUrl: string | null;
  formSubCategoryImageUrl: string | null;
  setFormImageUrl: (imageUrl: string | null) => void;
  setFormSubCategoryImageUrl: (imageUrl: string | null) => void;
  resetForm: () => void;
  resetSubCategoryForm: () => void;
};

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  subCategories: [],
  isLoading: false,
  isSubmitting: false,
  status: 'idle',
  error: null,
  formImageUrl: null,
  formSubCategoryImageUrl: null,

  resetStatus: () => set({ status: 'idle', error: null }),

  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch(ENDPOINTS.getCategories);
      const data = await res.json();
      set({ categories: data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },

  addCategory: async (data) => {
    set({ isSubmitting: true, status: 'loading' });
    try {
      const res = await fetch(ENDPOINTS.addCategory, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to add category: ${errorText}`);
      }

      await get().fetchCategories();
      set({ status: 'success', isSubmitting: false });
    } catch (err) {
      console.error('Add category error:', err);
      set({
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to add category',
        isSubmitting: false
      });
    }
  },

  updateCategoryById: async (id, data) => {
    set({ isSubmitting: true, status: 'loading' });
    try {
      const res = await fetch(ENDPOINTS.updateCategory(id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to update category: ${errorText}`);
      }

      await get().fetchCategories();
      set({ status: 'success', isSubmitting: false });
    } catch (err) {
      console.error('Update category error:', err);
      set({
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to update category',
        isSubmitting: false
      });
    }
  },

  deleteCategoryById: async (id) => {
    try {
      const res = await fetch(ENDPOINTS.deleteCategory(id), {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      await get().fetchCategories();
    } catch (err) {
      console.error(err);
    }
  },

  fetchSubCategories: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch(ENDPOINTS.getSubCategories);
      const data = await res.json();
      set({ subCategories: data });
    } catch (err) {
      console.error(err);
    } finally {
      set({ isLoading: false });
    }
  },

  addSubCategory: async (data) => {
    set({ isSubmitting: true, status: 'loading' });
    try {
      const res = await fetch(ENDPOINTS.addSubCategory, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to add subcategory: ${errorText}`);
      }

      await get().fetchSubCategories();
      set({ status: 'success', isSubmitting: false });
    } catch (err) {
      console.error('Add subcategory error:', err);
      set({
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to add subcategory',
        isSubmitting: false
      });
    }
  },

  updateSubCategoryById: async (id, data) => {
    set({ isSubmitting: true, status: 'loading' });
    try {
      const res = await fetch(ENDPOINTS.updateSubCategory(id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to update subcategory: ${errorText}`);
      }

      await get().fetchSubCategories();
      set({ status: 'success', isSubmitting: false });
    } catch (err) {
      console.error('Update subcategory error:', err);
      set({
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to update subcategory',
        isSubmitting: false
      });
    }
  },

  deleteSubCategoryById: async (id) => {
    try {
      const res = await fetch(ENDPOINTS.deleteSubCategory(id), {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete subcategory');
      await get().fetchSubCategories();
    } catch (err) {
      console.error(err);
    }
  },

  setFormImageUrl: (imageUrl) => {
    set({ formImageUrl: imageUrl });
  },

  setFormSubCategoryImageUrl: (imageUrl) => {
    set({ formSubCategoryImageUrl: imageUrl });
  },

  resetForm: () => set({
    formImageUrl: null,
  }),

  resetSubCategoryForm: () => set({
    formSubCategoryImageUrl: null,
  }),
}));
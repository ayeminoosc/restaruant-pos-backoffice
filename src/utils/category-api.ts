const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface Category {
  id: string;
  name: string;
  bilingualName: string;
  active: boolean;
}

export interface SubCategory {
  id: string;
  name: string;
  category: string;
  bilingualName: string;
  active: boolean;
}

export const categoryApi = {
  async getCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/category/1.0/category`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  async getSubCategories(): Promise<SubCategory[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/subCategory/1.0/subCategory`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      return [];
    }
  },

  async getSubCategoriesByCategory(categoryName: string): Promise<SubCategory[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/subCategory/1.0/subCategory`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Filter subcategories by category name
      return data.filter((subCategory: SubCategory) => subCategory.category === categoryName);
    } catch (error) {
      console.error('Error fetching subcategories by category:', error);
      return [];
    }
  }
}; 
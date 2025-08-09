

import React, { useState, useEffect } from "react";
import MenuItemCard from "../menu-item-card";
import { useMenuItemStore } from "@/store/menu-item-store";
import { useCategoryStore } from "@/store/category-store";

export default function MenuItemList() {
  const menuItems = useMenuItemStore((state) => state.menuitems.items);
  const deleteMenuItem = useMenuItemStore((state) => state.deleteMenuItem);
  const categories = useCategoryStore((state) => state.categories);
  const subCategories = useCategoryStore((state) => state.subCategories);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  const fetchSubCategories = useCategoryStore((state) => state.fetchSubCategories);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch categories and subcategories on component mount
  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, [fetchCategories, fetchSubCategories]);

  // const filteredMenu = menu?.filter((item) =>
  //   item.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );


  const filteredMenu = Array.isArray(menuItems)
    ? menuItems.filter((item) =>
      item.name?.toLowerCase().includes(searchTerm?.toLowerCase())
    )
    : [];

  if (filteredMenu.length === 0) {
    return <div className="text-gray-500">No menu items found.</div>;
  }


  // return (
  //   <div className="grid gap-4">
  //     {filteredMenu.map((item) => (
  //       <MenuItemCard
  //         key={item.id}
  //         id={item.id}
  //         title={item.name}
  //         image={item.imageUrl}
  //         imageTitle={item.text}
  //         status={item.status}
  //         category={item.category}
  //         subCategory={item.subCategory}
  //         price={item.price}
  //         currency={item.currency}
  //         onDelete={() => deleteMenuItem(item.id)}
  //       />
  //     ))}
  //   </div>
  // );


return (
  <div className="grid gap-4">
    {filteredMenu.map((item) => {
      return (
        <MenuItemCard
          key={item.id}
          id={item.id}
          title={item.name}
          barCode={item.barCode}
          image={item.photo || '/placeholder-image.jpg'}
          imageTitle={item.bilingualName || item.name}
          status={item.active ? 'Active' : 'Inactive'}
          category={categories.find(cat => cat.id === item.categoryId)?.name || 'Uncategorized'}
          subCategory={subCategories.find(subCat => subCat.id === item.subcategoryId)?.name || ''}
          price={item.price}
          currency={'MMK'}
          onDelete={() => item.id && deleteMenuItem(item.id)}
        />
      );
    })}
  </div>
);

}

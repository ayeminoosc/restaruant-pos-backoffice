

import MenuItemCard from "../menu-item-card";
import { useMenuStore } from "@/store/useMenuStore";

export default function MenuItemList() {
  const menu = useMenuStore((state) => state.menu);
  const searchTerm = useMenuStore((state) => state.searchTerm);
  const deleteMenuItem = useMenuStore((state) => state.deleteMenuItem);

  // const filteredMenu = menu?.filter((item) =>
  //   item.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // if (filteredMenu.length === 0) {
  //   return <div className="text-gray-500">No menu items found.</div>;
  // }

  const filteredMenu = Array.isArray(menu)
  ? menu.filter((item) =>
      item.name?.toLowerCase().includes(searchTerm?.toLowerCase())
    )
  : [];

if (filteredMenu.length === 0) {
  return <div className="text-gray-500">No menu items found.</div>;
}


  return (
    <div className="grid gap-4">
      {filteredMenu.map((item) => (
        <MenuItemCard
          key={item.id}
          title={item.name}
          image={item.imageUrl}
          imageTitle={item.text}
          status={item.status}
          category={item.category}
          subCategory={item.subCategory}
          price={item.price}
          currency={item.currency}
          onDelete={() => deleteMenuItem(item.id)}
        />
      ))}
    </div>
  );
}

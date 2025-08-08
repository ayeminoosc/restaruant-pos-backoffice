"use client";

import { Column, ReusableTable } from "@/components/custom-table";
import { useMenuItemStore } from "@/store/menu-item-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CustomDeleteModal } from "../custom-delete-modal";
import { Edit, Trash2 } from "lucide-react";

const MenuItemTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const menuItems = useMenuItemStore((s) => s.menuItems);
  const isFetching = useMenuItemStore((s) => s.isFetching);
  const error = useMenuItemStore((s) => s.error);
  const deleteMenuItem = useMenuItemStore((s) => s.deleteMenuItem);
  const isSubmitting = useMenuItemStore((s) => s.isSubmitting);
  const status = useMenuItemStore((s) => s.status);
  const resetStatus = useMenuItemStore((s) => s.resetStatus);
  const getMenuItemsData = useMenuItemStore((s) => s.getMenuItemsData);
  const getCategoriesData = useMenuItemStore((s) => s.getCategoriesData);
  const categories = useMenuItemStore((s) => s.categories);

  const router = useRouter();

  useEffect(() => {
    getMenuItemsData();
    getCategoriesData();
  }, [getMenuItemsData, getCategoriesData]);

  const openModal = (id: string) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (selectedId) {
      await deleteMenuItem(selectedId);
      setShowModal(false);
      setSelectedId(null);
    }
  };

  if (isFetching)
    return (
      <div className="flex justify-center pt-40">
        <div className="flex items-center space-x-2">
          <div className="size-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span>Loading data...</span>
        </div>
      </div>
    );

  if (error) return <div className="p-4 text-red-600">{error}</div>;

            
  if (menuItems.length === 0 && !isFetching) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <div className="text-center">
          <p className="text-lg mb-2">No menu items found</p>
          <p className="text-sm">Click "Add Menu Item" to create your first item</p>
        </div>
      </div>
    );
  }

  const data = menuItems.map((item) => {
    // Handle different possible data structures from API
    const modifiers = item.modifiers || {};
    const modifierGroups = modifiers.modifierGroups || [];
    const isModifiersEnabled = modifiers.enabled || false;
    
    
    const apiItem = item as any;
    
    return {
      id: item.id || apiItem.ID || "-",
      name: item.name || apiItem.Name || apiItem.itemName || "-",
      bilingualName: item.bilingualName || apiItem.bilingual_name || "-",
      barCode: item.barCode || apiItem.barcode || "-",
      price: item.price || apiItem.Price ? `MMK ${item.price || apiItem.Price}` : "-",
      category: categories.find(cat => cat.id === (item.categoryId || apiItem.category_id))?.name || "-",
      modifiers: isModifiersEnabled ? `${modifierGroups.length} groups` : "None",
      status: (item.active || apiItem.Active || apiItem.isActive) ? "Active" : "Inactive",
    };
  });

  type RowType = (typeof data)[0];

  const columns: Column<RowType>[] = [
    {
      key: "name",
      label: "Name",
      render: (val) => (
        <div className="w-[12rem] whitespace-normal text-xl font-medium">{val}</div>
      ),
    },
    {
      key: "bilingualName",
      label: "Bilingual Name",
      render: (val) => (
        <div className="w-[12rem] whitespace-normal text-lg text-gray-600">{val}</div>
      ),
    },
    {
      key: "barCode",
      label: "Bar Code",
      render: (val) => (
        <div className="w-[10rem] whitespace-normal text-lg font-mono">{val}</div>
      ),
    },
    {
      key: "price",
      label: "Price",
      render: (val) => (
        <div className="text-xl font-medium text-green-600">{val}</div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (val) => (
        <div className="px-3 py-1 w-fit rounded-md bg-gray-100 text-base">{val}</div>
      ),
    },
    {
      key: "modifiers",
      label: "Modifiers",
      render: (val) => (
        <div className="text-lg">{val}</div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (val) => (
        <div
          className={
            val === "Active"
              ? "bg-green-100 text-green-800 px-3 py-1 rounded-md text-base w-fit"
              : "bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-base w-fit"
          }
        >
          {val}
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (val, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push(`/menu-items/${row.id}`)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit className="w-5 h-5 text-blue-600" />
          </button>
          <button
            onClick={() => openModal(row.id || "")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5 text-red-600" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <ReusableTable data={data} columns={columns} />
      <CustomDeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        id={selectedId || ""}
        onDelete={deleteMenuItem}
        isSubmitting={isSubmitting}
        status={status}
        resetStatus={resetStatus}
      />
    </>
  );
};

export default MenuItemTable; 
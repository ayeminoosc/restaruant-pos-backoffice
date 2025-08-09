"use client";

import { Column, ReusableTable } from "@/components/custom-table";
import { useModifierGroupStore } from "@/store/modifier-group-store";
import { useProfileStore } from "@/store/profile-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomDeleteModal } from "../custom-delete-modal";

const ModifierTable = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const modifierGroups = useModifierGroupStore((s) => s.modifierGroups);
  const isFetching = useModifierGroupStore((s) => s.isFetching);
  const error = useModifierGroupStore((s) => s.error);
  const deleteModifierGroup = useModifierGroupStore(
    (s) => s.deleteModifierGroup
  );
  const isSubmitting = useModifierGroupStore((s) => s.isSubmitting);
  const status = useModifierGroupStore((s) => s.status);
  const resetStatus = useModifierGroupStore((s) => s.resetStatus);
  const getModifierGroupsData = useModifierGroupStore(
    (s) => s.getModifierGroupsData
  );
  const searchTerm = useProfileStore((s) => s.searchTerm);
  const router = useRouter();

  // filter logic
  const lowerSearch = searchTerm.toLowerCase();
  const filteredGroups = modifierGroups.filter((mg) => {
    const statusText = mg.status ? "active" : "inactive";
    return (
      mg.groupName.toLowerCase().includes(lowerSearch) ||
      mg.selectionType.toLowerCase().includes(lowerSearch) ||
      (mg.required === "yes" ? "required" : "optional").includes(lowerSearch) ||
      statusText.startsWith(lowerSearch)
    );
  });

  useEffect(() => {
    getModifierGroupsData();
  }, []);

  const openModal = (id: string) => {
    setSelectedId(id);
    setShowModal(true);
  };

  if (isFetching)
    return (
      <div className="flex justify-center pt-40 ">
        <div className="flex items-center space-x-2">
          <div className="size-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span>{t("messages.loading")}</span>
        </div>
      </div>
    );
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  const data = filteredGroups.map((mg) => ({
    id: mg.id,
    name: mg.groupName,
    type: mg.selectionType[0].toUpperCase() + mg.selectionType.slice(1),
    required: mg.required === "yes" ? "Required" : "Optional",
    modifierItems: mg.modifierItems.length,
    selectionRange: { max: mg.maxSelection, min: mg.minSelection },
    status: mg.status ? "Active" : "InActive",
  }));

  // typeof in TypeScript (not JavaScript!) is used to get the type of a variable
  type RowType = (typeof data)[0];

  const columns: Column<RowType>[] = [
    {
      key: "name",
      label: "Name",
      render: (val) => (
        <div className="w-[7.5rem] whitespace-normal text-xl ">{val}</div>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (val) => (
        <div className="px-2.5 py-0.5 w-fit rounded-md bg-[#eaeaea] text-base">
          {val}
        </div>
      ),
    },
    {
      key: "required",
      label: "Required",
      render: (val) => (
        <div
          className={
            val === "Optional"
              ? "bg-[#eaeaea] text-base px-2.5 py-0.5 rounded-md w-fit"
              : "bg-red-600 text-white px-2.5 py-0.5 rounded-md text-base w-fit"
          }
        >
          {val}
        </div>
      ),
    },
    {
      key: "modifierItems",
      label: "Modifier Items",
      render: (val, row) => (
        <div className="text-xl">{`${val} ${val > 1 ? "Items" : "Item"}`}</div>
      ),
    },
    {
      key: "selectionRange",
      label: "Selection Range",
      render: (val) => <div className="text-xl">{`${val.min}-${val.max}`}</div>,
    },
    {
      key: "status",
      label: "Status",
      render: (val) => (
        <div
          className={
            val === "Active"
              ? "bg-[#a1ffa4] text-base text-[#1e9222] px-2.5 py-0.5 rounded-md w-fit"
              : "bg-red-600 text-base text-white px-2.5 py-0.5 rounded-md w-fit"
          }
        >
          {val}
        </div>
      ),
    },
    {
      key: "actions",
      label: "Action",
      render: (val, row) => (
        <div className="flex items-center justify-between ">
          <img
            alt="edit svg"
            src={"/assets/edit.svg"}
            className="cursor-pointer"
            onClick={() => router.push(`/modifier-groups/edit?id=${row.id}`)}
          />

          <img
            alt="edit svg"
            src={"/assets/trash.svg"}
            className="cursor-pointer"
            onClick={() => openModal(row.id!)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <ReusableTable data={data} columns={columns} />
      {selectedId && (
        <CustomDeleteModal
          id={selectedId}
          showModal={showModal}
          setShowModal={setShowModal}
          onDelete={deleteModifierGroup}
          isSubmitting={isSubmitting}
          status={status}
          error={error}
          resetStatus={resetStatus}
        />
      )}
    </>
  );
};

export default ModifierTable;

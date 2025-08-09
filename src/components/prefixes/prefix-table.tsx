"use client";

import { Column, ReusableTable } from "@/components/custom-table";
import { Switch } from "../ui/switch";
import React, { useEffect, useState } from "react";
import { CustomDeleteModal } from "../custom-delete-modal";
import { useRouter } from "next/navigation";
import { usePrefixStore } from "@/store/prefix-store";
const PrefixTable = () => {
  const { fetchPrefixes, prefixes, deletePrefix, status, isSubmitting, error, resetStatus, searchQuery } = usePrefixStore();

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  const lowerSearch = searchQuery.toLowerCase();


  const filteredPrefix =
    lowerSearch.length > 0
      ? prefixes.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerSearch) ||
          (p.description?.toLowerCase().includes(lowerSearch) ?? false)
      )
      : prefixes;


  const data = filteredPrefix.map((p) => ({
    id: p.id,
    prefixName: p.name,
    description: p.description
  }));


  const openModal = (id: string) => {
    setSelectedId(id);
    setShowModal(true);
  };


  useEffect(() => {
    fetchPrefixes();
  }, []);




  type RowType = (typeof data)[0];

  const columns: Column<RowType>[] = [
    {
      key: "prefixName",
      label: "Prefix Name",
      render: (val) => <div className=" text-xl w-1/3">{val}</div>,
    },
    {
      key: "description",
      label: "Description",
      render: (val) => <div className="text-[#7b7b7b] text-base">{val}</div>,
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
            onClick={() => router.push(`/prefixes/${row.id}`)}
          />
          <img
            alt="delete svg"
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
          onDelete={deletePrefix}
          isSubmitting={isSubmitting}
          status={status}
          error={error}
          resetStatus={resetStatus}
        />
      )}
    </>
  );
};

export default PrefixTable;

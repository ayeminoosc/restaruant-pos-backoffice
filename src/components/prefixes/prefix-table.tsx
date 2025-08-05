"use client";

import { Column, ReusableTable } from "@/components/custom-table";
import { Switch } from "../ui/switch";
import React, { useEffect, useState } from "react";
import { CustomDeleteModal } from "../custom-delete-modal";
import { useRouter } from "next/navigation";
import { usePrefixStore } from "@/store/prefixStore";
const PrefixTable = () => {
  const { fetchPrefixes, prefixes, deletePrefix, status, isSubmitting, error, resetStatus } = usePrefixStore();

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();
  const openModal = (id: string) => {
    setSelectedId(id);
    setShowModal(true);
    console.log('id', selectedId)
  };


  useEffect(() => {
    fetchPrefixes();
  }, []);



  const data = prefixes.map((p) => ({
    id: p.id,
    prefixName: p.name,
    description: p.description
  }))


  type RowType = (typeof data)[0];

  const columns: Column<RowType>[] = [
    {
      key: "prefixName",
      label: "Prefix Name",
      render: (val) => <div className=" text-xl max-w-[15.063rem]">{val}</div>,
    },
    {
      key: "description",
      label: "Description",
      render: (val) => <div className="text-[#7b7b7b] text-base">{val}</div>,
    },
    // {
    //   key: "status",
    //   label: "Status",
    //   render: (val) => (
    //     <Switch
    //       checked={val}
    //       disabled
    //       aria-readonly
    //       className="data-[state=checked]:bg-green-500"
    //     />
    //   ),
    // },
    // {
    //   key: "usedInModifier",
    //   label: "Used in modifier",
    //   render: (val) => <div className="text-xl">{val}</div>,
    // },
    {
      key: "actions",
      label: "Action",
      render: (val, row) => (
        <div className="flex items-center justify-between ">
          <img
            alt="edit svg"
            src={"/assets/edit.svg"}
            className="cursor-pointer"
            onClick={() => router.push(`/prefix/${row.id}`)}
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

"use client";
import DataTable from "@/components/prefixes/dataTable";
import React, { useEffect } from "react";
import { DataTableProps } from "@/types/type";
import { usePrefixStore } from "@/store/prefixStore";
import { FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { AiOutlineEdit } from "react-icons/ai";
import EditIcon from "@/components/prefixes/editIcon";

const ActionButtons = ({ id, onEdit, onDelete }: { id: string; onEdit: (id: string) => void; onDelete: (id: string) => void }) => (
  <div className="flex justify-end gap-5" >
     <button
  onClick={() => onEdit(id)}
  className="text-blue-600 hover:underline text-sm"
> 
<EditIcon/>
</button>

<button
  onClick={() => onDelete(id)}
  className="text-red-600 hover:underline text-sm"
>
  <FaTrashAlt size={20} color="#ea1414" />
 
</button>
  </div>
);

const Prefix = () => {
  const { fetchPrefixes, prefixes, deletePrefix , loading} = usePrefixStore();

  const router = useRouter()

  useEffect(() => {
    fetchPrefixes();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/dashboard/prefixes/edit/${id}`)
  };

  const handleDelete =async (id: string) => {
     await deletePrefix(id)
  };

  const dataMap = prefixes.map((p) => [
    p.name,
    p.description || "",
    <ActionButtons key={p.id} id={p.id} onEdit={handleEdit} onDelete={handleDelete} />,
  ]);

  const handleAdd = () => {
    router.push('/dashboard/prefixes/add')
  }

  const dataProps: DataTableProps = {
    title: "Prefixes",
    columns: ["Prefix Name", "Description", "Action"],
    data: dataMap,
    add: handleAdd,
  };


  return (
    <div>
     
        <DataTable {...dataProps} />
      
    </div>
  );
};

export default Prefix;

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { usePrefixStore } from "@/store/prefixStore";
import { PrefixForm } from "@/components/prefixes/addPrefix";
import { Prefix, PrefixFormInput } from "@/types/type";

export default function EditPrefixPage() {
  const router = useRouter();
  const params = useParams() as { id?: string | string[] };
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { prefixes, editPrefix, fetchPrefixes } = usePrefixStore();
  const [defaultValues, setDefaultValues] = useState<Partial<PrefixFormInput> | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (prefixes.length === 0) await fetchPrefixes();
      const prefix = prefixes.find((p) => p.id === id);
      if (prefix) {
        const { name, bilingualName, description, active, advancedSetting } = prefix;
        setDefaultValues({ name, bilingualName, description, active, advancedSetting });
      }
    };
    loadData();
  }, [id]);

  const handleSubmit = async (data: PrefixFormInput) => {
    await editPrefix(id as string, { ...data, id } as Prefix);
    router.push("/dashboard/prefixes");
  };

  if (!defaultValues) return <p>Loading...</p>;

  return (
    
    <PrefixForm mode="edit" defaultValues={defaultValues} onSubmit={handleSubmit} />
  );
}

"use client";

import { PrefixForm } from "@/components/prefixes/addPrefix";
import { usePrefixStore } from "@/store/prefixStore";
import { Prefix, PrefixFormInput } from "@/types/type";
import { useRouter } from "next/navigation";
export default function AddPrefixPage() {
   const router = useRouter()
  const { addPrefix } = usePrefixStore();

  const handleSubmit = async (data: PrefixFormInput) => {
    console.log('clicking add')

    const payload: Partial<Prefix> = {
      ...data,
      advancedSetting: false,
      id: crypto.randomUUID(),
    };

    await addPrefix(payload);
    router.push('/dashboard/prefixes')
  };



  return (
    <div>
    <PrefixForm
      mode="create"
      defaultValues={{
        name: "",
        bilingualName: "",
        description: "",
        active: true,
        color: undefined,
        advancedSetting: false,

      }}
      onSubmit={handleSubmit}
    />
    </div>
  );
}

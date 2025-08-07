"use client";

import CustomPageTitle from "@/components/custom-page-title";
import { PrefixForm } from "@/components/prefixes/addPrefix";
import { usePrefixStore } from "@/store/prefix-store";
import { Prefix } from "@/types/prefix";
import { PrefixFormInput } from "@/lib/validations/prefix-schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

export default function AddPrefixPage() {
  const router = useRouter();
  const { addPrefix } = usePrefixStore();
  const { resetStatus, status, error } = usePrefixStore();
  const handleSubmit = async (data: PrefixFormInput) => {
    const payload: Partial<Prefix> = {
      ...data,
      advancedSetting: false,
      id: crypto.randomUUID(),
    };
    await addPrefix(payload);
  };

    useEffect(() => {
    if (status === "success") {
      toast.success("Prefix was created!");
      router.push('/dashboard/prefixes')
      resetStatus();
    } else if (status === "error") {
      toast.error(error);
      resetStatus();
    }
  }, [status, error, resetStatus, router]);

  return (
    <section>
      <CustomPageTitle title="Add new prefix" />
      <PrefixForm
        mode="create"
        defaultValues={{
          name: "",
          bilingualName: "",
          description: "",
          active: true,
          color: "rgb(16, 190, 121)",
          advancedSetting: false,
        }}
        onSubmit={handleSubmit}
      />
    </section>
  );
}

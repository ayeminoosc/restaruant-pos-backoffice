"use client";

import { useGlobalStore } from "@/store/global-store";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const fetchInitialData = useGlobalStore((s) => s.fetchInitialData);
  const isLoading = useGlobalStore((s) => s.isLoading);
  const error = useGlobalStore((s) => s.error);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen ">
        <div className="flex items-center space-x-2">
          <div className="size-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span>{t("messages.loading")}</span>
        </div>
      </div>
    );

  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return <>{children}</>;
};

export default AppInitializer;

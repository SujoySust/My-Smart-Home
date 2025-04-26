"use client";
import { BazarList } from "@/components/bazar/BazarList";
import { BAZAR_STATUS } from "@/helper/constants/bazar.constant";
import { useDailyBazar } from "./Bazar.action";

export const DailyBazarSection: React.FC = () => {
  const { data, isLoading, isError, completeBazar, deleteBazar } =
    useDailyBazar();
  const pendingItems =
    (data && data?.filter((item) => item.status == BAZAR_STATUS.PENDING)) ?? [];
  const completedItems =
    (data && data?.filter((item) => item.status == BAZAR_STATUS.COMPLETED)) ??
    [];

  return (
    <>
      <BazarList
        title="Today's Bazar"
        items={pendingItems}
        onItemCheckChange={async (id: string, checked: boolean) => {
          await completeBazar(id);
        }}
        onItemDelete={async (id) => {
          await deleteBazar(id);
        }}
        showAddButton
      />
      <BazarList
        title="Today's Completed Items"
        items={completedItems}
        onItemCheckChange={async (id: string, checked: boolean) => {
          await completeBazar(id);
        }}
        onItemDelete={async (id) => {
          await deleteBazar(id);
        }}
        diabledCompleted={false}
      />
    </>
  );
};

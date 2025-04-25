import { BazarItem } from "./BazarItem";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import BazarCreateForm from "./BazarCreateForm";
import { IBazarItem } from "@/helper/types/bazar";
import { useRef } from "react";
import { BAZAR_STATUS } from "@/helper/constants/bazar.constant";
interface BazarListProps {
  title: string;
  items: IBazarItem[];
  onItemCheckChange?: (id: string, checked: boolean) => void;
  onItemDelete?: (id: string) => void;
  showAddButton?: boolean;
  diabledCompleted?: boolean;
}

export const BazarList: React.FC<BazarListProps> = ({
  title,
  items,
  onItemCheckChange,
  onItemDelete,
  showAddButton = false,
  diabledCompleted,
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        {showAddButton && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">+ Add Item</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] w-[95%] p-3 sm:p-4 md:p-6 max-h-[90vh] sm:h-auto overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Bazar</DialogTitle>
                <DialogDescription>
                  Enter the details of your bazar below.
                </DialogDescription>
              </DialogHeader>
              <DialogClose ref={closeRef} />
              <BazarCreateForm closeRef={closeRef} />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <BazarItem
            key={item._id}
            name={item.title}
            checked={item.status == BAZAR_STATUS.COMPLETED}
            disabled={item.status == BAZAR_STATUS.COMPLETED && diabledCompleted}
            onCheckChange={(checked) =>
              onItemCheckChange?.(String(item._id), checked)
            }
            onDelete={
              onItemDelete ? () => onItemDelete?.(String(item._id)) : undefined
            }
          />
        ))}
        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center p-6 text-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">No items found</p>
          </div>
        )}
      </div>
    </div>
  );
};

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useGlobalStore } from "@/store/global-store";

type MenuItemColorPickerProps = {
  control: any;
  name: string;
  label?: string;
};

export const MenuItemColorPicker = ({
  control,
  name,
  label = "Select Button Color",
}: MenuItemColorPickerProps) => {
  const data = useGlobalStore((store) => store.advanceColors);
  const colors = data[0]?.colors || [
    "#FF6B35", "#FF8E53", "#FFB366", "#FFD966",
    "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B",
    "#FF9800", "#FF5722", "#E91E63", "#9C27B0",
    "#673AB7", "#3F51B5", "#2196F3", "#00BCD4"
  ];

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg font-medium block">{label}</FormLabel>
          <FormControl>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color: string, idx: number) => (
                <button
                  key={idx}
                  type="button"
                  className={`size-[2.72rem] rounded-md border-2 ${
                    field.value === color
                      ? "border-4 border-gray-400"
                      : "border-gray-200"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => field.onChange(color)}
                />
              ))}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}; 
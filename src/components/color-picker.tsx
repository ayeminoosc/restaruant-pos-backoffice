import { Label } from "@/components/ui/label";
import { useProfileStore } from "@/store/profile-store";
import { Controller, useFormContext } from "react-hook-form";

type ColorPickerProps = {
  name: string;
  label: string;
};

export const ColorPicker = ({ name, label }: ColorPickerProps) => {
  const { control } = useFormContext();
  const data = useProfileStore((store) => store.profile?.colorOptions);
  const colors = data && data.length > 0 ? data : [];

  return (
    <div className="space-y-2">
      <Label className="text-[20px] text-[#2A2A2A] font-medium block">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex gap-2 flex-wrap">
            {colors.map((color, idx) => (
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
        )}
      />
    </div>
  );
};

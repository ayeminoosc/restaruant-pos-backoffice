import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";

// prettier-ignore
const colors = [
  "#FF5722", "#23e229", "#E91E63", "#2196F3", "#10be79",
  "#673AB7", "#ed8722", "#795548", "#ffffff", "#000000",
  "#2333e2", "#14af19", "#784558", "#004671", "#2f0058",
  "#a5ffdb", "#aa0000", "#ed8722", "#fe9d9d", "#818bff"
]
type ColorPickerProps = {
  name: string;
  label?: string;
};

export const ColorPicker = ({
  name,
  label = "Select Button Color",
}: ColorPickerProps) => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <Label className="text-lg font-medium block">{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex gap-2 flex-wrap">
            {colors.map((color, idx) => (
              <button
                key={idx}
                type="button"
                className={`size-8 rounded-md border-2 ${
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

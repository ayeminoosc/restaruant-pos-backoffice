export default function ColorBox({ color }: { color?: string }) {
  return (
    <div
      className="w-[2.5rem] h-[2.5rem] rounded-[0.625rem] flex-shrink-0 aspect-square"
      style={{ backgroundColor: color }}
    />
  );
}

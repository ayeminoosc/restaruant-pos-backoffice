export default function ColorBox({ color }: { color?: string }) {
  return (
    <div
      className="w-[2.5rem] h-[2.3rem] rounded-[0.625rem]"
      style={{ backgroundColor: color }}
    />
  );
}

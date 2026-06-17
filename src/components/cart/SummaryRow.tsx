interface SummaryRowProps {
  label: string;
  value: string;
}

export default function SummaryRow({
  label,
  value,
}: SummaryRowProps) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold text-[#1a0f1a]">
        {value}
      </span>
    </div>
  );
}
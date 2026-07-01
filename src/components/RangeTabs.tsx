import type { Range } from "../types/stock";

const RANGES: Range[] = ["1W", "1M", "3M", "1Y"];

interface RangeTabsProps {
  value: Range;
  onChange: (range: Range) => void;
  isPending: boolean;
}

export function RangeTabs({ value, onChange, isPending }: Readonly<RangeTabsProps>) {
  return (
    <div className="range-tabs" data-pending={isPending}>
      {RANGES.map((range) => (
        <button
          key={range}
          type="button"
          className="range-tab"
          data-active={range === value}
          onClick={() => onChange(range)}
        >
          {range}
        </button>
      ))}
    </div>
  );
}

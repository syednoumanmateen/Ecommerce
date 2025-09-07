import { memo } from "react";

const RadioGroup = ({ options = [], name, selected, onChange }) => {
  if (!Array.isArray(options) || options.length === 0) {
    return <p className="text-gray-500 text-sm">No options available</p>;
  }

  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={selected === opt.value}
            onChange={() => onChange(opt.value)}
            style={{ accentColor: "var(--primary)" }}
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  );
};

export default memo(RadioGroup)

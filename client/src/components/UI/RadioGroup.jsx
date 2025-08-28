import { memo } from "react";

const RadioGroup = ({ options, name, selected, onChange }) => (
    <div className="flex flex-col space-y-2">
        {options.map(({ label, value }) => (
            <label key={value} className="flex items-center space-x-2 cursor-pointer">
                <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={selected === value}
                    onChange={() => onChange(value)}
                    className="text-primary w-4 h-4"
                />
                <span>{label}</span>
            </label>
        ))}
    </div>
);

export default memo(RadioGroup)

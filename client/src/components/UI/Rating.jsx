import { memo } from "react";

const Rating = ({ options, name, selected, onChange }) => {
  return (
    <div className="flex flex-col space-y-2">
      {options.map((value) => {
        const filledStars = "★".repeat(value);
        const emptyStars = "☆".repeat(5 - value);
        const starDisplay = filledStars + emptyStars;

        return (
          <label key={`${name}-${value}`} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={value}
              checked={Number(selected) === value}
              onChange={() => onChange(value)}
              className="text-primary w-4 h-4"
            />
            <span className="text-primary text-lg font-sans">{starDisplay}</span>
          </label>
        );
      })}
    </div>
  );
};

export default memo(Rating);

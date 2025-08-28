import { memo } from "react";

const TextInputIcon = ({ iconStart, iconEnd, ...inputProps }) => {
    return (
        <div className="relative flex items-center">
            {iconStart && (
                <span className="absolute left-3 text-gray-400">
                    {iconStart}
                </span>
            )}

            <input
                {...inputProps}
                className={`w-full border rounded ${iconStart ? 'pl-10' : ''} ${iconEnd ? 'pr-10' : ''}`}
            />

            {iconEnd && (
                <span className="absolute right-3 text-gray-400">
                    {iconEnd}
                </span>
            )}
        </div>
    );
};

export default memo(TextInputIcon);

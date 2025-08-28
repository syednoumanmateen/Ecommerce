import { memo } from "react"

const Checkbox = ({ label, ...props }) => {
    return (
        <label className="flex items-center cursor-pointer">
            <input
                type="checkbox"
                {...props}
                style={{ accentColor: "var(--primary)" }}
            />
            {label && <span className="ms-2">{label}</span>}
        </label>
    )
}

export default memo(Checkbox)

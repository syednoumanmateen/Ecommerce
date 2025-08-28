import { memo } from "react"

const RoundButton = ({ children, className = "", ...props }) => {

  return (
    <button className={`button-rounded ${className}`} {...props}>
      {children}
    </button>
  )
}

export default memo(RoundButton)

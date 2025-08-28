import Logo from "./Logo"

const LogoHeader = ({ width = "120px", height = "120px", direction = "col", show = true}) => {
  return (
    <div className={`flex items-center flex-${direction} ${show ? "mb-8" : ""}`}>
      <Logo width={width} height={height} />
      {show && <h1 className={`mt-3 text-xl font-bold`}>
        Terenzo
      </h1>}
    </div>

  )
}

export default LogoHeader

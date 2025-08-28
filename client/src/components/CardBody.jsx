const CardBody = ({children,className}) => {
    return (
        <div className={`bg-white rounded-lg shadow-md ${className}`}>
            {children}
        </div>
    )
}

export default CardBody

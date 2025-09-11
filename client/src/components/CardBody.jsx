const CardBody = ({children,className}) => {
    return (
        <div className={`bg-white rounded shadow ${className}`}>
            {children}
        </div>
    )
}

export default CardBody

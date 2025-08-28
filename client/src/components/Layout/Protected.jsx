import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Navbar from "../Navbar";
import CardBody from "../CardBody";
import Footer from "../Footer";

const Protected = () => {
  const { userData } = useUser();

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="grid grid-rows-[auto_1fr] grid-cols-[250px_1fr] gap-2">
      <div className="row-span-1 col-span-2">
        <CardBody>
          <Navbar />
        </CardBody>
      </div>

      <div className="row-span-1 col-span-2">
        <CardBody className="p-2 outlet-container scrollbar-hide">
          <Outlet />
          <Footer />
        </CardBody>
      </div>
    </div>
  );
};

export default Protected;

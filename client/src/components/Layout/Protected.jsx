import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useVerifyToken } from "../../api/userApiHooks";
import CardBody from "../CardBody";
import Navbar from "../Navbar";
import Footer from "../Footer";

const ProtectedCard = () => {
  const { userData, setUser, clearUser } = useUser();
  const token = userData?.token;
  const { mutateAsync } = useVerifyToken();
  const navigate = useNavigate()

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const data = await mutateAsync(token);
        if (!data?.data?.valid) {
          clearUser();
          navigate("/login", { replace: true });
        }
      } catch {
        clearUser();
        navigate("/login", { replace: true });
      }
    };

    checkToken();
  }, [token, mutateAsync, clearUser, navigate]);

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

export default ProtectedCard;

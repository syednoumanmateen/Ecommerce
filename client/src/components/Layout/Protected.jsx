import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useVerifyToken } from "../../api/userApiHooks";
import CardBody from "../CardBody";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Loader from "../loading/Loader";

const Protected = () => {
  const { userData, clearUser } = useUser();
  const token = userData?.token;
  const { mutateAsync } = useVerifyToken();
  const navigate = useNavigate();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = userData?.token;

      if (!token) {
        redirectToLogin();
        return;
      }

      try {
        const data = await mutateAsync(token);
        if (!data?.data?.valid) {
          redirectToLogin();
        } else {
          setChecking(false);
        }
      } catch {
        redirectToLogin();
      }
    };

    const redirectToLogin = () => {
      clearUser();
      navigate("/login", { replace: true });
    };

    checkToken();
  }, []);

  if (checking) {
    return <div className="text-center p-4">
      <Loader />
    </div>;
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

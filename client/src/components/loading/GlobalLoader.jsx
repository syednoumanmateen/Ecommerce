import { useEffect, useState } from "react";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import Loader from "./Loader";

const GlobalLoader = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timer;

    if (isFetching > 0 || isMutating > 0) {
      timer = setTimeout(() => setShowLoader(true), 200); // 200ms delay
    } else {
      clearTimeout(timer);
      setShowLoader(false);
    }

    return () => clearTimeout(timer);
  }, [isFetching, isMutating]);

  if (!showLoader) return null;

  return (
    <div className="fixed inset-0 bg-white/70 z-50 flex items-center justify-center">
      <Loader />
    </div>
  );
};

export default GlobalLoader;

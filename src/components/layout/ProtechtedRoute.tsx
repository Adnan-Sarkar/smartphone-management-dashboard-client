import { ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtechtedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAppSelector((state) => state.user);
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    const decode = jwtDecode(token);

    const currentTime = Date.now() / 1000;

    if (decode.exp && decode.exp < currentTime) {
      setIsTokenExpired(true);
    }
  }, [token]);

  if (!token || isTokenExpired) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtechtedRoute;

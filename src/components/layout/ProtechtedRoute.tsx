import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";

const ProtechtedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAppSelector((state) => state.user);

  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return children;
};

export default ProtechtedRoute;

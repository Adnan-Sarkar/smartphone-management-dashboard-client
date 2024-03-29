import { Button, Layout } from "antd";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const DynamicHeader = ({ title }: { title: string }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    dispatch(logOut());
  };

  return (
    <Header
      style={{
        padding: "0 10px",
        background: "#f1f2f6",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>{title}</h2>
      <Button type="primary" onClick={handleLogout}>
        LogOut
      </Button>
    </Header>
  );
};

export default DynamicHeader;

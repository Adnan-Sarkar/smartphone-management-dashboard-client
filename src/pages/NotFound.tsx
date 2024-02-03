import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/inventory");
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={handleNavigateHome}>
          Back To Inventory
        </Button>
      }
    />
  );
};

export default NotFound;

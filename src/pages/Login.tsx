import { Button, Form, Input } from "antd";
import { Controller, FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Login = () => {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data: FieldValues) => {
    const { email, password } = data;

    if (!email) {
      toast.error("Email is required", {
        duration: 1000,
      });
    }
    if (!password) {
      toast.error("Password is required", {
        duration: 1000,
      });
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        style={{
          background: "#f5f6fa",
          padding: "50px",
          borderRadius: "10px",
        }}
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
      >
        <Form.Item label="Email" name="email">
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input type="email" {...field} />}
          />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password type="password" {...field} />
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>

        <div>Don't have any account? Register</div>
      </Form>
    </div>
  );
};

export default Login;

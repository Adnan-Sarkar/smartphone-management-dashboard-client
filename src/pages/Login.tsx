import { Button, Form, Input } from "antd";
import { Controller, FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/features/user/userApi";
import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { addUser } from "../redux/features/user/userSlice";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, control } = useForm();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    const toastId = toast.loading("Loged In...");
    const { email, password } = data;

    if (email && password) {
      try {
        const response = await login({
          email,
          password,
        }).unwrap();

        if (response?.statusCode !== 200) {
          throw new Error(response.message);
        }

        const { user, token } = response.data;

        const userInfo = {
          _id: user._id,
          fullName: user.fullName,
          userName: user.userName,
          email: user.email,
          phone: user.phone,
          gender: user.gender,
          age: user.age,
          profileImage: user.profileImage,
          role: user.role,
          token,
        };

        dispatch(addUser(userInfo));
        setIsLoading(false);
        toast.success("Loged In Successfull", {
          id: toastId,
          duration: 1000,
        });

        navigate(`/${user.role}/inventory`);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setIsLoading(false);
        if (err?.status === 404) {
          toast.error("No User Found!", {
            id: toastId,
            duration: 1000,
          });
        } else {
          toast.error(err.message, {
            id: toastId,
            duration: 1000,
          });
        }
      }
    } else {
      setIsLoading(false);
      toast.error("Please provide every information!", {
        id: toastId,
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
        <h1 style={{ textAlign: "center" }}>Login</h1>
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
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
            disabled={isLoading}
          >
            Login
          </Button>
        </Form.Item>

        <div>
          Don't have any account? <Link to={"/registration"}>Register</Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;

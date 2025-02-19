import { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../helper/axiosInstance";
import { toast } from "react-toastify";

interface IFormData {
  username: string;
  password: string;
}
const AuthPage = ({ type }: { type: string }) => {
  const [isLoading, setIsLaoding] = useState<boolean>(false);

  const [formData, setFormData] = useState<IFormData>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleSubmit = async (e: MouseEvent) => {
    try {
      const reqType = type === "signup" ? "signup" : "signin";
      e.preventDefault();
      setIsLaoding(true);
      const response = await axiosInstance.post(`/${reqType}`, formData);
      console.log(response);
      if (response.data.success) {
        navigate(type === "signup" ? "/signin" : "/");
      }
      if (type === "signin") {
        localStorage.setItem("token", response.data.token);
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "Something went wromg!";
      toast.error(message);
    } finally {
      setIsLaoding(false);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    console.log(value)
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="h-screen w-full flex items-center justify-center flex-col">
      <div className=" w-[400px] bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            {type === "signup"
              ? "Create your account"
              : "Sign in to your account"}
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              
              <Input
                type="text"
                placeholder="username"
                onChange={handleInput}
                value={formData.username}
                disabled={isLoading}
                name='username'
              />
            </div>
            <div>
              <Input
                type="password"
                disabled={isLoading}
                placeholder="••••••••"
                onChange={handleInput}
                value={formData.password}
                name='password'
              />
            </div>

            <Button
              //   onClick={handleInput}
              disabled={isLoading}
              text={type === "signup" ? "Sign In" : "Sign In"}
            />
            <div className="flex items-center justify-center">
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {type === "signup"
                  ? "Already have an account? "
                  : "Don’t have an account yet? "}
                <Link
                  to={type === "signup" ? "/signin" : "/signup"}
                  className="font-medium text-blue-300 text-primary hover:underline dark:text-primary-dark"
                >
                  {type === "signup" ? "Sign in" : "Sign up"}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

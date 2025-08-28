import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLogin } from "../../api/userApiHooks";

import CardBody from "../../components/CardBody";
import LogoHeader from "../../components/logo/LogoHeader";
import Button from "../../components/UI/Button";
import Checkbox from "../../components/UI/Checkbox";
import TextInput from "../../components/UI/TextInput";
import Loader from "../../components/loading/Loader";
import { toast } from "react-toastify";
import { useUser } from "../../context/UserContext"

const Login = () => {
    const rememberedData = JSON.parse(localStorage.getItem("remember")) || {
        email: "",
        password: "",
        remember: false,
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: rememberedData,
    });
    const { setUser } = useUser();
    const navigate = useNavigate();
    const { mutateAsync, isLoading } = useLogin();

    const onSubmit = async (data) => {
        if (data.remember) {
            localStorage.setItem("remember", JSON.stringify(data));
        } else {
            localStorage.removeItem("remember");
        }

        await mutateAsync(data, {
            onSuccess: (response) => {
                toast.success("Logged in successfully!");
                setUser(response?.data?.token);
                navigate("/");
            },
            onError: (err) => {
                toast.error(err.response?.data?.message || "Login failed");
            },
        });
    };

    return (
        <>
            <LogoHeader />
            <CardBody className="py-20 px-10">
                <h2 className="text-2xl font-semibold text-center mb-8">Login</h2>

                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <div className="gap-2 flex flex-col mb-8">
                        <TextInput
                            className="mb-3"
                            type="email"
                            name="email"
                            label="Email"
                            placeholder="Enter your email"
                            astric="true"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email format",
                                },
                            })}
                            error={errors.email?.message}
                        />

                        <TextInput
                            className="mb-1"
                            type="password"
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            astric="true"
                            {...register("password", {
                                required: "Password is required",
                            })}
                            error={errors.password?.message}
                        />

                        <div className="flex justify-between items-center mb-3">
                            <Checkbox className="text-primary" name="remember" label="Remember Me" {...register("remember")} />
                            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                                Forgot Password?
                            </Link>
                        </div>
                    </div>

                    <Button className="py-2 px-5" type="submit" disabled={isLoading}>
                        {isLoading ? <Loader className="h-5 w-5 mx-auto" /> : "Login"}
                    </Button>

                    <p className="text-center text-sm mt-6">
                        New here?{" "}
                        <Link to="/register" className="text-blue-600 font-medium hover:underline">
                            Create an account
                        </Link>
                    </p>
                </form>
            </CardBody>
        </>
    );
};

export default Login;

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../api/userApiHooks";
import TextInput from "../../components/UI/TextInput";
import Button from "../../components/UI/Button";
import LogoHeader from "../../components/logo/LogoHeader";
import CardBody from "../../components/CardBody";
import Loader from "../../components/loading/Loader";
import { toast } from "react-toastify";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const { mutate, isLoading } = useRegister();

    const onSubmit = (data) => {
        mutate(data, {
            onSuccess: () => {
                toast.success("Registration successful! Please log in.");
                navigate("/login");
            },
            onError: (err) => {
                toast.error(err.response?.data?.message || "Registration failed");
            },
        });
    };

    return (
        <>
            <LogoHeader />
            <CardBody className="py-20 px-10">
                <h2 className="text-2xl font-semibold text-center mb-8">Register</h2>

                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <div className="gap-2 flex flex-col mb-8">
                        <TextInput
                            className="mb-3"
                            type="text"
                            name="name"
                            label="Name"
                            placeholder="Enter your name"
                            astric="true"
                            {...register("name", {
                                required: "Name is required",
                            })}
                            error={errors.name?.message}
                        />

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
                            className="mb-3"
                            type="password"
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            astric="true"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            error={errors.password?.message}
                        />
                    </div>

                    <Button className="py-2 px-5" type="submit" disabled={isLoading}>
                        Register
                    </Button>

                    <p className="text-center text-sm mt-6">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </CardBody>
        </>
    );
};

export default Register;

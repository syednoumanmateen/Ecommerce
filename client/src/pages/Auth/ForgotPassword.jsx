import { useForm } from "react-hook-form";
import { useForgotPassword } from "../../api/userApiHooks";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CardBody from "../../components/CardBody";
import LogoHeader from "../../components/logo/LogoHeader";
import Button from "../../components/UI/Button";
import TextInput from "../../components/UI/TextInput";
import Loader from "../../components/loading/Loader";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useForgotPassword();

  const onSubmit = async (data) => {
    try {
      const result = await mutateAsync(data);
      const token = result?.data?.token;

      toast.success("Reset link sent! Check your email.");
      navigate({
        pathname: "/reset-password",
        search: `?token=${token}`,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <LogoHeader />
      <CardBody className="py-20 px-10">
        <h2 className="text-2xl font-semibold text-center mb-8">Forgot Password</h2>

        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="gap-2 flex flex-col mb-8">
            <TextInput
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
          </div>

          <Button type="submit" className="py-2 px-5" disabled={isLoading}>
            {isLoading ? <Loader className="h-5 w-5 mx-auto" /> : "Send Reset Link"}
          </Button>
        </form>
      </CardBody>
    </>
  );
};

export default ForgotPassword;

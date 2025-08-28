import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useResetPassword } from "../../api/userApiHooks";
import { toast } from "react-toastify";

import CardBody from "../../components/CardBody";
import LogoHeader from "../../components/logo/LogoHeader";
import Button from "../../components/UI/Button";
import TextInput from "../../components/UI/TextInput";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const { mutateAsync, isLoading } = useResetPassword();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await mutateAsync(
        { token, newPassword: data.password },
        {
          onSuccess: () => {
            toast.success("Password successfully reset. You can now log in.");
            navigate("/login");
          },
          onError: (err) => {
            toast.error(err.response?.data?.message || "Reset failed");
          },
        }
      );
    } catch (e) {}
  };

  return (
    <>
      <LogoHeader />
      <CardBody className="py-20 px-10">
        <h2 className="text-2xl font-semibold text-center mb-8">Reset Password</h2>

        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="gap-2 flex flex-col mb-8">
            <TextInput
              type="password"
              name="password"
              label="New Password"
              placeholder="Enter new password"
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

            <TextInput
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              astric="true"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              error={errors.confirmPassword?.message}
            />
          </div>

          <Button type="submit" className="py-2 px-5" disabled={isLoading}>
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </CardBody>
    </>
  );
};

export default ResetPassword;

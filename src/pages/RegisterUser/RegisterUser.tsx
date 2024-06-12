import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registerSchema } from "@/schemas/register";
import { Bounce, toast } from "react-toastify";

const RegisterUser = () => {
  // @ts-ignore
  const { createUser, loading } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
        secret_pass: data.secret_pass,
        role: "user",
      };

      createUser(data.email, data.password)
        .then((_result: any) => {
          fetch(`${import.meta.env.VITE_API_URL}/users`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userInfo),
          })
            .then(async (res) => {
              if (!res.ok) {
                const json = await res.json();
                throw new Error(json.message);
              }
              return res.json();
            })
            .then((data) => {
              if (data.insertedId) {
                reset();
                navigate(from, { replace: true });
                toast.success("User registered successfully!", {
                  position: "top-right",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  transition: Bounce,
                });
              }
            })
            .catch((error) => {
              // Handle error
              console.error("Error:", error);
              toast.error(`${error?.message}`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
            });
        })
        .catch((error: any) => {
          toast.error(`${error?.message}`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        });
    } catch (error) {
      // console.log(error, "error");
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle>Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">User Name</Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="johndoe@gmail.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="******"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="secret_pass">Secret Pass</Label>
                  <Input
                    type="password"
                    id="secret_pass"
                    placeholder="******"
                    {...register("secret_pass")}
                  />
                  {errors.secret_pass && (
                    <p className="text-red-500">{errors.secret_pass.message}</p>
                  )}
                </div>

                <Button type="submit">
                  {loading ? "Registering..." : "Register"}
                </Button>
              </div>
            </form>
            <p className="my-2 text-center">
              Already have an account?
              <Link className="font-semibold" to="/login">
                Login
              </Link>
            </p>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterUser;

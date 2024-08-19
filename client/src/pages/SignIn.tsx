import axios, { AxiosError, AxiosResponse } from "axios";
import { Alert, Button, FloatingLabel, Spinner } from "flowbite-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
interface SignInBody {
  email: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignInBody>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formData?.email === "" ||
      formData?.email === undefined ||
      formData?.password === "" ||
      formData?.password === undefined
    ) {
      return setErrorMessage("Please fill out all fields.");
    }

    setLoading(true); // Set loading to true when the request starts

    try {
      const res: AxiosResponse = await axios.post("/api/auth/signin", {
        email: formData?.email,
        password: formData?.password,
      });

      if (res?.status !== 200) {
        setErrorMessage(res.data);
      } else {
        setErrorMessage(undefined);
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error?.response?.data?.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <div className="min-h-screen mt-20 ">
      <div className="flex p-3 max-w-3xl mx-auto  flex-col md:flex-row md:items-center gap-5">
        <div className="left flex-1">
          <Link to="/" className="   font-bold  dark:text-white text-4xl  ">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">
              Beluga
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a web blog where we share knowledge from you guys.{" "}
          </p>
        </div>
        <div className="right flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <FloatingLabel
              variant="outlined"
              type="email"
              label="Your email"
              id="email"
              onChange={handleChange}
            />
            <FloatingLabel
              variant="outlined"
              type="password"
              label="Your password"
              id="password"
              onChange={handleChange}
            />
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span>Loading....</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

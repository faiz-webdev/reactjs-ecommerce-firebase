import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/data/myContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import LoadingScreen from "../../components/loader/LoadingScreen";
import { useForm } from "react-hook-form";

function Login() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const [loader, setLoader] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const login = async (data) => {
    try {
      // setEmail(watch("email"));
      // setPassword(watch("password"));
      // console.log(email, password)
      if (data === undefined) return;

      setLoading(true);
      const result = await signInWithEmailAndPassword(
        auth,
        data["email"],
        data["password"]
      );
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.setItem("user", JSON.stringify(result));

      setLoading(false);

      navigate("/");
    } catch (error) {
      toast.error("Sigin Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      {/* {loader && <LoadingScreen />} */}
      {loading && <Loader />}
      <div className=" flex justify-center items-center h-screen">
        {/* {loading && <Loader />} */}
        <form onSubmit={handleSubmit(login)}>
          <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
            <div className="">
              <h1 className="text-center text-white text-xl mb-4 font-bold">
                Login
              </h1>
            </div>
            <div>
              <input
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required.",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Email"
              />
              {errors.email && (
                <div className="text-red-600 mb-3 font-semibold">
                  {errors.email?.message}
                </div>
              )}
            </div>
            <div>
              <input
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                {...register("password", { required: true })}
                type="password"
                className=" bg-gray-600 mb-2 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Password"
              />
              {errors.password && (
                <div className="text-red-600 mb-3 font-semibold">
                  This field is required.
                </div>
              )}
            </div>
            <div className=" flex justify-center mb-3">
              <button
                type="submit"
                className=" bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg"
              >
                Login
              </button>
            </div>
            <div>
              <h2 className="text-white">
                {`Don't have an account`}{" "}
                <Link className=" text-yellow-500 font-bold" to={"/signup"}>
                  Signup
                </Link>
              </h2>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;

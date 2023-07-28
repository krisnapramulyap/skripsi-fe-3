import {
  InputAuthComponent,
  AllButton,
  FooterComponent,
} from "../modules";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ErrorHandling } from "../../components/modules";
import axios from "../../utils/axios";
import { getDataCookie } from "../../middleware/authorizationPage";

export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);

  if (dataCookie.isLogin) {
    return {
      redirect: {
        destination: "/main/home",
        permanent: false,
      },
    };
  }
  return {
    props: { data: dataCookie },
  };
}

export default function FormForgotPassComponent() {
  const router = useHistory();
  const [form, setForm] = useState({
    email: "",
    linkRedirect: process.env.URL_FRONTEND,
  });

  const [isSuccess, setIsSuccess] = useState({
    status: false,
    msg: "",
  });

  const [isError, setIsError] = useState({
    status: false,
    msg: "",
  });

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/forgot-password", form)
      .then((res) => {
        setIsSuccess({
          status: true,
          msg: res.data.msg,
        });

        setTimeout(() => {
          setIsSuccess({
            status: false,
            msg: "",
          });
        }, 3000);
      })
      .catch((err) => {
        setIsError({
          status: true,
          msg: err.response.data.msg,
        });

        setTimeout(() => {
          setIsError({
            status: false,
            msg: "",
          });
        }, 3000);
      });
  };

  const handleResendLink = () => {
    router.push("/auth/login");
  };

  return (
    <div className="register-content">
      <div
        className="
          register-content-header
          d-flex
          justify-content-center
          px-5
          py-5
          align-items-center
        "
      >
        <div className="header-logo">
          <img
            src="/assets/images/coffee 1.png"
            alt="logo-header"
            className="logo-header"
          />
          <span className="header-title ps-2">Coffee Brings</span>
        </div>
      </div>
      <div className="wrapper-register px-4 pb-5 w-75 mx-auto">
        <div className="forgot-pass-title text-center">
          Forgot your password?
        </div>
        <div className="forgot-pass-subtitle text-center">
          Do not worry, we got your back!
        </div>
        <div className="form-register mt-5">
          <form action="">
            <InputAuthComponent
              placeholder="Enter your email address to get link"
              name="email"
              type="email"
              onChange={handleChangeText}
            />
            {isError.status && <ErrorHandling msg={isError.msg} top="50px" />}
            {isSuccess.status && (
              <ErrorHandling msg={isSuccess.msg} top="50px" isSuccess={true} />
            )}
            <AllButton
              className="button-auth w-100 mt-4"
              text="Send"
              onClick={handleSubmit}
            />
          </form>
          <p className="timer-forgot-pass text-center mt-5">
            Click here if you didn’t receive any link
          </p>
          {/* <p className="timer-forgot-pass text-center">01:56</p> */}
          <AllButton
            className="button-auth btn-forgot w-100 mt-4"
            text="Resend Link"
            onClick={handleResendLink}
          />
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}

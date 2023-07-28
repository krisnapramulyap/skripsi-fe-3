import {
  InputAuthComponent,
  AllButton,
  FooterComponent,
} from "../modules";
import { useState } from "react";
import { ErrorHandling } from "../modules";
import { useHistory } from "react-router-dom";
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

const FormResetPasswordComponent = (props) => {
  const router = useHistory();
  const [formPassword, setFormPassword] = useState({
    keysChangePassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSuccess, setIsSuccess] = useState({
    status: false,
    msg: "",
  });

  const [isError, setIsError] = useState({
    status: false,
    msg: "",
  });

  const changePassword = (e) => {
    setFormPassword({
      ...formPassword,
      keysChangePassword: router.query.id,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch("/auth/reset-password", formPassword)
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
        router.push("/auth/login");
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

  return (
    <div className="register-content">
      <div
        className="
        register-content-header
        d-flex
        justify-content-between
        px-5
        py-4
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
        <div className="signup-logo">
          <span className="signup-title">Reset Password</span>
        </div>
      </div>
      <div className="wrapper-register px-4 pb-5 w-75 mx-auto">
        <div className="form-register">
          <form action="">
            <InputAuthComponent
              onChange={changePassword}
              name="newPassword"
              placeholder="Enter your new password"
              type="password"
              label="New Password"
            />
            <InputAuthComponent
              onChange={changePassword}
              name="confirmPassword"
              placeholder="Enter your confirm password"
              type="password"
              label="Confirm Password"
            />

            {isError.status && (
              <ErrorHandling msg={isError.msg} bottom="50px" />
            )}
            {isSuccess.status && (
              <ErrorHandling
                msg={isSuccess.msg}
                bottom="50px"
                isSuccess={true}
              />
            )}

            <AllButton
              className="button-auth w-100 mt-3"
              text="Confirm Password"
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default FormResetPasswordComponent;

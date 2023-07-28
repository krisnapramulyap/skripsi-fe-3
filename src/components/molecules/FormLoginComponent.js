import {
  InputAuthComponent,
  AllButton,
  FooterComponent,
} from "../modules";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getUserById } from "../../stores/action/dataUser";
import axios from "../../utils/axios";
import { connect } from "react-redux";
import Cookie from "js-cookie";

const FormLoginComponent = (props) => {
  const [valid, setValid] = useState(false);
  const router = useHistory();
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  // const toResetPass = () => {
  //   router.push("/auth/forgot-password");
  // };

  const toSignup = () => {
    router.push("/auth/register");
  };

  const handleChangeText = (e) => {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/login", formLogin)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("id", res.data.data.id);
        Cookie.set("token", res.data.data.token);
        Cookie.set("id", res.data.data.id);
        props.getUserById(res.data.data.id);
        router.push("/main/home");
      })
      .catch((err) => {
        setValid(err.response.data.msg);
        setTimeout(() => {
          setValid(false);
        }, 2000);
      });
  };

  return (
    <div className="register-content ">
      <div
        className="
        register-content-header
        d-flex
        justify-content-between
        px-5
        py-4
        align-items-center
        mt-5
      "
      >
        <div className="header-logo">
          <span className="header-title ps-2">Mie Ayam Kangen</span>
        </div>
        <div className="signup-logo">
          <span className="signup-title">Login</span>
        </div>
      </div>
      <div className="wrapper-register px-4 pb-5 w-75 mx-auto">
        <div className="form-register">
          <form action="">
            <InputAuthComponent
              onChange={handleChangeText}
              name="email"
              placeholder="Enter your email address"
              type="email"
              label="Email"
              value={formLogin.email}
            />
            <InputAuthComponent
              onChange={handleChangeText}
              name="password"
              placeholder="Enter your password"
              type="password"
              label="Password"
              value={formLogin.password}
            />
            {/* <p className="forgot-password mt-3" onClick={toResetPass}>
              Forgot Password?
            </p> */}
            {valid ? (
              <div className="error-msg text-center text-danger d-absolute">
                {valid}
              </div>
            ) : null}

            <AllButton
              className="button-auth w-100 mt-3"
              text="Login"
              onClick={handleSubmit}
            />
          </form>
          <p className="have-an-account text-center mt-4">
            Do not have an account?
          </p>
          <AllButton
            className="button-to-login w-100 mt-3"
            text="Sign Up Here"
            onClick={toSignup}
          />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  getUserById,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormLoginComponent);

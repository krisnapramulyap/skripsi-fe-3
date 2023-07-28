import React, { useEffect, useState, useRef } from "react";
import {
  HeaderComponent,
  FooterComponent,
  ErrorHandling,
} from "../../../components/modules";
import { useSelector, useDispatch } from "react-redux";
import { getDataCookie } from "../../../middleware/authorizationPage";
import axios from "../../../utils/axios";
import { getUserById } from "../../../stores/action/dataUser"
import { Modal, Button } from "react-bootstrap";
import { InputAuthComponent } from "../../../components/modules";

export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);

  if (!dataCookie.isLogin) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}




const date = new Date().toISOString().split("T")[0];

function Profile() {
  const inputFile = useRef(null);
  const user = useSelector((state) => state.dataUserById);
  const dispatch = useDispatch();


  const [dataUser, setDataUser] = useState({
    firstName: user.user.firstName,
    lastName: user.user.lastName,
    displayName: user.user.displayName,
    email: user.user.email,
    deliveryAddress: user.user.deliveryAddress,
    gender: user.user.gender,
    phoneNumber: user.user.phoneNumber,
    birthDay: date,
  });

  const [image, setImage] = useState({ image: "" });
  const [isSuccess, setIsSuccess] = useState({
    status: false,
    msg: "",
  });

  const [isError, setIsError] = useState({
    status: false,
    msg: "",
  });

  const onButtonClick = () => {
    inputFile.current.click();
  };




  const handleUpdateImage = () => {
    if (image === null || !image.image) {
    } else {
      const formData = new FormData();
      for (const data in image) {
        formData.append(data, image[data]);
      }

      axios
        .patch(`/user/update-image/${user.user.id}`, formData)
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
          dispatch(getUserById(user.user.id));
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
    }
  };

  const handleDelete = () => {
    axios
      .delete(`/user/image/${user.user.id}`)
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
        dispatch(getUserById(user.user.id));
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

  const changeText = (e) => {
    const { name, value } = e.target;

    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };

  const saveChanges = () => {
    axios
      .patch(`/user/${user.user.id}`, dataUser)
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
        dispatch(getUserById(user.user.id));
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

  useEffect(() => {
    handleUpdateImage();
  }, [image]);

  // MODAL PASSWORD
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const changePassword = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const updatePassword = () => {
    axios
      .patch(`/user/update-password/${user.user.id}`, password)
      .then((res) => {
        handleClose();
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

  return (
    <>
      <HeaderComponent />
      <div className="jumbotron__profile">
        <h1 className="profile__title">User Profile</h1>
        <div className="border_box">
          <div className="row">
            <div className="col-12 col-sm-4 text-center image__profile">
              <img
                src={
                  user.user.image
                    ? `http://localhost:3001/uploads/user/${user.user.image}`
                    : "/assets/images/default.png"
                }
                alt="profile"
                className="rounded-circle"
                width="175px"
              />
              <div className="font">
                <h2>{user.user.displayName || "-"}</h2>
                <p>{user.user.email}</p>
                <button
                  type="button"
                  className="btn btn__photo"
                  onClick={onButtonClick}
                >
                  <h6>Choose Photo</h6>
                </button>

                {/* input file */}
                <input
                  type="file"
                  id="file"
                  name="image"
                  onChange={(e) =>
                    setImage({
                      image: e.target.files[0],
                    })
                  }
                  ref={inputFile}
                  style={{ display: "none" }}
                />

                <button
                  type="button"
                  className="btn btn__photo-remove"
                  onClick={handleDelete}
                >
                  <h6>Remove Photo</h6>
                </button>
                <button
                  type="button"
                  className="btn btn__edit-password"
                  onClick={handleShow}
                >
                  <h6>Edit Password</h6>
                </button>
                <div className="font__edit">
                  <h3>
                    Do you want to save <br />
                    the change?
                  </h3>

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

                  <button
                    type="button"
                    className="btn btn__edit-save"
                    onClick={saveChanges}
                  >
                    <h6>Save Change</h6>
                  </button>
                  <button type="button" className="btn btn__edit-cancel">
                    <h6>Cancel</h6>
                  </button>
                  <button type="button" className="btn btn__edit-logout">
                    <h6>Logout</h6>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-8 detail__contact">
              <div className="border__contact">
                <div className="container">
                  <div className="row">
                    <div className="col-sm-10 contact">
                      <h5>Contacts</h5>
                    </div>
                    <div className="col-sm-2">
                      <div className="elips rounded-circle">
                        <img src="/assets/images/Vector.png" alt="pencil" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="container">
                      <form className="form__contacts">
                        <div className="form row">
                          <div className="col-sm-7">
                            <div className="textbox">
                              <label htmlFor="">
                                <h4>Email Adress :</h4>{" "}
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={dataUser.email}
                                placeholder="Input your email ..."
                                onChange={changeText}
                              />
                            </div>
                          </div>
                          <div className="col-sm-5">
                            <div className="textbox">
                              <label htmlFor="">
                                <h4>Mobile Number :</h4>{" "}
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                name="phoneNumber"
                                value={dataUser.phoneNumber}
                                placeholder="Input your number phone ..."
                                onChange={changeText}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="textbox">
                            <label htmlFor="">
                              <h4>Delivery Address :</h4>{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="deliveryAddress"
                              value={dataUser.deliveryAddress}
                              placeholder="Input your delivery address ..."
                              onChange={changeText}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="detail">
                    <h5>Details</h5>
                  </div>
                  <div className="row">
                    <div className="container">
                      <form className="form__detail">
                        <div className="form row">
                          <div className="col-sm-7">
                            <div className="textbox">
                              <label htmlFor="">
                                <h4>Display name :</h4>{" "}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="displayName"
                                value={dataUser.displayName}
                                placeholder="Input your dsiplay name ..."
                                onChange={changeText}
                              />
                            </div>
                          </div>
                          <div className="col-sm-5 date">
                            <label htmlFor="">
                              <h4>DD/MM/YY :</h4>{" "}
                            </label>
                            <input
                              type="date"
                              className="form-control date"
                              name="birthDay"
                              value={dataUser.birthDay}
                              placeholder="Input your birthday ..."
                              onChange={changeText}
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="textbox">
                            <label htmlFor="">
                              <h4>First name :</h4>{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="firstName"
                              value={dataUser.firstName}
                              placeholder="Input your first name ..."
                              onChange={changeText}
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="textbox">
                            <label htmlFor="">
                              <h4>Last name :</h4>{" "}
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              name="lastName"
                              value={dataUser.lastName}
                              placeholder="Input your last name ..."
                              onChange={changeText}
                            />
                          </div>
                        </div>

                        <div className="radio__button">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="inlineRadio1"
                              checked={dataUser.gender === "male"}
                              value="male"
                              onChange={changeText}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="inlineRadio1"
                            >
                              Male
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="inlineRadio2"
                              checked={dataUser.gender === "female"}
                              value="female"
                              onChange={changeText}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="inlineRadio2"
                            >
                              Female
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputAuthComponent
            label="New password"
            placeholder="Input new password ..."
            name="newPassword"
            type="password"
            onChange={changePassword}
          />

          <InputAuthComponent
            label="Confirm password"
            placeholder="Input confirm password ..."
            name="confirmPassword"
            type="password"
            onChange={changePassword}
          />

          {isError.status && <ErrorHandling msg={isError.msg} top="30px" />}
          {isSuccess.status && (
            <ErrorHandling msg={isSuccess.msg} top="30px" isSuccess={true} />
          )}

          <div className="d-flex justify-content-around mt-5">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updatePassword}>
              Save Changes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Profile;

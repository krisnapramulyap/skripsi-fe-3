import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeaderComponent, FooterComponent } from "../../../components/modules";
import { getDataCookie } from "../../../middleware/authorizationPage";

import { Link, useHistory, useParams } from "react-router-dom";
import {
  getAllPromo,
  postPromo,
  updatePromo,
  getPromoById,
} from "../../../stores/action/promo";

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

const initialState = {
  name: "",
  discount: 0,
  minTotalPrice: 0,
  maxDiscount: 0,
  promoCode: "",
  description: "",
  dateStart: date,
  dateEnd: date,
  image: null,
};

function Promo() {
  const { id } = useParams();
  const router = useHistory();
  const dispatch = useDispatch();
  const target = useRef(null);

  const [idPromo, setIdPromo] = useState(id);
  const [form, setForm] = useState(initialState);
  const [image, setImage] = useState("");

  const { user } = useSelector((state) => state.dataUserById);
  //DATA SELECTED PROMO AMBIL DARI SINI+++++++++++++++++
  const dataPromo = useSelector((state) => state.promo);

  useEffect(() => {
    handleAuthorization();
    dispatch(getPromoById(idPromo))
      .then((res) => {
        const newData = {
          ...form,
          name: res.value.data.data[0].name,
          discount: res.value.data.data[0].discount,
          minTotalPrice: res.value.data.data[0].minTotalPrice,
          maxDiscount: res.value.data.data[0].maxDiscount,
          promoCode: res.value.data.data[0].promoCode,
          description: res.value.data.data[0].description,
          dateStart: res.value.data.data[0].dateStart.split("T")[0],
          dateEnd: res.value.data.data[0].dateEnd.split("T")[0],
          image: res.value.data.data[0].image,
        };

        setForm(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  const handleAuthorization = () => {
    if (user.role !== "admin") {
      router.push("/main/home");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFile = (e) => {
    setForm({ ...form, image: e.target.files[0] });
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const resetForm = () => {
    setForm(initialState);
    setImage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const data in form) {
      formData.append(data, form[data]);
    }

    dispatch(postPromo(formData))
      .then((res) => {
        alert(res.value.data.msg);

        router.push("/main/home");

        dispatch(getAllPromo());
      })
      .catch((err) => {
        err.response.data.msg && alert(err.response.data.msg);
      });

    resetForm();
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const data in form) {
      formData.append(data, form[data]);
    }

    dispatch(updatePromo(idPromo, formData))
      .then((res) => {
        alert(res.value.data.msg);

        router.push("/main/home");

        dispatch(getAllPromo());
      })
      .catch((err) => {
        err.response.data.msg && alert(err.response.data.msg);
      });

    resetForm();
  };

  return (
    <>
      <HeaderComponent />
      <section className="new__promo">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-4">
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/admin/promo">Promo</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    {idPromo ? "Update promo" : "Add Promo"}
                  </li>
                </ol>
              </nav>
              <div className="new__promo--left">
                <div className="new__promo--left--content">
                  <div className="wrapper__image--promo">
                    {form.image ? (
                      <>
                        <figure className="promo">
                          <img
                            src={
                              image
                                ? image
                                : form.image
                                ? `http://localhost:3001/uploads/promo/${form.image}`
                                : "/assets/images/default.png"
                            }
                            alt="promo"
                            className="rounded-circle"
                          />
                        </figure>
                      </>
                    ) : (
                      <figure>
                        <img
                          src="/assets/images/icons/icon-camera.svg"
                          alt="camera"
                        />
                      </figure>
                    )}

                    <input
                      type="file"
                      style={{ display: "none" }}
                      name="image"
                      ref={target}
                      onChange={handleFile}
                    />
                  </div>

                  <button
                    className="btn__choose--file d-block mb-3"
                    onClick={() => target.current.click()}
                  >
                    Choose from Gallery
                  </button>

                  <div className="new__promo--left--content--form">
                    <div className="form-group position-relative mb-3">
                      <label htmlFor="discount">Enter the discount:</label>
                      <select
                        className="form-select left"
                        aria-label="Default select example"
                        name="discount"
                        onChange={handleChange}
                        value={form.discount}
                      >
                        <option>Select Promo</option>
                        <option value="10">10%</option>
                        <option value="20">20%</option>
                        <option value="30">30%</option>
                      </select>
                    </div>
                    <div className="form-group position-relative">
                      <label htmlFor="expired-date">Expire date:</label>
                      <input
                        type="date"
                        className="form__input--date mb-3"
                        onChange={handleChange}
                        value={form.dateStart}
                        name="dateStart"
                      />
                      <input
                        type="date"
                        className="form__input--date"
                        onChange={handleChange}
                        value={form.dateEnd}
                        name="dateEnd"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-8">
              <div className="new__promo--right">
                <div className="new__promo--right--content mx-auto">
                  <div className="form-group position-relative">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      placeholder="Type promo name min. 50 characters"
                      className="form__input--add"
                      name="name"
                      onChange={handleChange}
                      value={form.name}
                    />
                  </div>

                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <div className="form-group position-relative">
                        <label htmlFor="minTotalPrice">Min Total Price:</label>
                        <input
                          type="number"
                          placeholder="Type the min total price"
                          className="form__input--add"
                          name="minTotalPrice"
                          onChange={handleChange}
                          value={form.minTotalPrice}
                        />
                      </div>
                    </div>

                    <div className="col-12 col-lg-6">
                      <div className="form-group position-relative">
                        <label htmlFor="maxDiscount">Max Discount:</label>
                        <input
                          type="number"
                          placeholder="Type the max discount"
                          className="form__input--add"
                          name="maxDiscount"
                          onChange={handleChange}
                          value={form.maxDiscount}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group position-relative">
                    <label htmlFor="promoCode">Input promo code:</label>
                    <input
                      type="text"
                      placeholder="Type the promo code"
                      className="form__input--add"
                      name="promoCode"
                      onChange={handleChange}
                      value={form.promoCode}
                    />
                  </div>

                  <div className="form-group position-relative">
                    <label htmlFor="description">Description:</label>
                    <textarea
                      placeholder="Describe your promo min. 150 characters"
                      className="form__input--add desc"
                      name="description"
                      onChange={handleChange}
                      value={form.description}
                      maxLength="150"
                    ></textarea>
                  </div>

                  <button
                    className="btn__save--promo d-block mb-3"
                    onClick={id ? handleUpdate : handleSubmit}
                  >
                    {id ? "Update Promo" : "Save Promo"}
                  </button>
                  <button
                    className="btn__cancel--promo d-block"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterComponent />
    </>
  );
}

export default Promo;

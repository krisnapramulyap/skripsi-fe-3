import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HeaderComponent, FooterComponent } from "../../../components/modules";
import { Modal, Button } from "react-bootstrap";
import {
  postProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "../../../stores/action/allProduct";
import { getDataCookie } from "../../../middleware/authorizationPage";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);

  console.log(dataCookie, "cokie");
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

const initialState = {
  name: "",
  price: "",
  category: "",
  description: "",
  size: [],
  image: null,
};

const stateParams = {
  page: 1,
  limit: 6,
  category: "",
  search: "",
  sort: "",
  order: "ASC",
};

function NewProduct() {
  const { id } = useParams();
  const router = useHistory();
  const dispatch = useDispatch();
  const target = useRef(null);
  const [notif, setNotif] = useState({ err: "", success: "" });
  const { user } = useSelector((state) => state.dataUserById);
  const [form, setForm] = useState(initialState);
  const [params, setParams] = useState(stateParams);
  const [image, setImage] = useState("");
  const [selectSize, setSelectSize] = useState([]);
  const [unSelected, setUnSelected] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    notif.success ? router.push("/main/home") : <></>;
  };

  const inputSize = ["Pedas", "Sedang", "Normal"];
  const inputGram = ["dingin", "Hangat"];

  const handleAuthorization = () => {
    if (user.role !== "admin") {
      router.back();
    }
  };

  useEffect(() => {
    handleAuthorization();
    if (id) {
      dispatch(getProductById(id))
        .then((res) => {
          const newData = {
            ...form,
            name: res.value.data.data[0].name,
            price: res.value.data.data[0].price,
            category: res.value.data.data[0].category,
            description: res.value.data.data[0].description,
            size: res.value.data.data[0].size.split(","),
            image: res.value.data.data[0].image,
          };

          setForm(newData);
        })
        .catch((err) => err.response.data.msg && alert(err.response.data.msg));
    }
  }, [dispatch, selectSize, unSelected]);

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

  const selectedSize = (data) => {
    if (form.size.includes(data)) {
      const deleteSize = form.size.filter((val) => {
        return val !== data;
      });
      setForm({ ...form, size: deleteSize });
    } else {
      setForm({ ...form, size: [...form.size, data] });
    }
  };

  const resetForm = () => {
    setForm(initialState);
    setImage("");
    setSelectSize([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(true);
    const newData = {
      ...form,
      size: [...inputSize, ...inputGram]
        .filter((item) => form.size.indexOf(item) >= 0)
        .join(","),
    };

    const formData = new FormData();

    for (const data in newData) {
      formData.append(data, newData[data]);
    }

    dispatch(postProduct(formData))
      .then((res) => {
        setShow(true);
        setNotif({ ...notif, success: res.value.data.msg });

        dispatch(
          getAllProduct(
            params.page,
            params.limit,
            params.category,
            params.search,
            params.sort,
            params.order
          )
        );
      })
      .catch((err) => {
        err.response.data.msg &&
          setNotif({ ...notif, err: err.response.data.msg });
      });

    resetForm();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setShow(true);
    const newData = {
      ...form,
      size: [...inputSize, ...inputGram]
        .filter((item) => form.size.indexOf(item) >= 0)
        .join(","),
    };

    const formData = new FormData();

    for (const data in newData) {
      formData.append(data, newData[data]);
    }

    dispatch(updateProduct(id, formData))
      .then((res) => {
        setShow(true);
        setNotif({ ...notif, success: res.value.data.msg });

        dispatch(
          getAllProduct(
            params.page,
            params.limit,
            params.category,
            params.search,
            params.sort,
            params.order
          )
        );
      })
      .catch((err) => {
        setNotif({ ...notif, err: err.response.data.msg });
      });

    resetForm();
  };

  return (
    <>
      <HeaderComponent />
      <section className="new__product">
        <div className="container">
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>{notif.success ? "Success" : "Failed"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{notif.success ? notif.success : notif.err}</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Ok
              </Button>
            </Modal.Footer>
          </Modal>
          <div className="row">
            <div className="col-12 col-lg-4">
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/main/home">Product</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    {id ? "Update product" : "Add Product"}
                  </li>
                </ol>
              </nav>
              <div className="new__product--left">
                <div className="new__product--left--content">
                  <div className="wrapper__image">
                    {form.image ? (
                      <>
                        <figure className="product">
                          <img
                            src={
                              image
                                ? image
                                : form.image
                                ? `http://localhost:3001/uploads/product/${form.image}`
                                : "/assets/images/default.png"
                            }
                            alt="product image"
                            className="rounded-circle"
                          />
                        </figure>
                      </>
                    ) : (
                      <figure>
                        <img
                          src="/assets/images/icons/icon-camera.svg"
                          alt="update image"
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
                  <button
                    className="btn__save d-block mb-3"
                    onClick={id ? handleUpdate : handleSubmit}
                  >
                    {id ? "Update Product" : "Save Product"}
                  </button>
                  <button className="btn__cancel d-block" onClick={resetForm}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-8">
              <div className="new__product--right">
                <div className="new__product--right--content mx-auto">
                  <div className="form-group position-relative">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      placeholder="Type product name min. 50 characters"
                      className="form__input--add"
                      name="name"
                      onChange={handleChange}
                      value={form.name}
                    />
                  </div>

                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <div className="form-group position-relative">
                        <label htmlFor="price">Price:</label>
                        <input
                          type="number"
                          placeholder="Type the price"
                          className="form__input--add"
                          name="price"
                          onChange={handleChange}
                          value={form.price}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-group position-relative">
                        <label htmlFor="category">Category:</label>
                        <select
                          className="form-select form__input--add"
                          aria-label="Default select example"
                          name="category"
                          onChange={handleChange}
                          value={form.category}
                        >
                          <option>Select category</option>
                          <option value="Foods">Foods</option>
                          <option value="Drinks">Drinks</option>
                          <option value="Deserts">Deserts</option>
                          <option value="Add-on">Add-on</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group position-relative">
                    <label htmlFor="description">Description:</label>
                    <textarea
                      placeholder="Describe your product min. 150 characters"
                      className="form__input--add desc"
                      name="description"
                      maxLength="150"
                      onChange={handleChange}
                      value={form.description}
                    ></textarea>
                  </div>

                  <div className="form-group position-relative mb-0">
                    <label htmlFor="size">Input product type:</label>
                    <p>Click type you want to use for this product</p>

                    <div className="size__wrapper--info">
                      {inputSize?.map((item, index) => {
                        return (
                          <div
                            className={`size__wrapper--info--content--add ${
                              form.size.includes(item) ? "active" : ""
                            } rounded-circle`}
                            onClick={() => {
                              unSelected.includes(item) ? (
                                <></>
                              ) : (
                                selectedSize(item)
                              );
                            }}
                            key={index}
                          >
                            <span className="span-size">{item}</span>
                          </div>
                        );
                      })}

                      {inputGram?.map((item, index) => {
                        return (
                          <div
                            className={`size__wrapper--info--content--add ${
                              form.size.includes(item) ? "active" : ""
                            } rounded-circle`}
                            onClick={() => {
                              unSelected.includes(item) ? (
                                <></>
                              ) : (
                                selectedSize(item)
                              );
                            }}
                            key={index}
                          >
                            <span className="span-size">
                              {item}
                          
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
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

export default NewProduct;

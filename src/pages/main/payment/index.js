import React, { useEffect, useState } from "react";
import { FooterComponent, HeaderComponent } from "../../../components/modules";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteToCart, clearCart } from "../../../stores/action/addCart";
import { getAllPromo } from "../../../stores/action/promo";
import { getDataCookie } from "../../../middleware/authorizationPage";
import axios from "../../../utils/axios";
import { formatRp } from "../../../utils/formatRp";

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
    props: { data: dataCookie },
  };
}

function Payment() {
  const router = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.addCart);
  const user = useSelector((state) => state.dataUserById);
  const promo = useSelector((state) => state.promo);
  const [link, setLink] = useState("");
  const [valid, setValid] = useState(false);
  const [dataOrder, setDataOrder] = useState({
    idUser: user.user.id,
    paymentMethod: "",
    paymentStatus: "pending",
    idPromo: null,
    tax: 0,
    subTotal: 0,
    total: 0,
    orderItem: [...cart.cart],
  });

  const [tempDataOrder, setTempDataOrder] = useState({
    total: 0,
  });

  const [discount, setDiscount] = useState({
    discount: 0,
  });

  const handlePromo = (e) => {
    if (e.target.value !== "") {
      const newPromo = promo.data.filter((item) => {
        return item.id === e.target.value;
      });

      console.log(newPromo[0].maxDiscount, "MAX DISKON");

      const dateNow = new Date().toISOString().split("T")[0];
      const dateStart = newPromo[0].dateStart.split("T")[0];
      const dateEnd = newPromo[0].dateEnd.split("T")[0];

      // CHECK EXPIRED
      if (dateEnd >= dateNow && dateStart <= dateNow) {
        // CHECK MIN TOTAL PRICE
        if (dataOrder.subTotal >= newPromo[0].minTotalPrice) {
          let newDiscount = dataOrder.subTotal * (newPromo[0].discount / 100);

          if (newDiscount > newPromo[0].maxDiscount) {
            newDiscount = newPromo[0].maxDiscount;
            setDiscount({ discount: newDiscount });
            setDataOrder({
              ...dataOrder,
              idPromo: e.target.value,
              total: tempDataOrder.total - newDiscount,
            });
          } else {
            setDiscount({ discount: newDiscount });
            setDataOrder({
              ...dataOrder,
              idPromo: e.target.value,
              total: tempDataOrder.total - newDiscount,
            });
          }
        } else {
          setDiscount({ discount: 0 });
          setDataOrder({
            ...dataOrder,
            idPromo: null,
            total: tempDataOrder.total,
          });
          setValid("Total price less than minimum discount requirement");
          setTimeout(() => {
            setValid(false);
          }, 3000);
        }
      } else {
        setDiscount({ discount: 0 });
        setDataOrder({
          ...dataOrder,
          idPromo: null,
          total: tempDataOrder.total,
        });
        e.target.value = "";

        setValid("Promo date doesn't valid");
        setTimeout(() => {
          setValid(false);
        }, 3000);
      }
    } else {
      setDiscount({ discount: 0 });
      setDataOrder({
        ...dataOrder,
        idPromo: null,
        total: tempDataOrder.total,
      });
    }
  };

  const postOrder = () => {
    if (
      !user.user.deliveryAddress ||
      !user.user.displayName ||
      !user.user.phoneNumber
    ) {
      alert("Please completed your profile account before you payment!");

      router.push("/main/profile");
      return;
    }

    if (!dataOrder.paymentMethod) {
      alert("Please choose your payment method!");
      return;
    }

    axios
      .post("/order", dataOrder)
      .then((res) => {
        console.log(res);
        alert("Success order product");
        setLink(res.data.data.urlRedirect);
        dispatch(clearCart());
      })
      .catch((err) => {
        alert("Failed order product");
      });
  };

  useEffect(() => {
    // SUM
    let newSubTotal = 0;
    let newTax = 0;

    cart.cart.map((item) => {
      newSubTotal += item.total;
    });

    newTax = newSubTotal / 10;

    setDataOrder({
      ...dataOrder,
      subTotal: newSubTotal,
      tax: newTax,
      total: newSubTotal + newTax,
    });

    setTempDataOrder({
      total: newSubTotal + newTax,
    });
  }, [cart]);

  useEffect(() => {
    dispatch(getAllPromo());
  }, []);

  return (
    <>
      <HeaderComponent />
      <section className="payment__deliv">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-4">
              <div className="payment__deliv--left">
                <div className="payment__deliv--left--content">
                  <h1>
                    Checkout your <span className="d-md-block">item now!</span>
                  </h1>

                  <div className="payment__deliv--left--content--card">
                    <h1>Order Summary</h1>

                    <div style={{ height: "250px", overflowY: "auto" }}>
                      {cart.cart.length > 0 ? (
                        <>
                          {cart.cart?.map((item, index) => (
                            <div
                              className="payment__deliv--left--content--card--order"
                              style={{ position: "relative", padding: "10px" }}
                            >
                              <div
                                className="
                        payment__deliv--left--content--card--order--content
                      "
                              >
                                <figure>
                                  <img
                                    src={
                                      item.image
                                        ? `http://localhost:3001/uploads/product/${item.image}`
                                        : `/assets/images/default.png`
                                    }
                                    alt="z"
                                  />
                                </figure>

                                <div className="detail__order">
                                  <p>{item.name}</p>
                                  <p>QTY: {item.qty}</p>
                                  <p className="mb-0">size: {item.size}</p>
                                </div>
                              </div>

                              <p className="price">{formatRp(item.total)}</p>

                              <div
                                className="history__card--trash"
                                onClick={() => dispatch(deleteToCart(index))}
                                style={{ cursor: "pointer" }}
                              >
                                <svg
                                  width="16"
                                  height="18"
                                  viewBox="0 0 16 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M1 4.2H2.55556M2.55556 4.2H15M2.55556 4.2V15.4C2.55556 15.8243 2.71944 16.2313 3.01117 16.5314C3.30289 16.8314 3.69855 17 4.11111 17H11.8889C12.3014 17 12.6971 16.8314 12.9888 16.5314C13.2806 16.2313 13.4444 15.8243 13.4444 15.4V4.2H2.55556ZM4.88889 4.2V2.6C4.88889 2.17565 5.05278 1.76869 5.3445 1.46863C5.63622 1.16857 6.03189 1 6.44444 1H9.55556C9.96811 1 10.3638 1.16857 10.6555 1.46863C10.9472 1.76869 11.1111 2.17565 11.1111 2.6V4.2M6.44444 8.2V13M9.55556 8.2V13"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>Your cart is empty, please order first</p>
                      )}
                    </div>

                    <hr className="w-100" style={{ color: "#000000" }} />

                    <select
                      className="form-select"
                      onChange={(e) => handlePromo(e)}
                    >
                      <option selected value="">
                        Select Promo
                      </option>

                      {promo.data.length > 0 ? (
                        <>
                          {promo.data.map((item) => (
                            <option value={item.id} key={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </>
                      ) : (
                        <>
                          <option value="">not found</option>
                        </>
                      )}
                    </select>

                    <hr className="w-100" style={{ color: "#000000" }} />

                    <div className="display__wrapper">
                      <div className="display__discount">
                        <p className="display__discount--text mb-0">DISCOUNT</p>
                        <p className="display__discount--number mb-0">
                          {formatRp(discount.discount)}
                        </p>
                      </div>
                      <div className="display__subtotal">
                        <p className="display__subtotal--text mb-0">SUBTOTAL</p>
                        <p className="display__subtotal--number mb-0">
                          {formatRp(dataOrder.subTotal)}
                        </p>
                      </div>
                      <div className="display__tax">
                        <p className="display__tax--text mb-0">TAX & FEES</p>
                        <p className="display__tax--number mb-0">
                          {formatRp(dataOrder.tax)}
                        </p>
                      </div>
                    </div>

                    {valid ? (
                      <div className="error-msg text-center text-danger d-absolute mb-3">
                        {valid}
                      </div>
                    ) : null}

                    <div className="display__total">
                      <p className="display__total--text mb-0">TOTAL</p>
                      <p className="display__total--number mb-0">
                        {formatRp(dataOrder.total)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-8">
              <div className="payment__deliv--right mx-md-auto">
                <div className="payment__deliv--right--content">
                  <h3>Address details</h3>
                  <div className="payment__deliv--right--content--card">
                    <div className="payment__deliv--right--content--card--inner">
                      <h5>
                        <span className="fw-bold">Delivery</span> to{" "}
                        {user.user.displayName || "-"}
                      </h5>
                      <hr className="w-100" style={{ color: "#000000" }} />
                      <p className="address">
                        {user.user.deliveryAddress || "-"}
                      </p>
                      <hr className="w-100" style={{ color: "#000000" }} />
                      <p className="telp">{user.user.phoneNumber || "-"}</p>
                    </div>
                  </div>
                </div>
                <div
                  className="payment__deliv--right--content"
                  style={{ marginBottom: "45px" }}
                >
                  <h3>Payment method</h3>
                  <div className="payment__deliv--right--content--card">
                    <div className="payment__deliv--right--content--card--inner">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          checked={dataOrder.paymentMethod === "Card"}
                          onChange={() =>
                            setDataOrder({
                              ...dataOrder,
                              paymentMethod: "Card",
                            })
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          <figure className="card">
                            <img
                              src="/assets/images/icons/icon-card.svg"
                              alt=""
                            />
                          </figure>
                          Card
                        </label>
                        <hr className="w-100" style={{ color: "#000000" }} />
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          checked={dataOrder.paymentMethod === "Bank Account"}
                          onChange={() =>
                            setDataOrder({
                              ...dataOrder,
                              paymentMethod: "Bank Account",
                            })
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                        >
                          <figure className="bank">
                            <img
                              src="/assets/images/icons/icon-bank.svg"
                              alt=""
                            />
                          </figure>
                          Bank account
                        </label>
                        <hr className="w-100" style={{ color: "#000000" }} />
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault3"
                          checked={
                            dataOrder.paymentMethod === "Cash On Delivery"
                          }
                          onChange={() =>
                            setDataOrder({
                              ...dataOrder,
                              paymentMethod: "Cash On Delivery",
                            })
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault3"
                        >
                          <figure className="deliv">
                            <img
                              src="/assets/images/icons/icon-deliv.svg"
                              alt=""
                            />
                          </figure>
                          Cash on delivery
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <button  className="btn__confirm w-100 mb-3" onClick={postOrder} href={link}>
                  Confirm
                </button>
                <a href={link}>
                  <button className="btn__confirm w-100">Payment</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterComponent />
    </>
  );
}

export default Payment;

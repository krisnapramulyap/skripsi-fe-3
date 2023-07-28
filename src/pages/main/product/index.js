import React, { useEffect, useState } from "react";
// import axios from "utils/axios";
import { useSelector, useDispatch } from "react-redux";
import { FooterComponent, HeaderComponent } from "../../../components/modules";
import { useHistory, useParams, Link } from "react-router-dom";
import { getProductById } from "../../../stores/action/allProduct";
import { getDataCookie } from "../../../middleware/authorizationPage";
import { addToCart } from "../../../stores/action/addCart";
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
    props: {},
  };
}

export default function DetailProduct() {
  const { id } = useParams();
  const router = useHistory();
  const dispatch = useDispatch();
  const cartRedux = useSelector((state) => state.addCart);
  const { user } = useSelector((state) => state.dataUserById);

  const [dataProduct, setDataProduct] = useState({});
  const [active, setActive] = useState(0);

  const [pricePcs, setPricePcs] = useState({
    price: 0,
    size: "R",
  });

  const [cart, setCart] = useState({
    productId: id,
    qty: 1,
  });

  const handleActive = (index) => setActive(index);

  const handleAuthorization = () => {
    if (user.role !== "user") {
      router.back();
    }
  };

  const sum = (size) => {
    if (size.includes("R") || size.includes("250")) {
    } else if (size.includes("L") || size.includes("300")) {
      setPricePcs({
        price: dataProduct.price + 5000,
        size: "L",
      });
    } else if (size.includes("XL") || size.includes("500")) {
      setPricePcs({
        price: dataProduct.price + 10000,
        size: "XL",
      });
    } else {
    }
  };

  const distpatchCart = () => {
    dispatch(
      addToCart({
        ...cart,
        name: dataProduct.name,
        image: dataProduct.image,
        price: pricePcs.price,
        total: pricePcs.price * cart.qty,
        size: pricePcs.size,
      })
    );
    console.log({
      ...cart,
      name: dataProduct.name,
      image: dataProduct.image,
      price: pricePcs.price,
      total: pricePcs.price * cart.qty,
      size: pricePcs.size,
    });
    router.push("/main/home");
  };

  useEffect(() => {
    handleAuthorization();
    dispatch(getProductById(id)).then((res) => {
      setPricePcs({
        ...pricePcs,
        price: res.value.data.data[0].price,
      });
      setDataProduct({
        ...res.value.data.data[0],
        size: res.value.data.data[0].size.split(","),
      });
    });
  }, [id]);

  const yourCart = () => {
    // VALIDATE CART
    if (!cartRedux.cart.length) {
      alert("Order first your favorit coffee or foods!");

      return;
    }

    router.push("/main/payment");
  };

  return (
    <>
      <HeaderComponent />
      <section className="detail__product">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-4">
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/main/home">Product</Link>
                  </li>
                  <li className="breadcrumb-item active">{dataProduct.name}</li>
                </ol>
              </nav>
              <div className="detail__product--left">
                <div className="detail__product--left--content">
                  <figure className="rounded-circle">
                    <img
                      src={
                        dataProduct.image
                          ? `${"http://localhost:3001"}/uploads/product/${
                              dataProduct.image
                            }`
                          : `/assets/images/default.png`
                      }
                      alt="c"
                      className="rounded-circle"
                    />
                  </figure>

                  <h5 style={{fontSize: "18px", fontWeight: "bold"}}>{dataProduct.name}</h5>
                  <p>{formatRp(dataProduct.price)}</p>

                  <button className="btn__add" onClick={distpatchCart}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-8">
              <div className="detail__product--right">
                <div className="detail__product--right--desc mx-md-auto">
                  
                <h3 className="choose__size mb-5">Product Description</h3>
                  <p className="mb-5">{dataProduct.description}</p>

                  <div className="choose__size mb-4">
                    <h3>Select Category</h3>

                    <div className="size__wrapper--info mt-4">
                      {dataProduct.size?.length > 0 ? (
                        <>
                          {dataProduct.size?.map((item, index) => (
                            <div
                              className={`size__wrapper--info--content--detail ${
                                active === index ? "active" : ""
                              } rounded-circle`}
                              key={index}
                              onClick={() => {
                                handleActive(index);
                                sum(item);
                              }}
                            >
                              {item}
                              {item.length === 3 && "gr"}
                            </div>
                          ))}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>

                <div className="detail__product--right--product mx-md-auto">
                  <div className="detail__product--right--product--wrapper">
                    <div className="detail__product--right--product--wrapper--content">
                      <figure>
                        <img
                          src={
                            dataProduct.image
                              ? `${'http://localhost:3001'}/uploads/product/${dataProduct.image}`
                              : `/assets/images/default.png`
                          }
                          alt="b"
                          className="rounded-circle"
                        />
                      </figure>

                      <div className="qty__wrapper">
                        <h2>{dataProduct.name}</h2>

                        <button
                          className="btn__qty min rounded-circle"
                          onClick={() => {
                            cart.qty <= 1
                              ? setCart({ ...cart, qty: 1 })
                              : setCart({ ...cart, qty: cart.qty - 1 });
                          }}
                        >
                          -
                        </button>

                        <span className="qty">{cart.qty}</span>

                        <button
                          className="btn__qty plu rounded-circle"
                          onClick={() =>
                            setCart({ ...cart, qty: cart.qty + 1 })
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="checkout">
                      <h3 >Checkout</h3>

                      <figure className="arr rounded-circle"  onClick={distpatchCart}>
                        <img
                          src="/assets/images/icons/icon-arr-right.svg"
                          alt="arr"
                        />
                      </figure>
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

import React from "react";
import { formatRp } from "../../utils/formatRp";

function Favorite() {
  return (
    <section className="favorite" style={{ marginBottom: "70px" }}>
      <div className="container">
        <div className="favorite__content">
          <div className="favorite__content--head">
            <h1>Product Favorite Customers</h1>
            <p>
              Let’s choose and have a bit taste of poeple’s favorite. It might
              be yours too!
            </p>
          </div>

          <div className="favorite__content--wrapper">
            <div className="favorite__content--wrapper--card">
              <div
                className="
              d-flex
              justify-content-center
              align-items-center
              position-relative
            "
              >
                <figure className="hazelnut">
                  <img
                    src="assets/food-img/food-1.png"
                    alt="a"
                    className="hazelnut--image rounded-circle"
                  />
                </figure>

                <div className="title mt-3">Mie Ayam Komplit</div>
              </div>

              <div className="list__info--content mt-4">
                <div className="list list__info--content--inner">
                  <figure className="mb-0 rounded-circle">
                    <img src="assets/food-img/icons/icon-check.svg" alt="t" />
                  </figure>

                  <span>Authentic Taste</span>
                </div>
                <div className="list list__info--content--inner">
                  <figure className="mb-0 rounded-circle">
                    <img src="assets/food-img/icons/icon-check.svg" alt="t" />
                  </figure>

                  <span>High Quality Foods</span>
                </div>
                <div className="list list__info--content--inner">
                  <figure className="mb-0 rounded-circle">
                    <img src="assets/food-img/icons/icon-check.svg" alt="t" />
                  </figure>

                  <span>Low Price Foods</span>
                </div>
                <div className="list list__info--content--inner">
                  <figure className="mb-0 rounded-circle">
                    <img src="assets/food-img/icons/icon-check.svg" alt="t" />
                  </figure>
                  <span>Favorite Foods </span>
                </div>
              </div>

              <div
                className="
              d-flex
              justify-content-center
              align-items-center
              flex-column
            "
              >
                <h5 className="list__info--content--price">
                  {formatRp(20000)}
                </h5>
                <button className="btn__order">Order Now</button>
              </div>
            </div>
            <div className="favorite__content--wrapper--card">
              <div
                className="
              d-flex
              justify-content-center
              align-items-center
              position-relative
            "
              >
                <figure className="hazelnut">
                  <img
                    src="assets/food-img/food-2.png"
                    alt="a"
                    className="hazelnut--image rounded-circle"
                  />
                </figure>

                <div className="title mt-3">Kwetiaw Komplit</div>
              </div>

              <div className="list__info--content mt-4">
                <div className="list list__info--content--inner">
                  <figure className="mb-0 rounded-circle">
                    <img src="assets/food-img/icons/icon-check.svg" alt="t" />
                  </figure>

                  <span>Authentic Taste </span>
                </div>
                <div className="list list__info--content--inner">
                  <figure className="mb-0 rounded-circle">
                    <img src="assets/food-img/icons/icon-check.svg" alt="t" />
                  </figure>

                  <span>High Quality Foods </span>
                </div>
                <div className="list list__info--content--inner">
                  <figure className="mb-0 rounded-circle">
                    <img src="assets/food-img/icons/icon-check.svg" alt="t" />
                  </figure>

                  <span>Low Price Foods </span>
                </div>
                <div className="list list__info--content--inner">
                  <figure className="mb-0 rounded-circle">
                    <img src="assets/food-img/icons/icon-check.svg" alt="t" />
                  </figure>

                  <span>Favorite Foods </span>
                </div>
              </div>

              <div
                className="
              d-flex
              justify-content-center
              align-items-center
              flex-column
            "
              >
                <h5 className="list__info--content--price">
                  {formatRp(20000)}
                </h5>
                <button className="btn__order">Order Now</button>
              </div>
            </div>
            <div className="favorite__content--wrapper--card mb-0">
              <div
                className="
              d-flex
              justify-content-center
              align-items-center
              position-relative
            "
              >
                <figure className="hazelnut">
                  <img
                    src="assets/food-img/food-3.png"
                    alt="a"
                    className="hazelnut--image rounded-circle"
                  />
                </figure>

                <div className="title mt-3">Bihun Komplit</div>
              </div>

              <div className="list__info--content mt-4">
                <div className="list list__info--content--inner">
                  <figure className="mb-0 rounded-circle">
                    <img src="assets/food-img/icons/icon-check.svg" alt="t" />
                  </figure>

                  <span>Authentic Taste </span>
                </div>
                <div className="list list__info--content--inner">
                  <figure className="mb-0 rounded-circle">
                    <img src="assets/food-img/icons/icon-check.svg" alt="t" />
                  </figure>

                  <span>High Quality Foods </span>
                </div>
                <div className="list list__info--content--inner">
                  <figure className="mb-0 rounded-circle">
                    <img src="assets/food-img/icons/icon-check.svg" alt="t" />
                  </figure>

                  <span>Low Price Foods </span>
                </div>
                <div className="list list__info--content--inner">
                  <figure className="mb-0 rounded-circle">
                    <img src="assets/food-img/icons/icon-check.svg" alt="t" />
                  </figure>

                  <span>Favorite Foods </span>
                </div>
              </div>

              <div
                className="
              d-flex
              justify-content-center
              align-items-center
              flex-column
            "
              >
                <h5 className="list__info--content--price">
                  {formatRp(20000)}
                </h5>
                <button className="btn__order">Order Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Favorite;

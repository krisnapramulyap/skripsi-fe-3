import React from "react";

function Testimoni() {
  return (
    <section className="testimony" style={{ marginBottom: "70px", marginTop: "5%" }}>
      <div className="container">
        <div className="testimony__content--head">
          <h1>
            Beberapa Testimoni Dari{" "}
            <span className="d-block">Loyal Customers</span>
          </h1>
          <p>
            These are the stories of our customers who have visited us with
            great <span className="d-block">pleasure.</span>
          </p>
        </div>

        <div className="testimony__content--body">
          <div className="testimony__content--body--card">
            <div className="testimony__content--body--card--head">
              <div className="wrapper__data">
                <figure>
                  <img src="assets/images/testimony1.png" alt="t" />
                </figure>

                <div className="wrapper__data--content">
                  <h6>Ridhwan Tsalasah</h6>
                  <p>Jakarta, Indonesia</p>
                </div>
              </div>
              <div className="start__wrapper">
                <span>4.7</span>

                <figure>
                  <img src="assets/images/icons/icon-star.svg" alt="t" />
                </figure>
              </div>
            </div>

            <div className="testimony__content--body--card--middle">
              <p className="desc">
                “Wow... I am very happy to spend my whole day here. the Wi-fi is
                good, and the foods and meals tho. I like it here!! Very
                recommended!
              </p>
            </div>
          </div>
          <div className="testimony__content--body--card">
            <div className="testimony__content--body--card--head">
              <div className="wrapper__data">
                <figure>
                  <img src="assets/images/testimony1.png" alt="t" />
                </figure>

                <div className="wrapper__data--content">
                  <h6>Ahmad Rafli</h6>
                  <p>Jakarta, Indonesia</p>
                </div>
              </div>
              <div className="start__wrapper">
                <span>4.6</span>

                <figure>
                  <img src="assets/images/icons/icon-star.svg" alt="t" />
                </figure>
              </div>
            </div>

            <div className="testimony__content--body--card--middle">
              <p className="desc">
                “I like it because I like to travel far and still can make my
                day better just by drinking their Hazelnut Latte
              </p>
            </div>
          </div>
          <div className="testimony__content--body--card">
            <div className="testimony__content--body--card--head">
              <div className="wrapper__data">
                <figure>
                  <img src="assets/images/testimony1.png" alt="t" />
                </figure>

                <div className="wrapper__data--content">
                  <h6>Rici</h6>
                  <p>Jakarta, Indonesia</p>
                </div>
              </div>
              <div className="start__wrapper">
                <span>4.5</span>

                <figure>
                  <img src="assets/images/icons/icon-star.svg" alt="t" />
                </figure>
              </div>
            </div>

            <div className="testimony__content--body--card--middle">
              <p className="desc">
                “This is very unusual for my taste, I haven’t liked foods
                before but their foods is the best! and yup, you have to order
                the chicken wings, the best in town!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimoni;

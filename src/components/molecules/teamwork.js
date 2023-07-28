import React from "react";

function Teamwork() {
  return (
    <section className="teamwork" style={{ marginBottom: "70px", marginTop:"7%" }}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="teamwork__content--left">
              <figure className="mb-0">
                <img
                  src="assets/images/pexels-fauxels-3184183.jpg"
                  alt="asd"
                  className="teamwork__image"
                />
              </figure>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="teamwork__content--right">
              <h1>
                Menggunakan Bahan Terbaik
                <span className="d-md-block"> dan Berkualitas Tinggi</span>
              </h1>

              <p>
                You can explore the menu that we provide with fun and
                <span className="d-md-block">
                  have their own taste and make your day better.
                </span>
              </p>

              <div className="list">
                <div className="list__item">
                  <figure className="mb-0 rounded-circle">
                    <img
                      src="assets/images/icons/icon-check.svg"
                      alt="t"
                      className="list__item--image"
                    />
                  </figure>

                  <span>Menggunakan Ayam Berkualitas Terbaik dan Segar.</span>
                </div>
                <div className="list__item">
                  <figure className="mb-0 rounded-circle">
                    <img
                      src="assets/images/icons/icon-check.svg"
                      alt="t"
                      className="list__item--image"
                    />
                  </figure>

                  <span>Diproses Dengan Higenitas Tinggi. </span>
                </div>
                <div className="list__item">
                  <figure className="mb-0 rounded-circle">
                    <img
                      src="assets/images/icons/icon-check.svg"
                      alt="t"
                      className="list__item--image"
                    />
                  </figure>

                  <span>
                    Dapatkan Promo Menarik Dengan Bergabung Menjadi Member.
                  </span>
                </div>
                <div className="list__item">
                  <figure className="mb-0 rounded-circle">
                    <img
                      src="assets/images/icons/icon-check.svg"
                      alt="t"
                      className="list__item--image"
                    />
                  </figure>

                  <span>
                    Menggunakan Rempah Dengan Kualitas No 1.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Teamwork;

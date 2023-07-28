import React from "react";

function OurMap() {
  return (
    <section className="ourmap" style={{ marginBottom: "70px" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="ourmap__content--head">
            <h1>
              Visit Our Store in the
              <span className="d-block">Spot on the Map Below</span>
            </h1>
            <p>
              See our store in every city on the spot and spen your good day
              there. See <span className="d-md-block"> you soon!</span>
            </p>
          </div>

          <div className="ourmap__content--body">
            <figure className="mx-auto">
              <img src="assets/images/Huge Global.png" alt="s" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurMap;

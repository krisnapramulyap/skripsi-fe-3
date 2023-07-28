import React from "react";

function Partner() {
  return (
    <section className="partners" style={{ marginBottom: "70px" }}>
      <div className="container">
        <div className="partners__content--head">
          <h1>Our Partner</h1>
        </div>

        <div className="partners__content--body">
          <figure className="partners__content--body--image">
            <img src="assets/images/netflix.png" alt="" />
          </figure>

          <figure className="partners__content--body--image">
            <img src="assets/images/reddit.png" alt="" />
          </figure>

          <figure className="partners__content--body--image">
            <img src="assets/images/amazon.png" alt="" />
          </figure>

          <figure className="partners__content--body--image">
            <img src="assets/images/discord.png" alt="" />
          </figure>

          <figure className="partners__content--body--image">
            <img src="assets/images/pajri.png" alt="" />
          </figure>
        </div>
      </div>
    </section>
  );
}

export default Partner;

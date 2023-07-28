export default function FooterComponent() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content--wrapper">
          <div className="footer__content--wrapper--left">
            <a href="">Mie Ayam Kangen</a>

            <div className="footer__content--wrapper--left--info">
              Mie Ayam Kangen is a store that sells some good
              <span className="d-block">
                foods and drink, and especially foods. We provide
                <span className="d-block">high quality Stuff</span>
              </span>
            </div>

            <div className="footer__content--wrapper--left--media">
              <figure>
                <a href="">
                  <img src="/assets/images/icons/icon-fb.svg" alt="t" />
                </a>
              </figure>
              <figure>
                <a href="">
                  <img src="/assets/images/icons/icon-twitter.svg" alt="t" />
                </a>
              </figure>
              <figure>
                <a href="">
                  <img src="/assets/images/icons/icon-instagram.svg" alt="t" />
                </a>
              </figure>
            </div>

            <div className="footer__content--wrapper--left--copyright">
              ©2023 Mie Ayam Kangen
            </div>
          </div>

          <div className="footer__content--wrapper--right">
            <div className="d-flex justify-content-center">
            
              <div className="sitelink__list--wrapper me-0">
                <h5>Pages</h5>
                <div className="list-group">
                  <li
                    className="list-group-item"
                    style={{ listStyle: "none", marginBottom: "1.25rem" }}
                  >
                    <a href="/" style={{ color: "#4f5665" }}>
                      Home
                    </a>
                  </li>
                  <li
                    className="list-group-item"
                    style={{ listStyle: "none", marginBottom: "1.25rem" }}
                  >
                    <a href="/" style={{ color: "#4f5665" }}>
                      Product
                    </a>
                  </li>
                  <li
                    className="list-group-item"
                    style={{ listStyle: "none", marginBottom: "1.25rem" }}
                  >
                    <a href="/" style={{ color: "#4f5665" }}>
                      Your Cart
                    </a>
                  </li>
                  <li
                    className="list-group-item"
                    style={{ listStyle: "none", marginBottom: "1.25rem" }}
                  >
                    <a href="/" style={{ color: "#4f5665" }}>
                      History
                    </a>
                  </li>
                  <li
                    className="list-group-item"
                    style={{ listStyle: "none", marginBottom: 0 }}
                  >
                    <a href="/" style={{ color: "#4f5665" }}>
                      Profile
                    </a>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { FooterComponent, HeaderComponent } from "../../components/modules";
import { PromoHomeComponent, MenuHomeComponent } from "../../components/molecules";
import { getDataCookie } from "../../middleware/authorizationPage";

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



export default function Home(props) {
  return (
    <body>
      <HeaderComponent />
      <main>
        <div className="container">
          <div className="row">
            <div className="promo-section col-lg-4 p-4">
              <PromoHomeComponent />
            </div>
            <div className="menu-section col-lg-8 p-3 pt-0">
              <MenuHomeComponent />
            </div>
          </div>
        </div>
      </main>
      <FooterComponent />
    </body>
  );
}

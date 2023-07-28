import { FormLoginComponent } from "../../../components/molecules";
import { getDataCookie } from "../../../middleware/authorizationPage";

export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);

  if (dataCookie.isLogin) {
    return {
      redirect: {
        destination: "/main/home",
        permanent: false,
      },
    };
  }
  return {
    props: { data: dataCookie },
  };
}

export default function Login() {
  return (
    <div className="body-login d-flex w-100">
      <div className="jumbotron"></div>
      <FormLoginComponent />
    </div>
  );
}

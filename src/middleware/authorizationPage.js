import cookies from "next-cookies";

export function getDataCookie(context) {
  return new Promise((resolve) => {
    let dataCookie = cookies(context);
    if (dataCookie.token) {
      dataCookie.isLogin = true;
    } else {
      dataCookie.isLogin = false;
    }
    resolve(dataCookie);
  });
}

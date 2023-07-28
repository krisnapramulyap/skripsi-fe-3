import React, { useState, useEffect } from "react";
import {
  ModalDelete,
  HeaderComponent,
  FooterComponent,
} from "../../../../components/modules";
import dateFormat from 'dateformat';
import { getDataCookie } from "../../../../middleware/authorizationPage";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../../utils/axios";
import { formatRp } from "../../../../utils/formatRp";
import { formatDate } from "../../../../utils/dateFormat";

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

function History() {
  const user = useSelector((state) => state.dataUserById);

  const [data, setData] = useState([]);

  const [show, setShow] = useState(false);
  const [idHistory, setIdHistory] = useState("");

  const handleModal = (id) => {
    setIdHistory(id);
    setShow(true);
  };

  const handleDelete = () => {
    setShow(false);
    axios
      .delete(`/order/${idHistory}`)
      .then((res) => {
        axios
          .get(`/order/${user.user.id}`)
          .then((res) => {
            setData(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOrderByIdUser = () => {
    axios
      .get(`/order/${user.user.id}`)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOrderByIdUser();
  }, []);



  return (
    <>
      <HeaderComponent />
      <div className="history__wrap">
        <div className="container">
          <div>
            {data.length > 0 ? (
              <>
                <h1 className="text-white text-center rubik-700 mb-5">
                  Let’s see what you have bought!
                </h1>

                <div
                  className="row"
                  style={{ overflowY: "auto", height: "600px", width: "100%" }}
                >


                  {data?.map((item) => (
                    <div
                      className="col-12 col-md-3"
                      key={item.id}
                      style={{ overflowY: "auto" }}
                    >
                      <div className="d-flex history__card">
                        <div>
                          <h5 className="">{item.invoice}</h5>      
                          <p className="m-2">{item.name}</p>
                          <p className="m-2">{formatRp(item.total)}</p>
                          <p className="m-2">{item.paymentStatus}</p>
                          <p className="m-2">{item.updatedAt}</p>
                        </div>
                      </div>
                    </div>
                  )).reverse()}
                </div>
              </>
            ) : (
              <>
                <h1 className="text-white text-center rubik-700">
                  History order not found!
                </h1>
                <p
                  className="text-white text-center rubik-400"
                  style={{ marginBottom: "82px" }}
                >
                  Order first to see history. Thanks!
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <FooterComponent />

      <ModalDelete
        show={show}
        msg="Are you sure want to delete the selected items?"
        handleClose={() => setShow(false)}
        handleSubmit={handleDelete}
      />
    </>
  );
}

export default History;

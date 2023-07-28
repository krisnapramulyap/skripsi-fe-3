import Table from 'react-bootstrap/Table';
import { useRef, useEffect, useState } from "react";
import { HeaderComponent, FooterComponent } from "../../../components/modules";
import { useParams, } from "react-router-dom";
import { Button, } from "react-bootstrap";
import axios from "axios";
import "./order.css"


export default function BerandaAdmin() {
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [errorResponse, setErrorResponse] = useState({
    isError: false,
    message: "",
  });

  console.log(order);

  const orderData = async () => {
    const response = await axios.get(`http://localhost:3001/order`, {

    });

    console.log(response);

    const data = await response.data;
    setOrder(data);
    console.log(data)
  };
  

 
  const onUpdate = async (e, id, data, paymentStatus) => {


    try {
      const token = localStorage.getItem("token");
      const queueToUpdatePayload = {
        paymentStatus : paymentStatus,
      };

      const updateRequest = await axios.patch(
        `http://localhost:3001/order/8995a7f3-98e9-4c15-9d1b-f0e19a349970`, data,
        queueToUpdatePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updateResponse = await updateRequest.data;
      console.log(updateResponse)

      console.log(updateResponse.status)
      if (updateResponse.status);



    } catch (err) {
      const response = err.response.data;
      setErrorResponse({
        isError: true,
        message: response.message,
      });
    }
  };

  useEffect(() => {
    orderData();
    onUpdate();
  }, []);


  return (
    <>
     <HeaderComponent />
    <div>
      {/* <AdminNavbar /> */}
      <div className="Container">
        <div className="Textdaftar">
          <h4>Daftar Order</h4>
        </div>
<div>
        <Table className="Tabel" striped bordered hover size="lg">
          <thead>
            <tr className='tabelcolour mt-3'>
              <th className='antri'>No.Inovice</th>
              <th className='pasien'>Nama Pelanggan</th>
              <th className='tgl'>Nama Order</th>
              <th className='ket'>Jumlah</th>
              <th className='ket'>Status Order</th>
              <th className='selesai'>Change Status</th>
            </tr>
            </thead>
          {order ? (
            <tbody>
              {order.data.map((book) => {
                return (
                    <tr>
                      <td style={{ textAlign: 'center' }}>{book.invoice}</td>
                      <td style={{ textAlign: 'center' }}>{book.displayName}</td>
                      <td style={{ textAlign: 'center' }}>{book.name}</td>
                      <td style={{ textAlign: 'center' }}>{book.qty}</td>
                      <td style={{ textAlign: 'center' }}>{book.paymentStatus}</td>
                      <td><Button onClick={(e) => onUpdate(e, book.id, "success")} variant="link">Edit</Button></td>
                    </tr>
                )
              }).reverse()}
            </tbody>
          ) : ("")}
        </Table>
        </div>
      </div>
      <hr style={{ marginTop: '2200px' }} />
      {/* <FooterHome /> */}
      <FooterComponent />
    </div>
    </>
  );
}
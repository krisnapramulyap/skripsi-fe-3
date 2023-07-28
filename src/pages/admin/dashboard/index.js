import React, { useState, useEffect } from "react";
import { HeaderComponent, FooterComponent } from "../../../components/modules";
import { useHistory } from "react-router-dom";
import { getDataCookie } from "../../../middleware/authorizationPage";
import { Line,Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "../../../utils/axios";
import { useSelector } from "react-redux";

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

function Dashboard() {
  const router = useHistory();
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "# of data",
        fill: false,
        backgroundColor: "#6a4029",
        borderColor: "#ffba33",
        data: [],
      },
    ],
  });

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const [filter, setFilter] = useState("monthly");
  const { user } = useSelector((state) => state.dataUserById);

  const getDashboard = () => {
    axios
      .get(`/dashboard?filter=${filter}`)
      .then((res) => {
        const result = res.data.data;
        router.push(`/admin/dashboard?filter=${filter}`);

        let labelDashboard = [];
        let dataDashboard = [];

        filter === "daily"
          ? result?.map((item) => {
              labelDashboard.push(item.day);
              dataDashboard.push(item.total);
            })
          : result?.map((item) => {
              labelDashboard.push(item.month);
              dataDashboard.push(item.total);
            });

        setData({
          labels: labelDashboard,
          datasets: [
            {
              label: "# of data",
              fill: false,
              backgroundColor: "#6a4029",
              borderColor: "#ffba33",
              data: dataDashboard,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAuthorization = () => {
    if (user.role !== "admin") {
      router.push("/main/home");
    }
  };

  useEffect(() => {
    handleAuthorization();
    getDashboard();
  }, [filter]);


  return (
    <>
      <HeaderComponent />
      <section className="dashboard__page">
        <div className="container">
          <h5 className="rubik-700 text-center">
            See how your store progress so far
          </h5>

          <div className="d-flex justify-content-center mt-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                onChange={() => setFilter("daily")}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Daily
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                onChange={() => setFilter("weekly")}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Weekly
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                onChange={() => setFilter("monthly")}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Monthly
              </label>
            </div>
          </div>

          <div className="dashboard__page--chart mt-4">
            <h5 className="rubik-700">{filter} report</h5>
            {/* <span className="text-secondary rubik-400">Last 9 months</span> */}

            <div>
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
      </section>
      <FooterComponent />
    </>
  );
}

export default Dashboard;

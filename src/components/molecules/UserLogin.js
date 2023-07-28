import React, { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import cookie from "js-cookie";
import axios from "../../utils/axios";
import { useHistory } from "react-router-dom";
import AutoCompleteItem from "./AutoCompleteItem";
import { getAllProduct } from "../../stores/action/allProduct";

const initialState = {
  page: 1,
  limit: 100,
  category: "",
  search: "",
  sort: "",
  order: "ASC",
};

export default function UserLogin(props) {
  const { user } = useSelector((state) => state.dataUserById);
  const refSearch = useRef(null);
  const refResult = useRef(null);
  const dispatch = useDispatch();
  const router = useHistory();

  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [scroll, setScroll] = useState(-1);

  const [dataProduct, setDataProduct] = useState([]);
  const [params, setParams] = useState(initialState);

  const handleShow = () => setVisible(true);
  const handleHide = () => setVisible(false);

  const handleClickOutside = (e) => {
    if (refSearch.current && !refSearch.current.contains(e.target)) {
      handleHide();
    }
  };

  const toDetail = (id) => {
    if (user.role !== "user") {
      router.push({ pathname: `/admin/product`, query: { id } });
    } else {
      router.push({ pathname: `/main/product/${id}` });
    }
  };

  useEffect(() => {
    dispatch(
      getAllProduct(
        params.page,
        params.limit,
        params.category,
        params.search,
        params.sort,
        params.order
      )
    ).then((res) => {
      setDataProduct(res.value.data.data);
    });
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [visible]);

  const scrollIntoView = (position) => {
    refResult.current.parentNode.scrollTo({
      top: position,
      behavior: "smooth",
    });
  };

  const dataFilter = useMemo(() => {
    if (!search) return dataProduct;

    setScroll(-1);
    scrollIntoView(0);

    return dataProduct.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [dataProduct, search]);

  useEffect(() => {
    if (scroll < 0 || scroll > dataFilter.length || !refResult) {
      return () => {};
    }

    // let list = Array.from(refResult.current.children);
    // list[scroll] && scrollIntoView(list[scroll]).offsetTop;
  });

  const handleKey = (e) => {
    if (e.key === "ArrowDown") {
      // console.log("ARROW DOWN");
      visible
        ? setScroll((c) => (c < dataFilter.length - 1 ? c + 1 : c))
        : handleShow();
    }
    if (e.key === "ArrowUp") {
      setScroll((c) => (c > 0 ? c - 1 : 0));
      // console.log("ARROW UP");
    }
    if (e.key === "Escape") {
      // console.log("ESCAPE");
      handleHide();
    }
    if (e.key === "Enter") {
      // console.log("ENTER");
      setSearch(dataFilter[scroll].name);
      handleHide();
    }
  };

  const handleLogout = () => {
    axios
      .post("/auth/logout")
      .then(() => {
        cookie.remove("id");
        cookie.remove("token");

        window.location.href = "/";
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="isloggedin">
      <div className="form-group position-relative mb-0" ref={refSearch}>
        <input
          type="text"
          placeholder="Search"
          className="form__input--search"
          value={search}
          onClick={handleShow}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => handleKey(e)}
        />

        <div className={`search__result ${visible ? "d-block" : "d-none"}`}>
          <ul className="search__result--wrapper" ref={refResult}>
            {dataFilter.length > 0 ? (
              dataFilter?.map((item, index) => {
                return (
                  <AutoCompleteItem
                    key={index}
                    data={item}
                    onSelectItem={() => {
                      setSearch(item.name);
                      handleHide();
                      toDetail(item.id);
                    }}
                    isActive={scroll === index ? true : false}
                  />
                );
              })
            ) : (
              <p style={{ textAlign: "center", marginBottom: 0 }}>
                Search is not found
              </p>
            )}
          </ul>
        </div>
      </div>

      <figure
        className="user ms-4 me-2"
        onClick={() => router.push("/main/profile")}
        style={{ cursor: "pointer" }}
      >
        <img
          src={
            user.image
              ? `http://localhost:3001/uploads/user/${user.image}`
              : "/assets/images/default.png"
          }
          alt="user"
          className="rounded-circle mt-0"
        />
      </figure>

      <figure className="logout mb-0" onClick={handleLogout}>
        <img
          style={{ cursor: "pointer" }}
          src="/assets/images/icons/icon-logout.svg"
          alt="logout"
          className="mt-0"
        />
      </figure>
    </div>
  );
}

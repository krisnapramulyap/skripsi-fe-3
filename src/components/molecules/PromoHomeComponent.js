import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllPromo, deletePromo, selectPromo } from "../../stores/action/promo";
import { ModalDelete } from "../modules";

export default function PromoHomeComponent() {
  const { user } = useSelector((state) => state.dataUserById);
  const userRole = user.role;
  const promo = useSelector((state) => state.promo.data);
  const router = useHistory();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [idPromo, setIdPromo] = useState("");
  const [idSelectedPromo, setIdSelectedPromo] = useState("");

  useEffect(() => {
    dispatch(getAllPromo());
  }, [dispatch]);

  // const applyCoupon = () => {
  //   {
  //     idSelectedPromo
  //       ? alert(
  //           `You have choose a coupon, only 1 coupon can be applied in order, ${idSelectedPromo}`
  //         )
  //       : null;
  //   }
  // };

  const toUpdatePromo = (id) => {
    router.push({ pathname: `/admin/promo/${id}`});
  };

  const toAddPromo = () => {
    router.push("/admin/promo");
  };

  const handleDelete = () => {
    dispatch(deletePromo(idPromo)).then((res) => {
      setShow(false);
      alert(res.value.data.msg);
      dispatch(getAllPromo());
    });
  };

  const showDelete = (id) => {
    setShow(true);
    setIdPromo(id);
  };

  const handleSelectedPromo = (id, name) => {
    dispatch(selectPromo({ id, name }));
    setIdSelectedPromo(id);
  };

  return (
    <div>
      <div className="promo-header px-2">
        <div className="promo-title text-center">Promo Today</div>
        <div className="promo-desc text-center px-4 mt-2">
          Coupons will be updated every weeks. Check them out!
        </div>
      </div>
      <div className="promo-list mt-3 px-3">
        {promo.length > 0 ? (
          <>
            {promo?.map((item) => (
              <div
                onClick={() => {
                  userRole === "user" &&
                    handleSelectedPromo(item.id, item.name);
                }}
                className={`promo-list-card ${
                  idSelectedPromo === item.id ? "active" : "bg-green"
                } d-flex p-1 py-1 px-2 mt-4 `}
                key={item.id}
              >
                <img
                  src={
                    item.image
                      ? `${"http://localhost:3001"}/uploads/promo/${item.image}`
                      : `/assets/images/default.png`
                  }
                  alt=""
                  className="promo-list-card-img"
                />
                <div className="promo-list-card-content ps-2 pt-2 px-4">
                  <div className="promo-card-header">{item.name}</div>
                  <div className="promo-card-desc">{item.description}</div>
                </div>
                {user.role === "admin" && (
                  <>
                    <div
                      onClick={() => toUpdatePromo(item.id)}
                      className="edit-promo-menu  d-flex
                    align-items-center
                    justify-content-center "
                    >
                      <img src="/assets/images/pencil.png" alt="edit" />
                    </div>
                    <div
                      onClick={() => showDelete(item.id)}
                      className="delete-promo-menu  d-flex
                    align-items-center
                    justify-content-center "
                    >
                      <img src="/assets/images/trash 1.png" alt="edit" />
                    </div>
                  </>
                )}
              </div>
            ))}
          </>
        ) : (
          <>
            <h6 className="text-center mt-5">Coupon not available for now</h6>
          </>
        )}
      </div>

      {user.role === "admin" ? (
        <div className="promo-btn-select px-3">
          <button
            className="btn-apply-coupon w-100 mt-3 border-0 py-3"
            onClick={toAddPromo}
          >
            Add new promo
          </button>
        </div>
      ) : null}

      <ModalDelete
        show={show}
        msg="Are you sure want to delete this promo ?"
        handleClose={() => setShow(false)}
        handleSubmit={handleDelete}
      />
    </div>
  );
}

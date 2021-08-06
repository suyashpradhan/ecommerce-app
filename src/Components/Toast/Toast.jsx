import { useEffect } from "react";
import { useStateContext } from "../../context";
import "./Toast.css";
import { GrFormClose } from "react-icons/gr";

export const Toast = () => {
  const {
    state: { toastMessage },
    dispatch,
  } = useStateContext();

  const closeToast = () => {
    dispatch({ type: "SHOW_TOAST", payload: null });
  };

  useEffect(() => {
    const timeID = setTimeout(closeToast, 3000);
    return () => clearTimeout(timeID);
  });

  return (
    <>
      <div className="toast">
        <p className="toastMessage">{toastMessage}</p>
        <GrFormClose className="toastIcons" onClick={closeToast} />
      </div>
    </>
  );
};

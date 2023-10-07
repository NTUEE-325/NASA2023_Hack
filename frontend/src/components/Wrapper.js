import { Outlet } from "react-router";
import Header from "./Header";
import bg from "./../img/backgroundImage.jpg";

const Wrapper = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        width: "100vw",
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "absolute",
      }}
    >
      <Header />
      <Outlet />
      {/* <Footer/> */}
    </div>
  );
};

export default Wrapper;

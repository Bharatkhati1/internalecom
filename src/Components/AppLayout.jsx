
import { Outlet } from "react-router-dom";
import Header from "./Home/header";
import FooterSec from "./Home/FooterSec";

const AppLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <FooterSec />
    </>
  );
};

export default AppLayout;

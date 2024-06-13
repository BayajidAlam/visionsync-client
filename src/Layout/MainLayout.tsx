import { Outlet } from "react-router-dom";
import NavBar from "../components/shared/NavBar/NavBar";
import "../index.css";
import Footer from "../components/shared/Footer/Footer";
import SideBar from "@/components/shared/SideBar/SideBar";
import { useState } from "react";

const MainLayout = () => {
  const [expandSideBar, setExpandSideBar] = useState(false);

  return (
    <div>
      <NavBar
        expandSideBar={expandSideBar}
        setExpandSideBar={setExpandSideBar}
      />
      <div className="flex justify-between items-center">
        <SideBar expandSideBar={expandSideBar} />
        <div className={`${expandSideBar ? "ml-[200px]" : "ml-[70px]"}`}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

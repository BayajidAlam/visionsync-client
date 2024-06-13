import { Outlet } from "react-router-dom";
import NavBar from "../components/shared/NavBar/NavBar";
import "../index.css";
import Footer from "../components/shared/Footer/Footer";
import SideBar from "@/components/shared/SideBar/SideBar";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="flex justify-between items-center">
        <SideBar/>
        <div className="ml-[200px] flex-1">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

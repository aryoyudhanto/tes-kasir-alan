import React, { FC, LabelHTMLAttributes } from "react";
import { Link } from "react-router-dom";

import Navbar from "./Navbar";

interface LayoutProps extends LabelHTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  food?: string;
  transaksi?: string;
}

const Layout: FC<LayoutProps> = ({ children, food, transaksi }) => {
  return (
    <div className="z-0 w-full h-screen flex flex-col overflow-auto bg-[#f5f5f5]">
      <div className="h-screen overflow-auto">
        <Navbar />
        <div className="m-10">
          <div className="m-3 w-full flex ">
            <div
              className={`justify-start mx-5 w-16 hover:cursor-pointer ${food}`}
            >
              <Link to={"/"}>
                <div className={`text-center ${food} font-medium`}>Food</div>
              </Link>
            </div>
            <div
              className={`justify-start mx-5 w-16 hover:cursor-pointer ${transaksi}`}
            >
              <Link to={"/transaksi"}>
                <div className={`text-center ${transaksi} font-medium`}>
                  Transaksi
                </div>
              </Link>
            </div>
          </div>
          <div className="my-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

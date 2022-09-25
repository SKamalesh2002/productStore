import type { NextPage } from "next";
import NavBar from "../components/navBar";

import Products from "./Products";

const Home: NextPage = () => {
  //return <SimpleSidebar children />;
  return <Products />;
};

export default Home;

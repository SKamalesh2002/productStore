import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import NavBar from "../components/navBar";

import Products from "./Products";
import SimpleSidebar from "./navbar";

const Home: NextPage = () => {
  //return <SimpleSidebar children />;
  return <Products />;
};

export default Home;

import classname from "./style.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../assets/Photos/Card/Card.svg";
import Audiofile from "../../assets/Photos/HeaderPhoto/audiophile.svg";
import burgicon from "../../assets/Photos/burgMenu/burgIcon.png";
import ProductSection from "../ProductsSection/ProductSection";

const Header = () => {
  const [burgIcon, setBurgIcon] = useState("burg-menu-icon");
  const [menuList, setMenutList] = useState("none");

  const handlBurgIcon = () => {
    setBurgIcon("none");
    setMenutList("burg-menu-list");
  };

  const handlMenuList = () => {
    setBurgIcon("burg-menu-icon");
    setMenutList("none");
  };
  return (
    <header>
      <div className={classname["header-container"]}>
      
      
        <div className={classname["burg-menu-container"]}>
          <div onClick={handlBurgIcon} className={classname[`${burgIcon}`]}>
            <img src={burgicon} alt="burg-icon" />
          </div>

          <nav onClick={handlMenuList} className={classname[`${menuList}`]}>
            <ProductSection />
          </nav>
        </div>

        <div className={classname["header-left-container"]}>
          
          <div className={classname.img}>
            <img src={Audiofile} alt="Audiofile" />
          </div>
        </div>

        <div className={classname["header-centre-container"]}>
          <nav>
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/products/headphones"}>HEADPHONES</Link>
              </li>
              <li>
                <Link to={"/products/speakers"}>SPEAKERS</Link>
              </li>
              <li>
                <Link to={"/products/earphones"}>EARPHONES</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={classname["header-right-container"]}>
          <div className={classname["card-img"]}>
            <Link to={"/products/chekout"}><img src={Card} alt="Card" /></Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

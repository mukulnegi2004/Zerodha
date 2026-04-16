import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const Menu = ({user}) => {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleMenuClick = (idx) => {
    setSelectedMenu(idx);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const handleLogout = async () => {
    try{
      const url = `${import.meta.env.VITE_API_URL}/logout`;

      let resp = await axios.post(url, {
        withCredentials: true                                                   //sends session id to the backend 
      });
      console.log(resp.data);

      window.location.href = `${import.meta.env.VITE_HOME_URL}`;

    }catch(err){
      console.log(err);
    }

  }

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/" onClick={() => handleMenuClick(0)}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/orders" onClick={() => handleMenuClick(1)}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/holdings" onClick={() => handleMenuClick(2)}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/positions" onClick={() => handleMenuClick(3)}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/funds" onClick={() => handleMenuClick(4)}>
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/apps" onClick={() => handleMenuClick(6)}>
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />
        <div class="nav-item dropdown profile" >
          <a class="nav-link avatar dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">ZU</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item"><i class="fa-solid fa-user"></i>&nbsp;{user.name}</a></li>
            <li><Link class="dropdown-item" to="/wallet" onClick={() => handleMenuClick(-1)} >&nbsp;Wallet</Link></li>
            <li><a class="dropdown-item" onClick={handleLogout}>&nbsp;Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
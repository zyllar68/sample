import { useState } from "react";
import Link from "next/link";

import classNames from "classnames";

const MobileNavbar = () => {
  const [burger, setBurger] = useState(false);
  return (
    <div className='MobileNavbar'>
      <div className='MobileNavbar_container'>
        <h4>Home</h4>
        <div
          className={classNames("menu-btn", {
            open: burger,
          })}
          onClick={() => setBurger(!burger)}
        >
          <div className='menu-btn__burger'></div>
        </div>
      </div>
      <ul
        className={classNames("MobileNavbar_menuList", {
          menuClosed: burger == false,
          menuOpen: burger == true,
        })}
      >
        <li>
          <Link href='/mobile'>Add Bet</Link>
        </li>
        <li>
          <Link href='/mobile/transaction'>Transactions</Link>
        </li>
        <li>
          <Link href='/mobile/transaction'>Report</Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileNavbar;

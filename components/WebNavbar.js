import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";

const WebNavbar = () => {
  const router = useRouter();
  return (
    <ul className='WebNavbar'>
      <li>
        <Link
          className={classnames({
            active:
              router.pathname === "/admin" ||
              router.pathname === "/admin/transaction",
          })}
          href='/admin/'
        >
          Draws
        </Link>
      </li>
      <li>
        <Link
          className={classnames({
            active: router.pathname === "/admin/financial",
          })}
          href='/admin/financial'
        >
          Financial Report
        </Link>
      </li>
      <li>
        <Link
          className={classnames({
            active: router.pathname === "/admin/accounts",
          })}
          href='/admin/accounts'
        >
          Account
        </Link>
      </li>
    </ul>
  );
};

export default WebNavbar;

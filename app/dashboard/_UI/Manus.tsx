import {
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
const Manus = () => {
  return (
    <>
      {links.map((link, index) => (
        <li key={index}>
          <Link href={link.href} className="text-base flex items-center">
            {link.icon}
            <span>{link.label}</span>
          </Link>
        </li>
      ))}
    </>
  );
};

export default Manus;

const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <PieChartOutlined />,
  },
  {
    label: "Members",
    href: "/dashboard/members",
    icon: <UserOutlined />,
  },
  {
    label: "Payment History",
    href: "/dashboard/payment-history",
    icon: <AttachMoneyIcon />,
  },
  {
    label: "Expenses",
    href: "/dashboard/expenses",
    icon: <ShoppingCartCheckoutIcon />,
  },
];

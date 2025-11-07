// sidebarConfig.js

import calculator from "../../assets/icons/calculator.svg";
import coins from "../../assets/icons/coins.svg";
import piggyBank from "../../assets/icons/piggy-bank.svg";
import invoice from "../../assets/icons/invoice.svg";

const sidebarConfig = [
  {
    icon: calculator,
    text: "Manage Inventories",
    url: "/dashboard/manage-inventory",
  },
  {
    icon: invoice,
    text: "Billing Parties",
    url: "/dashboard/billing-parties",
  },
  {
    icon: calculator,
    text: "GST Calculator",
    url: "/dashboard/gst-calculator",
  },
  {
    icon: invoice,
    text: "Invoice Generator",
    url: "/dashboard/invoice-generator",
  },
  {
    icon: piggyBank,
    text: "Fund Management",
    url: "/dashboard/fund-management",
  },
  {
    icon: coins,
    text: "Expense Tracker",
    url: "/dashboard/expense-tracker",
  },
];

export default sidebarConfig;

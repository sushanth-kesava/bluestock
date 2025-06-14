import React from "react";
import "../Styles/Dashboard.css";

const accountHolder = {
  name: "Sushanth Kesava",
  accountNumber: "XXXX-1234",
  balance: "$122,912.50",
  avatar: "https://ui-avatars.com/api/?name=Sushanth+Kesava&background=1a237e&color=fff"
};

const DashboardHeader = () => (
  <div className="header-bar">
    <div className="account-info">
      <img src={accountHolder.avatar} alt="avatar" className="account-avatar" />
      <div>
        <div className="account-name">{accountHolder.name}</div>
        <div className="account-number">Acc: {accountHolder.accountNumber}</div>
        <div className="account-balance">Balance: {accountHolder.balance}</div>
      </div>
    </div>
  </div>
);

export default DashboardHeader;

"use client";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import AccountTable from "./list/listAccount";

interface Props {}

const ListAccounts = (props: Props) => {
  return (
    <div>
      <AccountTable />
    </div>
  );
};

export default ListAccounts;

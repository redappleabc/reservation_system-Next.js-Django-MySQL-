'use client'

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import SidebarMenu from "@/components/common/header/SidebarMenu";

const DashboardLayout = ({ children }) => {

  return (
    <div>
      <SidebarMenu />
      {children}
    </div>
  )
}

export default DashboardLayout;

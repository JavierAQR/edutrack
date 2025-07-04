import { useState } from "react";
import { RiAdminLine } from "react-icons/ri";
import { Outlet } from "react-router-dom";
import type { MenuItem } from "../types";
import UserLayout from "./UserLayout";

const menuItems: MenuItem[] = [
  {
    icons: <RiAdminLine size={30} />,
    label: "Grados",
    href: "/institution-admin/grades",
  },
];

const SidebarInstitutionAdmin = () => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <UserLayout
      open={open}
      setOpen={setOpen}
      userType={"ADMIN"}
      menuItems={menuItems}
    >
      <Outlet />
    </UserLayout>
  );
};

export default SidebarInstitutionAdmin;

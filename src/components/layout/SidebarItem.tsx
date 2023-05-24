import React from "react";
import { IconType } from "react-icons";

interface SidebarItem {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
}

function SidebarItem({ label, href, icon, onClick }: React.FC<SidebarItem>) {
  return <div>SidebarItem</div>;
}

export default SidebarItem;

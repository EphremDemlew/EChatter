"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface HeaderProps {
  label: string;
  showBackArrow?: boolean;
}

const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return <div className="border-b-[1px] border-neutral-800 p-5 "> {label}</div>;
};

export default Header;

"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Header from "../HomePage/Header";
import Footer from "../HomePage/Footer";

interface ClientAuthProps {
  children: ReactNode;
}

const ClientAuth = ({ children }: ClientAuthProps) => {
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith("/auth");

  return (
    <>
      {isAuthPage ? (
        <div className="min-h-screen">{children}</div>
      ) : (
        <>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </>
      )}
    </>
  );
};

export default ClientAuth;

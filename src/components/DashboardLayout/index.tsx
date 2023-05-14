import { AppShell } from "@mantine/core";
import React, { ReactNode } from "react";
import NavbarComponent from "./Navbar";
import HeaderComponent from "./Header";
import ModalComponent from "./Modal";

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell
      padding="md"
      navbar={<NavbarComponent />}
      header={<HeaderComponent />}
      children={
        <>
          <ModalComponent />
          {children}
        </>
      }
      styles={(theme) => {
        return {
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
          },
        };
      }}
    />
  );
}

export default DashboardLayout;

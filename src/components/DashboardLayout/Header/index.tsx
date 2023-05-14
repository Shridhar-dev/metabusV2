import { openedMenuAtom } from "@/state";
import { Burger, Header, MediaQuery, useMantineTheme } from "@mantine/core";
import { useAtom } from "jotai";
import React from "react";

function HeaderComponent() {
  const [openedMenu, setOpenedMenu] = useAtom(openedMenuAtom);

  let theme = useMantineTheme();

  return (
    <Header
      height={60}
      p="xl"
      className=" flex items-center text-xl font-semibold"
    >
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Burger
          opened={openedMenu}
          onClick={() => setOpenedMenu((o) => !o)}
          size="sm"
          color={theme.colors.gray[6]}
          mr="xl"
        />
      </MediaQuery>
      Dashboard
    </Header>
  );
}

export default HeaderComponent;

import React from "react";
import { ActionIcon, Navbar, Text } from "@mantine/core";
import { Bus, Plus } from "tabler-icons-react";
import {
  myBusesAtom,
  openedAtom,
  openedMenuAtom,
  selectedBusAtom,
} from "@/state";
import { useAtom } from "jotai";
import { bus } from "@/components/types";

function NavbarComponent() {
  const [opened, setOpened] = useAtom(openedAtom);
  const [openedMenu, setOpenedMenu] = useAtom(openedMenuAtom);
  const [myBuses, setMyBuses] = useAtom(myBusesAtom);
  const [selectedBus, setSelectedBus] = useAtom(selectedBusAtom);

  return (
    <Navbar
      width={{ base: 300 }}
      height={500}
      p="xl"
      hiddenBreakpoint="sm"
      hidden={!openedMenu}
    >
      <Text className="text-lg">Buses</Text>

      {myBuses.map((bus:bus , i) => {
        return (
          <div
            key={i}
            onClick={() => {
              setSelectedBus(bus);
            }}
            className="flex items-center bg-slate-200 rounded-md p-2 mt-5"
          >
            <ActionIcon className="mr-4">
              <Bus />
            </ActionIcon>
            {bus.data?.name}
          </div>
        );
      })}

      <ActionIcon className="mt-4" onClick={() => setOpened(true)}>
        <Plus />
      </ActionIcon>
    </Navbar>
  );
}

export default NavbarComponent;

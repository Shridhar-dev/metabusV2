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
import Image from "next/image";

function NavbarComponent() {
  const [opened, setOpened] = useAtom(openedAtom);
  const [openedMenu, setOpenedMenu] = useAtom(openedMenuAtom);
  const [myBuses, setMyBuses] = useAtom(myBusesAtom);
  const [selectedBus, setSelectedBus] = useAtom(selectedBusAtom);

  return (
    <Navbar
      width={{ base: 400 }}

      p="xl"
      hiddenBreakpoint="sm"
      hidden={!openedMenu}
    className="overflow-scroll bg-white"
    >
      <Text className="text-lg">Buses</Text>
      <div className="grid grid-flow-rows grid-cols-2 gap-3">
        {myBuses.map((bus:bus , i) => {
          return (
            <div
              key={i}
              onClick={() => {
                setSelectedBus(bus);
              }}
              className="flex w-fit cursor-pointer justify-center bg-white   items-start  rounded-xl flex-col  font-semibold pb-2  mt-5"
            >
              <Image 
                loader={({src})=>src}
                src={bus.data?.url || "https://images.pexels.com/photos/385998/pexels-photo-385998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                alt="Bus Image"
                width={200}
                height={200}
                className="rounded-lg object-contain mb-2"
              />
              {bus.data?.name}
            </div>
          );
        })}
      </div>
      <ActionIcon className="mt-4" onClick={() => setOpened(true)}>
        <Plus />
      </ActionIcon>
    </Navbar>
  );
}

export default NavbarComponent;

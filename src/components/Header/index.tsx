import { Avatar, Menu, createStyles } from "@mantine/core";
import { SearchBar } from "..";
import { Settings } from "tabler-icons-react";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  root: {
    zIndex: 1000000,
    pointerEvents: "all",
    cursor: "pointer",
    padding: "10px",
  },
}));

function Header() {
  const { classes } = useStyles();
  const [userImage, setUserImage] = useState<string>("");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (currUser) => {
      if (currUser) {
        setUserImage(currUser.photoURL || "");
      }
    });
  }, []);

  return (
    <div className="w-full fixed flex justify-between pointer-events-none  px-5  h-screen  z-[10000]">
      <SearchBar />
      <Menu position="left-end">

        <Menu.Target>
          <Avatar
            radius="xl"
            src={userImage}
            className="z-[10000000000] pointer-events-auto cursor-pointer mt-5"
            sx={{
              "&:hover": {},
            }}
          />
        </Menu.Target>
          <Menu.Dropdown className="mt-5 pointer-events-auto">
            <Menu.Label>Application</Menu.Label>
            <Link href="/tracking">
              <Menu.Item icon={<Settings size={14} />} disabled={userImage === ""}>
                Dashboard
              </Menu.Item>
            </Link>
          </Menu.Dropdown>
      </Menu>
    
    </div>
  );
}

export { Header };

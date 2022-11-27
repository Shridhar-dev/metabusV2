import { Avatar,Menu,Divider,Text,createStyles } from '@mantine/core';
import SearchBar from "./SearchBar"
import { Settings, Search, Photo, MessageCircle, Trash, ArrowsLeftRight } from 'tabler-icons-react';


const useStyles = createStyles((theme) => ({
  root: {
    zIndex:1000000,
    pointerEvents:"all",
    cursor: "pointer",
  },
}));

function Header() {
  const { classes } = useStyles();
  return (
    <div className='w-full fixed flex justify-between pointer-events-none  px-5 top-5 z-[10000]'>
        <SearchBar />
        <Menu classNames={classes} position="left"  control={
            <Avatar
              radius="xl"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
              sx={{
                "&:hover": {},
              }}
            />}
            >
          <Menu.Label>Application</Menu.Label>
          <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
          <Menu.Item icon={<MessageCircle size={14} />}>Messages</Menu.Item>
          <Menu.Item icon={<Photo size={14} />}>Gallery</Menu.Item>
          <Menu.Item
            icon={<Search size={14} />}
            rightSection={<Text size="xs" color="dimmed">⌘K</Text>}
          >
            Search
          </Menu.Item>

          <Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item icon={<ArrowsLeftRight size={14} />}>Transfer my data</Menu.Item>,
          <Menu.Item color="red" icon={<Trash size={14} />}>Delete my account</Menu.Item>
        </Menu>

    </div>
  )
}

export default Header
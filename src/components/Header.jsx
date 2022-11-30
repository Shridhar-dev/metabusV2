import { Avatar,Menu,Divider,Text,createStyles } from '@mantine/core';
import SearchBar from "./SearchBar"
import { Settings } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect,useState } from 'react';

const useStyles = createStyles((theme) => ({
  root: {
    zIndex:1000000,
    pointerEvents:"all",
    cursor: "pointer",
  },
}));

function Header() {
  const { classes } = useStyles();
  const [userImage, setUserImage] = useState("");


  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, async(currUser) => {
      if (currUser) {
        setUserImage(currUser.photoURL)
      } 
    });
  },[])
  

  return (
    <div className='w-full fixed flex justify-between pointer-events-none  px-5 top-5 z-[10000]'>
        <SearchBar />
        <Menu classNames={classes} position="left"  control={
            <Avatar
              radius="xl"
              src={userImage}
              sx={{
                "&:hover": {},
              }}
            />}
            >
          <Menu.Label>Application</Menu.Label>  
          <Menu.Item icon={<Settings size={14} />} disabled={userImage === ""}>
            <Link to="/tracking">
              Dashboard
            </Link>
          </Menu.Item>
        </Menu>
    </div>
  )
}

export default Header
import { Button } from '@mantine/core';



function SocialButton({icon,text}) {
  return (
    <Button
      component="a"
      target="_blank"
      rel="noopener noreferrer"
      href=""
      leftIcon={icon}
      styles={(theme) => ({
        root: {
          backgroundColor: 'white !important',
          border: "0.5px solid rgb(206, 212, 218)",
          height: 42,
          paddingLeft: 20,
          paddingRight: 20,
          color:"black",
          borderRadius:"50px"
        },

        leftIcon: {
          marginRight: 15,
        },
      })}
    >
      {text}
    </Button>
  );
}

export default SocialButton;
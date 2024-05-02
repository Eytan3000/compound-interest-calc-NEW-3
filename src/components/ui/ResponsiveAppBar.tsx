
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/joy';
import logo from '../../Images/Logo.png';


interface Props {
  isMobile: boolean;
  handleOpen:()=>void;
}

function ResponsiveAppBar({ isMobile, handleOpen }: Props) {


  const handleClickMenu = () => {
    // setOpenMenu(true);
    handleOpen();
  };

  return (
    <AppBar position="static" 

    sx={{background:'#eaeaea'}}
     variant="outlined">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
         
            
            <img src={logo} alt='logo' style={{height:50}}/>
            
          {isMobile && (
            <IconButton
              sx={{
                marginLeft: 'auto', // Pushes the menu icon to the right
                color:'#ff2e63'
                
              }}
              onClick={handleClickMenu}>
              <MenuIcon />
            </IconButton>
          )}

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

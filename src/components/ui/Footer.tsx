
import { Box, Typography } from '@mui/joy';
import logo from '../../Images/Logo.png';

interface Prop {
    isMobile: boolean
}

export default function Footer({isMobile}:Prop) {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        sx={{
          height: 400,
          background: '#eaeaea',
          marginTop: 5,
        }}>
           {!isMobile && <img src={logo} alt='logo' style={{height:100}}/>}
            
          
          <Box textAlign={'center'}>
          <Typography level="h3" sx={{ color: '#ff6189' }}>
            Contact Us
          </Typography>
          <Typography level='body-sm' sx={{marginTop:5}}>
            Eytan Krief, 11 Wilson Tel Aviv, Israel
          </Typography>
        </Box>

      </Box>
    </>
  );
}

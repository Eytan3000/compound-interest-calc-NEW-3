import React, { useEffect, useState } from 'react';
import './App.css';
import { Box, Theme, Typography } from '@mui/joy';
import ResponsiveAppBar from './components/ui/ResponsiveAppBar';
import SumsCard from './components/ui/SumsCard';
import News from './news/News';
import HpArticle from './news/HpArticle';
import SavedResultCard from './components/form/SavedResultCard';
import FormArea from './components/form/FormArea';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import Footer from './components/ui/Footer';

//-------------------------------------------------
//-------------------------------------------------

function App() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [dataPosted, setDataPosted] = useState<boolean>(false); // postData function re-renders savedResultCard after saving details to db

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reduxSubmit = useSelector((state:any) => state.app.submit);

  //get the size of screen
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1200); // Adjust the breakpoint as needed. xs, extra-small: 0px. sm, small: 600px. md, medium: 900px. lg, large: 1200px.
    };
    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const titleStyles = (theme: Theme) => ({
    [theme.breakpoints.up('xs')]: {
      fontSize: '24px', // Adjust the font size for small to medium screens
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '24px', // Font size for medium to large screens
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '36px', // Font size for large screens
    },
  });
  const titleBoxStyles = (theme: Theme) => ({
    [theme.breakpoints.up('xs')]: {
      margin: 3,
    },
    [theme.breakpoints.up('lg')]: {
      margin: 10,
    },
  });

  const handleOpen = () => setMenuOpen(true);
  const handleClose = () => setMenuOpen(false);

  return (
    <>
      <ResponsiveAppBar isMobile={isMobile} handleOpen={handleOpen} />

 <Modal
        open={menuOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <SavedResultCard handleClose={handleClose} isMobile={isMobile} dataPosted={dataPosted} />
      </Modal>
      
      <Box
        display={'flex'}
        justifyContent={'center'}
        textAlign={'center'}
        sx={titleBoxStyles}>
        <Typography level="h1" sx={titleStyles}>
          Compound Interest Calculator
        </Typography>
      </Box>

      <FormArea
        isMobile={isMobile}
        setDataPosted={setDataPosted}
        dataPosted={dataPosted}
      />

      {reduxSubmit && <SumsCard />}
      <News />
      <HpArticle />
      <Footer isMobile={isMobile} />
    </>
  );
}

export default App;

import { Box } from '@mui/joy';
import React from 'react';
import SavedResultCard from './SavedResultCard';
import CompoundForm from './CompoundForm';

interface Props {
  isMobile:boolean;
  setDataPosted: React.Dispatch<React.SetStateAction<boolean>>;
  dataPosted:boolean;
}

export default function FormArea({ 
  // setSubmited,
   isMobile, setDataPosted, dataPosted }: Props) {
  
  return (
    <Box display={'flex'} justifyContent={'center'}>
     {!isMobile && <SavedResultCard isMobile={isMobile} dataPosted={dataPosted}/>} 

      <div
        style={{
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CompoundForm
        setDataPosted={setDataPosted}
        />
      </div>

      {!isMobile &&  <div // empty div to center the form
        style={{
          marginLeft: '20px',
          maxHeight: '400px',
          width: '200px',
        }}
      />}
    </Box>
  );
}

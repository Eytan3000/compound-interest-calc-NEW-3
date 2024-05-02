/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Card, Divider, Sheet, Stack, Typography, Theme } from '@mui/joy';
import BasicLineChart from './Chart';
import { useSelector } from 'react-redux';
import { formatSums } from '../../utils/helpers';
//-------------------------------------------------

function yearsToDataX(years: number): number[] {
  const yearsArr = [];
  for (let i = 1; i <= years; i++) {
    yearsArr.push(i);
  }
  return yearsArr;
}
//-------------------------------------------------
export default function SumsCard() {
  const reduxFutureValue = useSelector((state: any) => state.sumsValues.futureValue);
  const reduxTotalInterest = useSelector((state: any) => state.sumsValues.totalInterest);
  const reduxFutureValueArray = useSelector((state: any) => state.sumsValues.futureValueArray);
  const reduxYears = useSelector((state: any) => state.form.years);
  const reduxTotalDeposits = parseFloat(reduxFutureValue.replace(/,/g, '')) - parseFloat(reduxTotalInterest.replace(/,/g, ''));  //turn each value from string to number, and then subtraction
  const formatedTotalDeposits = formatSums(reduxTotalDeposits); //back to string

  const sumsBoxStyles = (theme:Theme) => ({
    [theme.breakpoints.down('sm')]: {
      marginY:4
    },
    [theme.breakpoints.up('md')]: {
      width:'30%',
      
    },
  });

  return (
    <Card
      sx={{maxWidth: '800px', margin: { xs: '30px', md:'20px auto' }}}
      size="lg"
      variant="outlined">
      {/* Sums */}
      <Sheet
        color="primary"
        variant="soft"
        
        sx={{ margin: 1, padding: 3, borderRadius: 8 }}>
        <Box
          // width="30%"
          display="column"
          justifyContent="center"
          textAlign={'center'}
          sx={{ margin: '0 auto' }}
          >
          <Stack spacing={1}>
            <Typography level="body-md" textColor="inherit">
              Future Value
            </Typography>
            <Divider />
            <Typography level="h4" textColor="inherit">
              ${reduxFutureValue.toLocaleString()}
            </Typography>
          </Stack>
        </Box>


        <Stack
        direction={{ xs: 'column', sm: 'row' }}
          marginTop={2}
          display="flex"
          justifyContent="space-between"

          // sx={sumsCardStyles}
          flexDirection={"column"} 
          alignItems="center" 


          
          textAlign={'center'}
          px={10}>
          <Box sx={sumsBoxStyles}
          // width="30%"
          >
             {/* <Stack spacing={1}> */}
              <Typography level="body-md" textColor="inherit">
                Total Deposits
              </Typography>
              <Divider />
              <Typography level="h4" textColor="inherit">
                ${formatedTotalDeposits.toLocaleString()}
              </Typography>
            {/* </Stack> */}
          </Box>
          <Box  
          sx={sumsBoxStyles}
          >
            {/* <Stack spacing={1}> */}
              <Typography level="body-md" textColor="inherit">
                Total Interest
              </Typography>
              <Divider />
              <Typography level="h4" textColor="inherit">
                ${reduxTotalInterest.toLocaleString()}
              </Typography>
            {/* </Stack> */}
          </Box>
        </Stack>
      </Sheet>

      {/* Chart */}
      {
        <Box display={'flex'} justifyContent={'center'} 
        marginY={{ xs: -15, sm:0, md: 0 }}
        >
          {yearsToDataX(reduxYears).length === reduxFutureValueArray.length //these two must be the same for the chart to work properly
          && 
          <BasicLineChart 
            dataX={yearsToDataX(reduxYears)}
            dataY={reduxFutureValueArray}
          />}
        </Box>
      }
    </Card>
  );
}

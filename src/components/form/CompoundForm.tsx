import React, { useState } from 'react';
import {
  Button,
  Input,
  Sheet,
  Typography,
  Alert,
  Theme,
  Grid,
} from '@mui/joy';
import { calculateFutureValue, formatSums } from '../../utils/helpers';
import WarningIcon from '@mui/icons-material/Warning';
import { useDispatch, useSelector } from 'react-redux';
import {
  appActions,
  formActions,
  resultCardActions,
  sumsValuesActions,
} from '../../store';
//-----------------------------------------------------------
type Event = React.ChangeEvent<HTMLInputElement>;

interface ParentProps {
  setDataPosted: React.Dispatch<React.SetStateAction<boolean>>;
}
//-----------------------------------------------------------
export default function CompoundForm({ setDataPosted }: ParentProps) {
  const [emptyField, setEmptyField] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const [principalExceeds, setPrincipalExceeds] = useState<boolean>(false);
  const [monthlyContributionExceeds, setMonthlyContributionExceeds] =
    useState<boolean>(false);
  const [yearsExceeds, setYearsExceeds] = useState<boolean>(false);
  const [interestRateExceeds, setInterestRateExceeds] =
    useState<boolean>(false);

  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reduxPrincipal = useSelector((state: any) => state.form.principal);
  const reduxMonthlyContribution = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.form.monthlyContribution
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reduxYears = useSelector((state: any) => state.form.years);
  const reduxInterestRate = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.form.interestRate
  );

  function AlertFieldsFalse() {
    setEmptyField(false);
    setPrincipalExceeds(false);
    setMonthlyContributionExceeds(false);
    setYearsExceeds(false);
    setInterestRateExceeds(false);
  }

  const sheetStyles = (theme: Theme) => ({
    padding: 3,
    margin: '0 auto',
    borderRadius: 10,
    [theme.breakpoints.up('xs')]: {
      width: '300px',
    },
    [theme.breakpoints.up('md')]: {
      width: '450px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '600px',
    },
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    //Input checks:
    if (
      reduxPrincipal === '' ||
      reduxMonthlyContribution === '' ||
      reduxYears === '' ||
      reduxInterestRate === ''
    ) {
      setEmptyField(true);
      return;
    }

    if (reduxPrincipal > 1000000000) {
      setPrincipalExceeds(true);
      return;
    }
    if (reduxMonthlyContribution > 1000000) {
      setMonthlyContributionExceeds(true);
      return;
    }
    if (reduxYears > 100) {
      setYearsExceeds(true);
      return;
    }
    if (reduxInterestRate > 100) {
      setInterestRateExceeds(true);
      return;
    }

    AlertFieldsFalse();

    //destructuring returning elements from function that calculates the compound
    const { futureValue, totalInterest, futureValueArray } =
      calculateFutureValue(
        +reduxPrincipal,
        +reduxMonthlyContribution,
        +reduxYears,
        +reduxInterestRate
      );
    const yearsNum: number = +reduxYears;

    const formattedFutureValue = formatSums(futureValue);
    const formattedTotalInterest = formatSums(totalInterest);

    dispatch(sumsValuesActions.setReduxfutureValue(formattedFutureValue));
    dispatch(sumsValuesActions.setReduxtotalInterest(formattedTotalInterest));
    dispatch(sumsValuesActions.setReduxfutureValueArray(futureValueArray));

    dispatch(appActions.setReduxSubmit(true));

    const totalDeposit = futureValue - totalInterest;

    const formValues = {
      principal: Number(reduxPrincipal),
      monthlyContribution: Number(reduxMonthlyContribution),
      yearsToGrow: yearsNum,
      yearlyInterestRate: +reduxInterestRate,
      fv: futureValue,
      totalInterest: totalInterest,
      totalDeposit,
    };


    const compResults = localStorage.getItem('compResults');
    if (!compResults) {
      const stringifiedFormValuesArr = JSON.stringify([formValues]);
      localStorage.setItem('compResults', stringifiedFormValuesArr);
    } else {
      const existingDataStr = localStorage.getItem('compResults');

      if (existingDataStr) {
        const existingData = JSON.parse(existingDataStr);
        if (existingData.length > 9) existingData.pop();
        const newDataArr = [formValues, ...existingData];

        const stringifiedFormValuesArr = JSON.stringify(newDataArr);
        localStorage.setItem('compResults', stringifiedFormValuesArr);
      }
    }

    setDataPosted((prev) => !prev);

    // postDataToDb(
    //   reduxPrincipal,
    //   reduxMonthlyContribution,
    //   yearsNum,
    //   +reduxInterestRate,
    //   futureValue,
    //   totalDeposit,
    //   totalInterest
    // ).then((res) => {
    //   if (res) {
    //     // render sums card
    //     setDataPosted((prev) => {
    //       return !prev;
    //     });
    //   }
    // });

    setDisabled(true);
  };

  const handleReset = () => {
    dispatch(formActions.setReduxPrincipal(''));
    dispatch(formActions.setReduxMonthlyContribution(''));
    dispatch(formActions.setReduxYears(''));
    dispatch(formActions.setReduxInterestRate(''));

    dispatch(appActions.setReduxSubmit(false));
    dispatch(resultCardActions.setId(false));

    setDisabled(false);
    AlertFieldsFalse();
  };

  const handleInputChange = (e: Event): void => {
    setDisabled(false);
    AlertFieldsFalse();

    if (e.target.id === 'initial-investment')
      dispatch(formActions.setReduxPrincipal(e.target.value));
    if (e.target.id === 'monthly-contribution')
      dispatch(formActions.setReduxMonthlyContribution(e.target.value));
    if (e.target.id === 'years-to-grow')
      dispatch(formActions.setReduxYears(e.target.value));
    if (e.target.id === 'interest-rate')
      dispatch(formActions.setReduxInterestRate(e.target.value));
  };

  return (
    <>
      <Sheet variant="outlined" sx={sheetStyles}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            columns={16}
            sx={{ flexGrow: 1 }}
            rowSpacing={{ xs: 2, md: 5 }}>
            <Grid xs={10} mt={1.5}>
              <Typography marginY={1} marginX={4}>
                Initial Investment
              </Typography>
            </Grid>
            <Grid xs={6} mt={1.5}>
              <Input
                type="number"
                sx={{ marginRight: 2, height: '100%' }}
                value={reduxPrincipal}
                id="initial-investment"
                placeholder="Example: 20,000"
                variant="outlined"
                color="primary"
                onChange={handleInputChange}
              />
            </Grid>

            <Grid xs={10} mt={1.5}>
              <Typography marginY={1} marginX={4}>
                Monthly Contribution
              </Typography>
            </Grid>
            <Grid xs={6} mt={1.5}>
              <Input
                type="number"
                value={reduxMonthlyContribution}
                id="monthly-contribution"
                placeholder="Example: 1200"
                variant="outlined"
                color="primary"
                sx={{ marginRight: 2, height: '100%' }}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid xs={10} mt={1.5}>
              <Typography marginY={1} marginX={4}>
                Years to Grow
              </Typography>
            </Grid>
            <Grid xs={6} mt={1.5}>
              <Input
                type="number"
                value={reduxYears}
                id="years-to-grow"
                placeholder="Example: 15"
                variant="outlined"
                color="primary"
                sx={{ marginRight: 2, height: '100%' }}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid xs={10} mt={1.5}>
              <Typography marginY={1} marginX={4}>
                Estimated Interest Rate (%)
              </Typography>
            </Grid>
            <Grid xs={6} mt={1.5}>
              <Input
                type="number"
                value={reduxInterestRate}
                id="interest-rate"
                placeholder="Example: 7"
                variant="outlined"
                color="primary"
                sx={{ marginRight: 2, height: '100%' }}
                onChange={handleInputChange}
              />
            </Grid>
            {/* Buttons */}
            <Grid xs={10} mt={1.5}></Grid>
            <Grid xs={6} padding={2} display="flex" justifyContent="flex-end">
              <Button
                // color="warning"
                sx={{ marginX: '8px', background: '#3a4252' }}
                onClick={handleReset}>
                Reset
              </Button>
              <Button
                type="submit"
                disabled={disabled}
                sx={{ background: '#ff2e63' }}>
                Submit
              </Button>
            </Grid>
          </Grid>

          {/* Alerts */}
          {emptyField && (
            <Alert
              sx={{ marginTop: 4 }}
              startDecorator={<WarningIcon />}
              variant="soft"
              color="danger">
              No empty fields are allowed{' '}
            </Alert>
          )}
          {principalExceeds && (
            <Alert
              sx={{ marginTop: 4 }}
              startDecorator={<WarningIcon />}
              variant="soft"
              color="danger">
              Initial Investment must be less than 1 billion
            </Alert>
          )}
          {monthlyContributionExceeds && (
            <Alert
              sx={{ marginTop: 4 }}
              startDecorator={<WarningIcon />}
              variant="soft"
              color="danger">
              Monthly contribution must be less than 1 million
            </Alert>
          )}
          {yearsExceeds && (
            <Alert
              sx={{ marginTop: 4 }}
              startDecorator={<WarningIcon />}
              variant="soft"
              color="danger">
              Years to grow must be less than 100
            </Alert>
          )}
          {interestRateExceeds && (
            <Alert
              sx={{ marginTop: 4 }}
              startDecorator={<WarningIcon />}
              variant="soft"
              color="danger">
              Interest rate must be less than 100
            </Alert>
          )}
        </form>
      </Sheet>
    </>
  );
}

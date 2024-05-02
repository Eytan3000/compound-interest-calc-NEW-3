import { useEffect, useState } from 'react';
import { Card, Typography } from '@mui/joy';
import { getFv, getLog } from '../../utils/database';
import { useDispatch } from 'react-redux';
import { appActions, formActions, sumsValuesActions } from '../../store';
import { calculateFutureValue, formatSums } from '../../utils/helpers';

import { combineReducers } from '@reduxjs/toolkit';
const rootReducer = combineReducers({});

//---------------------------------------------------
type Log = {
  fv: number;
  id: number;
};

interface Props {
  dataPosted: boolean;
  isMobile: boolean;
  handleClose?: () => void;
}
export type RootState = ReturnType<typeof rootReducer>;

//---------------------------------------------------
export default function SavedResultCard({
  dataPosted,
  isMobile,
  handleClose,
}: Props) {
  // const [logsArr, setLogsArray] = useState<Log[]>([]);
  const [logsArr, setLogsArray] = useState<Log[]>(
    getFv().map((fv: number, index: number) => ({ fv, id: index })) || []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setLogsArray(
      getFv().map((fv: number, index: number) => ({ fv, id: index }))
    );
  }, [dataPosted]);

  async function handleCardClick(id: number) {
    const log = getLog(id);
    if (!log) return;
    if (handleClose) handleClose();
    // dispatcing states to see them in the form values
    dispatch(formActions.setReduxPrincipal(log.principal));
    dispatch(formActions.setReduxMonthlyContribution(log.monthlyContribution));
    dispatch(formActions.setReduxYears(log.yearsToGrow));
    dispatch(formActions.setReduxInterestRate(log.yearlyInterestRate));

    //destructuring returning elements from function that calculates the compound
    const { futureValue, totalInterest, futureValueArray } =
      calculateFutureValue(
        log.principal,
        log.monthlyContribution,
        log.yearsToGrow,
        log.yearlyInterestRate
      );

    // formating to string
    const formattedFutureValue = formatSums(futureValue);
    const formattedTotalInterest = formatSums(totalInterest);

    // dispatching to see sums in sumsCard
    dispatch(sumsValuesActions.setReduxfutureValue(formattedFutureValue));
    dispatch(sumsValuesActions.setReduxtotalInterest(formattedTotalInterest));
    dispatch(sumsValuesActions.setReduxfutureValueArray(futureValueArray));

    //set submited to true (to see the card)
    dispatch(appActions.setReduxSubmit(true));

    // setId(log.id);
    // dispatch(resultCardActions.setId(log.id));
  }

  return (
    <Card
      sx={{
        marginLeft: '20px',
        maxHeight: '400px',
        width: '200px',
        overflowY: 'auto',
        flexDirection: 'column',
        margin: isMobile ? '0 auto' : null,
        marginTop: isMobile ? 10 : null,
      }}
      size="lg"
      variant="outlined">
      <Typography textAlign={'center'} sx={{ textDecoration: 'underline' }}>
        Recent results
      </Typography>
      {/* <div style={{ maxHeight: '100%', overflow: 'hidden', }}> */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {logsArr.map((item, index) => {
          return (
            <Card
              onClick={() => handleCardClick(index)}
              key={index}
              variant="outlined"
              sx={{
                marginY: 2,
                textAlign: 'center',
                cursor: 'pointer',
                background: item.id === index ? '#e3effbff' : null,
              }}>
              {' '}
              ${Math.floor(item.fv).toLocaleString()}
            </Card>
          );
        })}
      </div>
    </Card>
  );
}

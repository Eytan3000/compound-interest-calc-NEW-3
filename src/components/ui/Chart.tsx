
import { LineChart } from '@mui/x-charts/LineChart';

interface Props {
  dataX: number[];
  dataY: number[];
}

export default function BasicLineChart({
  dataX,
  dataY
}:Props) {

  return (
    <LineChart
      xAxis={[{ data: dataX }]}
      series={[
        {
          data: dataY,
          curve:'linear',
          color: '#3498DB',
        },
      ]}
      width={700}
      height={500}
    />
  );
}
// const url = 'http://localhost:8090/';
// const url = 'https://compound-interest-calc-a22aeeb9e026.herokuapp.com/';

// export async function postDataToDb(
//   principal,
//   monthlyContribution,
//   yearsToGrow,
//   yearlyInterestRate,
//   fv,
//   totalDeposit,
//   totalInterest
// ) {
//   const postData = {
//     principal,
//     monthlyContribution,
//     yearsToGrow,
//     yearlyInterestRate,
//     fv,
//     totalDeposit,
//     totalInterest,
//   };
//   try {
//     const response = await fetch(url + 'logs', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(postData),
//     });

//     const data = await response.json();
//     return data;
//   } catch (err) {
//     console.error('Error:', err);
//   }
// }

interface FormData {
  fv: number;
  monthlyContribution: number;
  principal: number;
  totalDeposit: number;
  totalInterest: number;
  yearlyInterestRate: number;
  yearsToGrow: number;
}
export function getFv() {
  const existingDataStr = localStorage.getItem('compResults') as string;
  const existingData: FormData[] = JSON.parse(existingDataStr);
  return existingData.map((data) => data.fv);
}

export function getLog(id: number) {
  const existingDataStr = localStorage.getItem('compResults') as string;
  const existingData: FormData[] = JSON.parse(existingDataStr);
  return existingData.find((_data, index) => index === id);
}

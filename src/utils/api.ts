import axios from 'axios';

// type RequestOptions = {
//   method: string;
//   url: string;
//   params: {
//     region: string;
//     snippetCount: string;
//   };
//   headers: {
//     'content-type': string;
//     'X-RapidAPI-Key': string | undefined;
//     'X-RapidAPI-Host': string;
//   };
//   data: string;
// };



export async function yahooNewsApi() {
  // const apiKey = process.env.REACT_APP_YAHOO_API_KEY;
  const apiKey = '834958739485793847598347';

  const options = {
    method: 'POST',
    url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/list',
    params: {
      region: 'US',
      snippetCount: '28',
    },
    headers: {
      'content-type': 'text/plain',
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    },
    data: 'Pass in the value of uuids field returned right in this endpoint to load the next page, or leave empty to load first page',
  };
  const response = await axios.request(options);
  return response;
}



// export async function yahooNewsApi_COPY() {

// return await axios.get('/data.json');
// }
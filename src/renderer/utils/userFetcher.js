import axios from 'axios';
import { SERVER } from 'configs';

const adminFetcher = (route) => {
  const JWT = localStorage.getItem('JWT');
  const url = `${SERVER}${route}`;

  return axios
    .get(url, {
      headers: {
        Authorization: JWT,
      },
    })
    .then((res) => res.data);
};

export default adminFetcher;

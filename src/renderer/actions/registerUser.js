import axios from 'axios';
import { SERVER } from 'configs';

const registerUser = async (data) => {
  try {
    const result = await axios.post(`${SERVER}/v1/users`, data);

    return result.data.jwt;
  } catch (e) {
    return null;
  }
};

export default registerUser;

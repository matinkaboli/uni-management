import axios from 'axios';
import { SERVER } from 'configs';

const loginUser = async (data, isAdmin) => {
  let url = `${SERVER}/v1/users/login`;
  const body = {
    uniCode: data.userName,
    password: data.password,
    username: data.userName,
  };

  if (isAdmin) {
    url = `${SERVER}/v1/admin/login`;
  }

  try {
    const result = await axios.post(url, body);

    return result.data.jwt;
  } catch (e) {
    return null;
  }
};

export default loginUser;

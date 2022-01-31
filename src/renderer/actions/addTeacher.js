import axios from 'axios';
import { SERVER } from 'configs';

const addTeacher = async (data) => {
  const JWT = localStorage.getItem('JWT');
  const url = `${SERVER}/v1/admin/teacher`;

  try {
    const result = await axios.post(url, data, {
      headers: {
        Authorization: JWT,
      },
    });

    console.log(result);

    return true;
  } catch (e) {
    return false;
  }
};

export default addTeacher;

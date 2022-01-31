import axios from 'axios';
import { SERVER } from 'configs';

const deleteTeacher = async (_id) => {
  const JWT = localStorage.getItem('JWT');
  const url = `${SERVER}/v1/admin/teacher/${_id}`;

  try {
    const result = await axios.delete(url, {
      headers: {
        Authorization: JWT,
      },
    });

    return result.data.message === 'Teacher deleted';
  } catch (e) {
    return false;
  }
};

export default deleteTeacher;

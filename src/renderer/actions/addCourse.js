import axios from 'axios';
import { SERVER } from 'configs';

const addTeacher = async (data) => {
  const JWT = localStorage.getItem('JWT');
  const url = `${SERVER}/v1/admin/course`;

  console.log(data);

  try {
    const result = await axios.post(
      url,
      {
        vahed: data.vahed,
        name: data.courseName,
        teacherId: data.gender,
      },
      {
        headers: {
          Authorization: JWT,
        },
      }
    );

    return true;
  } catch (e) {
    return false;
  }
};

export default addTeacher;

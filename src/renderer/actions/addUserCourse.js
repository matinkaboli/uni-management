import axios from 'axios';
import { SERVER } from 'configs';

const addTeacher = async (data) => {
  const JWT = localStorage.getItem('JWT');
  const url = `${SERVER}/v1/users/userCourse`;

  try {
    const result = await axios.post(
      url,
      {
        course: data.course,
        teacher: data.teacher,
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

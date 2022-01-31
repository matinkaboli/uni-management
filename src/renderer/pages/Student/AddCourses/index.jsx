import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import Button from 'renderer/components/Button';
import Table from 'renderer/components/Table';
import DashboardLayout from 'renderer/components/DashboardLayout';
import userFetcher from 'renderer/utils/userFetcher';
import Swal from 'sweetalert2';
import addUserCourse from 'renderer/actions/addUserCourse';
import { useForm } from 'react-hook-form';

import styles from './styles.module.scss';

/* eslint-disable */
const Dashboard = () => {
  const history = useNavigate();
  const { data, error } = useSWR('/v1/users/course', userFetcher, {
    refreshInterval: 3000,
  });

  const {
    handleSubmit,
    control,
    formState,
    trigger,
    setError,
    reset,
    register,
  } = useForm({
    mode: 'onChange',
  });

  const submitForm = (formData) => {
    addUserCourse(formData).then((resultData) => {
      if (resultData) {
        Swal.fire({
          title: 'اضافه شد',
          icon: 'success',
          confirmButtonText: 'باشه',
        });

        reset({
          teacherName: '',
        });
      } else {
        Swal.fire({
          title: 'خطا',
          text: 'بعدا امتحان کنید',
          icon: 'error',
          confirmButtonText: 'باشه',
        });
      }
    });
  };

  if (!data && !error) {
    return <p>درحال دریافت اطلاعات</p>;
  }

  return (
    <DashboardLayout>
      <>
        <Button
          className={styles.addCourseBtn}
          content="داشبورد"
          onClick={() => {
            history('/users/dashboard');
          }}
        />

        <Button
          className={styles.exitButton}
          content="خروج"
          onClick={() => {
            localStorage.clear();
            history('/');
          }}
        />
      </>
      <>
        <h1 className={styles.mainTitle}>اضافه کردن دروس </h1>

        {error ? (
          <p>خطا. بعدا امتحان کنید</p>
        ) : (
          <form onSubmit={handleSubmit(submitForm)}>
            <select {...register('course')}>
              {data?.courses.map((x) => (
                <option value={x._id}>
                  {x.name}, {x?.teacher?.name || 'استاد نامشخص'}
                </option>
              ))}
            </select>

            {formState?.errors?.courseName?.type === 'error' ? (
              <p className={styles.errorMessage}>
                {formState?.errors?.courseName.message}
              </p>
            ) : (
              ''
            )}

            <Button
              disabled={!formState.isValid || formState.isValidating}
              bgColor="#7FFF00"
              content="اضافه کردن درس"
              type="submit"
            />
          </form>
        )}
      </>
    </DashboardLayout>
  );
};

export default Dashboard;
/* eslint-disable */

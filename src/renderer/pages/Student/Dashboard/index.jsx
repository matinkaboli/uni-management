import useSWR from 'swr';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';
import Button from 'renderer/components/Button';
import Table from 'renderer/components/Table';
import DashboardLayout from 'renderer/components/DashboardLayout';
import userFetcher from 'renderer/utils/userFetcher';
import deleteUserCourse from 'renderer/actions/deleteUserCourse';
import Swal from 'sweetalert2';

import styles from './styles.module.scss';

/* eslint-disable */
const Dashboard = () => {
  const history = useNavigate();
  const { data, error } = useSWR('/v1/users/userCourse', userFetcher, {
    refreshInterval: 3000,
  });

  const columns = [
    {
      title: 'نام درس',
      dataIndex: 'course',
      key: 1,
    },
    {
      title: 'نام استاد',
      dataIndex: 'teacher',
      key: 2,
    },
    {
      title: 'تعداد واحد',
      dataIndex: 'vahed',
      key: 3,
    },
    {
      title: 'تاریخ اخذ',
      dataIndex: 'createdAt',
      key: 4,
    },
    {
      title: 'گزینه ها',
      dataIndex: 'actions',
      key: 5,
    },
  ];

  const d = data?.userCourse.map((x) => ({
    course: x?.course?.name || 'درس',
    teacher: x?.teacher?.name || 'استاد',
    vahed: x?.course?.vahed || '2',
    createdAt: DateTime.fromISO(x.createdAt).toRelativeCalendar(),
    actions: (
      <div>
        <Button
          className={styles.exitButton}
          content="حذف"
          onClick={() => {
            deleteUserCourse(x._id).then((result) => {
              if (result) {
                Swal.fire({
                  title: 'حذف شد',
                  icon: 'success',
                  confirmButtonText: 'باشه',
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
          }}
        />
      </div>
    ),
  }));

  console.log(data);

  return (
    <DashboardLayout>
      <>
        <Button
          className={styles.addCourseBtn}
          content="اضافه کردن درس"
          onClick={() => {
            history('/users/add-course');
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
        <h1 className={styles.mainTitle}>دروس من</h1>

        {!data && !error ? <p>درحال دریافت اطلاعات از سرور</p> : ''}

        {error ? (
          <p>خطا! بعدا امتحان کنید</p>
        ) : (
          <Table
            columns={columns}
            data={d}
            noDataMessage="هیچ درسی برای نمایش وجود ندارد"
          />
        )}
      </>
    </DashboardLayout>
  );
};

export default Dashboard;
/* eslint-disable */

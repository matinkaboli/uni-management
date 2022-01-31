import { useNavigate } from 'react-router-dom';
import Button from 'renderer/components/Button';
import Table from 'renderer/components/Table';
import DashboardLayout from 'renderer/components/DashboardLayout';

import styles from './styles.module.scss';

/* eslint-disable */
const Dashboard = () => {
  const history = useNavigate();

  const columns = [
    {
      title: 'نام درس',
      dataIndex: 'lessonName',
      key: 1,
    },
    {
      title: 'نام استاد',
      dataIndex: 'teacherName',
      key: 2,
    },
    {
      title: 'تعداد واحد',
      dataIndex: 'units',
      key: 3,
    },
    {
      title: 'گزینه ها',
      dataIndex: 'options',
      key: 4,
    },
  ];
  return (
    <DashboardLayout>
      <>
        <Button
          className={styles.addCourseBtn}
          content="اضافه کردن درس"
          onClick={() => {
            localStorage.clear();
            history('/');
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

        <Table
          columns={columns}
          data={[]}
          noDataMessage="هیچ درسی برای نمایش وجود ندارد"
        />
      </>
    </DashboardLayout>
  );
};

export default Dashboard;
/* eslint-disable */

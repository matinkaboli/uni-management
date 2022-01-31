import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import Button from 'renderer/components/Button';
import DashboardLayout from 'renderer/components/DashboardLayout';

import styles from './styles.module.scss';

const AdminCourses = () => {
  const history = useNavigate();

  return (
    <DashboardLayout>
      <>
        <Button
          className={styles.btn}
          content="مدیریت استاد ها"
          onClick={() => {
            history('/admin/teacher');
          }}
        />

        <Button
          className={styles.btn}
          content="داشبورد"
          onClick={() => {
            history('/admin/dashboard');
          }}
        />

        <Button
          className={cn(styles.btn, styles.exitButton)}
          content="خروج"
          onClick={() => {
            localStorage.clear();
            history('/');
          }}
        />
      </>

      <>
        <h2>مدیریت دروس</h2>
      </>
    </DashboardLayout>
  );
};

export default AdminCourses;

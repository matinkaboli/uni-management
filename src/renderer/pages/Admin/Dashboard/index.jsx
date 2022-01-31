import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import Button from 'renderer/components/Button';
import DashboardLayout from 'renderer/components/DashboardLayout';

import styles from './styles.module.scss';

const AdminDashboard = () => {
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
          content="مدیریت درس ها"
          onClick={() => {
            history('/admin/course');
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
        <h2>پنل ادمین</h2>
        <p>به پنل ادمین خوش آمدید.</p>
        <p>در این پنل شما میتوانید استاد ها و دروس را مدیریت کنید.</p>
      </>
    </DashboardLayout>
  );
};

export default AdminDashboard;

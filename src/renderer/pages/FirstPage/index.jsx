import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'renderer/components/Button';
import styles from './styles.module.scss';

const FirstPage = () => {
  const history = useNavigate();

  useEffect(() => {
    const JWT = localStorage.getItem('JWT');
    const isAdmin = localStorage.getItem('ADMIN') === '1';

    if (JWT) {
      if (isAdmin) {
        history('/admin/dashboard');
      } else {
        history('/users/dashboard');
      }
    }
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <span>به برنامه مدیریت دروس خوش آمدید!</span>

        <div className={styles['buttons-container']}>
          <Button
            content="ثبت نام"
            onClick={() => {
              history('/register');
            }}
            bgColor="#7FFF00"
          />

          <Button
            content="ورود"
            onClick={() => {
              history('/login');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FirstPage;

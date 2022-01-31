import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import Button from 'renderer/components/Button';
import loginUser from 'renderer/actions/loginUser';
import styles from './styles.module.scss';

/* eslint-disable */
const Login = () => {
  const history = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const { handleSubmit, control, formState, trigger, setError } = useForm({
    mode: 'onChange',
  });

  const { errors } = formState;

  const submitForm = (data) => {
    loginUser(data, isAdmin).then((result) => {
      if (!result) {
        setError('userName', {
          type: 'error',
          message: 'رمز یا نام کاربری اشتباه است',
        });
      } else {
        localStorage.setItem('JWT', result);

        if (isAdmin) {
          localStorage.setItem('ADMIN', '1');
          history('/admin/dashboard');
        } else {
          history('/users/dashboard');
        }
      }
    });
  };

  const handleIsAdmin = (e) => {
    console.log(e.target.value);
    if (e.target.value === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    trigger();
  }, []);

  return (
    <div>
      <Button
        content="بازگشت "
        className={styles.backButton}
        onClick={() => {
          history('/');
        }}
      />

      <div className={styles.main}>
        <p>ورود دانشجو و ادمین</p>

        <div className={styles.contents}>
          <form onSubmit={handleSubmit(submitForm)}>
            <Controller
              name="userName"
              control={control}
              rules={{ required: 'نام کاربری خود را وارد کنید' }}
              render={({ field }) => (
                <input
                  placeholder="نام کاربری"
                  ref={field.ref}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />

            {formState?.errors?.userName?.type === 'error' ? (
              <p className={styles.errorMessage}>
                {formState?.errors?.userName.message}
              </p>
            ) : (
              ''
            )}

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  placeholder="رمز ورود"
                  ref={field.ref}
                  onChange={field.onChange}
                  value={field.value}
                  type="password"
                />
              )}
            />
            <select onChange={handleIsAdmin} defaultValue="non-admin">
              <option selected value="non-admin">
                ورود به عنوان دانشجو
              </option>
              <option value="admin">ورود به عنوان ادمین</option>
            </select>
            <Button
              disabled={!formState.isValid || formState.isValidating}
              bgColor="#7FFF00"
              content="ورود"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

/* eslint-disable */

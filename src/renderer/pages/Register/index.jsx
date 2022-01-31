import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Button from 'renderer/components/Button';
import { useNavigate } from 'react-router-dom';
import registerUser from 'renderer/actions/registerUser';
/* eslint-disable */

import styles from './styles.module.scss';

const Register = () => {
  const { handleSubmit, control, setError, formState, trigger } = useForm({
    mode: 'onChange',
  });

  const history = useNavigate();

  const { errors } = formState;

  const submitForm = async (data) => {
    registerUser(data).then((registerResult) => {
      if (!registerResult) {
        setError('uniCode', {
          type: 'error',
          message: 'شماره دانشجویی تکراری است.',
        });
      } else {
        localStorage.setItem('JWT', registerResult);

        history('/users/dashboard');
      }
    });
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
        <p>ثبت نام دانشجو</p>
        <div className={styles.contents}>
          <form onSubmit={handleSubmit(submitForm)}>
            <Controller
              name="name"
              control={control}
              rules={{ required: ' نام دانشجو الزامی است' }}
              render={({ field }) => (
                <input
                  placeholder="نام"
                  ref={field.ref}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
            <Controller
              name="uniCode"
              control={control}
              rules={{ required: 'شماره دانشجویی الزامی است' }}
              render={({ field }) => (
                <input
                  placeholder="شماره دانشجویی"
                  ref={field.ref}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />

            {formState?.errors?.uniCode?.type === 'error' ? (
              <p className={styles.errorMessage}>
                {formState?.errors?.uniCode.message}
              </p>
            ) : (
              ''
            )}

            <Controller
              name="password"
              control={control}
              rules={{
                required: 'رمز عبور الزامی است',
                validate: (value) => {
                  if (value.length >= 8) {
                    return true;
                  }
                  return 'رمز ورود باید بیشتر از 8 رقم باشد';
                },
              }}
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
            {}

            <Button
              disabled={!formState.isValid || formState.isValidating}
              bgColor="#7FFF00"
              content="ثبت نام"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
/* eslint-disable */

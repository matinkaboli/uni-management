import useSWR from 'swr';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import Button from 'renderer/components/Button';
import DashboardLayout from 'renderer/components/DashboardLayout';
import adminFetcher from 'renderer/utils/adminFetcher';
import Table from 'renderer/components/Table';
import { DateTime } from 'luxon';
import deleteTeacher from 'renderer/actions/deleteTeacher';
import Swal from 'sweetalert2';
import { useForm, Controller } from 'react-hook-form';

import styles from './styles.module.scss';
import addTeacher from 'renderer/actions/addTeacher';

const AdminTeachers = () => {
  const { data, error } = useSWR('/v1/admin/teacher', adminFetcher, {
    refreshInterval: 3000,
  });
  const { handleSubmit, control, formState, trigger, setError, reset } =
    useForm({
      mode: 'onChange',
    });

  const history = useNavigate();

  const columns = [
    {
      title: 'استاد',
      dataIndex: 'name',
      key: 1,
    },
    {
      title: 'اضافه شده در',
      dataIndex: 'createdAt',
      key: 2,
    },
    {
      title: 'ابزار',
      dataIndex: 'actions',
      key: 2,
    },
  ];

  const submitForm = (formData) => {
    addTeacher(formData).then((resultData) => {
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

  const showData = () => {
    if (!data && !error) {
      return <p>در حال دریافت اطلاعات...</p>;
    }

    if (error) {
      return <p>ارور. لطفا دوباره امتحان کنید.</p>;
    }

    const d = data.teachers.map((x) => ({
      ...x,
      createdAt: DateTime.fromISO(x.createdAt).toRelativeCalendar(),
      actions: (
        <div>
          <Button
            className={styles.exitButton}
            content="حذف"
            onClick={() => {
              deleteTeacher(x._id).then((result) => {
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

    return (
      <Table
        columns={columns}
        data={d}
        noDataMessage="هیچ درسی برای نمایش وجود ندارد"
      />
    );
  };

  return (
    <DashboardLayout>
      <>
        <Button
          className={styles.btn}
          content="داشبورد"
          onClick={() => {
            history('/admin/dashboard');
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
        <h2>مدیریت استاد ها</h2>

        <br />
        <br />

        {showData()}

        <h2>اضافه کردن استاد</h2>
        <form onSubmit={handleSubmit(submitForm)}>
          <Controller
            name="teacherName"
            control={control}
            rules={{ required: 'نام استاد را وارد کنید' }}
            render={({ field }) => (
              <input
                placeholder="نام استاد"
                ref={field.ref}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />

          {formState?.errors?.teacherName?.type === 'error' ? (
            <p className={styles.errorMessage}>
              {formState?.errors?.teacherName.message}
            </p>
          ) : (
            ''
          )}

          <Button
            disabled={!formState.isValid || formState.isValidating}
            bgColor="#7FFF00"
            content="اضافه کردن استاد"
            type="submit"
          />
        </form>
      </>
    </DashboardLayout>
  );
};

export default AdminTeachers;

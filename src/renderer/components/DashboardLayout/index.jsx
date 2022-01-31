import styles from './styles.module.scss';

const DashboardLayout = ({ children }) => (
  <div>
    <div className={styles.containerDashboard}>
      <div className={styles.navDashboard}>{children[0]}</div>

      <div className={styles.mainPage}>{children[1]}</div>
    </div>
  </div>
);

export default DashboardLayout;

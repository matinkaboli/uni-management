import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.module.scss';

/* eslint-disable */
function Table({ className, columns, data, noDataMessage }) {
  return (
    <div className={classNames(styles.table, className)}>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <td style={{ width: `${100 / columns.length}%` }} key={col.key}>
                {col.title}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((info) => {
            return (
              <tr key={info.key ?? data.indexOf(info)}>
                {columns.map((col) => (
                  <td>{col.render ? col.render(data) : info[col.dataIndex]}</td>
                  // <td>{info[col.dataIndex]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {!data ||
        data === null ||
        (data.length === 0 && (
          <div className={styles['no-data-message-container']}>
            <span>{noDataMessage}</span>
          </div>
        ))}
    </div>
  );
}

Table.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
};
Table.defaultProps = {
  className: null,
  columns: [],
  data: [],
};

export default Table;

/* eslint-disable */

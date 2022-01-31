import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

/* eslint-disable */
function Button({
  content,
  children,
  onClick,
  className,
  bgColor,
  disabled,
  type,
}) {
  return (
    <button
      onClick={!disabled ? onClick : () => {}}
      className={classNames(
        disabled ? styles.disabled : styles.button,
        className
      )}
      type={type}
      style={{ backgroundColor: !disabled && bgColor }}
    >
      {content ?? children}
    </button>
  );
}

Button.propTypes = {
  content: PropTypes.string,
  children: PropTypes.element,
  onClick: PropTypes.func,
  className: PropTypes.string,
  bgColor: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};
Button.defaultProps = {
  content: '',
  children: null,
  onClick: () => {},
  className: '',
  bgColor: '#7FFF00',
  disabled: false,
  type: 'button',
};

export default Button;

/* eslint-disable */

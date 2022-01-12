import PropTypes from 'prop-types';
import classNames from 'classnames';

function Button({ onClick, className, outline, children }) {
  return (
    <button
      onClick={onClick}
      className={classNames('button', className, {
        'button--outline': outline,
      })}>
      {children}
    </button>
  );
}

Button.protoTypes = {
  onClick: PropTypes.func,
};

export default Button;
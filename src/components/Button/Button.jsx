import PropTypes from 'prop-types';
import { StyledButton } from './Button.styled';

export const Button = ({
  type = 'button',
  icon: Icon = null,
  disabl = false,
  children,
  onClick,
  ...allyProps
}) => {
  return (
    <StyledButton
      type={type}
      disabled={disabl}
      onClick={onClick}
      {...allyProps}
    >
      {Icon && <Icon />}
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  'aria-label': PropTypes.string.isRequired,
};

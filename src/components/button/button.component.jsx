import './button.styles.scss';
// button types variable
const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

// renders the children object inside the button component
const Button = ({ children, buttonType, otherProps }) => {
  return (
    <div>
      <button
        // HOW DOES THIS WORK?
        className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
        {...otherProps}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;

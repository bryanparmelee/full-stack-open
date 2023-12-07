import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Toggleable = forwardRef((props, refs) => {
  const [visible, setIsVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setIsVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
});

Toggleable.displayName = "Toggleable";

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Toggleable;

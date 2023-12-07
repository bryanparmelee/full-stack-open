import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";

const Toggleable = forwardRef((props, refs) => {
  const [visible, setIsVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "flex" : "none" };

  const toggleVisibility = () => {
    setIsVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <>
      <Box style={hideWhenVisible}>
        <Button variant="contained" color="primary" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </Box>
      <Box
        style={showWhenVisible}
        sx={{ flexDirection: "column", gap: 2, alignItems: "center" }}
      >
        {props.children}
        <Button
          size="inherit"
          color="secondary"
          variant="outlined"
          onClick={toggleVisibility}
          sx={{ width: 200 }}
        >
          Cancel
        </Button>
      </Box>
    </>
  );
});

Toggleable.displayName = "Toggleable";

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Toggleable;

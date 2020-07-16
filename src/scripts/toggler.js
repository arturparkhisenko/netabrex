import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import React from 'react';

export const Toggler = ({ checked, label, toggle }) => {
  function checkBoxToggle(event) {
    toggle(event.target.checked);
  }

  // @see https://allyjs.io/data-tables/focusable.html#label-element
  return (
    <label
      style={{
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        userSelect: 'none'
      }}
      tabIndex="-1"
    >
      <Checkbox checked={checked} onChange={checkBoxToggle} />
      {label}
    </label>
  );
};

Toggler.defaultProps = {
  checked: false,
  label: ''
};

Toggler.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  toggle: PropTypes.func.isRequired
};

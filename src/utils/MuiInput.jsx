import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';

export default function ImageInsideTextField({ label,
    type = 'text',
    value,
    onChange,
    id,
    required = false,
    disabled = false,
    readOnly = false,
    inputRoleImage,
    className
}) {
  return (
      <TextField
      style={{width:`300px`}}
      className={`${className}`}
        label={label}
        variant="outlined"
        type="password"
        fullWidth
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box
                component="img"
                src={inputRoleImage}
                alt="Icon"
                sx={{ width: 30, height: 30 }}
              />
            </InputAdornment>
          ),
        }}
      />
  );
}

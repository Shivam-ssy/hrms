import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import {useLocation} from "react-router-dom"
function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function BasicBreadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);
  
    return (
      <Breadcrumbs aria-label="breadcrumb">
        <Link className="cursor-pointer upparcase" to="/dashboard">Home</Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
  
          return index === pathnames.length - 1 ? (
            <Typography className='uppercase' color="text.primary" key={to}>
              {value}
            </Typography>
          ) : (
            <Link to={to} key={to}>
              {value}
            </Link>
          );
        })}
      </Breadcrumbs>
    );
}

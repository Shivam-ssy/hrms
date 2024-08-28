import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Link } from 'react-router-dom';
export default function MenuOption({headline="menu",rests=[]}) {
    console.log(rests);
    
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button style={{fontWeight:`700`,fontFamily:`inherit`, fontSize:`1.03rem`}} variant="" {...bindTrigger(popupState)}>
            {headline}
          </Button>
          <Menu {...bindMenu(popupState)}>
           
          {rests.map((rest, index) => (
              <MenuItem  key={index} onClick={popupState.close}>
                <Link to={rest.Link || "/"}>{rest.title}</Link>
              </MenuItem>
            ))}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}

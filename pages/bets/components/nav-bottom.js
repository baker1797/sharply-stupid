import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LayersIcon from '@mui/icons-material/Layers';

export default function NavBottom() {
  // const [value, setValue] = React.useState('home');

  return (
    <Box sx={{position:"fixed", width:"100%", bottom:0, right:0, left: 0, borderTop: "1px #ccc solid", boxShadow: "0px -2px 10px #ccc"}}>
      <BottomNavigation
        showLabels
        // value={value}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
      >
        <BottomNavigationAction value="bets" label="View Bets" href="/bets" icon={<FormatListBulletedIcon />} />
        <BottomNavigationAction value="create-bet" label="Create Bet" href="/bets/create" icon={<AddBoxIcon />} />
        <BottomNavigationAction value="resources" label="Resources" href="/bets/resources" icon={<LayersIcon />} />
      </BottomNavigation>
    </Box>
  );
}
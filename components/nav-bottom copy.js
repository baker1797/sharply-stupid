import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LayersIcon from '@mui/icons-material/Layers';

export default function NavBottom() {
  // const [value, setValue] = React.useState('home');

  return (
    <Box>
      <BottomNavigation
        showLabels
        // value={value}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
      >
        <BottomNavigationAction value="home" label="Home" href="/" icon={<HomeIcon />} />
        <BottomNavigationAction value="bets" label="View Bets" href="/bets" icon={<FormatListBulletedIcon />} />
        <BottomNavigationAction value="create-bet" label="Create Bet" href="/bets/create" icon={<AddBoxIcon />} />
        <BottomNavigationAction value="resources" label="Resources" href="/resources" icon={<LayersIcon />} />
      </BottomNavigation>
    </Box>
  );
}
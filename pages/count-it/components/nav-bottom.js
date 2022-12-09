import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddBoxIcon from '@mui/icons-material/AddBox';
import GavelIcon from '@mui/icons-material/Gavel';

export default function NavBottom() {
	// const [value, setValue] = React.useState('home');

	return (
		<Box sx={{ position: "fixed", width: "100%", bottom: 0, right: 0, left: 0, borderTop: "1px #ccc solid", boxShadow: "0px -2px 10px #ccc" }}>
			<BottomNavigation
				showLabels
			// value={value}
			// onChange={(event, newValue) => {
			//   setValue(newValue);
			// }}
			>
				<BottomNavigationAction value="home" label="Home" href="/count-it" icon={<HomeIcon />} />
				<BottomNavigationAction value="bets" label="Leaderboard" href="/count-it/leaderboard" icon={<FormatListBulletedIcon />} />
				<BottomNavigationAction value="create-bet" label="Count It" href="/count-it/action/watch" icon={<AddBoxIcon />} />
				<BottomNavigationAction value="resources" label="Rules" href="/count-it/rules" icon={<GavelIcon />} />
			</BottomNavigation>
		</Box>
	);
}
import React from 'react';
import {Provider} from 'react-redux';
import {createMuiTheme, CssBaseline} from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import {ThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import store from './store';
import RestaurantScreen from './components/RestaurantScreen';

const theme = createMuiTheme({
	palette: {
		primary: green,
	},
});

const App = () => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6">
							Hello React-Redux TDD
						</Typography>
					</Toolbar>
				</AppBar>
				<Container>
					<RestaurantScreen />
				</Container>
			</ThemeProvider>
		</Provider>
	);
};

export default App;

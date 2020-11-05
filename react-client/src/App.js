import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import theme from './styles/theme';
import Header from './components/Header';
import RentalsHome from './pages/rentals/RentalsHome';
import LoginPage from './pages/user/LoginPage';
import RegisterPage from './pages/user/RegisterPage';
import RentalDetails from './pages/rentals/RentalDetails';
import AdminPage from './pages/admin/AdminPage';

import { MapProvider } from './context/MapProvider';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Switch>
          <MapProvider apiKey={`${process.env.REACT_APP_TOM_MAP_API_KEY}`}>
            <Route path='/' exact component={RentalsHome} />
            <Route path='/rental/:id' exact component={RentalDetails} />
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/admin' component={AdminPage} />
          </MapProvider>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;

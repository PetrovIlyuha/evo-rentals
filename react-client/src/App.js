import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import theme from './styles/theme';
import Header from './components/Header';
import RentalsHome from './pages/rentals/RentalsHome';
import LoginPage from './pages/user/LoginPage';
import RegisterPage from './pages/user/RegisterPage';
import RentalDetails from './pages/rentals/RentalDetails';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact component={RentalsHome} />
          <Route path='/rental/:id' exact component={RentalDetails} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;

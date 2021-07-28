import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '~/components/Login/index';
import Admin from '~/components/Admin/index';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Admin} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

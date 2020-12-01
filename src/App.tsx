import React from 'react';
import Home from "./articles/Home";
import 'antd/dist/antd.css';
import Navbar from "./Navbar/navbar";
import EditArticle from "./articles/EditArticle";
import { Switch, Route, withRouter, RouteComponentProps} from 'react-router-dom';
import CreateArticle from "./articles/CreateArticle";

const App: React.FC<RouteComponentProps<any>> = () => {
  return (
    <div className="app">
        <Navbar/>
        <Switch>
            <Route path={'/'} exact component={Home} />
            <Route path={'/edit/:id'} exact component={EditArticle} />
            <Route path={'/create'} exact component={CreateArticle} />
        </Switch>

    </div>
  );
}

export default withRouter(App);

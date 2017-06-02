import React from 'react';
import ReactDOM from 'react-dom';
import Settings from './pages/Settings';
import Frontpage from './pages/Frontpage';
import Dashboard from './pages/Dashboard';
import Callback from './pages/Callback';
import Disclaimer from './pages/Disclaimer';
import About from './pages/About';
import { Router, Route, browserHistory } from 'react-router';
console.log('index.js')
const Root = () => {

    return (
        <div>
            <Router history={browserHistory}>
                <Route path="/" component={Frontpage}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/settings" component={Settings}/>
                <Route path="/disclaimer" component={Disclaimer} />
                <Route path="/about" component={About} />
                <Route path="/callback" component={Callback} />
            </Router>
        </div>
    )

}

ReactDOM.render(<Root />, document.getElementById('root'));

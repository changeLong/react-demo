import React from 'react';
import { BrowserRouter as Router, Route, Link, IndexRoute, Switch } from 'react-router-dom'

function Routea() {
    return <p>this is route A</p>
}

function RoutebChild({ match }) {
    return <p>this is route b children : {match.params.id}</p>
}

function Routeb({ match }) {
    return (
        <div>
            {['a', 'b', 'c', 'd'].map(item => {
                return <li key={item}><Link to={match.url + '/' + item}>{item}</Link></li>
            })}
            <Route path={`${match.url}/:id`} component={RoutebChild} />
            <Route exact path={match.url}>this is route b</Route>
        </div>
    )
}

// 配置404
function NoMatch() {
    return <p>404</p>
}

class Scrolltop extends React.Component {
    componentDidUpdate(prevProps) {
        console.log(11111);
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return this.props.children;
    }
}

function routeindex() {
    return <p>this is route Index</p>
}

class Routerarea extends React.Component {
    render(h) {
        function Linkarr() {
            return ['/', '/routea', '/routeb'].map((item) => {
                return <li key={item}><Link to={item}>{item}</Link></li>
            })
        }
        return (
            <div>
                <Router>
                    <ul>
                        <Linkarr />
                    </ul>
                    <Scrolltop>
                        <Route exact path="/" component={routeindex} />
                        <Route path="/routea" component={Routea} />
                        <Route path="/routeb" component={Routeb} />
                        <Route component={NoMatch} />
                    </Scrolltop>
                </Router>
            </div>
        )
    }
}

export default Routerarea;
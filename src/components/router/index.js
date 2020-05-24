import React from 'react';
import { BrowserRouter as Router, HashRouter, hashHistory, Route, Link, IndexRoute, Switch, useHistory  } from 'react-router-dom'
import { createBrowserHistory } from "history";
const customHistory = createBrowserHistory();


// console.log(React);
function Routea(props) {
    function historyJump(){
        props.history.push({
            pathname : '/routeb',
            state : {
                b:1
            }
        })
    }
    return (
        <div>
            <p>this is RouteA</p>
            <a href="javascript:;" onClick={historyJump}>use this.props.history跳转</a>
        </div>
    )
}

function RoutebChild({ match,history,location }) {
    return <p>嵌套路由（nesting）：this is route b children : {match.params.id}</p>
}

function Routeb({ match ,history,location}) {
    console.log(history,location);
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

function routeindex() {
    return <p>this is route Index</p>
}


function HistoryRouter() {
    let history = useHistory();

  function handleClick() {
    history.push({
        pathname: '/routea',
        search :'?a=1',
        state : {
            name : 2
        }
    });
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}



class Routerarea extends React.Component {
    
   
    render(h) {
        console.log(this.props.history);

        let Linkarr = ['/', '/routea', '/routeb'].map((item) => {
            if (item === '/routea') {
                item = {
                    pathname: '/routea',
                    state: { name: 1 }
                }
            }
            let label = typeof item === 'object' ? item.pathname : item
            return <li key={label}><Link to={item}>{label}</Link></li>
        })

        return (
            <div>
                <h1>Router</h1>
                <HashRouter history={customHistory} >
                    <ul>
                        {Linkarr}
                    </ul>
                    <HistoryRouter />
                    <Switch>
                        <Route exact path="/" component={routeindex} />
                        <Route path="/routea" component={Routea} />
                        <Route path="/routeb" component={Routeb} />
                        <Route component={NoMatch} />
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

export default Routerarea;
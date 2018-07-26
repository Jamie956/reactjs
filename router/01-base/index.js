import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Route,
  Link,
  withRouter,
  Prompt,
  Switch,
  Redirect
} from "react-router-dom";

//simple
const App1 = () => (
  <BrowserRouter>
    <div>
      <Link to="/">Home</Link> |
      <Link to="/about">About</Link>
      <hr />
      <Route exact path="/" component={() => <div>Home</div>} />
      <Route path="/about" component={() => <div>About</div>} />
    </div>
  </BrowserRouter>
);

//路由渲染
const App10 = () => (
  <BrowserRouter>
    <Route exact path="/" render={() => <h3>halo</h3>} />
  </BrowserRouter>
);

//获取父路由信息
const Topics = props => {
  console.log(props);
  return <div>halo</div>;
};
const App2 = () => (
  <BrowserRouter>
    <div>
      <Link to="/topics">topics</Link>
      <hr />
      <Route path="/topics" component={Topics} />
    </div>
  </BrowserRouter>
);

//路由参数匹配
const Home = ({ match }) => {
  console.log(match);
  return <div />;
};

const App3 = () => (
  <BrowserRouter>
    <div>
      <Link to="/123">Item</Link> |
      <Link to="/item/asc">asc</Link> |
      <Link to="/item/desc">desc</Link>
      <hr />
      <Route exact path="/:id" component={Home} />
      <Route exact path="/item/:dir(asc|desc)" component={Home} />
    </div>
  </BrowserRouter>
);

//withRouter
const About = withRouter(props => {
  console.log(props);
  const { history } = props;
  return <button onClick={() => history.push("/about")}>about</button>;
});

const App4 = () => (
  <BrowserRouter>
    <About />
  </BrowserRouter>
);

//custom route
const Protected = () => <h3>Protected</h3>;
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} />} />
);

const App5 = () => (
  <BrowserRouter>
    <div>
      <Link to="/protected">Protected Page</Link>
      <PrivateRoute path="/protected" component={Protected} />
    </div>
  </BrowserRouter>
);

//custom link
const App6 = () => (
  <BrowserRouter>
    <div>
      <MyLink to="/" label="Home" />
      <MyLink to="/about" label="About" />
      <hr />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  </BrowserRouter>
);

const MyLink = ({ label, to }) => <Link to={to}>{label}</Link>;

//not match
const App8 = () => (
  <BrowserRouter>
    <div>
      <Link to="/">Home1</Link> |
      <Link to="/old-match">Old Match, to be redirected</Link> |
      <Link to="/will-match">Will Match</Link> |
      <Link to="/will-not-match">Will Not Match</Link> |
      <Link to="/also/will/not/match">Also Will Not Match</Link>
      <hr />
      <Switch>
        <Route path="/" exact component={Home1} />
        <Redirect from="/old-match" to="/will-match" />
        <Route path="/will-match" component={WillMatch} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </BrowserRouter>
);

const Home1 = () => <h1>Home1</h1>;
const WillMatch = () => <h1>WillMatch</h1>;
const NoMatch = ({ location }) => (
  <h3>
    No match for <code>{location.pathname}</code>
  </h3>
);

//config
const routes1 = [
  {
    path: "/",
    exact: true,
    main: () => <h2>Home</h2>
  },
  {
    path: "/bubblegum",
    main: () => <h2>Bubblegum</h2>
  },
  {
    path: "/shoelaces",
    main: () => <h2>Shoelaces</h2>
  }
];

const App9 = () => (
  <BrowserRouter>
    <div>
      <Link to="/">Home</Link> |
      <Link to="/bubblegum">Bubblegum</Link> |
      <Link to="/shoelaces">Shoelaces</Link>
      <hr />
      {routes1.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      ))}
    </div>
  </BrowserRouter>
);

//config
const Main = () => <h2>Main</h2>;
const Sandwiches = () => <h2>Sandwiches</h2>;
const Bus = () => <h3>Bus</h3>;
const Cart = () => <h3>Cart</h3>;

const Tacos = ({ routes }) => (
  <div>
    <Link to="/tacos/bus">Bus</Link> |
    <Link to="/tacos/cart">Cart</Link>
    {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
  </div>
);

const routes = [
  {
    path: "/sandwiches",
    component: Sandwiches
  },
  {
    path: "/tacos",
    component: Tacos,
    routes: [
      {
        path: "/tacos/bus",
        component: Bus
      },
      {
        path: "/tacos/cart",
        component: Cart
      }
    ]
  }
];

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => <route.component {...props} routes={route.routes} />}
  />
);

const App7 = () => (
  <BrowserRouter>
    <div>
      <Link to="/tacos">Tacos</Link> |
      <Link to="/sandwiches">Sandwiches</Link>
      {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    </div>
  </BrowserRouter>
);

ReactDOM.render(<App4 />, document.getElementById("root"));

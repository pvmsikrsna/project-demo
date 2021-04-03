import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {createBrowserHistory} from "history";

const browserHistory = createBrowserHistory();

ReactDOM.render(
    <BrowserRouter history={browserHistory}>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);

serviceWorker.unregister();
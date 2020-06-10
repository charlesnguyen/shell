import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import * as singleSpa from 'single-spa'
import { Provider, useDispatch } from 'react-redux'
import { Router, Link } from 'react-router-dom'
//import appConfig from 'appConfig' // retrieve data from PHP using webpack's externals => appConfig = window.appConfig
import createSagaMiddleware from 'redux-saga'
import { compose, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'

import * as isActive from './activityFns.js'
import configureStore from './reducer'
import { updateTokenAction } from './config.reducer'

window.SystemJS = window.System
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const sagaMiddleware = createSagaMiddleware()
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))
export const store = configureStore(enhancer)
const history = createBrowserHistory()
console.log(process.env.PUBLIC_URL)
fetch(process.env.PUBLIC_URL + '/config.json') // eslint-disable-line
  .then((res) => res.json())
  .then(({ availableApps }) => {
    console.log(availableApps)
    const App = () => {
      const dispatch = useDispatch()

      useEffect(() => {
        //dispatch(updateTokenAction(appConfig.token)) // update token
        dispatch(updateTokenAction('ibanfirst'))
      }, [dispatch])

      return (
        <>
          <nav id="nav">
            <div className="row">
              {availableApps.map(({ name, link }, index) => (
                <div key={`app_${index}`}>
                  <Link to={link} className="nav-link">
                    {name}
                  </Link>
                </div>
              ))}
            </div>
          </nav>
          <div id="content" />
        </>
      )
    }

    ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <App availableApps={availableApps} />
        </Router>
      </Provider>,

      document.getElementById('root')
    )

    availableApps.forEach((app) =>
      singleSpa.registerApplication(
        app.name,
        () => SystemJS.import(app.path), // eslint-disable-line
        isActive[app.name],
        { store, sagaMiddleware }
      )
    )

    singleSpa.start()
  })

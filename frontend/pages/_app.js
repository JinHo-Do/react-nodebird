import PropTypes from 'prop-types';
import Head from 'next/head';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducers';

import Layout from '../components/Layout';

const App = ({ Component, store }) => (
  <Provider store={store}>
    <Head>
      <title>NodeBird</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.2/antd.css"
      />
    </Head>

    <Layout>
      <Component />
    </Layout>
  </Provider>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object,
};

export default withRedux((initialState, options) => {
  const middlewares = [];
  const enhancer = compose(
    applyMiddleware(...middlewares),
    !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
      window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
  );
  const store = createStore(reducer, initialState, enhancer);
  return store;
})(App);

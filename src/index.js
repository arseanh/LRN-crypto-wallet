import React from 'react';
import Container from './Container';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './stores/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
};

export default App;

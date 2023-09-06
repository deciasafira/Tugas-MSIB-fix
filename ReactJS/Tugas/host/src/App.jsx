import React from 'react';
import Table from './Table';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

function App() {
  return (
    // <Provider store={store}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-4 rounded shadow">
          {/* <Table /> */}
        </div>
      </div>
    // </Provider>
  );
}

export default App;

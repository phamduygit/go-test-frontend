import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer'; // You'll create this file later

const store = configureStore({
  reducer: rootReducer,
});

export default store;
// import axios from 'axios';
import {
  FETCH_USER,
  DONE_LOADING
} from './types';

export const fetchUser = () => async (dispatch) => {
  // dispatch({ type: DONE_LOADING, payload: true });
  // try {
  //   const res = await axios.get('/api/current_user');
  //   dispatch({ type: FETCH_USER, payload: res.data });
  //   dispatch({ type: DONE_LOADING, payload: true });
  // } catch {
  //   dispatch({ type: FETCH_USER, payload: false });
  //   dispatch({ type: DONE_LOADING, payload: true });
  // }

  dispatch({ type: FETCH_USER, payload: true });
  dispatch({ type: DONE_LOADING, payload: true });
};
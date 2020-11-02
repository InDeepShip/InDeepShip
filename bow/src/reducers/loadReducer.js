import { DONE_LOADING} from '../actions/types';

// Full loading done : 0
// Full loading not done : 1
// Partial loading done : 0
// Partial loading not done : 2

export default function (state = null, action) {
  switch (action.type) {
    case DONE_LOADING:
      return action.payload ? 0 : 1;
    default:
      return state;
  }
}

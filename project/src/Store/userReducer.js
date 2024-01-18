import * as actiontype from './actions';

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actiontype.LOG_IN:
      return { ...state, user: action.user };
    case actiontype.LOG_OUT:
      return { ...state, user: null };
 default: return { ...state }; 
  }
};

export default userReducer;
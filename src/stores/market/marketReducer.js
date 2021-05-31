import * as marketActionType from './marketAction';

const initiaState = {
  myHoldings: [],
  coins: [],
  error: null,
  loading: false,
};

const marketReducer = (state = initiaState, action) => {
  switch (action.type) {
    case marketActionType.GET_HOLDINGS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case marketActionType.GET_HOLDINGS_SUCCESS:
      return {
        ...state,
        myHoldings: action.payload.myHoldings,
      };
    case marketActionType.GET_HOLDINGS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case marketActionType.GET_COIN_MARKET_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case marketActionType.GET_COIN_MARKET_SUCCESS:
      return {
        ...state,
        coins: action.payload.coins,
      };
    case marketActionType.GET_COIN_MARKET_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default marketReducer;

import createDataContext from './createDataContext';
import ApiConnect from '../api/ApiConnect';
const URL = 'http://192.168.4.1';

const EspReducer = (state, action) => {
  switch (action.type) {
    case 'Auto_Irrigate_SetUp':
      return { ...state, Data: action.payload };
    default:
      return state;
  }
};


const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}


const autoIrrigateStateSetUp = (dispatch) => async ({ id }) => {

  console.log(id)
  const response = await ApiConnect.post(`${URL}/autoIrrigateStateSetUp`, {
    id,
  });
  dispatch({ type: 'Auto_Irrigate_SetUp', payload: response.data });
};



export const { Provider, Context } = createDataContext(
  EspReducer,
  {
    autoIrrigateStateSetUp,
  },
  []
);

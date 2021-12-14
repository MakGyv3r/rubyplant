import createDataContext from './createDataContext';
import ApiConnect from '../api/ApiConnect';
const URL = '/api/v1/plantProduct';

const ProductDetailReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_data_list':
      return action.payload;
    case 'fetch_data':
      return action.payload;
    case 'fetch_data_new':
      return { ...state, Data: action.payload };
    case 'Motor_State':
      return action.payload;
    case 'UpdataResults':
      return action.payload;
    case 'Auto_Watering':
      return action.payload;
    case 'Send_CatNumber':
      return action.payload;
    default:
      return state;
  }
};



const fetchUserProducts = (dispatch) => async () => {
  const response = await ApiConnect.get(`${URL}/getUserPlantProducts`);
  dispatch({ type: 'fetch_data_list', payload: response.data });
};

const fetchOnePlantProduct = (dispatch) => async (id) => {
  const response = await ApiConnect.put(`${URL}/getOnePlantProduct`,
    { id },
  );
  dispatch({ type: 'fetch_data', payload: response.data });
};

const fetchDataPlantProduct = (dispatch) => async (id) => {
  const response = await ApiConnect.put(`${URL}/getPlantProductData`,
    { id },
  );
  dispatch({ type: 'fetch_data_new', payload: response.data });
};

const fetchDataPlantProductsUpdates = (dispatch) => async (id) => {
  const response = await ApiConnect.get(`${URL}/getUserPlantProductsUpdates`,
    { id },
  );
  dispatch({ type: 'fetch_data_new', payload: response.data });
};

const UpdataResults = (dispatch) => async () => {
  const response = await ApiConnect.get(`${URL}/UpdataResults`);
  console.log('UpdataResults');
  dispatch({ type: 'UpdataResults', payload: response.data });
};

const addMotorStateApp = (dispatch) => async (id, stateMotor) => {
  const response = await ApiConnect.put(`${URL}/motorstateapp`);
  dispatch({ type: 'Motor_State', payload: response.data });
};

const changeAutoWatering = (dispatch) => async (stateAutoWatering) => {
  console.log(stateAutoWatering);
  const response = await ApiConnect.put(`${URL}/changeAutoWatering`, {
    stateAutoWatering,
  });
  dispatch({ type: 'Auto_Watering', payload: response.data });
};

const addPlantProductToHub = (dispatch) => async (productCatNumber) => {
  dispatch({ type: 'Send_CatNumber', payload: productCatNumber });
};

export const { Provider, Context } = createDataContext(
  ProductDetailReducer,
  {
    fetchDataPlantProduct,
    fetchDataPlantProductsUpdates,
    fetchUserProducts,
    fetchOnePlantProduct,
    UpdataResults,
    addMotorStateApp,
    changeAutoWatering,
    addPlantProductToHub,
  },
  []
);

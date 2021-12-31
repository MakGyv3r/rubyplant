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
    case 'Auto_Irrigate_SetUp':
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

const autoIrrigateStateSetUp = (dispatch) => async ({ id, humLowLevel, humHighLevel, waterPumpOnTimeLow, waterPumpOnTimeMid, waterPumpOnTimeHigh }) => {
  humLowLevel = Math.round(4095 - humLowLevel * 4095 / 100);
  humHighLevel = Math.round(4095 - humHighLevel * 4095 / 100);
  waterPumpOnTimeLow = Math.round(waterPumpOnTimeLow * 60000 / 450);
  waterPumpOnTimeMid = Math.round(waterPumpOnTimeMid * 60000 / 450);
  waterPumpOnTimeHigh = Math.round(waterPumpOnTimeHigh * 60000 / 450);
  console.log(id)
  const response = await ApiConnect.post(`${URL}/autoIrrigateStateSetUp`, {
    id,
    humLowLevel,
    humHighLevel,
    waterPumpOnTimeLow,
    waterPumpOnTimeMid,
    waterPumpOnTimeHigh
  });
  dispatch({ type: 'Auto_Irrigate_SetUp', payload: response.data });
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
    autoIrrigateStateSetUp,
    UpdataResults,
    addMotorStateApp,
    changeAutoWatering,
    addPlantProductToHub,
  },
  []
);

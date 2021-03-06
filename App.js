import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { setNavigator } from './src/navigationRef';
import AccountScreen from './src/screens/accountscreen/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import ProductDetailScreen from './src/screens/detailscreen/ProductDetailScreen';
import ChartScreen from './src/screens/detailscreen/components/ChartScreen';
import ControlIrgationScreen from './src/screens/controlWater/controlIrgationScreen';
import ProductListScreen from './src/screens/ProductListScreen/ProductListScreen';
import HubConnectScreen from './src/screens/HubConnectScreen/HubConnectScreen';
import LocationServicesScreen from './src/screens/LocationServicesScreen/LocationServicesScreen';
import AddProductScreen from './src/screens/AddProductScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as ProductProvider } from './src/context/ProductDetailContext';
import { FontAwesome } from '@expo/vector-icons';

const PlnatListFlow = createStackNavigator({
  ProductList: ProductListScreen,
  ProductDetail: ProductDetailScreen,
  Chart: ChartScreen,
  ControlIrgation: ControlIrgationScreen,
});
PlnatListFlow.navigationOptions = {
  title: 'ProductList',
  tabBatIcone: <FontAwesome name="th-list" size={20} />,
};
const AccountScreenFlow = createStackNavigator({
  Account: AccountScreen,
  HubConnectScreen: HubConnectScreen,
  LocationServices: LocationServicesScreen,
});
AccountScreenFlow.navigationOptions = {
  title: 'AccountScreen',
  tabBatIcone: <FontAwesome name="th-list" size={20} />,
};
const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator({
    PlnatListFlow: PlnatListFlow,
    AddProduct: AddProductScreen,
    AccountScreenFlow: AccountScreenFlow,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (

    <ProductProvider>
      <AuthProvider>
        <App
          ref={(navigator) => {
            setNavigator(navigator);
          }}
        />
      </AuthProvider>
    </ProductProvider>

  );
};

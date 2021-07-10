import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';
import AuthFrom from '../components/AuthForm';
import NevLink from '../components/NevLink';

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthFrom
        headerText="Sign up for PlantProduct"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup} /*{({email, password})=> signup({email,password})}*/
      />
      <NevLink
        routeName="Signin"
        text="Already have an account? Sign in instead"
      />
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 100,
  },
});

export default SignupScreen;

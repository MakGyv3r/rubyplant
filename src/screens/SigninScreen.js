import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';
import AuthFrom from '../components/AuthForm';
import NevLink from '../components/NevLink';

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(Context);

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillBlur={clearErrorMessage} //{() => {clearErrorMessage}
      />
      <AuthFrom
        headerText="Sign in to your Account"
        errorMessage={state.errorMessage}
        submitButtonText="Sign In"
        onSubmit={signin} /*{({email, password})=> signup({email,password})}*/
      />
      <NevLink
        routeName="Signup"
        text="Dount have an account? Sign up instead"
      />
    </View>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 150,
  },
});

export default SigninScreen;

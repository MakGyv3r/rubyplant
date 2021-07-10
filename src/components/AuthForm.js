import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Input,} from 'react-native-elements';
import Spacer from './Spacer';

const AuthFrom = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hubCatNumber, setHubCatNumber] = useState('');
  return (
    <>
      <Spacer>
        <Text h3> {headerText}</Text>
      </Spacer>

      <Input
        //label="Email"
        value={email}
        placeholder="Email"
        onChangeText={setEmail /*newEmail=>setEmail(newEmail)*/}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />
      <Input
        secureTextEntry
        //label="Password"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />

      {submitButtonText === 'Sign Up' ? (
        <Input
          //label="Hub Number"
          placeholder="Hub Number"
          value={hubCatNumber}
          onChangeText={setHubCatNumber}
          autoCapitalize="none"
          autoCorrect={false}
        />
      ) : null}
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        {submitButtonText === 'Sign Up' ? (
          <Button
            color="#00cc00"
            // style={styles.button}
            title={submitButtonText}
            onPress={() => onSubmit({ email, password, hubCatNumber })}
          />
        ) : (
          <Button
            titleStyle={{ color: 'pink' }}
            //style={styles.button}
            title={submitButtonText}
            color="red"
            onPress={() => onSubmit({ email, password })}
          />
        )}
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15,
  },
});

export default AuthFrom;

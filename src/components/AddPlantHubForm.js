import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Input,} from 'react-native-elements';
import Spacer from './Spacer';

const AddPlantHub = ({ headerText, errorMessage, onSubmit, submitButtonText ,onLoading}) => {
  const [hubCatNumber, setHubCatNumber] = useState('');
  const [productCatNumber, setProductCatNumber] = useState('');
  return (
    <>
      <Spacer>
        <Text h3> {headerText}</Text>
      </Spacer>

      {submitButtonText === 'Add Hub' ? (
        <Input
          //label="Hub Number"
          placeholder="Hub Number"
          value={hubCatNumber}
          onChangeText={setHubCatNumber}
          autoCapitalize="none"
          autoCorrect={false}
        />
      ) : null} 
      {submitButtonText === 'Add Plant' ? (
        <Input
          //label="Plant Number"
          placeholder="Plant Number"
          value={productCatNumber}
          onChangeText={setProductCatNumber}
          autoCapitalize="none"
          autoCorrect={false}
        />
      ): null} 

      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}

      <Spacer>
        {submitButtonText === 'Add Hub' ? (
          <Button
            color="#00cc00"
            // style={styles.button}
            title={submitButtonText}
            onPress={() => onSubmit({ hubCatNumber })}
          />
        ) : (
          <Button
            titleStyle={{ color: 'pink' }}
            //style={styles.button}
            title={submitButtonText}
            color="red"
            onPress={() => {onSubmit({ productCatNumber}),onLoading()}}
            
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

export default AddPlantHub;

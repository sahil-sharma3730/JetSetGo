import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import Images from '../constatns/Images';

const FloatingLabelInput = ({label, value, onChangeText, secureTextEntry}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const translateY = new Animated.Value(value ? -10 : 0);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const animateLabel = () => {
    Animated.timing(translateY, {
      toValue: isFocused || value ? -20 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };
  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.label, {transform: [{translateY}]}]}>
        {label}
      </Animated.Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          keyboardType={label === 'Contact' ? 'numeric' : null}
          maxLength={label === 'Contact' ? 10 : null}
          onChangeText={text => {
            onChangeText(text);
            animateLabel();
          }}
          onFocus={() => {
            handleFocus();
            animateLabel();
          }}
          onBlur={() => {
            handleBlur();
            animateLabel();
          }}
          secureTextEntry={!isPasswordVisible && secureTextEntry}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeIconContainer}
            onPress={togglePasswordVisibility}>
            <Image
              source={isPasswordVisible ? Images.eye_open : Images.eye_close}
              style={styles.localImage}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#999',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 5,
    color: '#000000',
  },
  eyeIconContainer: {
    padding: 10,
  },
});

export default FloatingLabelInput;

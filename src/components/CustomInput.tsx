import React from 'react';
import {Control, Controller, FieldError, FieldValues} from 'react-hook-form';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {CUSTOM_THEME} from '../util/CUSTOM_THEME';

interface CustomInputProps {
  control: Control<FieldValues> | undefined;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean | undefined;
  rules: Omit<any, any>;
  keyboardType?: KeyboardTypeOptions | undefined;
  onSubmitEdit?: () => void;
}

const getBorderColor = (error?: FieldError) =>
  error ? 'red' : CUSTOM_THEME.GREY_COLOR;

const CustomInput = ({
  control,
  name,
  placeholder,
  secureTextEntry,
  rules,
  keyboardType,
  onSubmitEdit,
}: CustomInputProps) => {
  return (
    <Controller
      control={control}
      rules={rules}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.inputContainer,
              {borderColor: getBorderColor(error)},
            ]}>
            <TextInput
              onSubmitEditing={onSubmitEdit}
              placeholderTextColor={CUSTOM_THEME.TEXT_COLOR}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
            />
          </View>
          {error && (
            <Text style={styles.messageText}>{error?.message || 'Error'}</Text>
          )}
        </>
      )}
      name={name}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: heightPercentageToDP(1.6),
    color: 'black',
  },
  messageText: {
    color: 'red',
    alignSelf: 'stretch',
    marginTop: 10,
  },
  inputContainer: {
    height: heightPercentageToDP(7),
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: CUSTOM_THEME.GREY_COLOR,

    paddingLeft: widthPercentageToDP(4),
    justifyContent: 'center',
  },
});

export default CustomInput;

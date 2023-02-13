import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import HorizontalLine from '../../components/HorizontalLine';
import {CUSTOM_THEME} from '../../util/CUSTOM_THEME';
import CustomInput from '../../components/CustomInput';
import {EMAIL_REGIX} from '../../util/CONSTANTS';
import PrimaryButton from '../../components/PrimaryButton';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {FieldValues, useForm} from 'react-hook-form';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigatorParamList} from '../../types/NavigationType';
import {LoginRequestModel} from '../../model/AuthModel';
import {useAppDispatch} from '../../redux/app/hooks';
import {loginAsyncThunk, saveUser} from '../../redux/app/features/AuthSlice';
import {setToken} from '../../util/AuthToken';
import AppLoader from '../../components/AppLoader';

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackNavigatorParamList>>();

  const dispatch = useAppDispatch();

  const {control, handleSubmit} = useForm<FieldValues>({
    defaultValues: {
      Email: __DEV__ ? 'William@yopmail.com' : '',
      Password: __DEV__ ? 'Abcd1234$' : '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: FieldValues) => {
    setIsLoading(true);
    const loginData: LoginRequestModel = {
      email: data.Email,
      password: data.Password,
    };

    dispatch(loginAsyncThunk(loginData))
      .unwrap()
      .then(response => {
        setIsLoading(false);
        setToken(response.token);
        dispatch(saveUser(response));
        navigation.navigate('HOMESCREEN');
      })
      .catch(e => {
        setIsLoading(false);
        Alert.alert('error', e);
      });
  };

  const signupButtonHandler = () => {
    navigation.navigate('SIGNUPSCREEN');
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <AppLoader />
      ) : (
        <>
          <View style={styles.headerContainer}>
            <HorizontalLine color={CUSTOM_THEME.GREY_COLOR} height={0.5} />
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.bodyFirstContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.emailText}>Email</Text>
                <CustomInput
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: EMAIL_REGIX,
                      message: 'Email is Not Valid',
                    },
                  }}
                  name={'Email'}
                  control={control}
                  placeholder={'example@gmail.com'}
                />
                <View style={styles.passwordContainer}>
                  <Text style={styles.passwordText}>Password</Text>
                </View>
                <CustomInput
                  secureTextEntry
                  rules={{
                    required: 'Password is required',
                  }}
                  name={'Password'}
                  control={control}
                  placeholder="Enter your password"
                />
              </View>
              <PrimaryButton onPress={handleSubmit(onSubmit)} text="Login" />
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>not have account?</Text>
                <TouchableOpacity onPress={signupButtonHandler}>
                  <Text style={styles.singupButtonText}>Signup</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: CUSTOM_THEME.BACKGROUND_COLOR,
    flex: 1,
  },
  inputContainer: {
    padding: heightPercentageToDP(4),
  },
  emailText: {
    color: 'black',
    marginBottom: 5,
    fontSize: heightPercentageToDP(2),
  },

  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 35,
  },
  passwordText: {
    color: 'black',
    marginBottom: 5,
    fontSize: heightPercentageToDP(2),
  },
  headerContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 7,
  },
  bodyFirstContainer: {
    flex: 1.2,
  },
  signupText: {
    color: 'black',
  },
  singupButtonText: {
    marginLeft: 5,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: heightPercentageToDP(7),
    marginLeft: heightPercentageToDP(4),
  },
});

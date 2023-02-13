import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import HorizontalLine from '../../components/HorizontalLine';
import {CUSTOM_THEME} from '../../util/CUSTOM_THEME';
import CustomInput from '../../components/CustomInput';
import {
  EMAIL_REGIX,
  ENGLISH_WORD_REGIX,
  PASSWORD_REGIX,
} from '../../util/CONSTANTS';
import PrimaryButton from '../../components/PrimaryButton';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {FieldValues, useForm} from 'react-hook-form';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigatorParamList} from '../../types/NavigationType';
import {RegisterRequestModel} from '../../model/AuthModel';
import {useAppDispatch} from '../../redux/app/hooks';
import {registerAsyncThunk, saveUser} from '../../redux/app/features/AuthSlice';
import {setToken} from '../../util/AuthToken';
import AppLoader from '../../components/AppLoader';

const SignupScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackNavigatorParamList>>();

  const {control, handleSubmit, watch} = useForm<FieldValues>({
    defaultValues: {
      Name: __DEV__ ? 'Williamson' : '',
      Email: __DEV__ ? 'William@yopmail.com' : '',
      Password: __DEV__ ? 'Abcd1234$' : '',
      ConfirmPassword: __DEV__ ? 'Abcd1234$' : '',
    },
  });
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: FieldValues) => {
    setIsLoading(true);
    const signupData: RegisterRequestModel = {
      email: data.Email,
      name: data.Name,
      password: data.Password,
    };
    dispatch(registerAsyncThunk(signupData))
      .unwrap()
      .then(response => {
        setIsLoading(false);
        setToken(response.token);
        dispatch(saveUser(response));
        navigation.navigate('HOMESCREEN');
      })
      .catch(e => {
        setIsLoading(false);
        Alert.alert('error', e.message);
      });

    // navigation.navigate('HOMESCREEN');
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
                <Text style={styles.inputText}>Name</Text>
                <CustomInput
                  rules={{
                    pattern: {
                      value: ENGLISH_WORD_REGIX,
                      message: 'Name should be only letters',
                    },
                    required: 'Name is required',
                  }}
                  name={'Name'}
                  control={control}
                  placeholder={'example@gmail.com'}
                />
                <Text style={styles.inputText}>Email</Text>
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
                <Text style={styles.inputText}>Password</Text>
                <CustomInput
                  secureTextEntry
                  rules={{
                    required: 'Password is required',
                    minLength: {
                      message: 'Password should be more than 8 characters',
                      value: 8,
                    },
                    pattern: {
                      value: PASSWORD_REGIX,
                      message:
                        'Password must contain atleast one uppercase,one lowercase,one numeric and one special character.',
                    },
                  }}
                  name={'Password'}
                  control={control}
                  placeholder="Enter your password"
                />
                <Text style={styles.inputText}>Confirm Password</Text>
                <CustomInput
                  secureTextEntry
                  rules={{
                    validate: (value: string) => {
                      if (watch('Password') !== value) {
                        return 'Password does not match';
                      }
                    },

                    required: 'Confirm Password is required',
                  }}
                  name={'ConfirmPassword'}
                  control={control}
                  placeholder="Confirm your password"
                />
              </View>
              <PrimaryButton onPress={handleSubmit(onSubmit)} text="Signup" />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: CUSTOM_THEME.BACKGROUND_COLOR,
    flex: 1,
  },
  inputContainer: {
    padding: heightPercentageToDP(4),
  },
  inputText: {
    color: 'black',
    marginVertical: 10,
    fontSize: heightPercentageToDP(2),
  },

  headerContainer: {
    flex: 0.1,
  },
  bodyContainer: {
    flex: 7,
  },
  bodyFirstContainer: {
    flex: 1.2,
  },
});

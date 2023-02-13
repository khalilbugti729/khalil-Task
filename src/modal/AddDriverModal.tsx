import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {CUSTOM_IMAGES} from '../util/CUSTOM_IMAGES';
import {CUSTOM_THEME} from '../util/CUSTOM_THEME';
import CustomInput from '../components/CustomInput';
import {ENGLISH_WORD_REGIX} from '../util/CONSTANTS';
import {FieldValues, useForm} from 'react-hook-form';
import DropDownInput from '../components/DropDownInput';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import PrimaryButton from '../components/PrimaryButton';
import {CreateAndUpdateDriverRequestModel} from '../model/DriverModel';
import {getToken} from '../util/AuthToken';
interface SorryModalProps {
  isVisible: boolean;
  closeButtonPressed: ((event: GestureResponderEvent) => void) | undefined;
  createHandler: (singleDriver: CreateAndUpdateDriverRequestModel) => void;
}

const AddDriverModal = ({
  closeButtonPressed,
  isVisible,
  createHandler,
}: SorryModalProps) => {
  const {control, handleSubmit} = useForm<FieldValues>({
    defaultValues: {
      Name: __DEV__ ? 'Williamson' : '',
      Age: __DEV__ ? '20' : '',
      PhoneNumber: __DEV__ ? '03028050375' : '',
    },
  });

  interface LicenceType {
    label: string;
    value: string;
  }

  const MyData: LicenceType[] = [
    {label: 'Two Wheeler', value: 'Two Wheeler'},
    {label: 'Four Wheeler', value: 'Four Wheeler'},
  ];

  const [dropDonwValue, setDropDownValue] = useState<string | undefined>(
    MyData[0].value,
  );

  const [date, setDate] = useState<Date>(new Date());

  const onSubmit = async (data: FieldValues) => {
    const licenseExpiry = formatDate(date);
    const token = await getToken();

    const createDriver: CreateAndUpdateDriverRequestModel = {
      age: data.Age,
      license_expiry: licenseExpiry,
      license_type: dropDonwValue,
      name: data.Name,
      phone: data.PhoneNumber,
      token: token,
    };
    createHandler(createDriver);
  };

  const formatDate = (myDate: Date) => {
    var d = new Date(myDate),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  };

  return (
    <Modal animationType="slide" visible={isVisible}>
      <View style={styles.container}>
        <TouchableOpacity onPress={closeButtonPressed}>
          <View style={styles.closeImageContainer}>
            <Image
              style={styles.closeImage}
              source={CUSTOM_IMAGES.CLOSEIMAGE}
            />
          </View>
        </TouchableOpacity>

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
          <Text style={styles.inputText}>Age</Text>
          <CustomInput
            rules={{
              required: 'Age is required',
            }}
            name={'Age'}
            control={control}
            placeholder={'Your age'}
          />
          <Text style={styles.inputText}>Phone</Text>
          <CustomInput
            rules={{
              required: 'Phone number is required',
            }}
            name={'PhoneNumber'}
            control={control}
            placeholder={'Your Phone Number'}
          />
          <Text style={styles.inputText}>License Type</Text>
          <DropDownInput
            getValue={value => setDropDownValue(value)}
            data={MyData}
          />
          <Text style={styles.inputText}>License Expire</Text>
          <View style={styles.licenseContainer}>
            <RNDateTimePicker
              onChange={(event, value) => {
                if (value) {
                  setDate(value);
                }
              }}
              value={date}
              mode="date"
            />
          </View>
        </View>
        <PrimaryButton onPress={handleSubmit(onSubmit)} text="Submit" />
      </View>
    </Modal>
  );
};

export default AddDriverModal;

const styles = StyleSheet.create({
  container: {
    paddingtop: 50,
    paddingBottom: heightPercentageToDP(5),
    backgroundColor: 'white',
    borderRadius: 7,
    height: '30%',
    marginTop: 60,
  },
  modalDropShadow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  titleText: {
    marginHorizontal: heightPercentageToDP(4),
    fontSize: heightPercentageToDP(3.3),
    color: CUSTOM_THEME.TEXT_COLOR,
    textAlign: 'center',
  },
  closeImage: {
    width: widthPercentageToDP(7),
    height: heightPercentageToDP(4),
    resizeMode: 'contain',
  },
  closeImageContainer: {
    marginTop: heightPercentageToDP(1),
    paddingHorizontal: heightPercentageToDP(1),
  },
  emailText: {
    color: 'black',
    marginBottom: 5,
    fontSize: heightPercentageToDP(2),
  },
  inputContainer: {
    padding: heightPercentageToDP(4),
  },
  inputText: {
    color: 'black',
    marginVertical: 10,
    fontSize: heightPercentageToDP(2),
  },
  licenseContainer: {
    backgroundColor: CUSTOM_THEME.GREY_COLOR,
    paddingVertical: heightPercentageToDP(1),
    borderRadius: 7,
    flexDirection: 'row',
  },
});

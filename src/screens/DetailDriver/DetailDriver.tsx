import {Alert, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackNavigatorParamList} from '../../types/NavigationType';
import {useAppDispatch} from '../../redux/app/hooks';
import {getToken} from '../../util/AuthToken';
import {DriverDetailAsyncThunk} from '../../redux/app/features/DriverSlice';
import AppLoader from '../../components/AppLoader';
import ListItem from '../../components/ListItem';
import {DriverResponseModel} from '../../model/DriverModel';

const DetailDriver = () => {
  type DetailDriverProps = RouteProp<
    RootStackNavigatorParamList,
    'DETAILDRIVERSCREEN'
  >;
  const route = useRoute<DetailDriverProps>();
  const userId = route.params.id;

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [driver, setDriver] = useState<DriverResponseModel>();

  const getDriverDetail = async () => {
    const token = await getToken();
    if (token) {
      dispatch(DriverDetailAsyncThunk({token: token, id: userId}))
        .unwrap()
        .then(response => {
          setIsLoading(false);
          console.log(' driver detail', response);
          setDriver(response);
        })
        .catch(e => {
          setIsLoading(false);
          console.log('7878', e);
          Alert.alert('error', e);
        });
    }
  };

  useEffect(() => {
    getDriverDetail();
  }, []);

  return (
    <View>
      {isLoading ? (
        <AppLoader />
      ) : (
        <>
          <ListItem text={driver?.name} />
          <ListItem text={driver?.age.toString()} />
          <ListItem text={driver?.gender} />
          <ListItem text={driver?.country} />
          <ListItem text={driver?.license_expiry} />
          <ListItem text={driver?.license_type} />
          <ListItem text={driver?.phone} />
        </>
      )}
    </View>
  );
};

export default DetailDriver;

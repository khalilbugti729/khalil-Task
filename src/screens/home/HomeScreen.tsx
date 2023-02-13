import {
  Alert,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import SingleDriver from '../../components/SingleDriver';
import FloatingButton from '../../components/FloatingButton';
import AddDriverModal from '../../modal/AddDriverModal';
import SelectModal from '../../modal/SelectModal';
import SelectButton from '../../components/SelectButton';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackNavigatorParamList} from '../../types/NavigationType';
import MoreButton from '../../components/MoreButton';
import {
  CreateAndUpdateDriverRequestModel,
  DeleteDriverRequestModel,
  DriverResponseModel,
} from '../../model/DriverModel';
import {
  CreateDriverAsyncThunk,
  DeleteDriverAsyncThunk,
  DriverAsyncThunk,
  EditDriverAsyncThunk,
} from '../../redux/app/features/DriverSlice';
import {useAppDispatch} from '../../redux/app/hooks';
import AppLoader from '../../components/AppLoader';
import {getToken} from '../../util/AuthToken';
import EditDriverModal from '../../modal/EditDriverModal';
import {deleteToken} from '../../redux/app/features/AuthSlice';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackNavigatorParamList>>();

  const [allDrivers, setAllDrivers] = useState<DriverResponseModel[]>();
  const [drivers, setDrivers] = useState<DriverResponseModel>();

  const myRender = (myData: ListRenderItemInfo<DriverResponseModel>) => {
    return (
      <SingleDriver
        data={myData.item}
        moreButtonPress={() => {
          setDrivers(myData.item);
          setIsSelectModal(true);
        }}
        onPress={() =>
          navigation.navigate('DETAILDRIVERSCREEN', {
            id: myData.item.id,
          })
        }
      />
    );
  };

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isSelectModal, setIsSelectModal] = useState(false);

  const getAllDriverData = async () => {
    const token = await getToken();
    if (token) {
      dispatch(DriverAsyncThunk({token: token}))
        .unwrap()
        .then(response => {
          setAllDrivers(response);

          console.log('all driver', response);
          setIsLoading(false);
          console.log('all drivers', allDrivers);
        })
        .catch(e => {
          setIsLoading(false);
          console.log('7878', e);
          Alert.alert('error', e);
        });
    }
  };

  useEffect(() => {
    console.log('called');
    getAllDriverData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isLogoutModal, setIsLogoutModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  const deletehandler = async () => {
    setIsLoading(true);
    const token = await getToken();

    const params: DeleteDriverRequestModel = {
      id: drivers?.id,
      token: token,
    };
    dispatch(DeleteDriverAsyncThunk(params))
      .unwrap()
      .then(response => {
        setIsLoading(false);
        setIsSelectModal(false);
        console.log('delete', response);
      })
      .catch(e => {
        setIsSelectModal(false);
        setIsLoading(false);
        console.log('7878', e);
        Alert.alert('error', e);
      });
  };
  const updateHandler = () => {
    setIsSelectModal(false);
    setIsEditModalOpen(true);
  };
  const moreHandler = () => {
    setIsLogoutModal(true);
  };

  const logoutUser = async () => {
    setIsLogoutModal(false);
    dispatch(deleteToken());
  };

  const createHandler = (createDriver: CreateAndUpdateDriverRequestModel) => {
    setIsOpenModal(false);
    setIsLoading(true);
    dispatch(CreateDriverAsyncThunk(createDriver))
      .unwrap()
      .then(response => {
        console.log('7878', response);
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        console.log('7878', e);
        Alert.alert('error', e);
      });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <MoreButton onPress={moreHandler} />,
    });
  });

  const editHandler = (editDriver: CreateAndUpdateDriverRequestModel) => {
    setIsOpenModal(false);
    setIsEditModalOpen(false);

    setIsLoading(true);
    dispatch(EditDriverAsyncThunk(editDriver))
      .unwrap()
      .then(response => {
        console.log('submit', response);
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        console.log('7878', e);
        Alert.alert('error', e);
      });
  };

  return (
    <View style={styles.root}>
      {isLoading ? (
        <AppLoader />
      ) : (
        <>
          <EditDriverModal
            paramData={drivers}
            isVisible={isEditModalOpen}
            closeButtonPressed={() => setIsEditModalOpen(false)}
            editHandler={editHandler}
          />
          <AddDriverModal
            isVisible={isOpenModal}
            closeButtonPressed={() => setIsOpenModal(false)}
            createHandler={createHandler}
          />
          <SelectModal
            isVisible={isSelectModal}
            closeButtonPressed={() => setIsSelectModal(false)}>
            <SelectButton text="Delete this item" onPress={deletehandler} />
            <SelectButton text="Update this item" onPress={updateHandler} />
          </SelectModal>
          <SelectModal
            isVisible={isLogoutModal}
            closeButtonPressed={() => setIsLogoutModal(false)}>
            <SelectButton text="Logout this user" onPress={logoutUser} />
          </SelectModal>
          <FlatList
            columnWrapperStyle={styles.flatListStyle}
            horizontal={false}
            numColumns={2}
            data={allDrivers}
            renderItem={myRender}
            keyExtractor={item => item.id}
          />
          <FloatingButton onPress={() => setIsOpenModal(true)} />
        </>
      )}
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flatListStyle: {
    justifyContent: 'space-between',
    marginHorizontal: heightPercentageToDP(1.5),
  },
  moreImage: {
    height: heightPercentageToDP(5),
    width: widthPercentageToDP(5),
    resizeMode: 'contain',
  },
});

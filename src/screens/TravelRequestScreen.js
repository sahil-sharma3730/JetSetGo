import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import FloatingLabelInput from '../component/FloatingLabelInput';
import Images from '../constatns/Images';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Colors from '../constatns/Colors';

const TravelRequestScreen = ({navigation}) => {
  const [from, setFrom] = useState('Mumbai');
  const [to, setTo] = useState('Chennai');
  const [departure, setDeparture] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());

  const [deptDatePicker, setDeptDatePicker] = useState(false);
  const [returnDatePicker, setReturnDatePicker] = useState(false);

  const handleDeptDate = (event, selectedDate) => {
    const currentDate = selectedDate || departure;
    setDeptDatePicker(false);
    setDeparture(currentDate);
  };

  const handleReturnDate = (event, selectedDate) => {
    const currentDate = selectedDate || returnDate;
    setReturnDatePicker(false);
    setReturnDate(currentDate);
  };

  const handleSearch = () => {
    if (!from || !to || !departure || !returnDate) {
      Alert.alert('Please fill in all fields');
      return;
    }
    navigation.navigate('FlightResultsScreen', {
      from,
      to,
      departure,
      returnDate,
    });
  };

  return (
    <>
      <SafeAreaView style={styles.main} />
      <View style={styles.imageView}>
        <View style={styles.imageSubview}>
          <View style={styles.titleView}>
            <Image source={Images.airplane} style={styles.localImage} />
            <Text style={styles.titleText}>
              JetSetGo, simplifying flight bookings
            </Text>
          </View>
        </View>
        <View style={styles.mainView}>
          <View style={styles.inputMainView}>
            <View style={styles.departure}>
              <View style={styles.departureSub}>
                <Text style={styles.depRettext}>Departure</Text>
                {Platform.OS === 'android' && (
                  <TouchableOpacity onPress={() => setDeptDatePicker(true)}>
                    <TextInput
                      placeholder="Select dept date"
                      editable={false}
                      pointerEvents="none"
                      placeholderTextColor={'#888881'}
                      style={styles.inputStyle}
                      value={moment(departure).format('YYYY-MM-DD')}
                    />
                  </TouchableOpacity>
                )}

                {Platform.OS === 'android' ? (
                  deptDatePicker && (
                    <DateTimePicker
                      testID="datePicker"
                      value={departure}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      minimumDate={new Date()}
                      onChange={handleDeptDate}
                    />
                  )
                ) : (
                  <DateTimePicker
                    testID="datePicker"
                    value={departure}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    minimumDate={new Date()}
                    onChange={handleDeptDate}
                  />
                )}
              </View>
              <View>
                <Text style={styles.depRettext}>Return</Text>
                {Platform.OS === 'android' && (
                  <TouchableOpacity onPress={() => setReturnDatePicker(true)}>
                    <TextInput
                      placeholder="Select return date"
                      editable={false}
                      pointerEvents="none"
                      placeholderTextColor={'#888881'}
                      style={{
                        color: '#888888',
                        textAlign: 'center',
                        borderWidth: 0.5,
                        borderRadius: 10,
                      }}
                      value={moment(returnDate).format('YYYY-MM-DD')}
                    />
                  </TouchableOpacity>
                )}

                {Platform.OS === 'android' ? (
                  returnDatePicker && (
                    <DateTimePicker
                      testID="datePicker"
                      value={returnDate}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      minimumDate={new Date()}
                      onChange={handleReturnDate}
                    />
                  )
                ) : (
                  <DateTimePicker
                    testID="datePicker"
                    value={returnDate}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    minimumDate={new Date()}
                    onChange={handleReturnDate}
                  />
                )}
              </View>
            </View>
            <FloatingLabelInput
              label="From"
              value={from}
              onChangeText={setFrom}
              secureTextEntry={false}
            />
            <FloatingLabelInput
              label="To"
              value={to}
              onChangeText={setTo}
              secureTextEntry={false}
            />

            <TouchableOpacity
              style={styles.buttonView}
              onPress={() => handleSearch()}>
              <Text style={styles.buttonText}>Search Flights</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  localImage: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
  main: {
    flexDirection: 'column',
    backgroundColor: Colors.Primary,
  },
  imageView: {
    flex: 1,
    backgroundColor: Colors.Primary,
  },
  imageSubview: {
    flex: 0.6,
    backgroundColor: Colors.Primary,
    paddingHorizontal: '10%',
  },
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-4%',
  },
  departure: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  departureSub: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    flex: 0.7,
    backgroundColor: Colors.dullWhite,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  titleText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
  },
  inputMainView: {
    marginHorizontal: '8%',
    backgroundColor: Colors.White,
    borderRadius: 25,
    marginTop: '-10%',
    padding: '5%',
  },
  buttonView: {
    backgroundColor: Colors.Orange,
    padding: '5%',
    borderRadius: 10,
    marginVertical: '5%',
  },
  depRettext: {
    textAlign: 'center',
    color: '#999',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  inputStyle: {
    color: Colors.Grey,
    textAlign: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
  },
});

export default TravelRequestScreen;

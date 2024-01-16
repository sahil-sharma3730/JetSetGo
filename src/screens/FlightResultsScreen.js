import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import Header from '../component/Header';
import moment from 'moment';
import Colors from '../constatns/Colors';
import Loader from '../component/Loader';

const FlightResultsScreen = ({route}) => {
  const {from, to, departure, returnDate} = route.params;
  console.log('routeparams', route?.params);
  const [flightResults, setFlightResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [sortType, setSortType] = useState('none');
  const [selectedAirline, setSelectedAirline] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.npoint.io/4829d4ab0e96bfab50e7',
        );
        const data = await response.json();
        const allResults = data?.data?.result;
        const filtered = allResults.filter(result => {
          return (
            result?.displayData?.source?.airport?.cityName === from &&
            result?.displayData?.destination?.airport?.cityName === to
          );
        });
        setFlightResults(allResults);
        setFilteredResults(filtered);
        setLoader(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoader(false);
      }
    };

    fetchData();
  }, [from, to, departure, returnDate]);

  const handleSort = type => {
    let sortedResults = [...filteredResults];
    if (type === 'airlines') {
      sortedResults.sort((a, b) =>
        a.displayData.airlines[0].airlineName.localeCompare(
          b.displayData.airlines[0].airlineName,
        ),
      );
    } else if (type === 'price') {
      sortedResults.sort((a, b) => a.fare - b.fare);
    } else {
      sortedResults = [...flightResults];
    }
    setSortType(type);
    setFilteredResults(sortedResults);
  };

  const filterByAirlines = airlineName => {
    const filtered = flightResults.filter(flight =>
      flight.displayData.airlines.some(
        airline => airline.airlineName === airlineName,
      ),
    );
    setFilteredResults(filtered);
    setSortType('none');
  };

  const getAirlineDropdownItems = () => {
    const airlines = [
      ...new Set(
        flightResults.flatMap(flight =>
          flight.displayData.airlines.map(airline => airline.airlineName),
        ),
      ),
    ];
    return airlines.map(airline => ({label: airline, value: airline}));
  };

  const renderItem = ({item}) => {
    const {fare, displayData} = item;
    const {airlines, source, destination} = displayData;
    const {airport: sourceAirport} = source;
    const {airport: destinationAirport} = destination;
    const departTime = moment(displayData?.source?.depTime).format('HH:mm:a');
    const arrivalTime = moment(displayData?.destination?.arrTime).format(
      'HH:mm:a',
    );

    return (
      <View style={styles.card}>
        <View style={styles.cardSubview}>
          <View style={styles.cardleft}>
            <Text style={styles.cardtext}>{sourceAirport.cityName}</Text>
          </View>

          <View style={styles.totalTime}>
            <Text style={styles.cardtext}>
              {airlines.map(airline => airline.airlineName).join(', ')}
            </Text>
          </View>
          <View style={styles.cardRight}>
            <Text style={styles.cardtext}>{destinationAirport.cityName}</Text>
          </View>
        </View>

        <View style={styles.departview}>
          <View style={styles.cardleft}>
            <Text style={styles.grey}>Depart</Text>
            <Text style={styles.cardtext}>{departTime}</Text>
          </View>

          <View style={styles.totalTime}>
            <Text style={styles.totaltext}>{displayData?.totalDuration}</Text>
          </View>
          <View style={styles.cardRight}>
            <Text style={styles.grey}>Arrive</Text>
            <Text style={styles.cardtext}>{arrivalTime}</Text>
          </View>
        </View>

        <View style={styles.fareView}>
          <View>
            <Text style={styles.cardtext}>${fare}</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleBooking(item)}
            style={styles.bookButton}>
            <Text style={{color: Colors.White}}>Book Flight</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleBooking = selectedFlight => {
    console.log('Booking selected flight:', selectedFlight);
  };

  return (
    <>
      <SafeAreaView style={styles.upperSafeView} />
      <View style={styles.main}>
        <View style={styles.headerView}>
          <Header title={'Search Result'} arrow />
        </View>
        <View style={styles.filterView}>
          <View style={styles.filterSubview}>
            <View>
              <Text style={{fontSize: 18}}>Filter:</Text>
            </View>
            <View style={styles.PriceView}>
              <RNPickerSelect
                onValueChange={value => {
                  setSelectedAirline(value);
                  filterByAirlines(value);
                }}
                items={getAirlineDropdownItems()}
                placeholder={{
                  label: 'Select an airline',
                  value: null,
                }}
                value={selectedAirline}
                style={{
                  inputIOS: styles.inputIOS,
                  inputAndroid: styles.inputAndroid,
                  dropdownAndroid: styles.dropdownAndroid,
                  iconContainer: null,
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.PriceView}
              onPress={() => handleSort('price')}>
              <Text>Sort by Price</Text>
            </TouchableOpacity>
          </View>

          {filteredResults.length > 0 ? (
            <FlatList
              data={filteredResults}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              style={styles.listContainer}
            />
          ) : (
            <Text style={{textAlign: 'center'}}>No flights available</Text>
          )}
        </View>
      </View>
      <Loader loading={loader} />
      <SafeAreaView style={styles.lowerSafeView} />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dullWhite,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  card: {
    borderRadius: 10,
    marginVertical: 10,
    padding: 20,
    backgroundColor: Colors.White,
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 30,
  },
  upperSafeView: {
    flexDirection: 'column',
    backgroundColor: Colors.Primary,
  },
  main: {
    flex: 1,
    backgroundColor: Colors.Primary,
  },
  headerView: {
    flex: 0.1,
    backgroundColor: Colors.Primary,
  },
  filterView: {
    flex: 0.9,
    backgroundColor: Colors.dullWhite,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  filterSubview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: '5%',
  },
  PriceView: {
    borderWidth: 0.2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  lowerSafeView: {
    flexDirection: 'column',
    backgroundColor: Colors.White,
  },
  cardSubview: {
    flexDirection: 'row',
  },
  cardleft: {
    flex: 0.33,
  },
  totalTime: {
    flex: 0.33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardtext: {
    color: Colors.Primary,
    fontSize: 18,
    fontWeight: '700',
  },
  cardRight: {
    flex: 0.33,
    alignItems: 'flex-end',
  },
  departview: {
    flexDirection: 'row',
    marginVertical: '7%',
  },
  totaltext: {
    color: Colors.Primary,
    fontSize: 14,
    fontWeight: '500',
  },
  bookButton: {
    backgroundColor: Colors.Orange,
    alignSelf: 'center',
    paddingHorizontal: '8%',
    paddingVertical: '3%',
    borderRadius: 10,
  },
  grey: {
    color: Colors.Grey,
  },
  fareView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 10,
    borderColor: Colors.Grey,
    borderRadius: 4,
    color: Colors.Black,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: '20%',
    borderColor: Colors.Primary,
    borderRadius: 8,
    color: Colors.Black,
    marginVertical: -15,
  },
});

export default FlightResultsScreen;

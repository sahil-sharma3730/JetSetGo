import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Images from '../constatns/Images';
import {useNavigation} from '@react-navigation/native';
import Colors from '../constatns/Colors';

const Header = ({title, arrow}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={styles.leftArrow}
        onPress={() => navigation.goBack()}>
        <Text style={{color: 'white', fontSize: 20}}>{'<'}</Text>
      </TouchableOpacity>

      <View style={styles.titleView}>
        {title ? <Text style={styles.order}>{title}</Text> : null}
      </View>
      <View style={{flex: 0.2}} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: '2%',
    paddingHorizontal: '8%',
  },
  leftArrow: {
    flex: 0.2,
  },

  titleView: {
    flex: 0.6,
    alignItems: 'center',
  },
  order: {
    fontSize: 25,
    color: Colors.White,
  },
});

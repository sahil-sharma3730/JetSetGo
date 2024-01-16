import React, {useState} from 'react';
import {View, Text, Modal, ActivityIndicator, StyleSheet} from 'react-native';
import Colors from '../constatns/Colors';

const Loader = ({loading}) => {
  return (
    <Modal transparent animationType="fade" visible={loading}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ActivityIndicator size="large" color={Colors.Primary} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.Primary,
  },
});

export default Loader;

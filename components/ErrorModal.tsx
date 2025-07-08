import React from 'react';
import { Modal, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface ErrorModalProps {
  visible: boolean;
  onDismiss: () => void;
  message?: string;
}

export default function ErrorModal({ visible, onDismiss, message }: ErrorModalProps) {
  const defaultMessage = "Üzgünüz, işlem gerçekleştirilemedi. Lütfen daha sonra tekrar deneyin.";
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onDismiss}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message || defaultMessage}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={onDismiss}
          >
            <Text style={styles.buttonText}>Tamam</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#00c853',
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
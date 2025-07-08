import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

interface ErrorModalProps {
  visible: boolean;
  onDismiss: () => void;
  type?: 'NETWORK' | 'RATE_LIMIT' | 'PERMISSION' | 'GENERAL';
  message?: string;
}

const ERROR_MESSAGES = {
  NETWORK: "Bağlantı hatası. İnternet bağlantınızı kontrol edin.",
  RATE_LIMIT: "Günlük limit aşıldı. Lütfen daha sonra tekrar deneyin.",
  PERMISSION: "Galeri erişim izni gerekli. Lütfen ayarlardan izin verin.",
  GENERAL: "Üzgünüz, işlem gerçekleştirilemedi. Lütfen daha sonra tekrar deneyin.",
};

export default function ErrorModal({ visible, onDismiss, type = 'GENERAL', message }: ErrorModalProps) {
  const errorMessage = message || ERROR_MESSAGES[type];
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onDismiss}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{errorMessage}</Text>
          <Button
            mode="contained"
            onPress={onDismiss}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            Tamam
          </Button>
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
    minWidth: 120,
  },
  buttonContent: {
    paddingVertical: 4,
  },
});
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
  ScrollView,
  Platform
} from 'react-native';

interface TransferenciaScreenProps {
  navigation: any;
}

export default function TransferenciaScreen({ navigation }: TransferenciaScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Text style={styles.titleIcon}>↔</Text>
          <Text style={styles.title}>Transferência</Text>
        </View>
        
        <View style={styles.emptySpace}></View>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Descrição</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Transferência entre contas"
              placeholderTextColor="#999"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Valor (R$)</Text>
            <TextInput
              style={styles.input}
              placeholder="0,00"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Data</Text>
            <TouchableOpacity style={styles.input}>
              <Text style={styles.dateText}>Selecionar data</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.accountsContainer}>
            <View style={styles.accountSection}>
              <Text style={styles.sectionTitle}>De</Text>
              <View style={styles.accountSelect}>
                <TouchableOpacity style={styles.accountButton}>
                  <View style={styles.accountInfo}>
                    <View style={styles.accountIcon}>
                      <Text>💳</Text>
                    </View>
                    <Text style={styles.accountName}>Carteira</Text>
                  </View>
                  <Text style={styles.accountAmount}>R$ 0,00</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.transferIconContainer}>
              <Text style={styles.transferIcon}>↓</Text>
            </View>
            
            <View style={styles.accountSection}>
              <Text style={styles.sectionTitle}>Para</Text>
              <View style={styles.accountSelect}>
                <TouchableOpacity style={styles.accountButton}>
                  <View style={styles.accountInfo}>
                    <View style={styles.accountIcon}>
                      <Text>🏦</Text>
                    </View>
                    <Text style={styles.accountName}>Conta Bancária</Text>
                  </View>
                  <Text style={styles.accountAmount}>R$ 0,00</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.saveButtonText}>TRANSFERIR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#121212',
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    fontSize: 20,
    marginRight: 8,
    color: '#FFFFFF',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptySpace: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formContainer: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    color: '#CCCCCC',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 16,
  },
  dateText: {
    color: '#999',
  },
  accountsContainer: {
    marginTop: 20,
  },
  accountSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  accountSelect: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    overflow: 'hidden',
  },
  accountButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  accountName: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  accountAmount: {
    color: '#CCCCCC',
    fontSize: 16,
  },
  transferIconContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  transferIcon: {
    fontSize: 24,
    color: '#9C27B0',
  },
  footer: {
    padding: 16,
    backgroundColor: '#121212',
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  saveButton: {
    backgroundColor: '#9C27B0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

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

interface DespesaCartaoScreenProps {
  navigation: any;
}

export default function DespesaCartaoScreen({ navigation }: DespesaCartaoScreenProps) {
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
          <Text style={styles.titleIcon}>💳</Text>
          <Text style={styles.title}>Despesa Cartão</Text>
        </View>
        
        <View style={styles.emptySpace}></View>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Descrição</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Compra Online"
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
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Categoria</Text>
            <TouchableOpacity style={styles.input}>
              <Text style={styles.categoryText}>Selecionar categoria</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Cartão</Text>
            <TouchableOpacity style={styles.input}>
              <Text style={styles.cardText}>Selecionar cartão</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Parcelas</Text>
            <View style={styles.installmentsContainer}>
              <TouchableOpacity style={styles.installmentButton}>
                <Text style={styles.installmentButtonText}>1x</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.installmentButton, styles.installmentButtonActive]}>
                <Text style={styles.installmentButtonTextActive}>2x</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.installmentButton}>
                <Text style={styles.installmentButtonText}>3x</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.installmentButton}>
                <Text style={styles.installmentButtonText}>4x</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.installmentButton}>
                <Text style={styles.installmentButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.saveButtonText}>SALVAR</Text>
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
  categoryText: {
    color: '#999',
  },
  cardText: {
    color: '#999',
  },
  installmentsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  installmentButton: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  installmentButtonActive: {
    backgroundColor: '#2196F3',
  },
  installmentButtonText: {
    color: '#FFFFFF',
  },
  installmentButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
    backgroundColor: '#121212',
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  saveButton: {
    backgroundColor: '#2196F3',
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

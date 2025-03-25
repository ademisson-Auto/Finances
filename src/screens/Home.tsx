import React, { useRef, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Dimensions, 
  Animated, 
  SafeAreaView,
  StatusBar,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Image,
  TouchableWithoutFeedback,
  Modal,
  ViewStyle
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const { width, height } = Dimensions.get('window');
// Calcular escalas dinâmicas baseadas no tamanho da tela
const scale = Math.min(width, height) / 375; // 375 é a largura base de design

// Função para calcular tamanhos responsivos
const normalize = (size: number) => {
  return Math.round(size * scale);
};

// Altura de status bar em diferentes plataformas
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

// Temas disponíveis
const THEMES = {
  DARK: {
    name: 'dark',
    background: '#000000',
    cardBackground: '#1E1E1E',
    headerBackground: '#121212',
    borderColor: '#333333',
    text: '#FFFFFF',
    secondaryText: '#CCCCCC',
    accent: '#9333EA',
    incomeColor: '#4CAF50',
    expenseColor: '#F44336',
    walletColor: '#3F51B5',
    balanceColor: '#FFC107',
    buttonBackground: '#333333',
  },
  RED: {
    name: 'red',
    background: '#1A0505',
    cardBackground: '#2D0A0A',
    headerBackground: '#340C0C',
    borderColor: '#4D1414',
    text: '#FFFFFF',
    secondaryText: '#CCCCCC',
    accent: '#B71C1C',
    incomeColor: '#81C784',
    expenseColor: '#FF8A80',
    walletColor: '#90CAF9',
    balanceColor: '#FFECB3',
    buttonBackground: '#4D1414',
  }
};

interface HomeProps {
  navigation: any;
}

export default function Home({ navigation }: HomeProps) {
  const { signOut } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);
  const [showPremiumBanner, setShowPremiumBanner] = useState(true);
  const [showTabs, setShowTabs] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const [currentTheme, setCurrentTheme] = useState(THEMES.DARK);
  
  // Estados e animações para o menu circular
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnimation = useRef(new Animated.Value(0)).current;
  const backdropAnimation = useRef(new Animated.Value(0)).current;
  
  // Animações para cada item do menu
  const itemAnimation1 = useRef(new Animated.Value(0)).current;
  const itemAnimation2 = useRef(new Animated.Value(0)).current;
  const itemAnimation3 = useRef(new Animated.Value(0)).current;
  const itemAnimation4 = useRef(new Animated.Value(0)).current;

  const toggleTheme = () => {
    setCurrentTheme(currentTheme.name === 'dark' ? THEMES.RED : THEMES.DARK);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    
    // Detecta direção do scroll
    if (currentScrollY > lastScrollY.current && currentScrollY > 10) {
      // Scroll para baixo - esconde as tabs
      setShowTabs(false);
    } else {
      // Scroll para cima - mostra as tabs
      setShowTabs(true);
    }
    
    lastScrollY.current = currentScrollY;
    scrollY.setValue(currentScrollY);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      // Redirecionar para a tela de slides após logout
      navigation.reset({
        index: 0,
        routes: [{ name: 'Onboarding' }],
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };
  
  // Função para abrir o menu circular
  const openMenu = () => {
    setMenuVisible(true);
    
    // Animar o backdrop (efeito de vidro)
    Animated.timing(backdropAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    
    // Animar o botão central
    Animated.timing(menuAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    // Animar cada item do menu com atraso sequencial
    Animated.stagger(50, [
      Animated.timing(itemAnimation1, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(itemAnimation2, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(itemAnimation3, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(itemAnimation4, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // Função para fechar o menu circular
  const closeMenu = () => {
    // Animar para fechar os itens e o backdrop
    Animated.parallel([
      Animated.timing(backdropAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(menuAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(itemAnimation1, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(itemAnimation2, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(itemAnimation3, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(itemAnimation4, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMenuVisible(false);
    });
  };
  
  // Transformação do botão "+" para "X" quando o menu está aberto
  const rotateAnimation = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });
  
  // Estilos de interpolação para o backdrop
  const backdropStyle: any = {
    backgroundColor: backdropAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)'],
    }),
  };
  
  // Animações para posicionamento e opacidade dos itens do menu
  const itemStyle1: any = {
    transform: [
      { scale: itemAnimation1 },
      { 
        translateY: itemAnimation1.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -100],
        }),
      },
      { 
        translateX: itemAnimation1.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 30],
        }),
      },
    ],
    opacity: itemAnimation1,
  };
  
  const itemStyle2: any = {
    transform: [
      { scale: itemAnimation2 },
      { 
        translateY: itemAnimation2.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20]
        }),
      },
      { 
        translateX: itemAnimation2.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 105],
        }),
      },
    ],
    opacity: itemAnimation2,
  };
  
  const itemStyle3: any = {
    transform: [
      { scale: itemAnimation3 },
      { 
        translateY: itemAnimation3.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -92],
        }),
      },
      { 
        translateX: itemAnimation3.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -65],
        }),
      },
    ],
    opacity: itemAnimation3,
  };
  
  const itemStyle4: any = {
    transform: [
      { scale: itemAnimation4 },
      {
        translateY: itemAnimation4.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -25],
        }),
      },
      { 
        translateX: itemAnimation4.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -120],
        }),
      },
    ],
    opacity: itemAnimation4,
  };

  return (
    <View style={[styles.screenContainer, { backgroundColor: currentTheme.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={currentTheme.headerBackground} />
      
      {/* Cabeçalho reconstruído para evitar problemas de corte */}
      <View style={[styles.headerContainer, { backgroundColor: currentTheme.headerBackground, borderBottomColor: currentTheme.borderColor }]}>
        <Text style={[styles.headerTitle, { color: currentTheme.text }]}>Finances</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={[styles.themeButton, { backgroundColor: currentTheme.buttonBackground }]} 
            onPress={toggleTheme}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Text style={styles.themeIcon}>{currentTheme.name === 'dark' ? '🌙' : '🔥'}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.logoutButton, 
              styles.buttonShadow,
              { 
                backgroundColor: currentTheme.buttonBackground,
                borderColor: currentTheme.name === 'dark' ? currentTheme.expenseColor : currentTheme.accent,
                shadowColor: currentTheme.name === 'dark' ? currentTheme.expenseColor : currentTheme.accent
              }
            ]} 
            onPress={handleLogout}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            activeOpacity={0.7}
          >
            <Image 
              source={require('../../assets/logout.png')} 
              style={[
                styles.logoutImage,
                { tintColor: currentTheme.name === 'dark' ? currentTheme.expenseColor : currentTheme.accent }
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Conteúdo principal */}
        <View style={styles.mainContent}>
          <View style={[styles.balanceCard, styles.balanceBorder, { backgroundColor: currentTheme.cardBackground }]}>
            <Text style={[styles.balanceLabel, { color: currentTheme.secondaryText }]}>Saldo atual</Text>
            <Text style={[styles.balanceValue, { color: currentTheme.text }]}>R$ 0,00</Text>
          </View>
          
          <View style={styles.cardsRow}>
            <View style={[
              styles.miniCard, 
              styles.incomeCard, 
              { 
                backgroundColor: currentTheme.cardBackground,
                borderLeftColor: currentTheme.incomeColor 
              }
            ]}>
              <Text style={[styles.cardLabel, { color: currentTheme.secondaryText }]}>Receitas</Text>
              <Text style={[styles.incomeValue, { color: currentTheme.incomeColor }]}>R$ 0,00</Text>
            </View>
            <View style={[
              styles.miniCard, 
              styles.expenseCard, 
              { 
                backgroundColor: currentTheme.cardBackground,
                borderLeftColor: currentTheme.expenseColor 
              }
            ]}>
              <Text style={[styles.cardLabel, { color: currentTheme.secondaryText }]}>Despesas</Text>
              <Text style={[styles.expenseValue, { color: currentTheme.expenseColor }]}>R$ 0,00</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.moneyIcon}>💵</Text>
              <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Carteira</Text>
              <TouchableOpacity style={styles.addAccountButton}>
                <Text style={[styles.addAccountIcon, { color: currentTheme.text }]}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={[
              styles.walletCard, 
              styles.walletBorder, 
              { 
                backgroundColor: currentTheme.cardBackground,
                borderLeftColor: currentTheme.walletColor 
              }
            ]}>
              <View style={styles.walletItemRow}>
                <View style={styles.walletInfo}>
                  <View style={[styles.walletIconContainer, { backgroundColor: currentTheme.buttonBackground }]}>
                    <Text style={styles.walletIcon}>💳</Text>
                  </View>
                  <Text style={[styles.walletName, { color: currentTheme.text }]}>Carteira</Text>
                </View>
                <Text style={[styles.walletValue, { color: currentTheme.text }]}>R$0,00</Text>
              </View>
              <View style={[styles.walletTotalRow, { borderTopColor: currentTheme.borderColor }]}>
                <Text style={[styles.walletTotalLabel, { color: currentTheme.secondaryText }]}>Total</Text>
                <Text style={[styles.walletTotalValue, { color: currentTheme.text }]}>R$0,00</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* SafeArea para componentes inferiores */}
      <SafeAreaView style={[styles.safeBottom, { backgroundColor: currentTheme.headerBackground }]}>
        {/* Banner Premium - Na parte inferior */}
        {showPremiumBanner && (
          <View style={[styles.premiumBanner, { backgroundColor: currentTheme.accent }]}>
            <View style={styles.premiumContent}>
              <Text style={styles.crownText}>👑</Text>
              <Text style={[styles.premiumText, { color: currentTheme.text }]}>Garanta agora seu Finances Premium</Text>
            </View>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setShowPremiumBanner(false)}
            >
              <Text style={[styles.closeButtonText, { color: currentTheme.text }]}>×</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {/* Tabs na parte inferior */}
        <Animated.View 
          style={[
            styles.tabsContainer,
            {
              backgroundColor: currentTheme.headerBackground,
              borderTopColor: currentTheme.borderColor,
              transform: [
                {
                  translateY: showTabs ? 0 : 60
                }
              ],
            }
          ]}
        >
          <TouchableOpacity style={styles.tabItem}>
            <View style={styles.tabIcon}>
              <Text style={styles.tabIconText}>🏠</Text>
            </View>
            <Text style={[styles.tabText, { color: currentTheme.secondaryText }]}>Principal</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.tabItem}>
            <View style={styles.tabIcon}>
              <Text style={styles.tabIconText}>📊</Text>
            </View>
            <Text style={[styles.tabText, { color: currentTheme.secondaryText }]}>Transações</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.tabCenterItem}
            onPress={openMenu}
            activeOpacity={0.8}
          >
            <Animated.View 
              style={[
                styles.addButton, 
                { 
                  backgroundColor: currentTheme.accent,
                  transform: [{ rotate: rotateAnimation }]
                }
              ]}
            >
              <Text style={[styles.addButtonText, { color: currentTheme.text }]}>+</Text>
            </Animated.View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.tabItem}>
            <View style={styles.tabIcon}>
              <Text style={styles.tabIconText}>📝</Text>
            </View>
            <Text style={[styles.tabText, { color: currentTheme.secondaryText }]}>Planejamento</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.tabItem}>
            <View style={styles.tabIcon}>
              <Text style={styles.tabIconText}>⋯</Text>
            </View>
            <Text style={[styles.tabText, { color: currentTheme.secondaryText }]}>Mais</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
      
      {/* Menu circular flutuante */}
      {menuVisible && (
        <View style={styles.menuContainer}>
          {/* Background com efeito de vidro */}
          <TouchableWithoutFeedback onPress={closeMenu}>
            <Animated.View style={[styles.backdrop, backdropStyle]} />
          </TouchableWithoutFeedback>
          
          {/* Botões de ação do menu */}
          <View style={styles.menuCenter}>
            {/* Receita (Verde - Topo) */}
            <Animated.View style={[styles.menuItem, itemStyle1]}>
              <TouchableOpacity 
                style={[styles.menuButton, { backgroundColor: '#4CAF50' }]}
                onPress={() => {
                  closeMenu();
                  navigation.navigate('ReceitaScreen');
                }}
              >
                <Text style={styles.menuIcon}>↑</Text>
              </TouchableOpacity>
              <Text style={styles.menuText}>Receita</Text>
            </Animated.View>
            
            {/* Despesa cartão (Azul - Direita) */}
            <Animated.View style={[styles.menuItem, itemStyle2]}>
              <TouchableOpacity 
                style={[styles.menuButton, { backgroundColor: '#2196F3' }]}
                onPress={() => {
                  closeMenu();
                  navigation.navigate('DespesaCartaoScreen');
                }}
              >
                <Text style={styles.menuIcon}>💳</Text>
              </TouchableOpacity>
              <Text style={styles.menuText}>Cartão</Text>
            </Animated.View>
            
            {/* Transferência (Roxo - Esquerda) */}
            <Animated.View style={[styles.menuItem, itemStyle3]}>
              <TouchableOpacity 
                style={[styles.menuButton, { backgroundColor: '#9C27B0' }]}
                onPress={() => {
                  closeMenu();
                  navigation.navigate('TransferenciaScreen');
                }}
              >
                <Text style={styles.menuIcon}>↔</Text>
              </TouchableOpacity>
              <Text style={styles.menuText}>Transferência</Text>
            </Animated.View>
            
            {/* Despesa (Vermelho - Esquerda abaixo) */}
            <Animated.View style={[styles.menuItem, itemStyle4]}>
                <TouchableOpacity 
                  style={[styles.menuButton, { backgroundColor: '#F44336' }]}
                  onPress={() => {
                    closeMenu();
                    navigation.navigate('DespesaScreen');
                  }}
                >
                  <Image source={require('../../assets/despesa.png')} style={styles.despesa} resizeMode="contain" />
                </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  headerContainer: {
    height: Platform.OS === 'ios' ? 90 : 60 + (StatusBar.currentHeight || 0),
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
    backgroundColor: '#121212',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  logoutButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderWidth: 1.5,
    borderColor: '#9333EA',
  },
  themeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonShadow: {
    elevation: 5,
    shadowColor: '#9333EA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  themeIcon: {
    fontSize: 14,
    textAlign: 'center',
  },
  logoutImage: {
    width: 20,
    height: 20,
  },
  container: {
    flex: 1,
  },
  safeBottom: {
    backgroundColor: '#121212',
  },
  contentContainer: {
    paddingBottom: normalize(120), // Espaço para as tabs e banner na parte inferior
    paddingTop: normalize(8), // Espaço extra no topo
  },
  // Tabs na parte inferior
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#121212',
    height: normalize(60),
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingBottom: Platform.OS === 'ios' ? 0 : 5,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabCenterItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  tabIconText: {
    fontSize: normalize(20),
  },
  tabText: {
    fontSize: normalize(12),
    color: '#CCCCCC',
  },
  addButton: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(25),
    backgroundColor: '#9333EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 4,
    shadowColor: '#9333EA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: normalize(28),
    fontWeight: 'bold',
  },
  // Banner Premium na parte inferior, acima das tabs
  premiumBanner: {
    flexDirection: 'row',
    backgroundColor: '#9333EA',
    padding: normalize(12),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  crownText: {
    fontSize: normalize(16),
    marginRight: normalize(8),
    color: '#ffffff',
  },
  premiumText: {
    color: '#ffffff',
    fontSize: normalize(14),
    fontWeight: '500',
  },
  closeButton: {
    width: normalize(20),
    height: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: normalize(20),
    fontWeight: 'bold',
  },
  // Conteúdo principal - Tema escuro
  mainContent: {
    padding: normalize(16),
  },
  balanceCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: normalize(16),
    padding: normalize(16),
    marginBottom: normalize(16),
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  balanceBorder: {
    borderLeftWidth: 3,
    borderLeftColor: '#FFC107', // Cor amarela para saldo
  },
  balanceLabel: {
    fontSize: normalize(14),
    color: '#CCCCCC',
    marginBottom: normalize(5),
  },
  balanceValue: {
    fontSize: normalize(24),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(24),
  },
  miniCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: normalize(16),
    padding: normalize(14),
    width: '48%',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  incomeCard: {
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
  },
  expenseCard: {
    borderLeftWidth: 3,
    borderLeftColor: '#F44336',
  },
  cardLabel: {
    fontSize: normalize(14),
    color: '#CCCCCC',
    marginBottom: normalize(5),
  },
  incomeValue: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  expenseValue: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: '#F44336',
  },
  section: {
    marginBottom: normalize(20),
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(12),
  },
  moneyIcon: {
    fontSize: normalize(18),
    marginRight: normalize(8),
  },
  sectionTitle: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  addAccountButton: {
    width: normalize(24),
    height: normalize(24),
    borderRadius: normalize(12),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAccountIcon: {
    color: '#FFFFFF',
    fontSize: normalize(20),
    fontWeight: 'bold',
  },
  walletCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: normalize(16),
    padding: normalize(16),
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  walletItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  walletInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletIconContainer: {
    width: normalize(30),
    height: normalize(30),
    borderRadius: normalize(15),
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(10),
  },
  walletIcon: {
    fontSize: normalize(14),
  },
  walletName: {
    color: '#FFFFFF',
    fontSize: normalize(14),
    fontWeight: '500',
  },
  walletValue: {
    color: '#FFFFFF',
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  walletTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: normalize(16),
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  walletTotalLabel: {
    color: '#CCCCCC',
    fontSize: normalize(14),
  },
  walletTotalValue: {
    color: '#FFFFFF',
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  walletBorder: {
    borderLeftWidth: 3,
    borderLeftColor: '#3F51B5', // Cor azul para wallets
  },
  // Menu circular flutuante
  menuContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  menuCenter: {
    position: 'absolute',
    bottom: 75, // Ajuste na altura para corresponder à imagem
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    height: 55,
  },
  menuItem: {
    position: 'absolute',
    alignItems: 'center',
    width: 60,
  },
  menuButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  menuIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  despesa: {
    width: 35,
    height: 35,
    tintColor: '#000000',
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },
});


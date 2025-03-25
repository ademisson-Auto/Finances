import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from '../screens/OnboardingScreen';
import AuthScreen from '../screens/auth/AuthScreen';
import LoadingScreen from '../screens/LoadingScreen';
import { useAuth } from '../contexts/AuthContext';
import Home from '../screens/Home';
// Importar as telas de transações
import ReceitaScreen from '../screens/transactions/ReceitaScreen';
import DespesaScreen from '../screens/transactions/DespesaScreen';
import DespesaCartaoScreen from '../screens/transactions/DespesaCartaoScreen';
import TransferenciaScreen from '../screens/transactions/TransferenciaScreen';

// Chave para o AsyncStorage
const HAS_LAUNCHED = '@Finances:hasLaunched';

// Tipo para a pilha de navegação principal
export type RootStackParamList = {
  Onboarding: undefined;
  Auth: { formType?: 'login' | 'register' };
  Loading: { message?: string; redirectTo: string; params?: any };
  Home: undefined;
  // Adicionar tipos para as novas telas
  ReceitaScreen: undefined;
  DespesaScreen: undefined;
  DespesaCartaoScreen: undefined;
  TransferenciaScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  const { user, loading: authLoading } = useAuth();
  const [hasLaunched, setHasLaunched] = useState<boolean | null>(null);
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);
  const navigationRef = useRef<any>(null);
  const routeNameRef = useRef<string | undefined>();
  
  // Monitorar mudanças no estado de autenticação
  useEffect(() => {
    if (user && navigationRef.current && routeNameRef.current !== 'Home') {
      console.log('Usuário autenticado, redirecionando para Home');
      navigationRef.current.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  }, [user]);

  // Verificar lançamento prévio do app
  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const alreadyLaunched = await AsyncStorage.getItem(HAS_LAUNCHED);
        setHasLaunched(alreadyLaunched === 'true');
      } catch (error) {
        console.error('Erro ao verificar lançamento inicial:', error);
        setHasLaunched(false);
      }
    };
    
    checkFirstLaunch();
  }, []);

  // Determinar a rota inicial com base no estado do app
  useEffect(() => {
    if (hasLaunched === null || authLoading) {
      // Ainda carregando, não define rota inicial
      return;
    }
    
    if (user) {
      // Usuário autenticado → Home
      setInitialRoute('Home');
    } else {
      // Sem usuário logado → Sempre mostra Onboarding
      setInitialRoute('Onboarding');
    }
  }, [hasLaunched, user, authLoading]);

  // Função para marcar que o app já foi usado antes
  const markAppAsLaunched = async () => {
    try {
      await AsyncStorage.setItem(HAS_LAUNCHED, 'true');
      setHasLaunched(true);
    } catch (error) {
      console.error('Erro ao salvar status de lançamento:', error);
    }
  };

  // Mostra tela de carregamento enquanto determina a rota inicial
  if (initialRoute === null) {
    return <LoadingScreen message="Iniciando..." onComplete={() => {}} />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}
      onStateChange={() => {
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
        routeNameRef.current = currentRouteName;
      }}
    >
      <Stack.Navigator 
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding">
          {props => (
            <OnboardingScreen 
              onRegister={() => {
                markAppAsLaunched();
                props.navigation.navigate('Auth', { formType: 'register' });
              }}
              onLogin={() => {
                markAppAsLaunched();
                props.navigation.navigate('Auth', { formType: 'login' });
              }}
            />
          )}
        </Stack.Screen>
        
        <Stack.Screen name="Loading">
          {props => (
            <LoadingScreen
              message={props.route.params?.message || 'Carregando...'}
              onComplete={() => {
                if (user) {
                  props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                  });
                } else {
                  const redirectTo = props.route.params?.redirectTo || 'Auth';
                  const params = props.route.params?.params;
                  props.navigation.navigate(redirectTo as any, params);
                }
              }}
            />
          )}
        </Stack.Screen>
        
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Home" component={Home} />
        
        {/* Adicionar as telas de transações */}
        <Stack.Screen name="ReceitaScreen" component={ReceitaScreen} />
        <Stack.Screen name="DespesaScreen" component={DespesaScreen} />
        <Stack.Screen name="DespesaCartaoScreen" component={DespesaCartaoScreen} />
        <Stack.Screen name="TransferenciaScreen" component={TransferenciaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation; 
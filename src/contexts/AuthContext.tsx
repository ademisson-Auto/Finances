import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../services/supabase';
import { User, Session } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Chave para verificar se o usuário completou logout
const USER_LOGGED_OUT = '@Finances:user_logged_out';

interface AuthContextData {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: any; data: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any; data: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar sessão ativa e estado de logout
  const checkSession = async () => {
    try {
      // Verificar se o usuário fez logout explicitamente na última sessão
      const userLoggedOut = await AsyncStorage.getItem(USER_LOGGED_OUT);
      
      if (userLoggedOut === 'true') {
        console.log('Usuário fez logout anteriormente, limpando sessão');
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
        return;
      }

      const { data } = await supabase.auth.getSession();
      console.log('Verificando sessão existente:', data.session ? 'Sessão encontrada' : 'Nenhuma sessão');
      
      if (data.session) {
        // Validar se a sessão ainda é válida
        if (data.session.expires_at && data.session.expires_at * 1000 < Date.now()) {
          console.log('Sessão expirada, limpando');
          await supabase.auth.signOut();
          setUser(null);
          setSession(null);
        } else {
          setSession(data.session);
          setUser(data.session.user);
        }
      } else {
        setUser(null);
        setSession(null);
      }
    } catch (error) {
      console.error('Erro ao verificar sessão:', error);
      setUser(null);
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Verificar sessão ativa
    checkSession();

    // Configurar ouvinte para alterações na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Estado de autenticação alterado:', _event, session ? 'Com sessão' : 'Sem sessão');
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Função para registrar usuário
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    // Limpar flag de logout ao registrar
    await AsyncStorage.removeItem(USER_LOGGED_OUT);
    
    const response = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    return response;
  };

  // Função para fazer login
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    // Limpar flag de logout ao fazer login
    await AsyncStorage.removeItem(USER_LOGGED_OUT);
    
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    return response;
  };

  // Função para fazer logout
  const signOut = async () => {
    setLoading(true);
    // Marcar que o usuário fez logout explicitamente
    await AsyncStorage.setItem(USER_LOGGED_OUT, 'true');
    
    await supabase.auth.signOut();
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}; 
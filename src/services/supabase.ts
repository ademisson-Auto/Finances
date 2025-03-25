import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://jbgpcxxfsaehhiccjldb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZ3BjeHhmc2FlaGhpY2NqbGRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNjMzMzgsImV4cCI6MjA1NzkzOTMzOH0.7sMDQafOUk9-vdeZ_7BO6FiG9CD8_yBaF26KxRoOFU4';

// Configuração para persistência de sessão usando AsyncStorage
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}); 
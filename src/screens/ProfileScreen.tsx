import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { createProfileScreenStyles } from '../styles/ProfileScreen.styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const colors = useTheme();
  const styles = createProfileScreenStyles(colors);
  const [userName, setUserName] = useState('Usuário');
  const [userEmail, setUserEmail] = useState('usuario@example.com');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const userData = JSON.parse(user);
          setUserName(userData.name || 'Usuário');
          setUserEmail(userData.email || 'usuario@example.com');
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    };
    loadUserData();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          onPress: async () => {
            await AsyncStorage.removeItem('user');
            navigation.replace('Login');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/perfil.jpeg')} style={styles.profileImage} />
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Saved')}>
          <MaterialCommunityIcons name="heart-outline" size={24} style={styles.menuIcon} />
          <Text style={styles.menuText}>Meus Favoritos</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Messages')}>
          <MaterialCommunityIcons name="chat-outline" size={24} style={styles.menuIcon} />
          <Text style={styles.menuText}>Minhas Mensagens</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ThemeSelection')}>
          <MaterialCommunityIcons name="theme-light-dark" size={24} style={styles.menuIcon} />
          <Text style={styles.menuText}>Tema</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
          <MaterialCommunityIcons name="cog-outline" size={24} style={styles.menuIcon} />
          <Text style={styles.menuText}>Configurações</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={24} style={styles.menuIcon} />
          <Text style={styles.menuText}>Sair</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

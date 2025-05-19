import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(password);
  };

  const handleRegister = async () => {
    const errors = {};
    setError('');
    setFieldErrors({});
    setLoading(true);

    if (!validateEmail(email)) {
      errors.email = 'El email no tiene un formato válido.';
    }

    if (!validatePassword(password)) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace('Home');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('El correo ya está registrado.');
      } else {
        setError('Error al registrarse: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Registro</Text>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setFieldErrors((prev) => ({ ...prev, email: '' }));
        }}
        autoCapitalize="none"
        keyboardType="email-address"
        errorMessage={fieldErrors.email}
      />

      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setFieldErrors((prev) => ({ ...prev, password: '' }));
        }}
        secureTextEntry={!showPassword}
        errorMessage={fieldErrors.password}
        rightIcon={{
          type: 'feather',
          name: showPassword ? 'eye-off' : 'eye',
          onPress: () => setShowPassword((prev) => !prev),
        }}
      />

      <Input
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          setFieldErrors((prev) => ({ ...prev, confirmPassword: '' }));
        }}
        secureTextEntry={!showConfirmPassword}
        errorMessage={fieldErrors.confirmPassword}
        rightIcon={{
          type: 'feather',
          name: showConfirmPassword ? 'eye-off' : 'eye',
          onPress: () => setShowConfirmPassword((prev) => !prev),
        }}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {loading && <ActivityIndicator size="large" color="#007bff" style={{ marginVertical: 10 }} />}

      <Button
        title="Registrarse"
        onPress={handleRegister}
        containerStyle={styles.button}
        disabled={!email || !password || !confirmPassword || loading}
      />

      <Button
        title="Volver al Login"
        type="outline"
        onPress={() => navigation.navigate('Login')}
        containerStyle={styles.button}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

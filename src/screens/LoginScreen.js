import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text, Icon } from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateFields = () => {
        const errors = {};
        if (!validateEmail(email)) {
            errors.email = 'El email no tiene un formato válido.';
        }
        if (!password) {
            errors.password = 'La contraseña no puede estar vacía.';
        }
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleLogin = async () => {
        setError('');
        if (!validateFields()) return;

        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigation.replace('Home');
        } catch (err) {
            setError('Error al iniciar sesión: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = () => {
        return validateEmail(email) && password;
    };

    return (
        <View style={styles.container}>
            <Text h3 style={styles.title}>Mi Comida Favorita</Text>

            <Input
                placeholder="Email"
                value={email}
                onChangeText={(text) => {
                    setEmail(text);
                    setFieldErrors((prev) => ({ ...prev, email: '' }));
                }}
                autoCapitalize="none"
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
                rightIcon={
                    <Icon
                        name={showPassword ? 'eye-off' : 'eye'}
                        type="feather"
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Button
                title="Iniciar Sesión"
                onPress={handleLogin}
                loading={loading}
                disabled={!isFormValid() || loading}
                containerStyle={styles.button}
            />

            <Button
                title="Registrarse"
                type="outline"
                onPress={() => navigation.navigate('Register')}
                disabled={loading}
                containerStyle={styles.button}
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

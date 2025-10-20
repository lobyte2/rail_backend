import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();


const getInitialUser = () => {
    try {
        const storedUser = localStorage.getItem('user');

        return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("Error al leer el usuario del localStorage", error);
        return null;
    }
};

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(getInitialUser);


    useEffect(() => {
        try {
            if (user) {

                localStorage.setItem('user', JSON.stringify(user));
            } else {

                localStorage.removeItem('user');
            }
        } catch (error) {
            console.error("No se pudo guardar el usuario en el localStorage", error);
        }
    }, [user]);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};
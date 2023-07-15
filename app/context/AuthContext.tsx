"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useState, createContext, useEffect } from "react";
import useAuth from "../../hooks/useAuth";


interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    phone: string;
}

interface State {
    loading: boolean;
    error: string | null;
    data: User | null;
}

interface AuthState extends State {
    setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
    loading: false,
    error: null,
    data: null,
    setAuthState: () => { },
});


const AuthContext = ({ children }: { children: React.ReactNode }) => {
    const [authState, setAuthState] = useState<State>({
        loading: true,
        data: null,
        error: null,
    });

    const { fetchUser } = useAuth();

    const fetchUserWithInContext = async () => {
        setAuthState({
            data: null,
            error: null,
            loading: true,
        });
        try {
            const jwt = getCookie("jwt");

            if (!jwt) {
                return setAuthState({
                    data: null,
                    error: null,
                    loading: false,
                });
            }
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
            const response = await axios.get("/api/auth/verify");

            setAuthState({
                data: response.data,
                error: null,
                loading: false,
            });
        } catch (error: any) {
            setAuthState({
                data: null,
                error: error.response.data.errorMessage,
                loading: false,
            });
        }
    };

    useEffect(() => {
        fetchUserWithInContext();
    }, []);

    useEffect(() => {
        console.log('authState changed:', authState);
        return () => {
            console.log('Component unmounted');
        };
    }, [authState]);

    return (
        <AuthenticationContext.Provider
            value={{
                ...authState,
                setAuthState,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthContext;
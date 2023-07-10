import axios from "axios";
import { getCookie, removeCookies } from "cookies-next";
import { useContext } from "react";
import { AuthenticationContext } from "../app/context/AuthContext";

const useAuth = () => {
    const { setAuthState } = useContext(AuthenticationContext);

    const signin = async ({ email, password, }: { email: string; password: string; }, handleClose: () => void) => {
        setAuthState({
            data: null,
            error: null,
            loading: true,
        });
        try {
            console.log("signin");
            const response = await axios.post(
                "/api/auth/signin",
                {
                    email,
                    password,
                }
            );
            console.log("response" + { response });
            setAuthState({
                data: response.data,
                error: null,
                loading: false,
            });
            handleClose();
        } catch (error: any) {
            console.log(error);
            console.log(error.response.data.errorMessage);
            setAuthState({
                data: null,
                error: error.response.data.errorMessage,
                loading: false,
            });
        }
    };

    const signup = async (
        {
            email,
            password,
            firstName,
            lastName,
            city,
            phone,
        }: {
            email: string;
            password: string;
            firstName: string;
            lastName: string;
            city: string;
            phone: string;
        },
        handleClose: () => void
    ) => {
        setAuthState({
            data: null,
            error: null,
            loading: true,
        });
        try {
            const response = await axios.post(
                "/api/auth/signup",
                {
                    email,
                    password,
                    firstName,
                    lastName,
                    city,
                    phone,
                }
            );
            setAuthState({
                data: response.data,
                error: null,
                loading: false,
            });
            handleClose();
        } catch (error: any) {
            setAuthState({
                data: null,
                error: error.response.data.errorMessage,
                loading: false,
            });
        }
    };

    const signout = () => {
        removeCookies("jwt");

        setAuthState({
            data: null,
            error: null,
            loading: false,
        });
    };

    const fetchUser = async () => {
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
            console.log({ response });

            setAuthState({
                data: { ...response.data },
                error: null,
                loading: false,
              });
              
            console.log("fetchUser setAuthState finsihsed");
        } catch (error: any) {
            console.log(error);
            setAuthState({
                data: null,
                error: error.response.data.errorMessage,
                loading: false,
            });
        }
    };
    return {
        signin,
        signup,
        signout,
        fetchUser,
    };
};

export default useAuth;
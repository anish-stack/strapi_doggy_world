import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useToken } from "./useToken";
import axios from "axios";
import { API_END_POINT_URL } from "../constant/constant";

export const getUser = () => {
    const {isLoggedIn, token} = useToken();
    const [user, setUser] = useState(null);


    const getUserFnc = async () => {
        try {
            const response = await axios.get(`${API_END_POINT_URL}/api/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setUser(response.data.data);
        } catch (error) {
            console.log("error fetching user", error.response.data);
        }
    }
    useEffect(() => {
        if (isLoggedIn) {
            getUserFnc();
        } else {
            setUser(null);
        }

    }, [token]);

    return { getUserFnc, user };
};

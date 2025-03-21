import { useState, useEffect } from "react";
import axios from "axios";
import { API_END_POINT_URL } from "../constant/constant";
import { useToken } from "./useToken";

export const getUser = () => {
    const { isLoggedIn, token } = useToken();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [orderData, setOrderData] = useState(null);

    const getUserFnc = async () => {
        if (!token) {
            console.log("Token:", token);
            console.warn("Token is missing, retrying in 500ms...");
           
            return;
        }

        setLoading(true);
        setError(null);
        console.log("Token:", token);

        try {
            const response = await axios.get(`${API_END_POINT_URL}/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const userData = response?.data?.data || {};
            setUser(userData);

            if (userData?.id) {
                await getUserOrders(userData.id);
            }
        } catch (err) {
            console.error("Error fetching user:", err?.response?.data?.error?.message);
            setError(err?.response?.data?.error?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const getUserOrders = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_END_POINT_URL}/api/findMyAllOrders?id=${id}`);

            setOrderData(response.data.orders);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error("Error fetching orders:", err?.response?.data?.error?.message || err.message);
            setError(err?.response?.data?.error?.message || "Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isLoggedIn && token) {
            getUserFnc();
        } else {
            setUser(null);
            setOrderData(null);
        }
    }, [isLoggedIn, token]);

    return { getUserFnc, user, orderData, loading, error };
};

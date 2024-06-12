import wretch from "wretch";
import Cookies from "js-cookie";

// Base API setup for making HTTP requests
const api = wretch("http://localhost:8000").accept("application/json");

/**
 * Stores a token in cookies.
 * @param {string} token - The token to be stored.
 * @param {"access" | "refresh"} type - The type of the token (access or refresh).
 */
const storeToken = (token, type) => {
    Cookies.set(type + "Token", token);
};

/**
 * Retrieves a token from cookies.
 * @param {"access" | "refresh"} type - The type of the token to retrieve (access or refresh).
 * @returns {string | undefined} The token, if found.
 */
const getToken = (type) => {
    return Cookies.get(type + "Token");
};

/**
 * Removes both access and refresh tokens from cookies.
 */
const removeTokens = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
};

const register = (email, username, password) => {
    return api.post({ email, username, password }, "/auth/users/");
};

const login = (email, password) => {
    return api.post({ username: email, password }, "/auth/jwt/create");
};

const logout = () => {
    const refreshToken = getToken("refresh");
    return api.post({ refresh: refreshToken }, "/auth/logout/");
};

const handleJWTRefresh = () => {
    const refreshToken = getToken("refresh");
    return api.post({ refresh: refreshToken }, "/auth/jwt/refresh");
};

const resetPassword = (email) => {
    return api.post({ email }, "/auth/users/reset_password/");
};

const resetPasswordConfirm = (
    new_password,
    re_new_password,
    token,
    uid
) => {
    return api.post(
        { uid, token, new_password, re_new_password },
        "/auth/users/reset_password_confirm/"
    );
};

export const AuthActions = () => {
    return {
        login,
        resetPasswordConfirm,
        handleJWTRefresh,
        register,
        resetPassword,
        storeToken,
        getToken,
        logout,
        removeTokens,
    };
};
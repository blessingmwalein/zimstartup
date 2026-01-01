import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'access_token';
const USER_KEY = 'user';
const AUTHENTICATED_KEY = 'authenticated';

export const storage = {
    getToken: () => Cookies.get(ACCESS_TOKEN_KEY),
    setToken: (token: string) => Cookies.set(ACCESS_TOKEN_KEY, token),
    removeToken: () => Cookies.remove(ACCESS_TOKEN_KEY),

    getUser: () => {
        const user = Cookies.get(USER_KEY);
        return user ? JSON.parse(user) : null;
    },
    setUser: (user: any) => Cookies.set(USER_KEY, JSON.stringify(user)),
    removeUser: () => Cookies.remove(USER_KEY),

    setAuthenticated: (status: boolean) => Cookies.set(AUTHENTICATED_KEY, String(status)),
    isAuthenticated: () => Cookies.get(AUTHENTICATED_KEY) === 'true',
    removeAuthenticated: () => Cookies.remove(AUTHENTICATED_KEY),

    clearAll: () => {
        Cookies.remove(ACCESS_TOKEN_KEY);
        Cookies.remove(USER_KEY);
        Cookies.remove(AUTHENTICATED_KEY);
    },
};

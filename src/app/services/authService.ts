// services/authService.ts
import Cookies from 'js-cookie';

const TOKEN_KEY = 'JWT';

export const setToken = (token: string): void => {
  Cookies.set(TOKEN_KEY, token, { expires: 1, secure: true, sameSite: 'Strict' });
};

export const getToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};

export const removeToken = (): void => {
  Cookies.remove(TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};


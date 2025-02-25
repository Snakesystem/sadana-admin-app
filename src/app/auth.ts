import Cookies from "js-cookie";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { writable } from "svelte/store";

interface DecodedToken extends JwtPayload {
  name?: string;
  email?: string;
  picture?: string;
}

export const isAuthenticated = writable(false);

export function getToken(): string | undefined {
  return Cookies.get("token");
}

export const checkSession = () => {
  const token = Cookies.get("token");
  if (!token) {
    isAuthenticated.set(false);
    return null;
  } 
  
  isAuthenticated.set(true);

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Gagal mendecode token:", error);
    return null;
  }
};

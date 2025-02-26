import Cookies from "js-cookie";
import { writable } from "svelte/store";

export function getToken(): string | undefined {
  return Cookies.get("token");
}

export const appRoutes = {
  HOME: '/',
  LOGIN: '/login',
  INVENTORY: '/inventory',
  PETTYCASH: '/pettycash',
  PESANAN: '/pesanan',
  CONTACT: '/contact',
  PROFIL: '/profile',
  UNKNOW: '*',
}

export const transformTitle = (route: string): string => {
  return route
    .replace(/^\//, "") // Menghilangkan '/' di awal
    .split("/") // Membagi path di setiap '/'
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize
    .join(" "); // Gabung kembali dengan spasi
};

export const sidebarOpen = writable(false);
export const urlHistory = writable("");

export function validEmail(node: HTMLInputElement) {
  const errorMessage = document.createElement("div");
  errorMessage.className = "invalid-feedback";

  function inputHandler() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(node.value)) {
      node.classList.add("is-invalid");
      errorMessage.textContent = "Format email tidak valid!";
      node.parentNode?.appendChild(errorMessage);
    } else {
      node.classList.remove("is-invalid");
      errorMessage.textContent = "";
    }
  }

  node.addEventListener("input", inputHandler);

  return {
    destroy() {
      node.removeEventListener("input", inputHandler);
      errorMessage.remove();
    },
  };
}

export function validPassword(node: HTMLInputElement) {
  const errorMessage = document.createElement("div");
  errorMessage.className = "invalid-feedback";

  function inputHandler() {
    if (node.value.length < 6) {
      node.classList.add("is-invalid");
      errorMessage.textContent = "Password minimal 6 karakter!";
      node.parentNode?.appendChild(errorMessage);
    } else {
      node.classList.remove("is-invalid");
      errorMessage.textContent = "";
    }
  }

  node.addEventListener("input", inputHandler);

  return {
    destroy() {
      node.removeEventListener("input", inputHandler);
      errorMessage.remove();
    },
  };
}

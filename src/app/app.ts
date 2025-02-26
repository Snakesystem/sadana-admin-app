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

export function validNumber(node: HTMLInputElement) {
  const errorMessage = document.createElement("div");
  errorMessage.className = "invalid-feedback";

  function inputHandler() {
    if (!/^\d+$/.test(node.value)) {
      node.classList.add("is-invalid");
      errorMessage.textContent = "Input harus berupa angka!";
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

export const formatRupiah = (value: number, format: "decimal-2" | "decimal-0" = "decimal-2"): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: format === "decimal-0" ? 0 : 2, // Tanpa desimal
    maximumFractionDigits: format === "decimal-0" ? 0 : 2, // Tanpa desimal
  }).format(value);
}

export function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
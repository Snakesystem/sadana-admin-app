import Cookies from "js-cookie";

export function getToken(): string | undefined {
  return Cookies.get("token");
}

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

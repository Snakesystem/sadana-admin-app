// modalStore.ts
import { writable } from "svelte/store";

interface ModalState {
  show: boolean;
}

export const modals = writable<Record<string, ModalState>>({});

export const openModal = (id: string) => {
  modals.update((prev) => ({ ...prev, [id]: { show: true } }));
};

export const closeModal = (id: string) => {
  modals.update((prev) => ({ ...prev, [id]: { show: false } }));
};

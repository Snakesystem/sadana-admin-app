<script lang="ts">
    import { closeModal, modals } from "@app/context";
    import { Modal } from "@sveltestrap/sveltestrap";
    import { get, writable } from "svelte/store";
  
    export let id: string;
    export let title: string;
    export let size: string = "";
    export let centered: boolean = true;
  
    // Ambil state modal dari store
    let modal = writable(get(modals)[id]);
  
    // Subscribe ke perubahan store
    modals.subscribe((state) => {
      modal.set(state[id]);
    });
</script>

<Modal size={size} scrollable centered={centered} header={title} isOpen={$modal?.show} 
    toggle={() => closeModal(id)}>
    <div class="modal-body">
        <slot></slot>
    </div>
</Modal>
  
<script lang="ts">
  import { validNumber } from "@app/app";
  import { closeModal } from "@app/context";
  import { db } from "@app/firebase";
  import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
  import Swal from "sweetalert2";

  let props = $props();
  let formData = { ...props.data, createdAt: serverTimestamp() };

  const formatLabel = (key: string) => key.replace(/_/g, " ").toUpperCase();
  const isNumber = (key: string) =>
    key.includes("mount") || key.includes("pric");

  async function onSubmit(data: any) {
    console.table(data);
    if(props.event === "create") {
      await addDoc(collection(db, props.tablename), data).then(async () => {
        await props.refresh();  
        closeModal("change");
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Data berhasil ditambahkan',
        })
      }).catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: error.message,
          })
      })
    } 
    if(props.event === "update") {
      const docRef = doc(db, props.tablename, props.data.id);
        const existData = await getDoc(docRef);

        if(existData.exists()) {
          await updateDoc(docRef, data).then(() => {
            closeModal("change");
            Swal.fire({
              icon: 'success',
              title: 'Berhasil',
              text: 'Data berhasil diubah',
            })
            props.refresh();
          }).catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Gagal',
              text: error.message,
            })
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Data tidak ditemukan',
          })
        }
    }
  }
  
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    onSubmit(formData);
  }}
>
  {#if Object.keys(props.data).length > 0}
    {#each Object.keys(props.data).filter((key) => key !== "id" && key !== "createdAt" && key !== "category_id") as key}
      <div class="mb-3">
        <label for={key} class="form-label">{formatLabel(key)}</label>

        {#if key === "units"}
          <select id={key} class="form-select" bind:value={formData[key]} required >
            <option value="kg">Kilogram (kg)</option>
            <option value="pcs">Unit (pcs)</option>
          </select>
        {:else if isNumber(key)}
          <input id={key} type="text" class="form-control" required bind:value={formData[key]} use:validNumber autocomplete="off" />
        {:else}
          <input id={key} type="text" class="form-control" required bind:value={formData[key]} autocomplete="off" />
        {/if}

        <input type="hidden" bind:value={formData.createdAt} />
      </div>
    {/each}
  {/if}

  <button type="submit" class="btn btn-primary w-100">Simpan</button>
</form>

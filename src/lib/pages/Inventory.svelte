<script lang="ts">
  import { formatRupiah, formatTimestamp } from "@app/app";
  import { openModal } from "@app/context";
  import { retrieveData } from "@app/firebase";
  import ModalChange from "@lib/modals/ModalChange.svelte";
  import ModalContainer from "@lib/components/ModalContainer.svelte";

    let kitchens = $state<any>([]);
    let tables = $state<any>([]);
    let tablename = $state("");
    let event = $state("");
    let submitData = $state({});
    let callbackFunction = $state(() => {});

    const fetchKitchen = async () => {
        try {
            const response = await retrieveData("kitchen");
            kitchens = response;
        } catch (error) {
            console.error("Error fetching kitchen:", error);
        }
    };
    const fetchTable = async () => {
        try {
            const response = await retrieveData("tables");
            tables = response;
        } catch (error) {
            console.error("Error fetching tables:", error);
        }
    };

    $effect(() => {
        fetchKitchen();
        fetchTable();
    })
</script>

<div class="inventory">
    <div class="d-flex flex-row content-inventory gap-2">
        <div class="card">
            <div class="flex-row mb-2 card-header">
                <span class="heading">Persediaan (Dapur)</span>
                <button class="btn btn-success btn-sm text-white" onclick={() => {
                    openModal("change");
                    tablename = "kitchen";
                    event = "create";
                    callbackFunction = fetchKitchen;
                    submitData = {kitchen_name: "", amount: 0, price: 0, units: ""};
                }}>
                    <span>Tambah</span><i class="bi bi-cart-plus ms-2"></i>
                </button>
            </div>
            <div class="flex-row">
                <div class="table-wrapper">
                    <table class="table table-striped table-sm">
                        <thead class="table-dark">
                            <tr>
                              <th class="text-center">#</th>
                              <th class="text-center">Nama</th>
                              <th class="text-center">Stock</th>
                              <th class="text-center">Satuan</th>
                              <th class="text-center">Harga</th>
                              <th class="text-center">Jumlah</th>
                              <th class="text-center">Last Update</th>
                              <th class="text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {#each kitchens as kitchen, index}
                              <tr class="table-light">
                                <td>{index + 1}</td>
                                <td>{kitchen.kitchen_name}</td>
                                <td>{kitchen.amount}</td>
                                <td>{kitchen.units}</td>
                                <td>{formatRupiah(kitchen.price)}</td>
                                <td>{kitchen.units === "pcs" ? formatRupiah(kitchen.amount * kitchen.price) : formatRupiah(kitchen.price)}</td>
                                <td>{formatTimestamp(kitchen.createdAt.seconds)}</td>
                                <td class="action">
                                  <button class="btn btn-info btn-sm">Edit</button>
                                  <button class="btn btn-danger btn-sm text-white">Delete</button>
                                </td>
                              </tr>
                            {/each}
                          </tbody>
                          <tfoot class="table-light fw-xs">
                            <tr>
                              <td colSpan={4} class="text-center">
                                Total
                              </td>
                              <td class="text-end text-danger">
                                {formatRupiah(kitchens.reduce(
                                  (total: number, kitchen: any) => Number(total) + Number(kitchen.price),
                                  0
                                ))}
                              </td>
                              <td class="text-end text-danger">
                                {formatRupiah(kitchens.reduce(
                                  (total: number, kitchen: any) =>
                                    kitchen.units === "pcs"
                                      ? total + Number(kitchen.price) * Number(kitchen.amount)
                                      : total + Number(kitchen.price),
                                  0
                                ))}
                              </td>
                              <td colSpan={2}></td>
                            </tr>
                          </tfoot>
                    </table>
                </div>
            </div>
        </div>
        <div class="card bg-gradient-info">
            <div class="flex-row mb-2 card-header">
                <span class="heading text-white fw-bold">Daftar Meja & Tamu</span>
                <button class="btn btn-success btn-sm text-white"><span>Tambah</span><i class="bi bi-cart-plus ms-2"></i></button>
            </div>
            <ol class="list-group list-group-numbered">
                {#each tables as table}
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">
                                {table.table_name}{" "}
                                <span class="badge bg-secondary">
                                    Ada {table.guest_amount} Tamu
                                </span>
                            </div>
                            <span class="fw-xs">
                                Tanggal di ubah {formatTimestamp(table.createdAt.seconds)}
                            </span>
                        </div>
                        <div class="action">
                            <button class="btn btn-warning btn-sm"><i class="bi bi-pencil"></i>{""}</button>
                            <button class="btn btn-danger btn-sm"><i class="bi bi-trash"></i>{""}</button>
                        </div>
                    </li>
                {/each}
            </ol>
        </div>
    </div>
    <div class="d-flex flex-row gap-2 content-inventory">
        <div class="card">
            <div class="flex-row mb-2 card-header">
                <span class="heading">Persediaan (Dapur)</span>
                <button class="btn btn-success btn-sm"><span>Tambah</span><i class="bi bi-cart-plus ms-2"></i></button>
            </div>
        </div>
        <div class="card bg-gradient-secondary">
            <div class="flex-row mb-2 card-header">
                <soan class="heading">Persediaan (Dapur)</soan>
                <button class="btn btn-success btn-sm"><span>Tambah</span><i class="bi bi-cart-plus ms-2"></i></button>
            </div>
        </div>
    </div>
</div>
<ModalContainer id="change" title="Tambah Persediaan (Dapur)" size="md">
    <ModalChange 
        data={submitData} 
        event={event} 
        tablename={tablename} 
        refresh={() => callbackFunction()}
    />
</ModalContainer>

<style lang="scss" scoped>
    
    .inventory {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 0.6rem;
        flex-wrap: nowrap;
        width: 100%;
        .card {
            padding: 10px;
            border-radius: 10px;
            background-color: #fff;
            display: flex;
            flex-direction: column;

            .card-header {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }
        }
        .card:nth-child(2),
        .card:nth-child(4) {
            flex: 30%;
            ol {
                overflow-y: scroll;
                max-height: 500px;
                background-color: transparent;
                li {
                    background-color: transparent;
                    color: #fff;
                    border: none;
                }
            }
        }

        // Card lainnya memiliki width 70%
        .card:nth-child(1),
        .card:nth-child(3) {
            flex: 70%;
        }
    }

    @media screen and (max-width: 960px) {
        .content-inventory {
            flex-direction: column !important;
        }
    }

</style>
<script lang="ts">
    import { deleteDataDocument, formatRupiah, formatTimestamp } from "@app/app";
    import { openModal } from "@app/context";
    import { db, retrieveData } from "@app/firebase";
    import ModalChange from "@lib/modals/ModalChange.svelte";
    import ModalContainer from "@lib/components/ModalContainer.svelte";
    import Swal from "sweetalert2";
    import { deleteDoc, doc } from "firebase/firestore";

    let kitchens = $state<any>([]);
    let products = $state<any>([]);
    let categories = $state<any>([]);
    let tables = $state<any>([]);

    let tablename = $state("");
    let event = $state("");
    let title = $state("");
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

    const fetchProducts = async () => {
        try {
            const response = await retrieveData("products");
            products = response;
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await retrieveData("categories");
            categories = response;
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    $effect(() => {
        fetchKitchen();
        fetchTable();
        fetchProducts();
        fetchCategories();
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
                    title ="Tambah Persediaan (Dapur)";
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
                                <button class="btn btn-info btn-sm" onclick={() => {
                                openModal("change");
                                title = "Edit Persediaan (Dapur) - " + kitchen.kitchen_name;
                                submitData = kitchen;
                                event = "update";
                                tablename = "kitchen";
                                callbackFunction = fetchKitchen;
                                }}>Edit</button>
                                <button class="btn btn-danger btn-sm text-white" onclick={() => {
                                deleteDataDocument(kitchen.id, kitchen.kitchen_name, "kitchen", fetchKitchen)
                                }}>Delete</button>
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
        <div class="card bg-gradient-secondary">
            <div class="flex-row mb-2 card-header">
                <span class="heading fw-bold">Daftar Meja & Tamu</span>
                <button class="btn btn-success btn-sm text-white" onclick={() => {
                    openModal("change");
                    tablename = "tables";
                    event = "create";
                    title ="Tambah Daftar (Meja)";
                    callbackFunction = fetchTable;
                    submitData = {table_name: "", guest_amount: 0};
                }}><span>Tambah</span><i class="bi bi-cart-plus ms-2"></i></button>
            </div>
            <ol class="list-group list-group-numbered">
                {#each tables as table}
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">
                                {table.table_name}{" "}
                                <span class="badge bg-success">
                                    {table.guest_amount} Tamu
                                </span>
                            </div>
                            <span class="fw-xs">
                                Tanggal di ubah {formatTimestamp(table.createdAt.seconds)}
                            </span>
                        </div>
                        <div class="action">
                            <button class="btn btn-warning btn-sm" onclick={() => {
                                openModal("change");
                                title = "Edit Daftar (Meja) - {}" + table.table_name;
                                submitData = table;
                                event = "update";
                                tablename = "tables";
                                callbackFunction = fetchTable;
                              }}><i class="bi bi-pencil"></i>{""}</button>
                            <button class="btn btn-danger btn-sm"onclick={() => {
                                deleteDataDocument(table.id, table.table_name, "tables", fetchTable)
                              }}><i class="bi bi-trash"></i>{""}</button>
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
                <button class="btn btn-success btn-sm " ><span>Tambah</span><i class="bi bi-cart-plus ms-2"></i></button>
            </div>
            <div class="flex-row">
                <div class="table-wra">
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
                    </table>
                </div>
            </div>
        </div>
        <div class="card bg-gradient-info">
            <div class="flex-row mb-2 card-header">
                <soan class="heading text-white">Kategori (Product)</soan>
                <button class="btn btn-success btn-sm text-white" onclick={() => {
                    openModal("change");
                    tablename = "categories";
                    event = "create";
                    title ="Tambah Daftar (Kategori)";
                    callbackFunction = fetchCategories;
                    submitData = {category_name: ""};
                }}><span>Tambah</span><i class="bi bi-cart-plus ms-2"></i></button>
            </div>
            <ol class="list-group list-group-numbered">
                {#each categories as category}
                    <li class="list-group-item d-flex justify-content-between align-items-start text-white">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">
                                {category.category_name}{" "}
                            </div>
                            <span class="fw-xs">
                                Tanggal di ubah {formatTimestamp(category.createdAt.seconds)}
                            </span>
                        </div>
                        <div class="action">
                            <button class="btn btn-warning btn-sm" onclick={() => {
                                openModal("change");
                                title = "Edit Daftar (Kategori) - " + category.category_name;
                                submitData = category;
                                event = "update";
                                tablename = "categories";
                                callbackFunction = fetchCategories;
                              }}><i class="bi bi-pencil"></i>{""}</button>
                            <button class="btn btn-danger btn-sm"onclick={() => {
                                deleteDataDocument(category.id, category.category_name, "categories", fetchCategories)
                              }}><i class="bi bi-trash"></i>{""}</button>
                        </div>
                    </li>
                {/each}
            </ol>
        </div>
    </div>
</div>
<ModalContainer id="change" title={title} size="md">
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
                    border: none;
                }
            }
        }

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
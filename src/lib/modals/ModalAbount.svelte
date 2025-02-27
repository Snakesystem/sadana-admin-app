<script lang="ts">
    import { checkSession } from "@app/auth";
    import { onMount } from "svelte";
    import { writable, derived } from "svelte/store";

    let expiryDate = writable<Date | null>(null);
    let timeLeft = writable<number>(0);
    let userInfo = checkSession();

    // Hitung sisa waktu dalam detik
    const countdown = derived([expiryDate, timeLeft], ([$expiryDate]) => {
        if (!$expiryDate) return "0 Hari 0 Jam 0 Menit 0 Detik";
        
        let now = new Date().getTime();
        let diff = $expiryDate.getTime() - now;

        if (diff <= 0) {
            return "0 Hari 0 Jam 0 Menit 0 Detik"; // Jika waktu habis
        }

        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return `${days} Hari ${hours} Jam ${minutes} Menit ${seconds} Detik`;
    });

    // Perbarui waktu setiap detik
    onMount(() => {
        expiryDate.set(new Date("2025-4-01"));
        const interval = setInterval(() => {
            timeLeft.update(n => n + 1);
        }, 1000);

        return () => clearInterval(interval);
    });
</script>

<div class="row">
    <div class="col-12 col-md-6">
        
    </div>
    <div class="col-12 col-md-6">
        <div class="card rignt-side bg-gradient-warning">
            <div class="d-flex flex-column">
                <div class="card w-50 p-2">
                    <div class="d-flex flex-row justify-content-around align-items-center">
                        <img src="/svg/user-w.svg" alt="User cewe" class="rounded-circle bg-secondary" style="width: 3rem; margin: 0; padding: 0;">
                        <div class="d-flex flex-column align-items-start">
                            <span> Sadana Cafe</span>
                            <span>{userInfo?.email}</span>
                        </div>
                        <span class="text-end"><i class="bi bi-check"></i></span>
                    </div>
                </div>
                <div class="card w-75 h-50 card-bank">
                    <div class="d-flex flex-column">
                        <div class="d-flex flex-row justify-content-around">
                            <span class="fw-xs"><i class="bi bi-bank"></i> Bank Transfer</span>
                            <img src="/img/bank-bca.png" alt="bank bca" class="img-fluid">
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-start ms-5">
                        <span>Nomor Rekening</span>
                        <h3 style="letter-spacing: 5px;">494 018 9301</h3>
                    </div>
                    <div class="d-flex flex-row justify-content-around">
                        <div class="d-flex flex-column">
                            <span style="line-height:0; font-size: 10px;">Nama</span>
                            <h6>Feri Irawansyah</h6>
                        </div>
                        <div class="d-flex flex-column">
                            <span style="line-height:0; font-size: 10px;">Ex. Payment</span>
                            <h6>2025/4/01</h6>
                        </div>
                    </div>
                </div>
                <div class="card w-50 bg-gradient-warning text-center">
                    3
                </div>
            </div>
        </div>
    </div>
</div>

<style scoped lang="scss">
    .row {
        height: 30rem;

        .col-12 {
            .card.rignt-side {
                height: 27rem;

                .d-flex {
                    flex-direction: column;
                    justify-content: space-evenly;
                    height: 100%;
                    align-items: center;
                }

                .card-bank {
                    padding: 0.3rem;
                    img {
                        width: 15%;
                    }
                }
            }
        }
    }
</style>
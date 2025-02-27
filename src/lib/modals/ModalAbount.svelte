<script lang="ts">
    import { checkSession } from "@app/auth";
  import { db, retrieveData } from "@app/firebase";
    import Licenced from "@lib/components/Licenced.svelte";
  import { doc, getDoc } from "firebase/firestore";
    import { onMount } from "svelte";
    import { writable, derived } from "svelte/store";

    let expiryDate = writable<Date | null>(null);
    let timeLeft = writable<number>(0);
    let userInfo = checkSession();
    let user_status = $state<any>([]);

    let lifeTime = $state({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Hitung sisa waktu dalam detik
    const countdown: any = derived([expiryDate, timeLeft], ([$expiryDate]) => {
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

        // return `${days} Hari ${hours} Jam ${minutes} Menit ${seconds} Detik`;
        return lifeTime = {
            days,
            hours,
            minutes,
            seconds
        };
    });

    const fetchUserStatus = async () => {
        try {
            const response = await retrieveData("user_status");
            user_status = response;
        } catch (error) {
            console.error("Error fetching kitchen:", error);
        }
    }

    $effect(() => {
        fetchUserStatus();
    });
    
    $effect(() => {
        if(user_status.length > 0) {
            const expiredData = user_status[0]?.expired.seconds * 1000;
            if(expiredData) {
                expiryDate.set(new Date(expiredData));
            }
        };
    });

    onMount(() => {
        // expiryDate.set(new Date("2025-12-31"));
        const interval = setInterval(() => {
            timeLeft.update(n => n + 1);
        }, 1000);

        return () => clearInterval(interval);
    });

</script>

<div class="row">
    <div class="col-12 col-lg-6">
        <div class="card content p-5" style="box-shadow: none;">
            <h5><img class="bg-gradient-info rounded-circle p-1" src="/svg/user-p.svg" style="width: 2rem;" alt=""> Application will be expired in</h5>
            <span style="font-weight: bold; font-size: 4rem;">{$countdown.minutes} : {$countdown.seconds}</span>
            <p class="mb-5" style="font-weight: bold; font-size: 2rem; line-height: 0;">{$countdown.days} Hari {$countdown.hours} Jam</p>
            <p class="mb-5">Lakukan pembayaran untuk memperpanjang masa aktif penggunaan aplikasi</p>
            <Licenced/>
            
        </div>
    </div>
    <div class="col-12 col-lg-6">
        <div class="card content bg-gradient-warning">
            <div class="d-flex flex-column">
                <div class="card w-50 p-2">
                    <div class="d-flex flex-row justify-content-around align-items-center">
                        <img src="/svg/user-w.svg" alt="User cewe" class="rounded-circle bg-secondary" style="width: 3rem; margin: 0; padding: 0;">
                        <div class="d-flex flex-column align-items-start">
                            <span> Sadana Cafe</span>
                            <span class="fw-xs">{userInfo?.email}</span>
                        </div>
                        <span class="text-end" ><i class="bi bi-check fs-2 bg-gradient-secondary rounded-circle text-success" style="height: 2rem; width: 2rem;"></i></span>
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
                <div class="card w-50 py-3 bg-gradient-warning text-center">
                    <div class="d-flex flex-row align-items-center">
                        <div class="d-flex flex-column align-items-center">
                            <span class="fw-xs">Payment <i class="bi bi-coin bg-gradient-warning rounded-circle text-danger" style="height: 2rem; width: 2rem;"></i></span>
                            <h4> Rp 200.000,00 IDR</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style scoped lang="scss">
    .row {
        height: 30rem;

        .col-12 {
            .content {
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
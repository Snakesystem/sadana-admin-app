<script lang="ts">
    import Licenced from "@lib/components/Licenced.svelte";

    interface Contact {
        email: string;
        handphone: string;
        message: string;
    }

    let formData = $state({ email: "", handphone: "", message: "" });

    function sendWhatsAppMessage({ handphone, email, message } : { handphone: string, email: string, message: string }) {
        const targetNumber = "6282323443535"; // Nomor WhatsApp tujuan

        if (!message) {
            console.error("Pesan tidak boleh kosong!");
            return;
        }

        // Format pesan yang dikirim
        const formattedMessage = `Email: ${email}%0AHandphone: ${handphone}%0APesan: ${message}`;
        const whatsappURL = `https://api.whatsapp.com/send?phone=${targetNumber}&text=${formattedMessage}`;

        // Redirect ke WhatsApp
        window.open(whatsappURL, '_blank');
    }

    async function submit(data: Contact) {
        await sendWhatsAppMessage(data);
    }
</script>

<div class="contact">
    <div class="card">
        <div class="card-header mb-3">
            <h5 class="text-center">Contact Us</h5>
        </div>
        <form onsubmit={(e) => {
            e.preventDefault();
            submit(formData);
        }}>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input id="email" type="email" class="form-control" bind:value={formData.email} />
            </div>

            <div class="mb-3">
                <label for="text" class="form-label">No WhatsApp</label>
                <input id="text" type="text" class="form-control" bind:value={formData.handphone} />
            </div>

            <div class="mb-3">
                <label for="text" class="form-label">Message</label>
                <textarea id="text" class="form-control" rows="3" bind:value={formData.message}></textarea>
            </div>

            <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
        <Licenced/>
    </div>
</div>

<style lang="scss">
    .contact {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        justify-content: center;
        background-image: url('/img/bg-2.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        
        .card {
            margin: auto;
            width: 400px;
            padding: 20px;
            border: none;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
    }
</style>
<script>
    import { Link } from "svelte-routing";

</script>
<div class="licenced">
    <div class="d-flex flex-column"> 
        <div class="d-flex justify-content-center snakesystem">
            <img src="/img/logo-snakesystem.jpg" alt="logo-ss">
            <span>Snakesystem</span>
        </div>
        <div class="d-flex justify-content-center gap-3">
            <Link to="https://www.instagram.com/fery_ir.1" target="_blank"><i class="bi bi-instagram"></i></Link>
            <Link to="https://www.instagram.com/fery_ir.1" target="_blank"><i class="bi bi-facebook"></i></Link>
            <Link to="https://www.instagram.com/fery_ir.1" target="_blank"><i class="bi bi-linkedin"></i></Link>
            <Link to="https://www.instagram.com/fery_ir.1" target="_blank"><i class="bi bi-github"></i></Link>
        </div>
    </div>
</div>

<style lang="scss">
    .licenced {
        .snakesystem {
            margin: 1rem 0;
            width: 100%;
            // background-color: salmon;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            img {
                width: 20px;
                border-radius: 50%;
            }

            span {
                font-size: 1rem;
            }
        }
    }
</style>
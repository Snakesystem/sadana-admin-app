<script>
    import { Link } from "svelte-routing";

</script>
<div class="licenced">
    <div class="d-flex flex-column"> 
        <div class="d-flex justify-content-center snakesystem">
            <img src="/img/logo-snakesystem.jpg" alt="logo-ss">
            <span>Snakesystem</span>
        </div>
        <div class="d-flex justify-content-center medsos gap-3">
            <Link class="link-medsos" to="https://www.instagram.com/fery_ir.1" target="_blank"><i class="bi bi-instagram"></i></Link>
            <Link class="link-medsos" to="https://www.instagram.com/fery_ir.1" target="_blank"><i class="bi bi-facebook"></i></Link>
            <Link class="link-medsos" to="https://www.instagram.com/fery_ir.1" target="_blank"><i class="bi bi-linkedin"></i></Link>
            <Link class="link-medsos" to="https://www.instagram.com/fery_ir.1" target="_blank"><i class="bi bi-github"></i></Link>
        </div>
    </div>
</div>

<style lang="scss" scoped>
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
                margin: 5px;
            }

            span {
                font-size: 1rem;
            }
        }
        
        .medsos {
            text-decoration: none;
            color: #fff;
            font-size: 1.2rem;

            .bi-instagram {
                color: #E1306C;
            }

            .bi-facebook {
                color: #1877F2;
            }

            .bi-linkedin {
                color: #0A66C2;
            }

            .bi-github {
                color: #202020;
            }
        }
    }
</style>
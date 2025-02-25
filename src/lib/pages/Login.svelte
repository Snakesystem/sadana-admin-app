<script lang="ts">
    import { signInWithEmailAndPassword } from "firebase/auth";
    import { validEmail, validPassword } from "../../app/app";
    import { session } from "../../app/firebase";
    import { navigate } from "svelte-routing";
    import Cookies from "js-cookie";
    import { checkSession } from "../../app/auth";
    import { Carousel, CarouselItem } from "@sveltestrap/sveltestrap";

    let formData = $state({ email: "", password: "" });
    let showPassword = $state(false);
  
    async function login(data: any) {
      await signInWithEmailAndPassword(session, data.email, data.password).then(async(response) => {
        const token = await response.user.getIdToken();
        Cookies.set("token", token, { expires: 2, secure: true, sameSite: "strict" });
        checkSession();
        navigate('/', { replace: true });
      }).catch((error) => {
        console.log(error);
      });
    }

    const items = [
      '/img/bg-1.jpg',
      '/img/bg-2.jpg',
      '/img/bg-3.jpg',
      '/img/bg-4.jpg',
    ]
    let activeIndex = $state(0);  // Tambahkan variabel untuk melacak indeks slide yang aktif4
</script>

<section class="login-page">
  <div class="container">
    <div class="card">
      <h3>Login Page</h3>
      <form onsubmit={(e) => {
          e.preventDefault();
          login(formData);
        }}>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input id="email" autocomplete="off" type="email" class="form-control" bind:value={formData.email} use:validEmail required />
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Password</label>
          <div class="input-group password">
            <input id="email" type={showPassword ? "text" : "password"} class="form-control" bind:value={formData.password} use:validPassword required />
            <button aria-label="Toggle password visibility" type="button" class="btn" onclick={() => showPassword = !showPassword} >
              <i class="bi" class:bi-eye={!showPassword} class:bi-eye-slash={showPassword} ></i>
            </button>
          </div>
        </div>

        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
    </div>
  </div>
  <Carousel {items} bind:activeIndex>
    <div class="carousel-inner">
      {#each items as item, index}
        <CarouselItem bind:activeIndex itemIndex={index}>
          <img src={item} class="d-block w-100" alt="{item} {index + 1}" />
        </CarouselItem>
      {/each}
    </div>
  </Carousel>
  <div class="overlay"></div>
</section>

<style lang="scss">

  .login-page {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .card {
      width: 400px;
      padding: 20px;
      border: none;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50vh;
    background-color: rgba(120, 122, 253, 0.3);
    z-index: -1;
  }
</style>
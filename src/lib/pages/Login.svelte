<script lang="ts">
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { validEmail, validPassword } from "../../app/app";
  import { session } from "../../app/firebase";
  import { navigate } from "svelte-routing";
  import Cookies from "js-cookie";
  import { checkSession } from "../../app/auth";

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
</section>

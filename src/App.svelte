<script lang="ts">
  import { Route, Router, navigate } from "svelte-routing";
  import Home from "./lib/pages/Home.svelte";
  import Login from "./lib/pages/Login.svelte";
  import Pesanan from "./lib/pages/Pesanan.svelte";
  import Inventory from "./lib/pages/Inventory.svelte";
  import Contact from "./lib/pages/Contact.svelte";
  import Notfound from "./lib/pages/Notfound.svelte";
  import { checkSession, isAuthenticated } from "./app/auth";
  import Header from "./lib/components/Header.svelte";

  let auth = $state(false);

  $effect(() => {
    checkSession();
    isAuthenticated.subscribe((value) => {
      auth = value;
    });
  });

  // Redirect jika user login & masuk ke halaman login/register
  function redirectPublic() {
    if (auth) navigate("/", { replace: true });
  }

  // Redirect jika user belum login & masuk ke halaman yang butuh login
  $effect(() => {
    if (!auth && !["/login", "/register", "/contact"].includes(window.location.pathname)) {
      navigate("/login", { replace: true });
    }
  });

</script>

<Router>
  <main class="main-page">
    <!-- Halaman Public -->
    <Route path="/contact" >
      <Contact />
    </Route>
    <Route path="/login">
      {redirectPublic()}
      <Login />
    </Route>
    <Route path="/register">
      {redirectPublic()}
      <Login />
    </Route>

    <!-- Halaman Private -->
    {#if auth}
      <Header/>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/pesanan" >
        <Pesanan />
      </Route>
      <Route path="/inventory">
        <Inventory />
      </Route>
    {/if}

    <!-- Not Found Page -->
    <Route path="*" >
      <Notfound />
    </Route>
  </main>
</Router>

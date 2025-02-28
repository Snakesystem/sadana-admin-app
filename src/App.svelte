<script lang="ts">
  import { Route, Router, navigate } from "svelte-routing";
  import Home from "./lib/pages/Home.svelte";
  import Login from "./lib/pages/Login.svelte";
  import Pesanan from "./lib/pages/Pesanan.svelte";
  import Inventory from "./lib/pages/Inventory.svelte";
  import Contact from "./lib/pages/Contact.svelte";
  import Notfound from "./lib/pages/Notfound.svelte";
  import { checkSession, isAuthenticated } from "./app/auth";
  import Footer from "@lib/components/Footer.svelte";
  import { appRoutes, transformTitle, urlHistory } from "@app/app";
  import PettyCash from "@lib/pages/PettyCash.svelte";
  import ModalContainer from "@lib/components/ModalContainer.svelte";
  import ModalAbount from "@lib/modals/ModalAbount.svelte";
  import Layout from "@lib/components/Layout.svelte";

  let auth = $state(false);
  let pathname = $state(location.pathname);

  const history = urlHistory;

  $effect(() => {
    history.subscribe((value) => {
      pathname = value;
    });
  });

  $effect(() => {
    checkSession();
    isAuthenticated.subscribe((value) => {
      auth = value;
    });

    document.title = `${
      pathname === "/" ? "Home" : transformTitle(pathname)
    } - Sadana Admin Area`;
  });

  // Redirect jika user login & masuk ke halaman login/register
  function redirectPublic() {
    if (auth) navigate("/", { replace: true });
  }

  // Redirect jika user belum login & masuk ke halaman yang butuh login
  $effect(() => {
    if (!auth && !["/login", "/register", "/contact"].includes(pathname)) {
      navigate("/login", { replace: true });
    }
  });
</script>

<Router>
  <main class="main-page">
    <!-- Halaman Public -->
    <Route path={appRoutes.CONTACT} >
      <Contact />
    </Route>
    <!-- Not Found Page -->
    <Route path="*" >
      <Notfound />
    </Route>
    <Route path={appRoutes.LOGIN}>
      {redirectPublic()}
      <Login />
    </Route>
    <Route path="/register">
      {redirectPublic()}
      <Login />
    </Route>

    <!-- Halaman Private -->
    {#if auth}
      <Route path={appRoutes.HOME}>
        <Layout>
          <Home />
        </Layout>
      </Route>
      <Route path={appRoutes.PESANAN} >
        <Layout>
          <Pesanan />
        </Layout>
      </Route>
      <Route path={appRoutes.INVENTORY}>
        <Layout>
          <Inventory />
        </Layout>
      </Route>
      <Route path={appRoutes.PETTYCASH}>
        <Layout>
          <PettyCash />
        </Layout>
      </Route>
      <Footer/>
    {/if}
    <ModalContainer id="about" title="Tentang Aplikasi" size="xl">
      <ModalAbount/>
    </ModalContainer>
  </main>
</Router>
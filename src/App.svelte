<script lang="ts">
  import { Route, Router, navigate, useLocation } from "svelte-routing";
  import Home from "./lib/pages/Home.svelte";
  import Login from "./lib/pages/Login.svelte";
  import Pesanan from "./lib/pages/Pesanan.svelte";
  import Inventory from "./lib/pages/Inventory.svelte";
  import Contact from "./lib/pages/Contact.svelte";
  import Notfound from "./lib/pages/Notfound.svelte";
  import { checkSession, isAuthenticated } from "./app/auth";
  import Header from "./lib/components/Header.svelte";
  import Sidebar from "@lib/components/Sidebar.svelte";
  import Footer from "@lib/components/Footer.svelte";
  import { appRoutes, transformTitle, urlHistory, sidebarOpen } from "@app/app";
  import PettyCash from "@lib/pages/PettyCash.svelte";
    import ModalContainer from "@lib/components/ModalContainer.svelte";
    import ModalAbount from "@lib/modals/ModalAbount.svelte";

  let auth = $state(false);
  let pathname = $state(location.pathname);
  let sidebar = $state(false);

  const history = urlHistory;

  $effect(() => {
    history.subscribe((value) => {
      pathname = value;
    });

    sidebarOpen.subscribe((value) => {
      sidebar = value;
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
      <Header/>
      <Sidebar/>
      <section class="main-content card {sidebar ? '' : 'sidebar-hide'}">
        <Route path={appRoutes.HOME}>
          <Home />
        </Route>
        <Route path={appRoutes.PESANAN} >
          <Pesanan />
        </Route>
        <Route path={appRoutes.INVENTORY}>
          <Inventory />
        </Route>
        <Route path={appRoutes.PETTYCASH}>
          <PettyCash />
        </Route>
        <Footer/>
      </section>
    {/if}

    <!-- Not Found Page -->
    <Route path="*" >
      <Notfound />
    </Route>
    <button onclick={() => $sidebarOpen = !$sidebarOpen} aria-label="Toggle sesttings visibility" type="button" class="settings-btn btn bg-gradient-success rounded-circle text-white d-none"><i class="bi bi-gear"></i></button>
    <ModalContainer id="about" title="Tentang Aplikasi" size="xl">
      <ModalAbount/>
    </ModalContainer>
  </main>
</Router>

<style lang="scss">
  .main-page {
    button {
      width: 50px;
      height: 50px;
      position: fixed;
      right: 1rem;
      bottom: 2rem;
      z-index: 999;
      font-size: 20px;
    }
  }

  section.main-content {
    position: absolute;
    right: 0.5rem;
    width: calc(100% - 300px);
    height: 90vh;
    top: 4.5rem;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: all 0.3s ease-in-out;
  }

  @media screen and (max-width: 960px) {
    section.main-content {
      width: calc(100% - 1rem);
    }
    .settings-btn {
      display: block !important;
    }
  }

</style>
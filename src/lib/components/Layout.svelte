<script>
    import { sidebarOpen } from "@app/app";
    import Footer from "./Footer.svelte";
    import Header from "./Header.svelte";
    import Sidebar from "./Sidebar.svelte";

    let { children } = $props();

    let sidebar = $state(false);

    $effect(() => {
        sidebarOpen.subscribe((value) => {
            sidebar = value;
        });
    });

</script>

<div class="layout">
    <Header/>
    <Sidebar/>
    <section class="main-content card {sidebar ? '' : 'sidebar-hide'}">
        {@render children()}
    </section>
    <button onclick={() => $sidebarOpen = !$sidebarOpen} aria-label="Toggle sesttings visibility" type="button" class="settings-btn btn bg-gradient-success rounded-circle text-white d-none"><i class="bi bi-gear"></i></button>
    <Footer/>
</div>

<style lang="scss">
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

  button {
      width: 50px;
      height: 50px;
      position: fixed;
      right: 1rem;
      bottom: 2rem;
      z-index: 999;
      font-size: 20px;
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
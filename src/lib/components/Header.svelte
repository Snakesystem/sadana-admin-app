<script>
  import { urlHistory } from "@app/app";
  import { Link } from "svelte-routing";

</script>

<header>
  <nav class="navbar">
    <div class="container-fluid">
      <a href="/" class="navbar-brand">Dashboard / <span class="url-page">{$urlHistory === "/" ? "home" : $urlHistory.split("/")[1]}</span></a>
      <div class="navbar-nav">
        <Link class="nav-link active" aria-current="page" to="#">Home</Link>
        <Link class="nav-link" to="#">Features</Link>
        <Link class="nav-link" to="#">Pricing</Link>
        <Link to="#" class="nav-link disabled" aria-disabled="true">Disabled</Link>
      </div>
    </div>
  </nav>
</header>

<style scoped lang="scss">
  header {
    position: fixed;
    z-index: 1;
    background-color: #fff;

    nav {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 4rem;
      width: 100vw;

      .container-fluid {
          display: flex;
          flex-direction: row;
      }

      .navbar-brand {
          margin-left: 15rem;
      }

      .navbar-nav {
          display: flex;
          flex-direction: row;
          gap: 3rem;
          padding: 0 2rem;
      }
    }
  }
</style>
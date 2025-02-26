<script>
  import { urlHistory } from "@app/app";
  import { Link, links } from "svelte-routing";

</script>

<header use:links>
  <nav class="navbar">
    <div class="container-fluid">
      <a href="/" class="navbar-brand">Dashboard / <span class="url-page">{$urlHistory === "/" ? "home" : $urlHistory.split("/")[1]}</span></a>
      <div class="navbar-nav">
        <Link class="nav-link text-white" aria-current="page" to="#">Home</Link>
        <Link class="nav-link text-white" to="#">Features</Link>
        <Link class="nav-link text-white" to="#">Pricing</Link>
        <Link to="#" class="nav-link text-white">Disabled</Link>
      </div>
    </div>
  </nav>
</header>

<style scoped lang="scss">
  header {
    position: fixed;
    z-index: 1;
    background-color: #2AF598;
    background-image: linear-gradient(59deg, #2AF598 0%, #08AEEA 89%);
    height: 10rem;
    z-index: -1;

    nav {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 4rem;
      width: 100vw;

      a {
        color: white;

        &:hover {
          color: #fff;
        }
      }

      .container-fluid {
          display: flex;
          flex-direction: row;
          
          span {
            color: white;
          }
      }

      .navbar-brand {
          margin-left: 280px;
      }

      .navbar-nav {
          display: flex;
          flex-direction: row;
          gap: 3rem;
          padding: 0 2rem;
          color: white;
      }
    }
  }
</style>
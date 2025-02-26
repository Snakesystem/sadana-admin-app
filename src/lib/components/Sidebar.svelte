<script>
  import { appRoutes, sidebarOpen, urlHistory } from "@app/app";
  import { checkSession } from "@app/auth";
  import { session } from "@app/firebase";
  import { signOut } from "firebase/auth";
  import Cookies from "js-cookie";
  import { Link, links, useLocation } from "svelte-routing";

  const history = useLocation();
  let sidebar = $state(false);

  $effect(() => {
    history.subscribe((value) => {
      urlHistory.set(value.pathname);
      sidebarOpen.set(false);
    })

    sidebarOpen.subscribe((value) => {
      sidebar = value;
    })
  });

</script>

<div class="sidebar {sidebar ? '' : 'sidebar-hide'}">
  <div class="card" use:links>
    <a class="nav-brand" href="/">
      <img src="/img/sadana-logo.jpg" alt="logo-sadana" class="img-fluid w-50" />
      <h4 class="text-center">Sadana Bill</h4>
      <span>Sadana Administration App</span>
      <hr />
    </a>
    <div class="menu-list mb-3">
      <h5>List Menu</h5>
      <ul>
        <li class="{$urlHistory === appRoutes.HOME ? 'active' : ''}"><Link to="/"><i class="bi bi-columns-gap me-2"></i>Dashboard</Link></li>
        <li class="{$urlHistory === appRoutes.PESANAN ? 'active' : ''}">
          <a href={appRoutes.PESANAN} ><i class="bi bi-cart-check me-2"></i>Pesanan</a>
        </li>
        <li class="{$urlHistory === appRoutes.INVENTORY ? 'active' : ''}">
          <a href={appRoutes.INVENTORY} ><i class="bi bi-bag-plus me-2"></i>Inventory</a>
        </li>
        <li class="{$urlHistory === appRoutes.PETTYCASH ? 'active' : ''}">
          <a href={appRoutes.PETTYCASH} ><i class="bi bi-wallet2 me-2"></i>Kas Kecil</a >
        </li>
      </ul>
    </div>
    <div class="menu-list">
      <h5>List Settings</h5>
      <ul>
        <li class="{$urlHistory === appRoutes.PROFIL ? 'active' : ''}"><a href={appRoutes.PROFIL}><i class="bi bi-person-check me-2"></i>Profil</a></li>
        <li>
          <button class="btn text-danger"
            onclick={async () => {
              await signOut(session);
              Cookies.remove("token");
              checkSession();
            }}><i class="bi bi-power me-2"></i>Keluar</button
          >
        </li>
      </ul>
    </div>
    <div class="menu-list need-help">
      <img src="/svg/icon-documentation.svg" alt="" />
      <h5>Bantuan</h5>
      <ul class="w-100">
        <li class="mb-2">
          <button class="btn btn-success w-100 btn-sm">
            <i class="bi bi-whatsapp"><span class="mx-2"> WhatsApp</span></i>
          </button>
        </li>
        <li>
          <button class="btn btn-primary w-100 btn-sm">
            <i class="bi bi-envelope"> <span class="mx-2">Email</span></i>
          </button>
        </li>
        <li>
          <button class="btn btn-secondary w-100 btn-sm">
            <i class="bi bi-info-circle"> <span class="mx-2">Abount</span></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>

<style lang="scss">

  .sidebar {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: fixed;
    left: 1.5rem;
    width: 250px;
    height: 100vh;
    z-index: 3;
    transition: all 0.3s ease-in-out;

    a {
      text-decoration: none;
      color: #333;
    }

    .card {
      height: 95vh;
      border: none;
      padding: 10px;

      a.nav-brand {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
      }

      .menu-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;

        ul {
          padding: 0;
          list-style: none;
          li {
            // margin: 10px 0;
            padding: 5px 2rem;
          }
        }

        &.need-help {
          width: 100%;
          margin: auto;
          position: inherit;
          bottom: 0;
        }

        &.need-help {
          ul, li {
            i {
              font-style: normal;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 960px) {
    .sidebar-hide {
      left: -250px;
    }
  }

</style>

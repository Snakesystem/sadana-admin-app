<script>

  import { signOut } from "firebase/auth";
  import { session } from "../../app/firebase";
  import { checkSession } from "../../app/auth";
  import Cookies from "js-cookie";

</script>

<button onclick={async () => {
    await signOut(session);
    Cookies.remove("token");
    checkSession();
  }}>Logout</button>
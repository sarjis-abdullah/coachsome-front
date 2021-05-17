import { pathData } from "@/data";
export default function({ $auth, redirect }) {
  if ($auth.loggedIn) {
    redirect(pathData.pages.home);
  }
}

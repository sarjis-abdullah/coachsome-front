import { pathData, roleData } from "@/data";
export default function({ $auth, redirect }) {
  if ($auth.loggedIn) {
    if (!$auth.hasRole([roleData.COACH])) {
      redirect(pathData.pages.home);
    }
  } else {
    redirect(pathData.pages.login);
  }
}

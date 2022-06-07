import { pathData, roleData } from "@/data";
export default function({ $auth, redirect }) {
  if ($auth.loggedIn) {
    if (!$auth.hasRole([roleData.SUPERADMIN, roleData.ADMIN, roleData.STAFF])) {
      redirect(pathData.admin.dashboard);
    }
  } else {
    redirect(pathData.pages.login);
  }
}
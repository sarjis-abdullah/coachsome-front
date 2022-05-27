import { pathData } from "@/data";
export default function({ $auth, redirect }) {
  if($auth?.loggedIn){
    if($auth.hasRole(["superadmin", "admin", "staff"])){
      redirect(pathData.admin.dashboard);
    }else if($auth.hasRole(["coach"])){
      redirect(pathData.admin.dashboard);
    }else if($auth.hasRole(["athlete"])){
      redirect(pathData.admin.dashboard);
    }else{
      redirect(pathData.pages.home);
    }
  }else{
    redirect(pathData.pages.home);
  }
}

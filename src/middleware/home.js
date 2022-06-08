import { pathData, roleData } from "@/data";
export default function({ $auth, redirect }) {
  if($auth && $auth.user && $auth.user.roles[0].name == "superadmin" || $auth.user.roles[0].name == "admin" || $auth.user.roles[0].name == "staff"){
    console.log("admin");
    redirect(pathData.admin.dashboard);
  }
  else if($auth && $auth.user && $auth.user.roles[0].name == "coach"){
    console.log("coach");
    redirect(pathData.coach.home);
  }else if($auth && $auth.user && $auth.user.roles[0].name == "athlete"){
    console.log("athlete");
    redirect(pathData.athlete.home);
  }
}
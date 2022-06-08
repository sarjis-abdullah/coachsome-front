import { pathData, roleData } from "@/data";
export default function({ $auth, redirect }) {
  if($auth && $auth.user && $auth.hasRole([roleData.SUPERADMIN, roleData.ADMIN, roleData.STAFF])){
    redirect(pathData.admin.dashboard)
  }else if($auth && $auth.user && $auth.hasRole([roleData.ATHLETE])){
    redirect(pathData.athlete.home)
  }else if($auth && $auth.user && $auth.hasRole([roleData.COACH])){
    redirect(pathData.coach.home)
  }
}
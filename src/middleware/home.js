import { pathData } from "@/data";
export default function(context) {
  if(context.app.vuetify.framework.breakpoint.smAndDown && context.route.path == "/"){
    if(context.$auth && context.$auth.loggedIn){
      if(context.$auth.user && context.$auth.user.roles && context.$auth.user.roles[0].name == "superadmin" || context.$auth.user.roles[0].name == "admin" || context.$auth.user.roles[0].name == "staff"){
        context.redirect(context.localePath(pathData.admin.dashboard));
      }
      else if(context.$auth.user && context.$auth.user.roles && context.$auth.user.roles[0].name == "coach"){
        if(context.$auth.user.is_onboarding == 1){
          context.redirect(context.localePath(pathData.coach.onboarding.start));
        }else{
          context.redirect(context.localePath(pathData.coach.home));
        }
      }else if(context.$auth.user && context.$auth.user.roles && context.$auth.user.roles[0].name == "athlete"){
        context.redirect(context.localePath(pathData.athlete.home));
      }
    }
  }else if( context.$auth && context.$auth.loggedIn && context.$auth.user && context.$auth.user.roles && context.$auth.user.roles[0].name == "coach" && context.$auth.user.is_onboarding == 1){
    context.redirect(context.localePath(pathData.coach.onboarding.start));
  }
}

import { pathData } from "@/data";
export default function(context) {
  if(context.app.vuetify.framework.breakpoint.smAndDown && context.route.path == "/"){

    if(context.$auth && context.$auth.loggedIn){
      if(context.$auth.user && context.$auth.user.roles && context.$auth.user.roles[0].name == "superadmin" || context.$auth.user.roles[0].name == "admin" || context.$auth.user.roles[0].name == "staff"){
        context.redirect(context.localePath(pathData.admin.dashboard));
      }
      else if(context.$auth.user && context.$auth.user.roles && context.$auth.user.roles[0].name == "coach"){
        context.redirect(context.localePath(pathData.coach.home));
      }else if(context.$auth.user && context.$auth.user.roles && context.$auth.user.roles[0].name == "athlete"){
        context.redirect(context.localePath(pathData.athlete.home));
      }
    }else{
      // console.log("Hi");
      // context.redirect(context.localePath(pathData.pages.login));
    }
  }
}

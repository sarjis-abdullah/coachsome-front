import mixpanel from 'mixpanel-browser'

export default {
  init(){
    mixpanel.init(process.env.MIXPANEL_API_KEY);    
    return this;
  },
  
};
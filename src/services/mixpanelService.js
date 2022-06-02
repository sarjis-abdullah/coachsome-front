import mixpanel from 'mixpanel-browser'

export default {
  init(){
    mixpanel.init(process.env.MIXPANEL_API_KEY);    
    return this;
  },
  setPeopleOnline(event_name){
    mixpanel.people.set(event_name, {
      online: true
    });
  },
  setPeopleOffline(event_name){
    mixpanel.people.set(event_name, {
      online: true
    });
  },
  trackUserSessionStart(user_id){
    mixpanel.track('user_session_start', {distinct_id: user_id, session_count: 1});
  },
  trackUserSessionEnd(user_id){
    mixpanel.track('user_session_end', {distinct_id: user_id});
  },
  trackNewMessage(user_id){
    mixpanel.track('new_message_send', {distinct_id: user_id, message_count: 1});
  },
  addNewMessageCount(event_name){
    mixpanel.people.set(event_name, {
      newMessage: 1,
    });
  },
  trackPageView(page){
    mixpanel.track('pageView', {page: page});
  }
};
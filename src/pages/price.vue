<template>
  <div class="bootstrap-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 px-md-0">
          <div v-html="content"></div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div>
    <head>
      <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    
    </head>
    <body>
      <style>    
        @import "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css";   
        .feature {
          margin-top: 100px;       
        }       
        .price-page {
          /* margin-top: 100px; */       
        }
        .price-page .page-wrapper .page-top {
          height: 900px;
          width: 100%;
          background: #F7FAFC;       
        }
        .price-page .page-wrapper .page-bottom {
          background: white;       
        }
        .feature .feature__title {
          font-family: Open Sans, sans-serif !important;
          font-family: 'Open Sans';
          font-style: normal;
          font-weight: 700;
          font-size: 50px;
          line-height: 68px;
          text-align: center;
          color: #49556A;       
        }
        .feature .feature__description {
          margin-top: 20px;
          font-family: Open Sans, sans-serif !important;
          font-style: normal;
          font-weight: 400;
          font-size: 20px;
          line-height: 27px;
          text-align: center;
          color: #49556A;       
        }
        .feature .btn-monthly{
          background: #49556A!important;
          border-radius: 30px!important;
          width: 250px!important;
          height: 67px!important;
          font-family: Open Sans, sans-serif !important;
          font-style: normal!important;
          font-weight: 700!important;
          font-size: 20px!important;
          line-height: 27px!important;
          text-align: center!important;
          color: #FFFFFF!important;
        }
        .feature .btn-annual{
          background: #FFFFFF!important;
          border-radius: 30px!important;
          width: 250px!important;
          height: 67px!important;
          font-family: Open Sans, sans-serif !important;
          font-style: normal!important;
          font-weight: 700!important;
          font-size: 20px!important;
          line-height: 27px!important;
          text-align: center!important;
          color: #49556A!important;
        }
        .price-card {
          margin-bottom: 50px;
          padding-top: 50px;
          padding-left: 30px;
          padding-right: 30px;
          padding-bottom: 0;
          -webkit-box-shadow: 0 10px 20px rgb(159 174 194 / 15%);
          box-shadow: 0 10px 20px rgb(159 174 194 / 15%);
          border-radius: 16px;
          max-width: 400px;       
        }
        .price-card-monthly{
          background: white;    
        }
        .price-card-annual{
          background: #15577C;    
        }

        @media only screen and (min-width: 901px) {
          .price-card {
            margin-top: -400px;     
          }
        }

        @media screen and (max-width: 900px) and (min-width: 600px) {
          .price-card {
            margin-top: -300px;     
          }
        }

        @media only screen and (max-width: 599px) {
          .price-card-monthly {
            margin-top: -200px;     
          }
          .price-card-annual {
            margin-top: -40px;     
          }
        }


        .price-card .price-card-header .price-card-header__title_monthly {
          font-family: Open Sans, sans-serif !important;
          font-style: normal;
          font-weight: 700;
          font-size: 25px;
          line-height: 34px;
          color: #49556A;
          padding-bottom: 12px!important;
        }
        .price-card .price-card-header .price-card-header__title_annual {
          font-family: Open Sans, sans-serif !important;
          font-style: normal;
          font-weight: 700;
          font-size: 25px;
          line-height: 34px;
          color: white;
          padding-bottom: 12px!important;
        }
        .price-card .price-card-header .price-card-header__sub-title_monthly {
          font-family: Open Sans, sans-serif !important;
          font-style: normal;
          font-weight: 400;
          font-size: 25px;
          line-height: 34px;
          color: #000000; 
          padding-bottom: 12px!important;      
        }
        .price-card .price-card-header .price-card-header__sub-title_annual {
          font-family: Open Sans, sans-serif !important;
          font-style: normal;
          font-weight: 400;
          font-size: 25px;
          line-height: 34px;
          color: white; 
          padding-bottom: 12px!important;      
        }
        .price-card .price-card-content__title {
          font-family: Open Sans, sans-serif !important;
          font-weight: 700;
          font-size: 16px;
          line-height: 22px;
          text-transform: uppercase;
          color: #49556a;       
          }
        .price-card .price-card-content__sub-title {
          font-family: Open Sans, sans-serif !important;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;         
        }
        .price-card .price-card-content__sub-title_monthly {
          color: #9FAEC2!important;      
        }
        .price-card .price-card-content__sub-title_annual {
          color: white!important;      
        }
        .price-card-content__button_monthly{
          background: #15577C!important;
          border-radius: 10px!important;
          font-family: Open Sans, sans-serif !important;
          font-style: normal!important;
          font-weight: 400!important;
          font-size: 18px!important;
          line-height: 25px!important;
          text-align: center!important;
          color: #ECF2F7!important;
          width: 100%!important;
          margin-top: 20px!important;
        }
        .price-card-content__button_annual{
          background: white!important;
          border-radius: 10px!important;
          font-family: Open Sans, sans-serif !important;
          font-style: normal!important;
          font-weight: 400!important;
          font-size: 18px!important;
          line-height: 25px!important;
          text-align: center!important;
          color: #49556A!important;
          width: 100%!important;
          margin-top: 20px!important;
        }


        .price-card-content ul {
          padding-left: 0!important;
          margin-left: 0!important;
        }

        .fa-check-circle-o{
          margin-right: 10px!important;
          font-size: 18px!important;
        }

        .icon-monthly{
          color: black!important
        }

        .icon-annual{
          color: white!important
        }

        .line-monthly {
          width: 100%;
          background: #9FAEC2;
          height: 1px;
          margin: 20px 0!important
        }

        .line-annual {
          width: 100%;
          background: white;
          height: 1px;
          margin: 20px 0!important
        }

        .price-card-content-included-monthly{
          font-family: Open Sans, sans-serif !important;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 22px;
          color: #49556A;
        }

        .price-card-content-included-annual{
          font-family: Open Sans, sans-serif !important;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 22px;
          color: white;
        }

        .price-card .price-card-content .price-card-content-list__item_monthly {
          margin-top: 25px;
          font-family: Open Sans, sans-serif !important; 
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 22px;
          color: #49556A;
        }
        .price-card .price-card-content .price-card-content-list__item_annual {
          margin-top: 25px;
          font-family: Open Sans, sans-serif !important; 
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 22px;
          color: white;
        }
        .price-card .price-card__action {
          display: flex;
          justify-content: center;       
          }       .price-card .price-card__action button {
          height: 36px;
          min-width: 64px;
          padding: 0 16px;
          font-family: Open Sans;
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          background-color: #15577c !important;
          border-color: #15577c !important;
          border-radius: 8px;
          color: #f7fafc;
          outline: none;       
          }
        .faq{
          background-image:url(http://localhost:8000/assets/images/cms/eclipse.png);
          background-repeat: no-repeat;
          background-position: center top;
          padding-top: 50px;
        }

        .faq .faq__header .title--faq {
          font-family: Open Sans, sans-serif !important;
          font-style: normal;
          font-weight: 700;
          font-size: 40px;
          line-height: 54px;
          text-align: center;
          color: #49556A;
          margin-bottom: 20px;
        }       

        #accordion .card{
          background: none!important;
          border: none!important;
          border-radius: none!important;
        }

        #accordion .card .card-header{
          background: #FFFFFF!important;
          border: 1px solid #CAD5E1!important;
          border-radius: 10px!important;
          margin-top: 10px;
        }
         #accordion .card .collapse .card-body{
           background: #FFFFFF!important;
            border: 1px solid #CAD5E1!important;
            border-radius: 10px!important;
            margin-top: 10px;
         }

         .btn-link{
          font-family: Open Sans, sans-serif !important; 
          width: 100%!important;
          text-align: left!important;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          color: #000000!important;
          text-decoration: none!important
         }

        .btn-link.collapsed:after {
            font-family: 'FontAwesome';  
            content: "\f054";
            float: right; 
            font-size: 15px;
            color: #858C94!important;
        }
         .btn-link:after {
            font-family: 'FontAwesome';  
            content: "\f078";
            float: right; 
            font-size: 15px;
            color: #858C94!important;
        }




       

      </style>     
      <div class="container-fluid price-page" style="background-color: #F7FAFC">       
        <div class="row" style="height: 100%">
          <div class="col col-12">
            <div class="page-wrapper">
              <div class="page-top">
                <div class="row d-flex justify-content-center">
                  <div class="col-md-8 col-lg-6 col-12">
                    <div class="feature">
                      <div class="feature__title" style="Open Sans, sans-serif !important;">
                        Scale your coaching business today
                      </div>
                      <div class="feature__description" style="Open Sans, sans-serif !important;">
                        <span style="Open Sans, sans-serif !important;">
                          <p>From independent coaches to bigger sports clubs. We are here to help scale your business with powerful time-saving features.</p>
                        </span>
                      </div>
                      <div style="display: flex; justify-content: center; padding: 10px!important">
                        <button class="btn btn-monthly" style="margin-right: 5px">Monthly</button>
                        <button class="btn btn-annual" style="margin-left: 5px">Annual</button>
                      </div>               
                    </div>
                  </div>
                </div>
              </div>
              <div class="page-bottom">
                <div class="row justify-content-center" style="display: flex; align-items: flex-start;">
                  <div class="d-flex justify-content-center col-md-5 col-lg-3 col-12">
                    <div class="price-card price-card-monthly price-card--md">
                      <div class="price-card-header">
                        <div class="price-card-header__title_monthly" style="Open Sans, sans-serif !important;">Starter</div>
                        <div class="price-card-header__sub-title_monthly" style="Open Sans, sans-serif !important;">DKK 0,-</div>
                      </div>
                      <div class="price-card-content">
                        <div class="price-card-content__sub-title" style="Open Sans, sans-serif !important;">
                          <span style="Open Sans, sans-serif !important;">
                            <div class="price-card-content__sub-title_monthly">For individual coaches who just want to get started</div>
                          </span>
                        </div>
                        <div class="price-card-content__button" style="Open Sans, sans-serif !important;">
                          <button class="btn price-card-content__button_monthly btn-pricing">Get started</button>
                        </div>
                        <div class="line-monthly"></div>

                        <div class="price-card-content-included-monthly">What’s included?</div>

                        <ul class="fa-ul price-card-content-list">
                          <li class="price-card-content-list__item_monthly" style="Open Sans, sans-serif !important;"><i class="fa fa-check-circle-o icon-monthly" aria-hidden="true"></i>Personalized profile</li>
                          <li class="price-card-content-list__item_monthly" style="Open Sans, sans-serif !important;"><i class="fa fa-check-circle-o icon-monthly" aria-hidden="true"></i>Chat</li>
                          <li class="price-card-content-list__item_monthly" style="Open Sans, sans-serif !important;"><i class="fa fa-check-circle-o icon-monthly" aria-hidden="true"></i>Schedule sessions</li>
                          <li class="price-card-content-list__item_monthly" style="Open Sans, sans-serif !important;"><i class="fa fa-check-circle-o icon-monthly" aria-hidden="true"></i>Reminders</li>
                          <li class="price-card-content-list__item_monthly" style="Open Sans, sans-serif !important;"><i class="fa fa-check-circle-o icon-monthly" aria-hidden="true"></i>Customized exercises</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center col-md-5 col-lg-3 col-12">
                    <div class="price-card price-card-annual price-card--md">
                      <div class="price-card-header">
                        <div class="price-card-header__title_annual" style="Open Sans, sans-serif !important;">Pro</div>
                        <div class="price-card-header__sub-title_annual" style="Open Sans, sans-serif !important;">Coming soon</div>
                      </div>
                      <div class="price-card-content">
                        <div class="price-card-content__sub-title" style="Open Sans, sans-serif !important;">
                          <span style="Open Sans, sans-serif !important;">
                            <div class="price-card-content__sub-title_annual">For individual coaches who wants to take their coaching business to the next level</div>
                          </span>
                        </div>
                        <div class="price-card-content__button" style="Open Sans, sans-serif !important;">
                          <button class="btn price-card-content__button_annual btn-pricing">Get started</button>
                        </div>
                        <div class="line-annual"></div>

                        <div class="price-card-content-included-annual">What’s included?</div>

                        <ul class="fa-ul price-card-content-list">
                          <li class="price-card-content-list__item_annual" style="Open Sans, sans-serif !important;"><i class="fa fa-check-circle-o icon-annual" aria-hidden="true"></i>Personalized profile</li>
                          <li class="price-card-content-list__item_annual" style="Open Sans, sans-serif !important;"><i class="fa fa-check-circle-o icon-annual" aria-hidden="true"></i>Chat</li>
                          <li class="price-card-content-list__item_annual" style="Open Sans, sans-serif !important;"><i class="fa fa-check-circle-o icon-annual" aria-hidden="true"></i>Schedule sessions</li>
                          <li class="price-card-content-list__item_annual" style="Open Sans, sans-serif !important;"><i class="fa fa-check-circle-o icon-annual" aria-hidden="true"></i>Reminders</li>
                          <li class="price-card-content-list__item_annual" style="Open Sans, sans-serif !important;"><i class="fa fa-check-circle-o icon-annual" aria-hidden="true"></i>System generated exercises</li>
                          <li class="price-card-content-list__item_annual" style="Open Sans, sans-serif !important;"><i class="fa fa-check-circle-o icon-annual" aria-hidden="true"></i>Lower service fee</li>
                          <li class="price-card-content-list__item_annual" style="Open Sans, sans-serif !important;"><i class="fa fa-check-circle-o icon-annual" aria-hidden="true"></i>Marketing tools</li>
                          <li class="price-card-content-list__item_annual" style="Open Sans, sans-serif !important;"><i class="fa fa-check-circle-o icon-annual" aria-hidden="true"></i>Support</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row px-5">
                  <div class="col">
                    <div class="faq">
                      <div class="faq__header">
                        <div class="title--faq" style="Open Sans, sans-serif !important;">Frequently asked questions</div>
                      </div>
                      <div class="row justify-content-center">
                          <div class="col-lg-7 col-md-10 col-sm-12 col-12" style="margin-bottom: 50px!important">
                            <div id="accordion">
                              <div class="card">
                                <div class="card-header" id="headingOne">
                                  <h5 class="mb-0">
                                    <button class="btn btn-link" data-toggle="collapse" data-target=".collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                      How do I pay?
                                    </button>
                                  </h5>
                                </div>

                                <div class="collapse show collapseOne" aria-labelledby="headingOne" data-parent="#accordion">
                                  <div class="card-body">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas purus amet morbi sed nisl blandit. Non elit id congue mauris cursus sed id. Bibendum at lorem consequat amet. Velit lacus turpis sapien, elementum odio viverra aliquam ante maecenas.</div>
                                </div>
                              </div>
                              <div class="card">
                                <div class="card-header" id="headingTwo">
                                  <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target=".collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                      How do I pay?
                                    </button>
                                  </h5>
                                </div>
                                <div class="collapse collapseTwo" aria-labelledby="headingTwo" data-parent="#accordion">
                                  <div class="card-body">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas purus amet morbi sed nisl blandit. Non elit id congue mauris cursus sed id. Bibendum at lorem consequat amet. Velit lacus turpis sapien, elementum odio viverra aliquam ante maecenas.</div>
                                </div>
                              </div>
                              <div class="card">
                                <div class="card-header" id="headingThree">
                                  <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target=".collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                      How do I pay?
                                    </button>
                                  </h5>
                                </div>
                                <div class="collapse collapseThree" aria-labelledby="headingThree" data-parent="#accordion">
                                  <div class="card-body">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas purus amet morbi sed nisl blandit. Non elit id congue mauris cursus sed id. Bibendum at lorem consequat amet. Velit lacus turpis sapien, elementum odio viverra aliquam ante maecenas.</div>
                                </div>
                              </div>
                              <div class="card">
                                <div class="card-header" id="headingSeven">
                                  <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target=".collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                                      How do I pay?
                                    </button>
                                  </h5>
                                </div>
                                <div class="collapse collapseSeven" aria-labelledby="headingSeven" data-parent="#accordion">
                                  <div class="card-body">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas purus amet morbi sed nisl blandit. Non elit id congue mauris cursus sed id. Bibendum at lorem consequat amet. Velit lacus turpis sapien, elementum odio viverra aliquam ante maecenas.</div>
                                </div>
                              </div>
                              <div class="card">
                                <div class="card-header" id="headingFour">
                                  <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target=".collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                      How do I pay?
                                    </button>
                                  </h5>
                                </div>
                                <div class="collapse collapseFour" aria-labelledby="headingFour" data-parent="#accordion">
                                  <div class="card-body">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas purus amet morbi sed nisl blandit. Non elit id congue mauris cursus sed id. Bibendum at lorem consequat amet. Velit lacus turpis sapien, elementum odio viverra aliquam ante maecenas.</div>
                                </div>
                              </div>
                              <div class="card">
                                <div class="card-header" id="headingFive">
                                  <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target=".collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                      How do I pay?
                                    </button>
                                  </h5>
                                </div>
                                <div class="collapse collapseFive" aria-labelledby="headingFive" data-parent="#accordion">
                                  <div class="card-body">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas purus amet morbi sed nisl blandit. Non elit id congue mauris cursus sed id. Bibendum at lorem consequat amet. Velit lacus turpis sapien, elementum odio viverra aliquam ante maecenas.</div>
                                </div>
                              </div>
                              <div class="card">
                                <div class="card-header" id="headingSix">
                                  <h5 class="mb-0">
                                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target=".collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                      How do I pay?
                                    </button>
                                  </h5>
                                </div>
                                <div class="collapse collapseSix" aria-labelledby="headingSix" data-parent="#accordion">
                                  <div class="card-body">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas purus amet morbi sed nisl blandit. Non elit id congue mauris cursus sed id. Bibendum at lorem consequat amet. Velit lacus turpis sapien, elementum odio viverra aliquam ante maecenas.</div>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body> 
  </div> -->
</template>

<script>
import { pageBuilderApi } from "@/api";
import {pathData} from '@/data'

export default {
  head() {
    return {
      title: this.$i18n.t("price_header_title_txt"),
      titleTemplate: "%s"
    };
  },
  data: () => ({
    content: ""
  }),
  mounted() {
 
  },
  async asyncData({ app, $axios }) {
     const { data } = await pageBuilderApi($axios).getPageByGroupName("Pricing");

    let content = "";
    if (data.data) {
      if (data.data.pages.length) {
        data.data.pages.forEach(item => {
          if (item.locale == app.i18n.locale) {
            content = item.content;
          }
        });
      }
    }

    // Fallback
    if (!content) {
      data.data.pages.forEach(item => {
        if (app.i18n.locale == item.locale) {
          content = item.content;
        }
      });
    }

    return {
      content
    };
  },
  methods: {
    // handleClick(e) {
    //   const elt = e.target.closest(".btn-pricing");
    //   if(this.$auth.loggedIn){
    //     if(this.$auth.loggedIn && this.$auth.hasRole(["superadmin", "admin", "staff"])){
    //         this.$router.push(this.localePath(pathData.admin.dashboard))
    //     }else if(this.$auth.loggedIn && this.$auth.hasRole(["coach"])){
    //         this.$router.push(this.localePath(pathData.coach.home))
    //     }else if(this.$auth.loggedIn && this.$auth.hasRole(["coach"])){
    //         this.$router.push(this.localePath(pathData.coach.home))
    //     }else{
    //         this.$router.push(this.localePath(pathData.pages.home))
    //     }
    //   }else{
    //     if (elt) {
    //       this.$store.dispatch("activeBottomNav", 4);
    //       if(!this.$vuetify.breakpoint.xsOnly){
    //           this.$store.dispatch("toggleDialog");
    //       }else{
    //         if(this.$route.path != pathData.pages.login){
    //           this.$router.push(this.localePath(pathData.pages.login))
    //         }
    //       }
    //     }
    //   }
    // }
  }
};
</script>

<style scoped lang="scss">
.bootstrap-wrapper::v-deep {
  @import "~bootstrap/dist/css/bootstrap.min";
}
</style>

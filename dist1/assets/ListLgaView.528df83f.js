import{H as L}from"./Header.747f91be.js";import{_ as A,a as x,o,c as a,b as s,k as h,l as _,v,F as r,j as m,e as b,d as n,f as w,r as p,t as d,w as f}from"./index.06a914a2.js";const k={name:"listlga",data(){return{search:"",showsearch:!1,caris:[]}},methods:{async searchLGA(){await x.get("api/Lga/alllgas/"+this.search,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then(c=>{this.caris=c.data.result,this.search="",this.showsearch=!0}).catch(c=>{console.log(c)})}}},C={id:"layout-wrapper"},G={class:"main-content"},N={class:"page-content"},V={class:"container-fluid"},E=w('<div class="row"><div class="col-12"><div class="page-title-box d-flex align-items-center justify-content-between"><h4 class="mb-0">View LGA</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li><li class="breadcrumb-item active">View LGA</li></ol></div></div></div></div>',1),S={class:"row"},B={class:"col-md-12"},O={key:0,class:"card"},D={class:"card-body table-responsive"},I={class:"row"},M=s("div",{class:"col-md-6"},null,-1),j={class:"col-md-6"},T={class:"d-flex"},F=s("button",{class:"btn btn-success"},"Search",-1),H=s("hr",null,null,-1),P={id:"datatable",class:"table table-bordered dt-responsive nowrap",style:{"border-collapse":"collapse","border-spacing":"0",width:"100%"}},U=s("thead",null,[s("tr",null,[s("th",null,"LGA CODE"),s("th",null,"LGA NAME"),s("th",null,"ACTION")])],-1),z=s("button",{class:"btn btn-success"},"Edit",-1),q={key:1,class:"card"},J={class:"card-body table-responsive"},K={class:"row"},Q=s("div",{class:"col-md-6"},null,-1),R={class:"col-md-6"},W={class:"d-flex"},X=s("button",{class:"btn btn-success"},"Search",-1),Y=s("hr",null,null,-1),Z={id:"datatable",class:"table table-bordered dt-responsive nowrap",style:{"border-collapse":"collapse","border-spacing":"0",width:"100%"}},$=s("thead",null,[s("tr",null,[s("th",null,"LGA CODE"),s("th",null,"LGA NAME"),s("th",null,"ACTION")])],-1),ss=s("button",{class:"btn btn-success btn-sm mr-2"},"View Profile",-1),es=w('<footer class="footer"><div class="container-fluid"><div class="row"><div class="col-sm-6"> BackOffice 0.1 \xA9 2022 </div><div class="col-sm-6"><div class="text-sm-right d-none d-sm-block"> Powered by Intelligence </div></div></div></div></footer>',1);function ts(c,t,g,os,l,i){const u=p("router-link"),y=p("router-view");return o(),a(r,null,[s("div",C,[s("div",G,[s("div",N,[s("div",V,[E,s("div",S,[s("div",B,[l.showsearch==!0?(o(),a("div",O,[s("div",D,[s("div",null,[s("form",{onSubmit:t[1]||(t[1]=h((...e)=>i.searchLGA&&i.searchLGA(...e),["prevent"]))},[s("div",I,[M,s("div",j,[s("div",T,[_(s("input",{class:"form-control mr-3",type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>l.search=e),placeholder:"Enter State Code"},null,512),[[v,l.search]]),F])])])],32)]),H,s("table",P,[U,s("tbody",null,[(o(!0),a(r,null,m(l.caris,e=>(o(),a("tr",{key:e.id},[s("td",null,d(e.lgaCode),1),s("td",null,d(e.lgaName),1),s("td",null,[n(u,{to:"/edit-lga/"+e.id},{default:f(()=>[z]),_:2},1032,["to"])])]))),128))])])])])):b("",!0),l.showsearch==!1?(o(),a("div",q,[s("div",J,[s("div",null,[s("form",{onSubmit:t[3]||(t[3]=h((...e)=>i.searchLGA&&i.searchLGA(...e),["prevent"]))},[s("div",K,[Q,s("div",R,[s("div",W,[_(s("input",{class:"form-control mr-3",type:"text","onUpdate:modelValue":t[2]||(t[2]=e=>l.search=e),placeholder:"Enter Enter State Code"},null,512),[[v,l.search]]),X])])])],32)]),Y,s("table",Z,[$,s("tbody",null,[(o(!0),a(r,null,m(l.caris,e=>(o(),a("tr",{key:e.id},[s("td",null,d(e.lgaCode),1),s("td",null,d(e.lgaName),1),s("td",null,[n(u,{to:"/customer-details/"+e.id},{default:f(()=>[ss]),_:2},1032,["to"])])]))),128))])])])])):b("",!0)])])])]),es])]),n(y)],64)}var ls=A(k,[["render",ts]]);const ns={__name:"ListLgaView",setup(c){return(t,g)=>(o(),a("main",null,[n(L),n(ls)]))}};export{ns as default};

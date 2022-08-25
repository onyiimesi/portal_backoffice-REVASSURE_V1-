import{H as x}from"./Header.747f91be.js";import{_ as C,a as _,o as n,c as r,b as s,k as m,l as v,v as b,e as d,F as c,j as p,d as i,f as g,r as f,t,w}from"./index.06a914a2.js";const N={name:"viewbanks",data(){return{name:"",allusers:[],search:"",showsearch:!1,caris:[]}},async mounted(){const l=await _.get("api/Users/users",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.allusers=l.data.result},methods:{async searchUser(){await _.get("api/Users/search?searchstring="+this.search,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then(l=>{this.caris=l.data.result,this.search="",this.showsearch=!0}).catch(l=>{console.log(l)})}}},U={id:"layout-wrapper"},V={class:"main-content"},S={class:"page-content"},A={class:"container-fluid"},O=g('<div class="row"><div class="col-12"><div class="page-title-box d-flex align-items-center justify-content-between"><h4 class="mb-0">View Users</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li><li class="breadcrumb-item active">View Users</li></ol></div></div></div></div>',1),B={class:"row"},E={class:"col-12"},F={key:0,class:"card"},z={class:"card-body table-responsive"},j={class:"row"},I=s("div",{class:"col-md-6"},null,-1),L={class:"col-md-6"},D={class:"d-flex"},H=s("button",{class:"btn btn-success"},"Search",-1),M=s("hr",null,null,-1),P={id:"datatable",class:"table table-bordered dt-responsive nowrap",style:{"border-collapse":"collapse","border-spacing":"0",width:"100%"}},T=s("thead",null,[s("tr",null,[s("th",null,"First Name"),s("th",null,"Last Name"),s("th",null,"Email Address"),s("th",null,"Organisation Code"),s("th",null,"Sub-Organisation Code"),s("th",null,"Action")])],-1),q={key:0,class:"text-center"},G=s("td",{colspan:"7"},[s("h3",{style:{color:"red"}},"User Not Found!")],-1),J=[G],K=s("button",{class:"btn btn-success btn-sm mr-2"},"View Profile",-1),Q={key:1,class:"card"},R={class:"card-body table-responsive"},W={class:"row"},X=s("div",{class:"col-md-6"},null,-1),Y={class:"col-md-6"},Z={class:"d-flex"},$=s("button",{class:"btn btn-success"},"Search",-1),ss=s("hr",null,null,-1),es={id:"datatable",class:"table table-bordered dt-responsive nowrap",style:{"border-collapse":"collapse","border-spacing":"0",width:"100%"}},ts=s("thead",null,[s("tr",null,[s("th",null,"First Name"),s("th",null,"Last Name"),s("th",null,"Email Address"),s("th",null,"Organisation Code"),s("th",null,"Sub-Organisation Code"),s("th",null,"Action")])],-1),ls=s("button",{class:"btn btn-success mr-2"},"Edit",-1),os=g('<footer class="footer"><div class="container-fluid"><div class="row"><div class="col-sm-6"> BackOffice 0.1 \xA9 2022 </div><div class="col-sm-6"><div class="text-sm-right d-none d-sm-block"> Powered by Intelligence </div></div></div></div></footer>',1);function as(l,o,y,rs,a,u){const h=f("router-link"),k=f("router-view");return n(),r(c,null,[s("div",U,[s("div",V,[s("div",S,[s("div",A,[O,s("div",B,[s("div",E,[a.showsearch==!0?(n(),r("div",F,[s("div",z,[s("div",null,[s("form",{onSubmit:o[1]||(o[1]=m((...e)=>l.searchCustomer&&l.searchCustomer(...e),["prevent"]))},[s("div",j,[I,s("div",L,[s("div",D,[v(s("input",{class:"form-control mr-3",type:"text","onUpdate:modelValue":o[0]||(o[0]=e=>a.search=e),placeholder:"Enter Fullname"},null,512),[[b,a.search]]),H])])])],32)]),M,s("table",P,[T,s("tbody",null,[a.caris.length?d("",!0):(n(),r("tr",q,J)),(n(!0),r(c,null,p(a.caris,e=>(n(),r("tr",{key:e.id},[s("td",null,t(e.firstName),1),s("td",null,t(e.lastName),1),s("td",null,t(e.emailAddress),1),s("td",null,t(e.organizationCode),1),s("td",null,t(e.subOrganisationCode),1),s("td",null,[i(h,{to:"/customer-details/"+e.id},{default:w(()=>[K]),_:2},1032,["to"])])]))),128))])])])])):d("",!0),a.showsearch==!1?(n(),r("div",Q,[s("div",R,[s("div",null,[s("form",{onSubmit:o[3]||(o[3]=m((...e)=>u.searchUser&&u.searchUser(...e),["prevent"]))},[s("div",W,[X,s("div",Y,[s("div",Z,[v(s("input",{class:"form-control mr-3",type:"text","onUpdate:modelValue":o[2]||(o[2]=e=>a.search=e),placeholder:"Enter Email"},null,512),[[b,a.search]]),$])])])],32)]),ss,s("table",es,[ts,s("tbody",null,[(n(!0),r(c,null,p(a.allusers,e=>(n(),r("tr",{key:e.id},[s("td",null,t(e.firstName),1),s("td",null,t(e.lastName),1),s("td",null,t(e.emailAddress),1),s("td",null,t(e.organizationCode),1),s("td",null,t(e.subOrganisationCode),1),s("td",null,[i(h,{to:"/edit-profile/"+e.id},{default:w(()=>[ls]),_:2},1032,["to"])])]))),128))])])])])):d("",!0)])])])]),os])]),i(k)],64)}var ns=C(N,[["render",as]]);const cs={__name:"ViewUsersView",setup(l){return(o,y)=>(n(),r("main",null,[i(x),i(ns)]))}};export{cs as default};
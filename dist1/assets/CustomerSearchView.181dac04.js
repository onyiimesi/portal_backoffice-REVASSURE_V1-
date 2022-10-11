import{H as w}from"./Header.47845ea9.js";import{_ as x,a as m,o as a,c as d,b as s,t,d as c,w as b,k as v,l as u,v as _,e as n,F as p,j as g,f as C,g as S,r as f}from"./index.e2874b00.js";const k={data(){return{search:"",allcustomer:[],showsearch:!1,caris:[],role:"",customerDetails:{emailAddress:"",subOrganisationCode:"",organizationCode:"",firstName:"",lastName:"",middleName:"",gender:"",unit:""}}},async mounted(){this.role=localStorage.getItem("role");const r=await m.get("api/Users/profile",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.customerDetails=r.data.result;const l=await m.get("api/Customer/allcustomer",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.allcustomer=l.data.result,setTimeout(()=>{$("#datatable").DataTable({lengthMenu:[[5,10,25,50,-1],[5,10,25,50,"All"]],pageLength:10,language:{searchPlaceholder:"Enter NIN, BVN or Full Name"}})})},methods:{async searchCustomer(){await m.get("api/Customer/search?search="+this.search,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then(r=>{this.caris=r.data.result,this.search="",this.showsearch=!0}).catch(r=>{console.log(r)})}}},A={id:"layout-wrapper"},E={class:"main-content"},T={class:"page-content"},V={class:"container-fluid"},I={class:"row"},D={class:"col-12"},B={class:"page-title-box d-flex align-items-center justify-content-between"},M={class:"mb-0"},O={style:{"font-size":"14px","font-weight":"500"}},L=C(),U={style:{"font-size":"14px","font-weight":"500"}},P={class:"page-title-right"},z={class:"breadcrumb m-0"},F={class:"breadcrumb-item"},R=C("Home"),Y=s("li",{class:"breadcrumb-item active"},"Customer Search",-1),H={class:"row"},j={class:"col-md-4"},G={class:"card"},q=s("h5",{class:"pt-3 pb-3 pl-3 pr-3"},"Customer Search",-1),J={class:"card-body table-responsive border-top"},K={class:"mb-3"},Q={class:"mb-3"},W={class:"mb-3"},X=s("div",{class:"mb-3"},[s("button",{class:"btn btn-outline-success"},"Search")],-1),Z={class:"col-md-8"},ss={key:0,class:"card"},es={class:"card-body table-responsive"},ts={class:"row"},os=s("div",{class:"col-md-6"},null,-1),ls={class:"col-md-6"},as={class:"d-flex"},ds=s("button",{class:"btn btn-outline-success"},"Search",-1),rs=s("hr",null,null,-1),cs={id:"datatable",class:"table table-bordered dt-responsive nowrap",style:{"border-collapse":"collapse","border-spacing":"0",width:"100%"}},ns=s("thead",null,[s("tr",null,[s("th",null,"CUSTOMER CODE"),s("th",null,"CUSTOMER TYPE"),s("th",null,"CUSTOMER NAME"),s("th",null,"NATIONAL IDENTITY NUMBER"),s("th",null,"MOBILE NUMBER"),s("th",null,"STATE CODE"),s("th",null,"ACTION")])],-1),is={key:0,class:"text-center"},us=s("td",{colspan:"7"},[s("h3",{style:{color:"red"}},"Customer Not Found!")],-1),_s=[us],hs={key:0},ms={key:1},bs=s("button",{class:"btn btn-outline-success btn-sm mr-2"},"View Profile",-1),ps={key:1,class:"card"},vs=s("h5",{class:"pt-3 pb-3 pl-3 pr-3"},"Recent Search",-1),gs={class:"card-body table-responsive border-top"},fs={id:"datatable",class:"table table-bordered dt-responsive nowrap",style:{"border-collapse":"collapse","border-spacing":"0",width:"100%"}},Cs=s("thead",null,[s("tr",null,[s("th",null,"Customer Number"),s("th",null,"Customer Name"),s("th",null,"Action")])],-1),Ns=["data-target"],ys=["id"],ws={class:"modal-dialog modal-dialog-centered modal-lg"},xs={class:"modal-content"},Ss=s("div",{class:"modal-header"},[s("h5",{id:"myLargeModalLabel",class:"modal-title mt-0"},"Customer Information"),s("button",{type:"button",class:"close","data-dismiss":"modal","aria-label":"Close"},[s("span",{"aria-hidden":"true"},"\xD7")])],-1),ks={class:"modal-body"},As={class:"row"},Es={class:"col-md-3 mb-4"},Ts={class:"form-group"},Vs=s("label",{class:"control-label"},"Customer Code",-1),Is={class:"col-md-3 mb-4"},Ds={class:"form-group"},Bs=s("label",{class:"control-label"},"Customer Name",-1),Ms={class:"col-md-3 mb-4"},Os={class:"form-group"},Ls=s("label",{class:"control-label"},"Email Address",-1),Us={class:"col-md-3 mb-4"},Ps={class:"form-group"},zs=s("label",{class:"control-label"},"Phone Number",-1),Fs={class:"col-md-3 mb-4"},Rs={class:"form-group"},Ys=s("label",{class:"control-label"},"Phone Number (2)",-1),Hs={class:"col-md-3 mb-4"},js={class:"form-group"},Gs=s("label",{class:"control-label"},"Address",-1),qs={class:"col-md-3 mb-4"},Js={class:"form-group"},Ks=s("label",{class:"control-label"},"State",-1),Qs={class:"col-md-3 mb-4"},Ws={class:"form-group"},Xs=s("label",{class:"control-label"},"LGA",-1),Zs=s("hr",null,null,-1),$s=s("button",{type:"button",class:"btn btn-outline-success","data-dismiss":"modal"},"View Profile",-1),se=S('<footer class="footer"><div class="container-fluid"><div class="row"><div class="col-sm-6"> BackOffice 0.1 \xA9 2022 </div><div class="col-sm-6"><div class="text-sm-right d-none d-sm-block"> Powered by Intelligence </div></div></div></div></footer>',1);function ee(r,l,N,oe,o,i){const h=f("router-link"),y=f("router-view");return a(),d(p,null,[s("div",A,[s("div",E,[s("div",T,[s("div",V,[s("div",I,[s("div",D,[s("div",B,[s("h4",M,[s("span",O,t(o.customerDetails.organizationCode)+" // "+t(o.customerDetails.subOrganisationCode)+" //",1),L,s("span",U,t(o.customerDetails.lastName)+" "+t(o.customerDetails.firstName)+" // "+t(this.role),1)]),s("div",P,[s("ol",z,[s("li",F,[c(h,{to:"/dashboard"},{default:b(()=>[R]),_:1})]),Y])])])])]),s("div",H,[s("div",j,[s("div",G,[q,s("div",J,[s("form",{onSubmit:l[3]||(l[3]=v((...e)=>i.searchCustomer&&i.searchCustomer(...e),["prevent"]))},[s("div",K,[u(s("input",{class:"form-control mr-3",type:"text","onUpdate:modelValue":l[0]||(l[0]=e=>o.search=e),placeholder:"First Name"},null,512),[[_,o.search]])]),s("div",Q,[u(s("input",{class:"form-control mr-3",type:"text","onUpdate:modelValue":l[1]||(l[1]=e=>o.search=e),placeholder:"Last Name"},null,512),[[_,o.search]])]),s("div",W,[u(s("input",{class:"form-control mr-3",type:"text","onUpdate:modelValue":l[2]||(l[2]=e=>o.search=e),placeholder:"Phone Number"},null,512),[[_,o.search]])]),X],32)])])]),s("div",Z,[o.showsearch==!0?(a(),d("div",ss,[s("div",es,[s("div",null,[s("form",{onSubmit:l[5]||(l[5]=v((...e)=>i.searchCustomer&&i.searchCustomer(...e),["prevent"]))},[s("div",ts,[os,s("div",ls,[s("div",as,[u(s("input",{class:"form-control mr-3",type:"text","onUpdate:modelValue":l[4]||(l[4]=e=>o.search=e),placeholder:"Enter NIN or BVN or Fullname"},null,512),[[_,o.search]]),ds])])])],32)]),rs,s("table",cs,[ns,s("tbody",null,[o.caris.length?n("",!0):(a(),d("tr",is,_s)),(a(!0),d(p,null,g(o.caris,e=>(a(),d("tr",{key:e.id},[s("td",null,t(e.customerCode),1),e.customerTYpe==10?(a(),d("td",hs," Individual ")):n("",!0),e.customerTYpe==11?(a(),d("td",ms," Corporate ")):n("",!0),s("td",null,t(e.firstname)+" "+t(e.lastname),1),s("td",null,t(e.nin),1),s("td",null,t(e.mobileNumber1)+", "+t(e.mobileNumber2),1),s("td",null,t(e.stateCode),1),s("td",null,[c(h,{to:"/customer-details/"+e.customerCode},{default:b(()=>[bs]),_:2},1032,["to"])])]))),128))])])])])):n("",!0),o.showsearch==!1?(a(),d("div",ps,[vs,s("div",gs,[s("table",fs,[Cs,s("tbody",null,[(a(!0),d(p,null,g(o.allcustomer,e=>(a(),d("tr",{key:e.id},[s("td",null,t(e.customerCode),1),s("td",null,t(e.firstname)+" "+t(e.lastname),1),s("td",null,[s("button",{class:"btn btn-outline-success btn-sm mr-2","data-toggle":"modal","data-target":"#bs-example-modal-lg-"+e.customerCode},"View Details",8,Ns)]),s("div",{class:"modal fade",id:"bs-example-modal-lg-"+e.customerCode,tabindex:"-1",role:"dialog","aria-labelledby":"myLargeModalLabel","aria-hidden":"true"},[s("div",ws,[s("div",xs,[Ss,s("div",ks,[s("div",As,[s("div",Es,[s("div",Ts,[Vs,s("h5",null,t(e.customerCode),1)])]),s("div",Is,[s("div",Ds,[Bs,s("h5",null,t(e.firstname)+" "+t(e.lastname),1)])]),s("div",Ms,[s("div",Os,[Ls,s("h5",null,t(e.emailAddress),1)])]),s("div",Us,[s("div",Ps,[zs,s("h5",null,t(e.mobileNumber1),1)])]),s("div",Fs,[s("div",Rs,[Ys,s("h5",null,t(e.mobileNumber2),1)])]),s("div",Hs,[s("div",js,[Gs,s("h5",null,t(e.contactAddress),1)])]),s("div",qs,[s("div",Js,[Ks,s("h5",null,t(e.stateCode),1)])]),s("div",Qs,[s("div",Ws,[Xs,s("h5",null,t(e.lgaCode),1)])])]),Zs,c(h,{to:"/customer-details/"+e.customerCode},{default:b(()=>[$s]),_:2},1032,["to"])])])])],8,ys)]))),128))])])])])):n("",!0)])])])]),se])]),c(y)],64)}var te=x(k,[["render",ee]]);const de={__name:"CustomerSearchView",setup(r){return(l,N)=>(a(),d("main",null,[c(w),c(te)]))}};export{de as default};
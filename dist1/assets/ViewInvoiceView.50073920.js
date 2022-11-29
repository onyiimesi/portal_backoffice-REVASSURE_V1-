import{H as f}from"./Header.61007050.js";import{_ as w,a as h,o as i,c as a,b as s,t as o,d as t,w as n,e as y,s as v,F as u,k as C,f as c,h as p,r as m}from"./index.a5d27921.js";const x={name:"viewinvoices",data(){return{name:"",allinvoice:[],role:"",customerDetails:{emailAddress:"",subOrganisationCode:"",organizationCode:"",firstName:"",lastName:"",middleName:"",gender:"",unit:""},loaderDiv:"",mainDiv:"d-none",roles:"billing-oficer",roless:"revenue-officer"}},async mounted(){this.role=localStorage.getItem("role"),this.roles!=this.role&&this.roless!=this.role&&(localStorage.removeItem("token"),this.$router.push("/"));const r=await h.get("api/Users/profile",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.customerDetails=r.data.result;const _=await h.get("api/Invoice/"+this.customerDetails.organizationCode,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.allinvoice=_.data.result,this.loaderDiv="d-none",this.mainDiv="",setTimeout(()=>{$("#datatable").DataTable({lengthMenu:[[5,10,25,50,-1],[5,10,25,50,"All"]],pageLength:10,retrieve:!0})})}},D={id:"layout-wrapper"},V={class:"main-content"},k={class:"page-content"},I={class:"container-fluid"},N={class:"row"},S={class:"col-12"},A={class:"page-title-box d-flex align-items-center justify-content-between"},B={class:"mb-0"},z=c("View Bills "),L=s("br",null,null,-1),H=c(),M={style:{"font-size":"14px","font-weight":"500"}},O=c(),T={style:{"font-size":"14px","font-weight":"500"}},F={class:"page-title-right"},P={class:"breadcrumb m-0"},j={class:"breadcrumb-item"},E=c("Home"),U=s("li",{class:"breadcrumb-item active"},"View Bills",-1),q={class:"row"},G={class:"col-12"},J={class:"card"},K={class:"card-body table-responsive"},Q={key:0,class:"mb-4 text-right"},R=s("i",{class:"fa fa-plus"},null,-1),W=c(" Create Bill"),X=p('<div class="ph-item"><div class="ph-col-12"><div class="ph-row"><div class="ph-col-4"></div><div class="ph-col-8 empty"></div><div class="ph-col-6"></div><div class="ph-col-6 empty"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div></div><div class="ph-row"><div class="ph-col-4"></div><div class="ph-col-8 empty"></div><div class="ph-col-6"></div><div class="ph-col-6 empty"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div></div></div></div>',1),Y=[X],Z={id:"datatable",class:"table table-bordered dt-responsive nowrap",style:{"border-collapse":"collapse","border-spacing":"0",width:"100%"}},ss=s("thead",null,[s("tr",null,[s("th",null,"#Invoice"),s("th",null,"Customer Number"),s("th",null,"Currency"),s("th",null,"Amount"),s("th",null,"Payment Status"),s("th",null,"Action")])],-1),os=s("button",{class:"btn btn-outline-success"},"View",-1),es=["id"],ts={class:"modal-dialog modal-dialog-centered modal-lg"},ls={class:"modal-content"},is=s("div",{class:"modal-header"},[s("h5",{id:"myLargeModalLabel",class:"modal-title mt-0"},"View Invoice"),s("button",{type:"button",class:"close","data-dismiss":"modal","aria-label":"Close"},[s("span",{"aria-hidden":"true"},"\xD7")])],-1),as={class:"modal-body"},cs={class:"row"},ds={class:"col-6 col-md-3 mb-4"},ns={class:"form-group"},rs=s("label",{class:"control-label"},"Invoice Code",-1),_s={class:"col-6 col-md-3 mb-4"},hs={class:"form-group"},vs=s("label",{class:"control-label"},"Customer Code",-1),us={class:"col-6 col-md-3 mb-4"},ms={class:"form-group"},ps=s("label",{class:"control-label"},"Curency Code",-1),bs={class:"col-6 col-md-3 mb-4"},gs={class:"form-group"},fs=s("label",{class:"control-label"},"Amount",-1),ws={class:"col-6 col-md-3 mb-4"},ys={class:"form-group"},Cs=s("label",{class:"control-label"},"Status",-1),xs=s("hr",null,null,-1),Ds=s("button",{class:"btn btn-outline-success","data-dismiss":"modal"},"View Invoice",-1),Vs=p('<footer class="footer"><div class="container-fluid"><div class="row"><div class="col-sm-6"> BackOffice 0.1 \xA9 2022 </div><div class="col-sm-6"><div class="text-sm-right d-none d-sm-block"> Powered by Intelligence </div></div></div></div></footer>',1);function ks(r,_,b,Ns,l,Ss){const d=m("router-link"),g=m("router-view");return i(),a(u,null,[s("div",D,[s("div",V,[s("div",k,[s("div",I,[s("div",N,[s("div",S,[s("div",A,[s("h4",B,[z,L,H,s("span",M,o(l.customerDetails.organizationCode)+" // "+o(l.customerDetails.subOrganisationCode)+" //",1),O,s("span",T,o(l.customerDetails.lastName)+" "+o(l.customerDetails.firstName)+" // "+o(this.role),1)]),s("div",F,[s("ol",P,[s("li",j,[t(d,{to:"/dashboard"},{default:n(()=>[E]),_:1})]),U])])])])]),s("div",q,[s("div",G,[s("div",J,[s("div",K,[l.role==="billing-oficer"?(i(),a("div",Q,[t(d,{class:"btn btn-outline-success",to:"/create-bill"},{default:n(()=>[R,W]),_:1})])):y("",!0),s("div",{class:v(this.loaderDiv)},Y,2),s("div",{class:v(this.mainDiv)},[s("table",Z,[ss,s("tbody",null,[(i(!0),a(u,null,C(l.allinvoice,e=>(i(),a("tr",{key:e.id},[s("td",null,o(e.invoiceCode),1),s("td",null,o(e.customerCode),1),s("td",null,o(e.currencyCode),1),s("td",null,o(e.invoiceAmount),1),s("td",null,o(e.paymentStatus),1),s("td",null,[t(d,{to:"/bills/"+e.invoiceCode},{default:n(()=>[os]),_:2},1032,["to"])]),s("div",{class:"modal fade",id:"bs-example-modal-lg-"+e.invoiceCode,tabindex:"-1",role:"dialog","aria-labelledby":"myLargeModalLabel","aria-hidden":"true"},[s("div",ts,[s("div",ls,[is,s("div",as,[s("div",cs,[s("div",ds,[s("div",ns,[rs,s("h5",null,o(e.invoiceCode),1)])]),s("div",_s,[s("div",hs,[vs,s("h5",null,o(e.customerCode),1)])]),s("div",us,[s("div",ms,[ps,s("h5",null,o(e.currencyCode),1)])]),s("div",bs,[s("div",gs,[fs,s("h5",null,o(e.invoiceAmount),1)])]),s("div",ws,[s("div",ys,[Cs,s("h5",null,o(e.paymentStatus),1)])])]),xs,t(d,{to:"/bills/"+e.invoiceCode},{default:n(()=>[Ds]),_:2},1032,["to"])])])])],8,es)]))),128))])])],2)])])])])])]),Vs])]),t(g)],64)}var Is=w(x,[["render",ks]]);const zs={__name:"ViewInvoiceView",setup(r){return(_,b)=>(i(),a("main",null,[t(f),t(Is)]))}};export{zs as default};
import{H as m}from"./Header.747f91be.js";import{_ as h,a as p,o as s,c as a,b as t,F as l,j as k,d as c,f as r,r as i,t as n,w as f}from"./index.06a914a2.js";const B={name:"bankaccounts",data(){return{name:"",bankAccounts:[]}},async mounted(){const o=await p.get("api/BankAccounts/bankAccounts",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.bankAccounts=o.data.result}},w={id:"layout-wrapper"},g={class:"main-content"},A={class:"page-content"},x={class:"container-fluid"},y=r('<div class="row"><div class="col-12"><div class="page-title-box d-flex align-items-center justify-content-between"><h4 class="mb-0">Bank Balances</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li><li class="breadcrumb-item active">Bank Balances</li></ol></div></div></div></div>',1),N={class:"row"},C={class:"col-12"},I={class:"card"},V={class:"card-body table-responsive"},$={id:"datatable",class:"table table-bordered dt-responsive nowrap",style:{"border-collapse":"collapse","border-spacing":"0",width:"100%"}},j=t("thead",null,[t("tr",null,[t("th",null,"Bank Code"),t("th",null,"Bank Name"),t("th",null,"Bank Account Number"),t("th",null,"Action")])],-1),S=t("button",{class:"btn btn-success mr-2"},"Edit",-1),E=r('<footer class="footer"><div class="container-fluid"><div class="row"><div class="col-sm-6"> BackOffice 0.1 \xA9 2022 </div><div class="col-sm-6"><div class="text-sm-right d-none d-sm-block"> Powered by Intelligence </div></div></div></div></footer>',1);function F(o,d,u,O,_,z){const b=i("router-link"),v=i("router-view");return s(),a(l,null,[t("div",w,[t("div",g,[t("div",A,[t("div",x,[y,t("div",N,[t("div",C,[t("div",I,[t("div",V,[t("table",$,[j,t("tbody",null,[(s(!0),a(l,null,k(_.bankAccounts,e=>(s(),a("tr",{key:e.bctId},[t("td",null,n(e.bctBankCode),1),t("td",null,n(e.bctAccountName),1),t("td",null,n(e.bctAccountNumber),1),t("td",null,[c(b,{to:"/edit-bank-account/"+e.bctId},{default:f(()=>[S]),_:2},1032,["to"])])]))),128))])])])])])])])]),E])]),c(v)],64)}var H=h(B,[["render",F]]);const P={__name:"BankAccountsView",setup(o){return(d,u)=>(s(),a("main",null,[c(m),c(H)]))}};export{P as default};

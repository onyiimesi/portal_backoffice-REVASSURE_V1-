import{H as A}from"./Header.47845ea9.js";import{_ as N,a as d,u as B,o as n,c as a,b as t,t as r,d as i,w,F as u,j as b,e as p,k as x,l as _,v as m,f as l,g as y,r as k}from"./index.e2874b00.js";const I={name:"editbankaccount",data(){return{errors:[],message:[],bankAccounts:{bctId:"",accountName:"",accountNumber:""},role:"",customerDetails:{emailAddress:"",subOrganisationCode:"",organizationCode:"",firstName:"",lastName:"",middleName:"",gender:"",unit:""}}},async mounted(){this.role=localStorage.getItem("role");const c=await d.get("api/Users/profile",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.customerDetails=c.data.result;const e=await d.get("api/BankAccounts/details/"+this.$route.params.bctId,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.bankAccounts=e.data.result},methods:{async editBankAccount(){this.errors=[],this.message=[];const c=B();this.accountName||c.error("Bank Account Name required."),this.accountNumber||c.error("Bank Account Number required.");const e=await d.put("api/BankAccounts/edit",{bankAccountctId:this.bankAccounts.bankAccountctId,accountName:this.bankAccounts.accountName,accountNumber:this.bankAccounts.accountNumber},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});e?c.success(e.data.message):c.error("Incorrect Parameter")}}},D={id:"layout-wrapper"},V={class:"main-content"},z={class:"page-content"},C={class:"container-fluid"},S={class:"row"},E={class:"col-12"},U={class:"page-title-box d-flex align-items-center justify-content-between"},H={class:"mb-0"},O=l("Edit Bank Account "),P=t("br",null,null,-1),T=l(),j={style:{"font-size":"14px","font-weight":"500"}},q=l(" // "),F={style:{"font-size":"14px","font-weight":"500"}},M={class:"page-title-right"},L={class:"breadcrumb m-0"},G={class:"breadcrumb-item"},J=l("Home"),K=t("li",{class:"breadcrumb-item active"},"Edit Bank Account",-1),Q={class:"row"},R={class:"col-12"},W={class:"card"},X={class:"card-body table-responsive"},Y={key:0,class:"alert alert-danger"},Z=t("b",null,"Please correct the following error(s):",-1),$={key:1,class:"alert alert-success"},tt={class:"row"},et={class:"col-md-4"},st={class:"form-group"},ot=t("label",{class:"control-label"},"Bank ID",-1),ct={class:"col-md-4"},nt={class:"form-group"},at=t("label",{class:"control-label"},"Bank Account Name",-1),rt={class:"col-md-4"},it={class:"form-group"},lt=t("label",{class:"control-label"},"Bank Account Number",-1),dt=t("button",{class:"btn btn-outline-success mt-4"},"Edit",-1),ut=y('<footer class="footer"><div class="container-fluid"><div class="row"><div class="col-sm-6"> BackOffice 0.1 \xA9 2022 </div><div class="col-sm-6"><div class="text-sm-right d-none d-sm-block"> Powered by Intelligence </div></div></div></div></footer>',1);function _t(c,e,v,ht,s,h){const g=k("router-link"),f=k("router-view");return n(),a(u,null,[t("div",D,[t("div",V,[t("div",z,[t("div",C,[t("div",S,[t("div",E,[t("div",U,[t("h4",H,[O,P,T,t("span",j,r(s.customerDetails.organizationCode)+" // "+r(s.customerDetails.subOrganisationCode),1),q,t("span",F,r(s.customerDetails.lastName)+" "+r(s.customerDetails.firstName)+" // "+r(this.role),1)]),t("div",M,[t("ol",L,[t("li",G,[i(g,{to:"/dashboard"},{default:w(()=>[J]),_:1})]),K])])])])]),t("div",Q,[t("div",R,[t("div",W,[t("div",X,[s.errors.length?(n(),a("div",Y,[Z,t("ul",null,[(n(!0),a(u,null,b(s.errors,o=>(n(),a("li",null,r(o),1))),256))])])):p("",!0),s.message.length?(n(),a("div",$,[(n(!0),a(u,null,b(s.message,o=>(n(),a("strong",null,r(o),1))),256))])):p("",!0),t("form",{onSubmit:e[3]||(e[3]=x((...o)=>h.editBankAccount&&h.editBankAccount(...o),["prevent"]))},[t("div",tt,[t("div",et,[t("div",st,[ot,_(t("input",{class:"form-control",type:"text","onUpdate:modelValue":e[0]||(e[0]=o=>s.bankAccounts.bankAccountctId=o)},null,512),[[m,s.bankAccounts.bankAccountctId]])])]),t("div",ct,[t("div",nt,[at,_(t("input",{class:"form-control",type:"text","onUpdate:modelValue":e[1]||(e[1]=o=>s.bankAccounts.accountName=o)},null,512),[[m,s.bankAccounts.accountName]])])]),t("div",rt,[t("div",it,[lt,_(t("input",{class:"form-control",type:"text","onUpdate:modelValue":e[2]||(e[2]=o=>s.bankAccounts.accountNumber=o)},null,512),[[m,s.bankAccounts.accountNumber]])])])]),dt],32)])])])])])]),ut])]),i(f)],64)}var mt=N(I,[["render",_t]]);const kt={__name:"EditBankAccountView",setup(c){return(e,v)=>(n(),a("main",null,[i(A),i(mt)]))}};export{kt as default};

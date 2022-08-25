import{H as f}from"./Header.747f91be.js";import{_ as g,a as m,o as c,c as n,b as t,F as r,j as _,e as b,k as A,l as i,v as l,d,f as h,r as B,t as v}from"./index.06a914a2.js";const N={name:"editbankaccount",data(){return{errors:[],message:[],bankAccounts:{bctId:"",accountName:"",accountNumber:""}}},async mounted(){const a=await m.get("api/BankAccounts/details/"+this.$route.params.bctId,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.bankAccounts=a.data.result},methods:{async editBankAccount(){this.errors=[],this.message=[];const a=await m.put("api/BankAccounts/edit",{bankAccountctId:this.bankAccounts.bankAccountctId,accountName:this.bankAccounts.accountName,accountNumber:this.bankAccounts.accountNumber},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});a?this.message.push(a.data.message):this.errors.push("Incorrect Parameter")}}},w={id:"layout-wrapper"},x={class:"main-content"},y={class:"page-content"},I={class:"container-fluid"},V=h('<div class="row"><div class="col-12"><div class="page-title-box d-flex align-items-center justify-content-between"><h4 class="mb-0">Edit Bank Account</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li><li class="breadcrumb-item active">Edit Bank Account</li></ol></div></div></div></div>',1),S={class:"row"},E={class:"col-12"},j={class:"card"},D={class:"card-body table-responsive"},P={key:0,class:"alert alert-danger"},U=t("b",null,"Please correct the following error(s):",-1),z={key:1,class:"alert alert-success"},C={class:"row"},F={class:"col-md-12"},H={class:"form-group"},M=t("label",{class:"control-label"},"Bank ID",-1),O={class:"col-md-12"},L={class:"form-group"},T=t("label",{class:"control-label"},"Bank Account Name",-1),q={class:"col-md-12"},G={class:"form-group"},J=t("label",{class:"control-label"},"Bank Account Number",-1),K=t("button",{class:"btn btn-success mr-4 float-left"},"Save",-1),Q=h('<footer class="footer"><div class="container-fluid"><div class="row"><div class="col-sm-6"> BackOffice 0.1 \xA9 2022 </div><div class="col-sm-6"><div class="text-sm-right d-none d-sm-block"> Powered by Intelligence </div></div></div></div></footer>',1);function R(a,o,p,X,e,u){const k=B("router-view");return c(),n(r,null,[t("div",w,[t("div",x,[t("div",y,[t("div",I,[V,t("div",S,[t("div",E,[t("div",j,[t("div",D,[e.errors.length?(c(),n("div",P,[U,t("ul",null,[(c(!0),n(r,null,_(e.errors,s=>(c(),n("li",null,v(s),1))),256))])])):b("",!0),e.message.length?(c(),n("div",z,[(c(!0),n(r,null,_(e.message,s=>(c(),n("strong",null,v(s),1))),256))])):b("",!0),t("form",{onSubmit:o[3]||(o[3]=A((...s)=>u.editBankAccount&&u.editBankAccount(...s),["prevent"]))},[t("div",C,[t("div",F,[t("div",H,[M,i(t("input",{class:"form-control",type:"text","onUpdate:modelValue":o[0]||(o[0]=s=>e.bankAccounts.bankAccountctId=s)},null,512),[[l,e.bankAccounts.bankAccountctId]])])]),t("div",O,[t("div",L,[T,i(t("input",{class:"form-control",type:"text","onUpdate:modelValue":o[1]||(o[1]=s=>e.bankAccounts.accountName=s)},null,512),[[l,e.bankAccounts.accountName]])])]),t("div",q,[t("div",G,[J,i(t("input",{class:"form-control",type:"text","onUpdate:modelValue":o[2]||(o[2]=s=>e.bankAccounts.accountNumber=s)},null,512),[[l,e.bankAccounts.accountNumber]])])])]),K],32)])])])])])]),Q])]),d(k)],64)}var W=g(N,[["render",R]]);const $={__name:"EditBankAccountView",setup(a){return(o,p)=>(c(),n("main",null,[d(f),d(W)]))}};export{$ as default};

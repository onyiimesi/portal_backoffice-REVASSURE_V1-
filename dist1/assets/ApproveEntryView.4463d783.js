import{H as v}from"./Header.61007050.js";import{_ as g,a as i,u as f,o as m,c as u,b as t,t as a,l as y,n,v as l,d as c,F as w,f as b,h as p,r as k}from"./index.a5d27921.js";const x={name:"setupworkflow",data(){return{errors:[],message:[],entry:{entryValue:"",initiatorComment:""},customerDetails:{id:"",emailAddress:"",subOrganisationCode:"",organizationCode:"",firstName:"",lastName:"",middleName:"",gender:""},role:""}},async mounted(){this.role=localStorage.getItem("role");const s=await i.get("api/Users/profile",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.customerDetails=s.data.result;const e=await i.get("api/WorkFlowEntry/Entries"+this.$route.params.workFlowEntryID,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.entry=e.data.result},methods:{async getActions(s){const e=await i.get("api/ModuleAction/getactions/"+s.target.value,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.moduleactions=e.data.result},async approveEntry(){const s=f();if(this.action||s.error("Item required."),!this.description)s.error("Description required.");else{const e=await i.post("api/WorkFlowItem/AddItem",{action:this.action,module:this.module,organizationCode:this.customerDetails.organizationCode,description:this.description},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});e?(s.success(e.data.message),this.action="",this.module="",this.description=""):s.error("Incorrect Parameter")}}}},A={id:"layout-wrapper"},E={class:"main-content"},V={class:"page-content"},C={class:"container-fluid"},D={class:"row"},I={class:"col-12"},z={class:"page-title-box d-flex align-items-center justify-content-between"},B={class:"mb-0"},N=b("Approve Entry, "),S={style:{"font-size":"14px","font-weight":"500"}},F=p('<div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li><li class="breadcrumb-item active">Approve Entry</li></ol></div>',1),U={class:"row"},M={class:"col-lg-12"},O={class:"card"},T={class:"card-body"},j={class:"form-group"},q={class:"row"},H={class:"col-md-12 mb-4"},P={class:"form-group"},W=t("label",{class:"control-label"},"Entry Value",-1),G={class:"col-md-12 mb-4"},J={class:"form-group"},K=t("label",{class:"control-label"},"Comment",-1),L=t("div",{class:"row"},[t("div",{class:"col-md-12"},[t("div",{class:"form-group"},[t("button",{class:"btn btn-success mr-4"},"Approve")])])],-1),Q=p('<footer class="footer"><div class="container-fluid"><div class="row"><div class="col-sm-6"> BackOffice 0.1 \xA9 2022 </div><div class="col-sm-6"><div class="text-sm-right d-none d-sm-block"> Powered by Intelligence </div></div></div></div></footer>',1);function R(s,e,_,Y,o,d){const h=k("router-view");return m(),u(w,null,[t("div",A,[t("div",E,[t("div",V,[t("div",C,[t("div",D,[t("div",I,[t("div",z,[t("h4",B,[N,t("span",S,a(o.customerDetails.lastName)+" "+a(o.customerDetails.firstName)+" - "+a(this.role),1)]),F])])]),t("div",U,[t("div",M,[t("div",O,[t("div",T,[t("form",{onSubmit:e[3]||(e[3]=y((...r)=>d.approveEntry&&d.approveEntry(...r),["prevent"]))},[t("div",j,[n(t("input",{class:"form-control",type:"hidden","onUpdate:modelValue":e[0]||(e[0]=r=>o.customerDetails.organizationCode=r)},null,512),[[l,o.customerDetails.organizationCode]])]),t("div",q,[t("div",H,[t("div",P,[W,n(t("input",{type:"text",class:"form-control","onUpdate:modelValue":e[1]||(e[1]=r=>o.entry.entryValue=r)},null,512),[[l,o.entry.entryValue]])])]),t("div",G,[t("div",J,[K,n(t("textarea",{"onUpdate:modelValue":e[2]||(e[2]=r=>o.entry.initiatorComment=r),class:"form-control",id:"",cols:"30",rows:"10"},null,512),[[l,o.entry.initiatorComment]])])])]),L],32)])])])])])]),Q])]),c(h)],64)}var X=g(x,[["render",R]]);const tt={__name:"ApproveEntryView",setup(s){return(e,_)=>(m(),u("main",null,[c(v),c(X)]))}};export{tt as default};

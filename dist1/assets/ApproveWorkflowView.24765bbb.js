import{H as b}from"./Header.47845ea9.js";import{_ as k,a as n,u as R,o as r,c as l,b as e,t as a,k as I,l as c,v as f,n as _,F as d,j as u,d as p,f as A,g,r as C}from"./index.e2874b00.js";const D={name:"approveworkflow",data(){return{errors:[],message:[],workflow:[],approval:[],roles:[],item:"",initiatorRole:"",verifierRole:"",condition:"",customerDetails:{id:"",emailAddress:"",subOrganisationCode:"",organizationCode:"",firstName:"",lastName:"",middleName:"",gender:""},role:""}},async mounted(){this.role=localStorage.getItem("role");const i=await n.get("api/Users/profile",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.customerDetails=i.data.result;const t=await n.get("api/WorkFlowItem/Items/"+this.customerDetails.organizationCode,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.workflow=t.data.result;const m=await n.get("api/WorkFlowApproval/Approvals/"+this.customerDetails.organizationCode,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.approval=m.data.result,setTimeout(()=>{$("#datatable").DataTable({lengthMenu:[[5,10,25,50,-1],[5,10,25,50,"All"]],pageLength:10})});const v=await n.get("api/roles/allroles",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.roles=v.data.result},methods:{async approveWorkflow(){const i=R();if(this.item||i.error("Item required."),this.initiatorRole||i.error("Initiator Role required."),this.verifierRole||i.error("Verifier Role required."),!this.condition)i.error("Condition required.");else{const t=await n.post("api/WorkFlowApproval/AddItem",{item:this.item,organizationCode:this.customerDetails.organizationCode,initiatorRole:this.initiatorRole,verifierRole:this.verifierRole,condition:this.condition},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});t?(i.success(t.data.message),this.item="",this.initiatorRole="",this.verifierRole="",this.condition=""):i.error("Incorrect Parameter")}}}},z={id:"layout-wrapper"},V={class:"main-content"},x={class:"page-content"},y={class:"container-fluid"},N={class:"row"},B={class:"col-12"},S={class:"page-title-box d-flex align-items-center justify-content-between"},W={class:"mb-0"},F=A("Approval Workflow, "),U={style:{"font-size":"14px","font-weight":"500"}},T=g('<div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li><li class="breadcrumb-item active">Approval Workflow</li></ol></div>',1),q={class:"row"},M={class:"col-lg-6"},j={class:"card"},O={class:"card-body"},H={class:"form-group"},L={class:"row"},P={class:"col-md-12"},E={class:"form-group"},G=e("label",{class:"control-label"},"Item",-1),J=["value"],K={class:"col-md-12"},Q={class:"form-group"},X=e("label",{class:"control-label"},"Initiator Role",-1),Y=["value"],Z={class:"col-md-12"},ee={class:"form-group"},oe=e("label",{class:"control-label"},"Verifier Role",-1),te=["value"],se={class:"col-md-12"},ie={class:"form-group"},re=e("label",{class:"control-label"},"Condition",-1),le=e("div",{class:"row"},[e("div",{class:"col-md-12"},[e("div",{class:"form-group"},[e("button",{class:"btn btn-success mr-4"},"Create")])])],-1),ae={class:"col-lg-6"},ne={class:"card"},ce={class:"card-body table-responsive"},de={id:"datatable",class:"table table-bordered dt-responsive nowrap",style:{"border-collapse":"collapse","border-spacing":"0",width:"100%"}},ue=e("thead",null,[e("tr",null,[e("th",null,"Initiator"),e("th",null,"Verifier"),e("th",null,"Condition")])],-1),me=g('<footer class="footer"><div class="container-fluid"><div class="row"><div class="col-sm-6"> BackOffice 0.1 \xA9 2022 </div><div class="col-sm-6"><div class="text-sm-right d-none d-sm-block"> Powered by Intelligence </div></div></div></div></footer>',1);function _e(i,t,m,v,s,h){const w=C("router-view");return r(),l(d,null,[e("div",z,[e("div",V,[e("div",x,[e("div",y,[e("div",N,[e("div",B,[e("div",S,[e("h4",W,[F,e("span",U,a(s.customerDetails.lastName)+" "+a(s.customerDetails.firstName)+" - "+a(this.role),1)]),T])])]),e("div",q,[e("div",M,[e("div",j,[e("div",O,[e("form",{onSubmit:t[5]||(t[5]=I((...o)=>h.approveWorkflow&&h.approveWorkflow(...o),["prevent"]))},[e("div",H,[c(e("input",{class:"form-control",type:"hidden","onUpdate:modelValue":t[0]||(t[0]=o=>s.customerDetails.organizationCode=o)},null,512),[[f,s.customerDetails.organizationCode]])]),e("div",L,[e("div",P,[e("div",E,[G,c(e("select",{"onUpdate:modelValue":t[1]||(t[1]=o=>s.item=o),class:"form-control select2"},[(r(!0),l(d,null,u(s.workflow,o=>(r(),l("option",{value:o.workFlowItemID},a(o.workFlowItemDescription),9,J))),256))],512),[[_,s.item]])])]),e("div",K,[e("div",Q,[X,c(e("select",{"onUpdate:modelValue":t[2]||(t[2]=o=>s.initiatorRole=o),class:"form-control select2"},[(r(!0),l(d,null,u(s.roles,o=>(r(),l("option",{value:o.rolCode},a(o.rolName),9,Y))),256))],512),[[_,s.initiatorRole]])])]),e("div",Z,[e("div",ee,[oe,c(e("select",{"onUpdate:modelValue":t[3]||(t[3]=o=>s.verifierRole=o),class:"form-control select2"},[(r(!0),l(d,null,u(s.roles,o=>(r(),l("option",{value:o.rolCode},a(o.rolName),9,te))),256))],512),[[_,s.verifierRole]])])]),e("div",se,[e("div",ie,[re,c(e("textarea",{"onUpdate:modelValue":t[4]||(t[4]=o=>s.condition=o),class:"form-control",id:"",cols:"30",rows:"10"},null,512),[[f,s.condition]])])])]),le],32)])])]),e("div",ae,[e("div",ne,[e("div",ce,[e("table",de,[ue,e("tbody",null,[(r(!0),l(d,null,u(s.approval,o=>(r(),l("tr",null,[e("td",null,a(o.initiatorRole),1),e("td",null,a(o.verifierRole),1),e("td",null,a(o.condition),1)]))),256))])])])])])])])]),me])]),p(w)],64)}var pe=k(D,[["render",_e]]);const fe={__name:"ApproveWorkflowView",setup(i){return(t,m)=>(r(),l("main",null,[p(b),p(pe)]))}};export{fe as default};
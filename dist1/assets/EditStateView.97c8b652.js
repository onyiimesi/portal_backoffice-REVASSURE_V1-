import{H as b}from"./Header.747f91be.js";import{_ as S,a as n,o as a,c as o,b as t,F as l,j as m,e as u,k as w,l as _,v as h,d as c,f as p,r as N,t as v}from"./index.06a914a2.js";const y={name:"editstate",data(){return{errors:[],message:[],states:{id:"",stateName:""}}},async mounted(){const r=await n.get("api/State/state/"+this.$route.params.id,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.states=r.data.result},methods:{async editState(){this.errors=[],this.message=[],this.states.id||this.errors.push("ID required."),this.states.stateName||this.errors.push("State Name required.");const r=await n.put("api/State/editstate",{id:this.states.id,stateName:this.states.stateName},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});r?this.message.push(r.data.message):this.errors.push("Incorrect Parameter")}}},k={id:"layout-wrapper"},x={class:"main-content"},B={class:"page-content"},V={class:"container-fluid"},E=p('<div class="row"><div class="col-12"><div class="page-title-box d-flex align-items-center justify-content-between"><h4 class="mb-0">Edit State</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li><li class="breadcrumb-item active">Edit State</li></ol></div></div></div></div>',1),I={class:"row"},j={class:"col-12"},D={class:"card"},P={class:"card-body table-responsive"},q={key:0,class:"alert alert-danger"},z=t("b",null,"Please correct the following error(s):",-1),A={key:1,class:"alert alert-success"},C={class:"row"},F={class:"col-md-12"},H={class:"form-group"},M={class:"col-md-12"},O={class:"form-group"},U=t("label",{class:"control-label"},"State Name",-1),L=t("button",{class:"btn btn-success mr-4 float-left"},"Save",-1),T=p('<footer class="footer"><div class="container-fluid"><div class="row"><div class="col-sm-6"> BackOffice 0.1 \xA9 2022 </div><div class="col-sm-6"><div class="text-sm-right d-none d-sm-block"> Powered by Intelligence </div></div></div></div></footer>',1);function G(r,i,f,K,s,d){const g=N("router-view");return a(),o(l,null,[t("div",k,[t("div",x,[t("div",B,[t("div",V,[E,t("div",I,[t("div",j,[t("div",D,[t("div",P,[s.errors.length?(a(),o("div",q,[z,t("ul",null,[(a(!0),o(l,null,m(s.errors,e=>(a(),o("li",null,v(e),1))),256))])])):u("",!0),s.message.length?(a(),o("div",A,[(a(!0),o(l,null,m(s.message,e=>(a(),o("strong",null,v(e),1))),256))])):u("",!0),t("form",{onSubmit:i[2]||(i[2]=w((...e)=>d.editState&&d.editState(...e),["prevent"]))},[t("div",C,[t("div",F,[t("div",H,[_(t("input",{class:"form-control",type:"hidden","onUpdate:modelValue":i[0]||(i[0]=e=>s.states.id=e)},null,512),[[h,s.states.id]])])]),t("div",M,[t("div",O,[U,_(t("input",{class:"form-control",type:"text","onUpdate:modelValue":i[1]||(i[1]=e=>s.states.stateName=e)},null,512),[[h,s.states.stateName]])])])]),L],32)])])])])])]),T])]),c(g)],64)}var J=S(y,[["render",G]]);const W={__name:"EditStateView",setup(r){return(i,f)=>(a(),o("main",null,[c(b),c(J)]))}};export{W as default};

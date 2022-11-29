import{H as b}from"./Header.61007050.js";import{_ as w,a as d,u as N,o as a,c as r,b as e,F as l,k as m,t as u,e as g,l as L,n as _,v,d as n,h,r as k}from"./index.a5d27921.js";const y={name:"editlga",data(){return{errors:[],message:[],customerDetails:{emailAddress:"",subOrganisationCode:"",organizationCode:"",firstName:"",lastName:"",middleName:"",gender:"",unit:""},role:"",lga:{id:"",lgaName:""},roless:"revenue-officer"}},async mounted(){this.role=localStorage.getItem("role"),this.roless!=this.role&&(localStorage.removeItem("token"),this.$router.push("/"));const i=await d.get("api/Lga/lga/"+this.$route.params.lgaCode,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.lga=i.data.result},methods:{async editLGA(){this.errors=[],this.message=[];const i=N();this.lga.lgaName||i.error("LGA Name required.");const s=await d.put("api/Lga/editlga",{id:this.lga.id,lgaName:this.lga.lgaName},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});s?i.success(s.data.message):i.error("Incorrect Parameter")}}},x={id:"layout-wrapper"},A={class:"main-content"},B={class:"page-content"},G={class:"container-fluid"},S=h('<div class="row"><div class="col-12"><div class="page-title-box d-flex align-items-center justify-content-between"><h4 class="mb-0">Edit LGA</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li><li class="breadcrumb-item active">Edit LGA</li></ol></div></div></div></div>',1),V={class:"row"},E={class:"col-12"},I={class:"card"},C={class:"card-body table-responsive"},z={key:0,class:"alert alert-danger"},D=e("b",null,"Please correct the following error(s):",-1),O={key:1,class:"alert alert-success"},P={class:"row"},j={class:"col-md-12"},F={class:"form-group"},H={class:"col-md-12"},M={class:"form-group"},T=e("label",{class:"control-label"},"LGA Name",-1),U=e("button",{class:"btn btn-success mr-4 float-left"},"Edit",-1),q=h('<footer class="footer"><div class="container-fluid"><div class="row"><div class="col-sm-6"> BackOffice 0.1 \xA9 2022 </div><div class="col-sm-6"><div class="text-sm-right d-none d-sm-block"> Powered by Intelligence </div></div></div></div></footer>',1);function J(i,s,f,Q,o,c){const p=k("router-view");return a(),r(l,null,[e("div",x,[e("div",A,[e("div",B,[e("div",G,[S,e("div",V,[e("div",E,[e("div",I,[e("div",C,[o.errors.length?(a(),r("div",z,[D,e("ul",null,[(a(!0),r(l,null,m(o.errors,t=>(a(),r("li",null,u(t),1))),256))])])):g("",!0),o.message.length?(a(),r("div",O,[(a(!0),r(l,null,m(o.message,t=>(a(),r("strong",null,u(t),1))),256))])):g("",!0),e("form",{onSubmit:s[2]||(s[2]=L((...t)=>c.editLGA&&c.editLGA(...t),["prevent"]))},[e("div",P,[e("div",j,[e("div",F,[_(e("input",{class:"form-control",type:"hidden","onUpdate:modelValue":s[0]||(s[0]=t=>o.lga.id=t)},null,512),[[v,o.lga.id]])])]),e("div",H,[e("div",M,[T,_(e("input",{class:"form-control",type:"text","onUpdate:modelValue":s[1]||(s[1]=t=>o.lga.lgaName=t)},null,512),[[v,o.lga.lgaName]])])])]),U],32)])])])])])]),q])]),n(p)],64)}var K=w(y,[["render",J]]);const X={__name:"EditLgaView",setup(i){return(s,f)=>(a(),r("main",null,[n(b),n(K)]))}};export{X as default};

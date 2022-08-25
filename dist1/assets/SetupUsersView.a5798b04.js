import{H as C}from"./Header.747f91be.js";import{_ as y,a as d,o as i,c as r,b as s,d as u,w as U,F as c,j as h,e as g,k,l,v as n,n as v,f as b,r as f,t as p}from"./index.06a914a2.js";const V={name:"setupusers",data(){return{errors:[],message:[],allroles:[],allsub:[],emailAddress:"",subOrganisationCode:"",organizationCode:"",unit:"",firstName:"",lastName:"",middleName:"",gender:"",password:"",role:"",customerDetails:{emailAddress:"",subOrganisationCode:"",organizationCode:"",firstName:"",lastName:"",middleName:"",gender:"",unit:""}}},async mounted(){const a=await d.get("api/Users/profile",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.customerDetails=a.data.result;const o=await d.get("api/Item/organizations/"+this.customerDetails.organizationCode,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.allitems=o.data.result;const m=await d.get("api/roles/allroles",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.allroles=m.data.result},methods:{async onChange(a){const o=await d.get("api/SubOrganisation/suborganizations/"+a.target.value,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.allsub=o.data.result},async handleUser(){this.errors=[],this.message=[];const a=await d.post("api/Users/adduser",{emailAddress:this.emailAddress,subOrganisationCode:this.customerDetails.subOrganisationCode,organizationCode:this.customerDetails.organizationCode,unit:this.unit,firstName:this.firstName,lastName:this.lastName,middleName:this.middleName,gender:this.gender,password:this.password,role:this.role},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});a?(this.message.push(a.data.message),this.emailAddress="",this.subOrganisationCode="",this.organizationCode="",this.unit="",this.firstName="",this.lastName="",this.middleName="",this.gender="",this.password="",this.role=""):this.errors.push("Incorrect Parameter")}}},x={id:"layout-wrapper"},z={class:"main-content"},S={class:"page-content"},A={class:"container-fluid"},D=b('<div class="row"><div class="col-12"><div class="page-title-box d-flex align-items-center justify-content-between"><h4 class="mb-0">Setup Users</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li><li class="breadcrumb-item active">Setup Users</li></ol></div></div></div></div>',1),B={class:"row"},O={class:"col-lg-12"},I={class:"card"},M={class:"card-body"},F=s("button",{class:"btn btn-success"},"View Users",-1),P={class:"card"},j={class:"card-body"},E={key:0,class:"alert alert-danger"},H=s("b",null,"Please correct the following error(s):",-1),L={key:1,class:"alert alert-success"},G={class:"row"},R={class:"col-md-3"},T={class:"form-group"},q=s("label",{class:"control-label"},"Email Address",-1),J={class:"col-md-3"},K={class:"form-group"},Q=s("label",{class:"control-label"},"Unit",-1),W={class:"col-md-3"},X={class:"form-group"},Y=s("label",{class:"control-label"},"First Name",-1),Z={class:"col-md-3"},$={class:"form-group"},ss=s("label",{class:"control-label"},"Last Name",-1),es={class:"col-md-3"},os={class:"form-group"},ts=s("label",{class:"control-label"},"Middle Name",-1),ls={class:"col-md-3"},is={class:"form-group"},rs=s("label",{class:"control-label"},"Gender",-1),as=s("option",null,"Choose",-1),ns=s("option",{value:"male"},"Male",-1),ds=s("option",{value:"female"},"Female",-1),cs=[as,ns,ds],us={class:"col-md-3"},ms={class:"form-group"},_s=s("label",{class:"control-label"},"Password",-1),hs={class:"col-md-3"},ps={class:"form-group"},gs=s("label",{class:"control-label"},"Role",-1),vs=s("option",null,"Choose",-1),fs=["value"],bs=s("button",{class:"btn btn-success mr-4 float-left"},"Save",-1),ws=b('<footer class="footer"><div class="container-fluid"><div class="row"><div class="col-sm-6"> BackOffice 0.1 \xA9 2022 </div><div class="col-sm-6"><div class="text-sm-right d-none d-sm-block"> Powered by Intelligence </div></div></div></div></footer>',1);function Ns(a,o,m,ys,t,_){const w=f("router-link"),N=f("router-view");return i(),r(c,null,[s("div",x,[s("div",z,[s("div",S,[s("div",A,[D,s("div",B,[s("div",O,[s("div",I,[s("div",M,[u(w,{to:"/view-users"},{default:U(()=>[F]),_:1})])]),s("div",P,[s("div",j,[t.errors.length?(i(),r("div",E,[H,s("ul",null,[(i(!0),r(c,null,h(t.errors,e=>(i(),r("li",null,p(e),1))),256))])])):g("",!0),t.message.length?(i(),r("div",L,[(i(!0),r(c,null,h(t.message,e=>(i(),r("strong",null,p(e),1))),256))])):g("",!0),s("form",{onSubmit:o[11]||(o[11]=k((...e)=>_.handleUser&&_.handleUser(...e),["prevent"]))},[s("div",G,[s("div",R,[s("div",T,[q,l(s("input",{class:"form-control",type:"text","onUpdate:modelValue":o[0]||(o[0]=e=>t.emailAddress=e)},null,512),[[n,t.emailAddress]])])]),s("div",null,[s("div",null,[l(s("input",{class:"form-control",type:"hidden","onUpdate:modelValue":o[1]||(o[1]=e=>t.customerDetails.organizationCode=e),readonly:"",onChange:o[2]||(o[2]=e=>_.onChange(e))},null,544),[[n,t.customerDetails.organizationCode]])])]),s("div",null,[s("div",null,[l(s("input",{class:"form-control",type:"hidden","onUpdate:modelValue":o[3]||(o[3]=e=>t.customerDetails.subOrganisationCode=e),readonly:""},null,512),[[n,t.customerDetails.subOrganisationCode]])])]),s("div",J,[s("div",K,[Q,l(s("input",{class:"form-control",type:"text","onUpdate:modelValue":o[4]||(o[4]=e=>t.unit=e)},null,512),[[n,t.unit]])])]),s("div",W,[s("div",X,[Y,l(s("input",{class:"form-control",type:"text","onUpdate:modelValue":o[5]||(o[5]=e=>t.firstName=e)},null,512),[[n,t.firstName]])])]),s("div",Z,[s("div",$,[ss,l(s("input",{class:"form-control",type:"text","onUpdate:modelValue":o[6]||(o[6]=e=>t.lastName=e)},null,512),[[n,t.lastName]])])]),s("div",es,[s("div",os,[ts,l(s("input",{class:"form-control",type:"text","onUpdate:modelValue":o[7]||(o[7]=e=>t.middleName=e)},null,512),[[n,t.middleName]])])]),s("div",ls,[s("div",is,[rs,l(s("select",{"onUpdate:modelValue":o[8]||(o[8]=e=>t.gender=e),class:"form-control",id:""},cs,512),[[v,t.gender]])])]),s("div",us,[s("div",ms,[_s,l(s("input",{class:"form-control",type:"password","onUpdate:modelValue":o[9]||(o[9]=e=>t.password=e)},null,512),[[n,t.password]])])]),s("div",hs,[s("div",ps,[gs,l(s("select",{"onUpdate:modelValue":o[10]||(o[10]=e=>t.role=e),class:"form-control",id:""},[vs,(i(!0),r(c,null,h(t.allroles,e=>(i(),r("option",{key:e.rolCode,value:e.rolCode},p(e.rolName),9,fs))),128))],512),[[v,t.role]])])])]),bs],32)])])])])])]),ws])]),u(N)],64)}var Cs=y(V,[["render",Ns]]);const Vs={__name:"SetupUsersView",setup(a){return(o,m)=>(i(),r("main",null,[u(C),u(Cs)]))}};export{Vs as default};

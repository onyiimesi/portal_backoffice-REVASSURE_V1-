import{H as w}from"./Header.61007050.js";import{_ as x,a as c,u as y,o as i,c as a,b as e,t as n,d as _,w as V,F as m,k as u,e as g,l as A,n as l,v as r,q as v,f as p,h as U,r as f}from"./index.a5d27921.js";const k={name:"updatecustomer",data(){return{errors:[],message:[],allstate:[],details:{id:"",firstname:"",lastname:"",middlename:"",mobileNumber1:"",mobileNumber2:"",emailAddress:"",bvn:"",nin:"",contactAddress:"",lgaCode:"",stateCode:"",customerTin:""},customerDetails:{emailAddress:"",subOrganisationCode:"",organizationCode:"",firstName:"",lastName:"",middleName:"",gender:"",unit:""},roles:"billing-oficer"}},async mounted(){this.role=localStorage.getItem("role"),this.roles!=this.role&&(localStorage.removeItem("token"),this.$router.push("/"));const d=await c.get("api/Users/profile",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.customerDetails=d.data.result;const t=await c.get("api/State/allstate",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.allstate=t.data.result;const h=await c.get("api/Customer/details/"+this.$route.params.id,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.details=h.data.result},methods:{async onChange(d){const t=await c.get("api/Lga/alllgas/"+d.target.value,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.alllga=t.data.result},async updateCustomer(){this.errors=[],this.message=[];const d=y(),t=await c.put("api/Customer/editcustomer",{id:this.details.id,firstname:this.details.firstname,lastname:this.details.lastname,middlename:this.details.middlename,mobileNumber1:this.details.mobileNumber1,mobileNumber2:this.details.mobileNumber2,emailAddress:this.details.emailAddress,bvn:this.details.bvn,nin:this.details.nin,contactAddress:this.details.contactAddress,lgaCode:this.details.lgaCode,stateCode:this.details.stateCode,customerTin:this.details.customerTin},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});t?d.success(t.data.message):d.error("Incorrect Parameter")}}},S={id:"layout-wrapper"},D={class:"main-content"},I={class:"page-content"},B={class:"container-fluid"},z={class:"row"},T={class:"col-12"},M={class:"page-title-box d-flex align-items-center justify-content-between"},L={class:"mb-0"},F=p("Update Details "),H=e("br",null,null,-1),O=p(),P={style:{"font-size":"14px","font-weight":"500"}},E=p(),j={style:{"font-size":"14px","font-weight":"500"}},q={class:"page-title-right"},G={class:"breadcrumb m-0"},J={class:"breadcrumb-item"},K=p("Home"),Q=e("li",{class:"breadcrumb-item active"},"Update Details",-1),R={class:"row"},W={class:"col-lg-12"},X={class:"card pt-3 pb-3 pl-3 pr-3"},Y={class:"card-body"},Z={key:0,class:"alert alert-danger"},$=e("b",null,"Please correct the following error(s):",-1),ee={key:1,class:"alert alert-success"},se={class:"row"},te={class:"col-md-4"},oe={class:"form-group"},le=e("label",{class:"control-label"},"First Name",-1),ie={class:"col-md-4"},ae={class:"form-group"},ne=e("label",{class:"control-label"},"Middle Name",-1),re={class:"col-md-4"},de={class:"form-group"},ce=e("label",{class:"control-label"},"Last Name",-1),me={class:"col-md-4"},ue={class:"form-group"},_e=e("label",{class:"control-label"},"Email Address",-1),pe={class:"col-md-4"},he={class:"form-group"},be=e("label",{class:"control-label"},"Mobile Number",-1),ge={class:"col-md-4"},ve={class:"form-group"},fe=e("label",{class:"control-label"},"Mobile Number 2",-1),Ne={class:"col-md-4"},Ce={class:"form-group"},we=e("label",{class:"control-label"},"BVN",-1),xe={class:"col-md-4"},ye={class:"form-group"},Ve=e("label",{class:"control-label"},"NIN",-1),Ae={class:"col-md-4"},Ue={class:"form-group"},ke=e("label",{class:"control-label"},"TIN Number",-1),Se={class:"col-md-6"},De={class:"form-group"},Ie=e("label",{class:"control-label"},"State",-1),Be=["value"],ze={class:"col-md-6"},Te={class:"form-group"},Me=e("label",{class:"control-label"},"LGA",-1),Le=["value"],Fe={class:"col-md-12"},He={class:"form-group"},Oe=e("label",{class:"control-label"},"Contact Address",-1),Pe=e("button",{class:"btn btn-outline-success mt-4"},"Update",-1),Ee=U('<footer class="footer"><div class="container-fluid"><div class="row"><div class="col-sm-6"> BackOffice 0.1 \xA9 2022 </div><div class="col-sm-6"><div class="text-sm-right d-none d-sm-block"> Powered by Intelligence </div></div></div></div></footer>',1);function je(d,t,h,Ge,o,b){const N=f("router-link"),C=f("router-view");return i(),a(m,null,[e("div",S,[e("div",D,[e("div",I,[e("div",B,[e("div",z,[e("div",T,[e("div",M,[e("h4",L,[F,H,O,e("span",P,n(o.customerDetails.organizationCode)+" // "+n(o.customerDetails.subOrganisationCode)+" //",1),E,e("span",j,n(o.customerDetails.lastName)+" "+n(o.customerDetails.firstName)+" // "+n(this.role),1)]),e("div",q,[e("ol",G,[e("li",J,[_(N,{to:"/dashboard"},{default:V(()=>[K]),_:1})]),Q])])])])]),e("div",R,[e("div",W,[e("div",X,[e("div",Y,[o.errors.length?(i(),a("div",Z,[$,e("ul",null,[(i(!0),a(m,null,u(o.errors,s=>(i(),a("li",null,n(s),1))),256))])])):g("",!0),o.message.length?(i(),a("div",ee,[(i(!0),a(m,null,u(o.message,s=>(i(),a("strong",null,n(s),1))),256))])):g("",!0),e("form",{onSubmit:t[14]||(t[14]=A((...s)=>b.updateCustomer&&b.updateCustomer(...s),["prevent"]))},[l(e("input",{class:"form-control",type:"hidden","onUpdate:modelValue":t[0]||(t[0]=s=>o.details.id=s)},null,512),[[r,o.details.id]]),e("div",se,[e("div",te,[e("div",oe,[le,l(e("input",{class:"form-control",type:"text","onUpdate:modelValue":t[1]||(t[1]=s=>o.details.firstname=s)},null,512),[[r,o.details.firstname]])])]),e("div",ie,[e("div",ae,[ne,l(e("input",{class:"form-control",type:"text","onUpdate:modelValue":t[2]||(t[2]=s=>o.details.middlename=s)},null,512),[[r,o.details.middlename]])])]),e("div",re,[e("div",de,[ce,l(e("input",{class:"form-control",type:"text","onUpdate:modelValue":t[3]||(t[3]=s=>o.details.lastname=s)},null,512),[[r,o.details.lastname]])])]),e("div",me,[e("div",ue,[_e,l(e("input",{class:"form-control",type:"text","onUpdate:modelValue":t[4]||(t[4]=s=>o.details.emailAddress=s)},null,512),[[r,o.details.emailAddress]])])]),e("div",pe,[e("div",he,[be,l(e("input",{class:"form-control",type:"text","onUpdate:modelValue":t[5]||(t[5]=s=>o.details.mobileNumber1=s)},null,512),[[r,o.details.mobileNumber1]])])]),e("div",ge,[e("div",ve,[fe,l(e("input",{class:"form-control",type:"text","onUpdate:modelValue":t[6]||(t[6]=s=>o.details.mobileNumber2=s)},null,512),[[r,o.details.mobileNumber2]])])]),e("div",Ne,[e("div",Ce,[we,l(e("input",{class:"form-control",type:"text","onUpdate:modelValue":t[7]||(t[7]=s=>o.details.bvn=s)},null,512),[[r,o.details.bvn]])])]),e("div",xe,[e("div",ye,[Ve,l(e("input",{class:"form-control",type:"text","onUpdate:modelValue":t[8]||(t[8]=s=>o.details.nin=s)},null,512),[[r,o.details.nin]])])]),e("div",Ae,[e("div",Ue,[ke,l(e("input",{class:"form-control",type:"text","onUpdate:modelValue":t[9]||(t[9]=s=>o.details.customerTin=s)},null,512),[[r,o.details.customerTin]])])]),e("div",Se,[e("div",De,[Ie,l(e("select",{"onUpdate:modelValue":t[10]||(t[10]=s=>o.details.stateCode=s),onChange:t[11]||(t[11]=s=>b.onChange(s)),class:"form-control"},[e("option",null,n(o.details.stateCode),1),(i(!0),a(m,null,u(o.allstate,s=>(i(),a("option",{value:s.stateCode},n(s.stateName),9,Be))),256))],544),[[v,o.details.stateCode]])])]),e("div",ze,[e("div",Te,[Me,l(e("select",{"onUpdate:modelValue":t[12]||(t[12]=s=>o.details.lgaCode=s),class:"form-control",id:""},[e("option",null,n(o.details.lgaCode),1),(i(!0),a(m,null,u(d.alllga,s=>(i(),a("option",{value:s.lgaCode},n(s.lgaName),9,Le))),256))],512),[[v,o.details.lgaCode]])])]),e("div",Fe,[e("div",He,[Oe,l(e("textarea",{class:"form-control","onUpdate:modelValue":t[13]||(t[13]=s=>o.details.contactAddress=s),cols:"30",rows:"5"},null,512),[[r,o.details.contactAddress]])])])]),Pe],32)])])])])])]),Ee])]),_(C)],64)}var qe=x(k,[["render",je]]);const Qe={__name:"UpdateDetailsView",setup(d){return(t,h)=>(i(),a("main",null,[_(w),_(qe)]))}};export{Qe as default};
import{H as y}from"./Header.61007050.js";import{_ as S,a as d,o as a,c as l,b as s,t as o,d as r,w as h,l as O,n as k,v as C,e as u,s as b,F as m,k as D,f as _,h as g,r as p}from"./index.a5d27921.js";const x={name:"listsuborganization",data(){return{name:"",search:"",showsearch:!1,caris:[],role:"",subsearch:"",showsubsearch:!1,cariss:[],units:[],customerDetails:{emailAddress:"",subOrganisationCode:"",organizationCode:"",firstName:"",lastName:"",middleName:"",gender:"",unit:""},loaderDiv:"",mainDiv:"d-none",roles:"org-admin"}},async mounted(){this.role=localStorage.getItem("role"),this.roles!=this.role&&(localStorage.removeItem("token"),this.$router.push("/"));const e=await d.get("api/Users/profile",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.customerDetails=e.data.result,this.role=localStorage.getItem("role");const n=await d.get("api/SubOrganisation/suborganizations/"+this.customerDetails.organizationCode,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.units=n.data.result,this.loaderDiv="d-none",this.mainDiv="",setTimeout(()=>{$("#datatable").DataTable({lengthMenu:[[5,10,25,50,-1],[5,10,25,50,"All"]],pageLength:25,retrieve:!0})})},methods:{async searchOrg(){await d.get("api/SubOrganisation/suborganizations/"+this.search,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then(e=>{this.caris=e.data.result,this.search="",this.showsearch=!0}).catch(e=>{console.log(e)})},async searchSubOrg(){await d.get("api/SubOrganisation/details/"+this.subsearch,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then(e=>{this.cariss=e,setTimeout(()=>{$("#datatable1").DataTable({lengthMenu:[[5,10,25,50,-1],[5,10,25,50,"All"]],pageLength:25,retrieve:!0})}),this.subsearch="",this.showsubsearch=!0}).catch(e=>{console.log(e)})}}},z={id:"layout-wrapper"},N={class:"main-content"},U={class:"page-content"},A={class:"container-fluid"},B={class:"row"},V={class:"col-12"},I={class:"page-title-box d-flex align-items-center justify-content-between"},T={class:"mb-0"},L=_("Units "),M=s("br",null,null,-1),H=_(),E={style:{"font-size":"14px","font-weight":"500"}},F={style:{"font-size":"14px","font-weight":"500"}},P={class:"page-title-right"},j={class:"breadcrumb m-0"},G={class:"breadcrumb-item"},q=_("Home"),J=s("li",{class:"breadcrumb-item active"},"Units",-1),K={key:0,class:"row"},Q={class:"col-12"},R={class:"card"},W={class:"card-body"},X=s("h5",null,"Search Unit",-1),Y=s("hr",null,null,-1),Z={class:"row"},ss={class:"col-md-4"},ts=s("button",{class:"btn btn-outline-success"},"Search",-1),es={key:0,class:"card"},os={class:"card-body table-responsive"},is={id:"datatable1",class:"table table-bordered dt-responsive nowrap",style:{"border-collapse":"collapse","border-spacing":"0",width:"100%"}},as=s("thead",null,[s("tr",null,[s("th",null,"Unit Code"),s("th",null,"Unit"),s("th",null,"Organisation Code"),s("th",null,"Action")])],-1),ls=s("button",{class:"btn btn-outline-success mr-2"},"View",-1),ns=s("a",{href:"/list-unit"},[s("button",{class:"btn btn-outline-success"},"Go Back")],-1),rs={key:1,class:"card"},cs={class:"card-body table-responsive"},ds={key:0,class:"mb-4 text-right"},hs=s("i",{class:"fa fa-plus"},null,-1),us=_(" Create Unit"),_s=g('<div class="ph-item"><div class="ph-col-12"><div class="ph-row"><div class="ph-col-4"></div><div class="ph-col-8 empty"></div><div class="ph-col-6"></div><div class="ph-col-6 empty"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div></div><div class="ph-row"><div class="ph-col-4"></div><div class="ph-col-8 empty"></div><div class="ph-col-6"></div><div class="ph-col-6 empty"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div></div></div></div>',1),vs=[_s],bs={id:"datatable",class:"table table-bordered dt-responsive nowrap",style:{"border-collapse":"collapse","border-spacing":"0",width:"100%"}},ms=s("thead",null,[s("tr",null,[s("th",null,"Unit Code"),s("th",null,"Unit"),s("th",null,"Action")])],-1),ps=s("button",{class:"btn btn-outline-success"},"View",-1),gs=g('<footer class="footer"><div class="container-fluid"><div class="row"><div class="col-sm-6"> BackOffice 0.1 \xA9 2022 </div><div class="col-sm-6"><div class="text-sm-right d-none d-sm-block"> Powered by Intelligence </div></div></div></div></footer>',1);function fs(e,n,f,ys,t,v){const c=p("router-link"),w=p("router-view");return a(),l(m,null,[s("div",z,[s("div",N,[s("div",U,[s("div",A,[s("div",B,[s("div",V,[s("div",I,[s("h4",T,[L,M,H,s("span",E,o(t.customerDetails.organizationCode)+" // "+o(t.customerDetails.subOrganisationCode)+" // ",1),s("span",F,o(t.customerDetails.lastName)+" "+o(t.customerDetails.firstName)+" // "+o(this.role),1)]),s("div",P,[s("ol",j,[s("li",G,[r(c,{to:"/dashboard"},{default:h(()=>[q]),_:1})]),J])])])])]),t.role==="PortalAdmin"||t.role==="org-admin"||t.role==="0"?(a(),l("div",K,[s("div",Q,[s("div",R,[s("div",W,[X,Y,s("form",{onSubmit:n[1]||(n[1]=O((...i)=>v.searchSubOrg&&v.searchSubOrg(...i),["prevent"]))},[s("div",Z,[s("div",ss,[k(s("input",{class:"form-control mb-3",type:"text",placeholder:"Enter Unit code","onUpdate:modelValue":n[0]||(n[0]=i=>t.subsearch=i)},null,512),[[C,t.subsearch]]),ts])])],32)])]),t.showsubsearch==!0?(a(),l("div",es,[s("div",os,[s("table",is,[as,s("tbody",null,[s("tr",null,[s("td",null,o(this.cariss.data.result.subOrganisationCode),1),s("td",null,o(this.cariss.data.result.subOrganisationName),1),s("td",null,o(this.cariss.data.result.organisationCode),1),s("td",null,[r(c,{to:"/view-unit/"+this.cariss.data.result.subOrganisationCode},{default:h(()=>[ls]),_:1},8,["to"])])])])]),ns])])):u("",!0),t.showsubsearch==!1?(a(),l("div",rs,[s("div",cs,[t.role==="org-admin"?(a(),l("div",ds,[r(c,{class:"btn btn-outline-success",to:"/create-unit"},{default:h(()=>[hs,us]),_:1})])):u("",!0),s("div",{class:b(this.loaderDiv)},vs,2),s("div",{class:b(this.mainDiv)},[s("table",bs,[ms,s("tbody",null,[(a(!0),l(m,null,D(t.units,i=>(a(),l("tr",{key:i.id},[s("td",null,o(i.subOrganisationCode),1),s("td",null,o(i.subOrganisationName),1),s("td",null,[r(c,{to:"/view-unit/"+i.subOrganisationCode},{default:h(()=>[ps]),_:2},1032,["to"])])]))),128))])])],2)])])):u("",!0)])])):u("",!0)])]),gs])]),r(w)],64)}var ws=S(x,[["render",fs]]);const ks={__name:"ListSubOrgView",setup(e){return(n,f)=>(a(),l("main",null,[r(y),r(ws)]))}};export{ks as default};

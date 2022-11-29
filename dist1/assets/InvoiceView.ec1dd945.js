import{H as w}from"./Header.61007050.js";import{_ as x,a as h,u as C,o as d,c as r,b as s,t,d as m,w as k,s as u,F as _,k as D,e as I,l as N,n as v,v as p,f as n,h as g,r as b}from"./index.a5d27921.js";import{h as V}from"./moment.9709ab41.js";const A={name:"invoices",data(){return{errors:[],message:[],allinvoice:{organisationCode:"",subOrganisationCode:"",customerCode:"",organisationName:"",subOrganisationName:""},customer:{customerCode:""},invoice:{id:"",invoiceCode:"",invoiceDate:""},items:{amount:""},role:"",roles:[],workflow:[],entryValue:"",comment:"",customerDetails:{id:"",emailAddress:"",subOrganisationCode:"",organizationCode:"",firstName:"",lastName:"",middleName:"",gender:"",unit:""},comment:"",entryValue:"",loaderDiv:"",mainDiv:"d-none",roles:"billing-oficer",roless:"revenue-officer"}},async mounted(){this.role=localStorage.getItem("role"),this.roles!=this.role&&this.roless!=this.role&&(localStorage.removeItem("token"),this.$router.push("/"));const l=await h.get("api/Users/profile",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.customerDetails=l.data.result;const o=await h.get("api/roles/allroles",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.roles=o.data.result,await h.get("api/Invoice/details/"+this.$route.params.invoiceCode,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then(i=>{this.allinvoice=i.data.result.organisation,this.allinvoice=i.data.result.subOrganisation,this.customer=i.data.result.customer,this.invoice=i.data.result.invoice,this.items=i.data.result.items,this.loaderDiv="d-none",this.mainDiv=""}).catch(i=>{console.log(i)})},computed:{total:function(){let l=[];return Object.entries(this.items).forEach(([o,i])=>{l.push(i.amount)}),l.reduce(function(o,i){return o+i},0)},tax:function(){let l=[];return Object.entries(this.items).forEach(([o,i])=>{l.push(i.tax)}),l.reduce(function(o,i){return o+i},0)}},methods:{dateTime(l){return V(l).format("MMMM Do YYYY")},async invoiceRebate(){const l=C();if(this.comment||l.error("comment required."),!this.entryValue)l.error("Entry Value required.");else{const o=await h.put("api/Invoice/addrebate",{initiator:0,workFlowEntryItemID:0,reference:this.invoice.invoiceCode,comment:this.comment,entryValue:this.entryValue},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});o?(l.success(o.data.message),this.initiator="",this.workFlowEntryItemID="",this.comment="",this.entryValue=""):l.error("Incorrect Parameter")}}}},S={id:"layout-wrapper"},B={class:"main-content"},T={class:"page-content"},z={class:"container-fluid"},E={class:"row"},M={class:"col-12"},O={class:"page-title-box d-flex align-items-center justify-content-between"},L={class:"mb-0"},P=n("Bill "),R=s("br",null,null,-1),F=n(),U={style:{"font-size":"14px","font-weight":"500"}},Y=n(),j={style:{"font-size":"14px","font-weight":"500"}},q={class:"page-title-right"},H={class:"breadcrumb m-0"},G={class:"breadcrumb-item"},Q=n("Home"),J=s("li",{class:"breadcrumb-item active"},"Bill",-1),K={class:"row aa mb-5"},W={class:"col-12"},X={class:"cards"},Z=g('<div class="ph-item"><div class="ph-col-12"><div class="ph-row"><div class="ph-col-4"></div><div class="ph-col-8 empty"></div><div class="ph-col-6"></div><div class="ph-col-6 empty"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div></div><div class="ph-row"><div class="ph-col-4"></div><div class="ph-col-8 empty"></div><div class="ph-col-6"></div><div class="ph-col-6 empty"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div></div></div></div>',1),$=[Z],ss={class:"card-body table-responsive"},es={class:"brand-section"},ts={class:"row"},os={class:"col-6"},is={class:"text-dark"},ls={class:"text-dark"},as={class:"col-6"},ns={class:"company-details"},cs={class:"heading"},ds={class:"sub-heading"},rs={class:"body-section"},hs={class:"row"},ms={class:"col-6"},us=s("h4",null,"Invoice To:",-1),_s={class:"sub-heading"},vs={class:"sub-heading"},ps={class:"col-6"},bs=s("h4",null,"Bill To:",-1),gs={class:"sub-heading"},fs=n("Full Name: "),ys={class:"sub-heading"},ws=n("Email Address: "),xs={class:"sub-heading"},Cs=n("Phone Number: "),ks={class:"sub-heading"},Ds=n("LGA,State: "),Is={class:"body-section"},Ns={class:"text-center"},Vs=s("thead",null,[s("tr",null,[s("th",null,"ITEM"),s("th",{class:"w-20"},"Price"),s("th",{class:"w-20"},"Quantity"),s("th",{class:"w-20"},"Amount")])],-1),As=s("td",{colspan:"3",class:"text-right"},"Tax Total",-1),Ss=s("td",{colspan:"3",class:"text-right"},"Grand Total",-1),Bs=s("br",null,null,-1),Ts={class:"heading"},zs={key:0,class:"btn btn-info mt-3","data-toggle":"modal","data-target":"#bs-example-modal-lg"},Es={class:"modal fade",id:"bs-example-modal-lg",tabindex:"-1",role:"dialog","aria-labelledby":"myLargeModalLabel","aria-hidden":"true"},Ms={class:"modal-dialog modal-dialog-centered"},Os={class:"modal-content"},Ls=s("div",{class:"modal-header"},[s("h5",{id:"myLargeModalLabel",class:"modal-title mt-0"},"Apply Rebate"),s("button",{type:"button",class:"close","data-dismiss":"modal","aria-label":"Close"},[s("span",{"aria-hidden":"true"},"\xD7")])],-1),Ps={class:"modal-body"},Rs={class:"row"},Fs={class:"col-md-12 mb-4"},Us={class:"form-group"},Ys=s("label",{class:"control-label"},"Entry Value",-1),js={class:"col-md-12 mb-4"},qs={class:"form-group"},Hs=s("label",{class:"control-label"},"Comment",-1),Gs=s("div",{class:"col"},[s("button",{type:"submit",class:"btn btn-success float-left"},"Apply Rebate"),s("button",{type:"button",class:"btn btn-danger float-right","data-dismiss":"modal"},"Close")],-1),Qs=s("hr",null,null,-1),Js=g('<footer class="footer"><div class="container-fluid"><div class="row"><div class="col-sm-6"> BackOffice 0.1 \xA9 2022 </div><div class="col-sm-6"><div class="text-sm-right d-none d-sm-block"> Powered by Intelligence </div></div></div></div></footer>',1);function Ks(l,o,i,Xs,e,c){const f=b("router-link"),y=b("router-view");return d(),r(_,null,[s("div",S,[s("div",B,[s("div",T,[s("div",z,[s("div",E,[s("div",M,[s("div",O,[s("h4",L,[P,R,F,s("span",U,t(e.customerDetails.organizationCode)+" // "+t(e.customerDetails.subOrganisationCode)+" //",1),Y,s("span",j,t(e.customerDetails.lastName)+" "+t(e.customerDetails.firstName)+" // "+t(this.role),1)]),s("div",q,[s("ol",H,[s("li",G,[m(f,{to:"/dashboard"},{default:k(()=>[Q]),_:1})]),J])])])])]),s("div",K,[s("div",W,[s("div",X,[s("div",{class:u(this.loaderDiv)},$,2),s("div",{class:u(this.mainDiv)},[s("div",ss,[s("div",es,[s("div",ts,[s("div",os,[s("h1",is,t(e.allinvoice.organisationName),1),s("h3",ls,t(e.allinvoice.subOrganisationName),1)]),s("div",as,[s("div",ns,[s("h2",cs,"Invoice #"+t(e.invoice.invoiceCode),1),s("p",ds,"Invoice Date: "+t(c.dateTime(e.invoice.invoiceDate)),1)])])])]),s("div",rs,[s("div",hs,[s("div",ms,[us,s("p",_s,"Customer Code: "+t(e.invoice.customerCode),1),s("p",vs,"Curency Code: "+t(e.invoice.currencyCode),1)]),s("div",ps,[bs,s("p",gs,[fs,s("strong",null,t(e.customer.firstname)+" "+t(e.customer.lastname),1)]),s("p",ys,[ws,s("strong",null,t(e.customer.emailAddress),1)]),s("p",xs,[Cs,s("strong",null,t(e.customer.mobileNumber1)+", "+t(e.customer.mobileNumber2),1)]),s("p",ks,[Ds,s("strong",null,t(e.customer.lgaCode)+", "+t(e.customer.stateCode),1)])])])]),s("div",Is,[s("table",Ns,[Vs,s("tbody",null,[(d(!0),r(_,null,D(e.items,a=>(d(),r("tr",null,[s("td",null,t(a.itemName),1),s("td",null,t(a.price),1),s("td",null,t(a.quantity),1),s("td",null,t(a.amount),1)]))),256)),s("tr",null,[As,s("td",null,t(c.tax),1)]),s("tr",null,[Ss,s("td",null,t(c.total),1)])])]),Bs,s("h3",Ts,"Payment Status: "+t(e.invoice.paymentStatus),1)])])],2)]),e.role==="billing-oficer"&&e.invoice.paymentStatus=="UNPAID"?(d(),r("button",zs,"Apply Rebate")):I("",!0),s("div",Es,[s("div",Ms,[s("div",Os,[Ls,s("div",Ps,[s("form",{onSubmit:o[2]||(o[2]=N((...a)=>c.invoiceRebate&&c.invoiceRebate(...a),["prevent"]))},[s("div",Rs,[s("div",Fs,[s("div",Us,[Ys,v(s("input",{type:"text",class:"form-control","onUpdate:modelValue":o[0]||(o[0]=a=>e.entryValue=a)},null,512),[[p,e.entryValue]])])]),s("div",js,[s("div",qs,[Hs,v(s("textarea",{"onUpdate:modelValue":o[1]||(o[1]=a=>e.comment=a),class:"form-control",id:"",cols:"30",rows:"10"},null,512),[[p,e.comment]])])]),Gs]),Qs],32)])])])])])])])]),Js])]),m(y)],64)}var Ws=x(A,[["render",Ks]]);const ee={__name:"InvoiceView",setup(l){return(o,i)=>(d(),r("main",null,[m(w),m(Ws)]))}};export{ee as default};
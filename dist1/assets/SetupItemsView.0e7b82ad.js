import{H as S}from"./Header.747f91be.js";import{_ as I,a as _,o as i,c as l,b as e,F as d,j as u,e as f,k as x,l as a,n as p,t as n,v as m,q as C,d as g,f as O,h as R,r as N}from"./index.06a914a2.js";const T={name:"setupitems",data(){return{errors:[],message:[],allitems:[],allorg:[],tax:[],allsub:[],customerDetails:{emailAddress:"",subOrganisationCode:"",organizationCode:"",firstName:"",lastName:"",middleName:"",gender:"",unit:""},itemList:[],inputs:{itemCode:"",itemName:"",organisationCode:"",subOrganisationCode:"",remitaRevenueReference:"",gifmisReferenceCode:"",price:"",taxType:"",itemOrgCode:"",customFields:[{itemCode:"",fieldKey:"",fieldType:"",fieldOption:""}],isSelfService:"",hasCustomField:""}}},async mounted(){const r=await _.get("api/Users/profile",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.customerDetails=r.data.result;const o=await _.get("api/ItemHeader/items",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.allitems=o.data.result;const h=await _.get("api/Organisation/details/"+this.customerDetails.organizationCode,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.allorg=h.data.result;const b=await _.get("api/Taxtype/alltaxtypes",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.tax=b.data.result},methods:{async onChange(r){const o=await _.get("api/SubOrganisation/suborganizations/"+r.target.value,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.allsub=o.data.result},async handleItem(){this.errors=[],this.message=[],this.inputs.itemCode||this.errors.push("Item Code required."),this.inputs.itemName||this.errors.push("Item Name required."),this.inputs.organisationCode||this.errors.push("Organisation Code required."),this.inputs.subOrganisationCode||this.errors.push("Sub-Organisation Code required."),this.inputs.remitaRevenueReference||this.errors.push("Remita Revenue required."),this.inputs.gifmisReferenceCode||this.errors.push("GIFMIS Reference Code required."),this.inputs.price||this.errors.push("Price required."),this.inputs.taxType||this.errors.push("Tax Type required."),this.inputs.itemOrgCode||this.errors.push("Item Organisation Code required."),this.itemList.push(this.inputs),this.inputs={itemCode:"",itemName:"",organisationCode:"",subOrganisationCode:"",remitaRevenueReference:"",gifmisReferenceCode:"",price:"",taxType:"",itemOrgCode:"",customFields:[{itemCode:"",fieldKey:"",fieldType:"",fieldOption:""}],isSelfService:"",hasCustomField:""}},async submit(){const r=await _.post("api/Item/additem",this.itemList,this.customList,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});r?(this.message.push(r.data.message),this.itemList=[]):this.errors.push("Incorrect Parameter")}}},V={id:"layout-wrapper"},w={class:"main-content"},E={class:"page-content"},U={class:"container-fluid"},F=O('<div class="row"><div class="col-12"><div class="page-title-box d-flex align-items-center justify-content-between"><h4 class="mb-0">Setup Items</h4><div class="page-title-right"><ol class="breadcrumb m-0"><li class="breadcrumb-item"><a href="javascript: void(0);">Back Office</a></li><li class="breadcrumb-item active">Setup Items</li></ol></div></div></div></div>',1),k={class:"row"},D={class:"col-md-12"},A={class:"card"},B={class:"card-body"},M={key:0,class:"alert alert-danger"},z=e("b",null,"Please correct the following error(s):",-1),q={key:1,class:"alert alert-success"},L={id:"accordion",class:"custom-accordion"},P={class:"card mb-1 shadow-none"},G=e("a",{href:"#collapseOne",class:"text-dark","data-toggle":"collapse","aria-expanded":"true","aria-controls":"collapseOne"},[e("div",{class:"card-header",id:"headingOne"},[e("h6",{class:"m-0"},[R(" Setup Items "),e("i",{class:"mdi mdi-minus float-right accor-plus-icon"})])])],-1),K={id:"collapseOne",class:"collapse","aria-labelledby":"headingOne","data-parent":"#accordion"},j={class:"card-body"},H={class:"row"},X={class:"col-md-3"},Y={class:"form-group"},J=e("label",{class:"control-label"},"Item Code",-1),Q=e("option",null,"Choose",-1),W=["value"],Z={class:"col-md-3"},$={class:"form-group"},ee=e("label",{class:"control-label"},"Item Name",-1),se=e("option",null,"Choose",-1),te=["value"],oe={class:"col-md-3"},ie={class:"form-group"},le=e("label",{class:"control-label"},"Organisation Code",-1),ne=["value"],ae={class:"col-md-3"},re={class:"form-group"},de=e("label",{class:"control-label"},"Sub-Organisation Code",-1),ce=["value"],ue={class:"col-md-3"},me={class:"form-group"},_e=e("label",{class:"control-label"},"Revenue Reverence Number",-1),pe={class:"col-md-3"},he={class:"form-group"},ve=e("label",{class:"control-label"},"GIFMIS Reverence Code",-1),fe={class:"col-md-3"},ge={class:"form-group"},be=e("label",{class:"control-label"},"Price",-1),Ce={class:"col-md-3"},Oe={class:"form-group"},ye=e("label",{class:"control-label"},"Tax Type",-1),Se=e("option",null,"Choose",-1),Ie=["value"],xe={class:"col-md-3"},Re={class:"form-group"},Ne=e("label",{class:"control-label"},"Item Org Code",-1),Te={class:"col-md-3"},Ve={class:"form-group"},we=e("label",{class:"control-label"},"Self Service",-1),Ee=e("br",null,null,-1),Ue={class:"col-md-3"},Fe={class:"form-group"},ke=e("label",{class:"control-label"},"Custom Fields",-1),De=e("br",null,null,-1),Ae={key:0,class:"mt-4 mb-4"},Be=e("h6",null,"Custom Fields",-1),Me=e("hr",null,null,-1),ze={class:"row"},qe={class:"col-md-3"},Le={class:"form-group"},Pe=e("label",{class:"control-label"},"Label",-1),Ge=["onUpdate:modelValue"],Ke={class:"col-md-3"},je={class:"form-group"},He=e("label",{class:"control-label"},"Field Name",-1),Xe=["onUpdate:modelValue"],Ye={class:"col-md-3"},Je={class:"form-group"},Qe=e("label",{class:"control-label"},"Field Type",-1),We=["onUpdate:modelValue"],Ze=e("option",null,null,-1),$e=e("option",{value:"text"},"Text",-1),es=e("option",{value:"dropdown"},"Dropdown",-1),ss=e("option",{value:"date-range"},"Date Range",-1),ts=[Ze,$e,es,ss],os={class:"col-md-3"},is={class:"form-group"},ls=e("label",{class:"control-label"},"Option",-1),ns=["onUpdate:modelValue"],as=e("button",{class:"btn btn-success float-left mr-4"},"Save",-1),rs={class:"row"},ds={class:"col-md-12"},cs={class:"card"},us={class:"card-body table-responsive"},ms={id:"datatable",class:"table table-bordered dt-responsive nowrap",style:{"border-collapse":"collapse","border-spacing":"0",width:"100%"}},_s=e("thead",null,[e("tr",null,[e("th",null,"ITEM CODE"),e("th",null,"ITEM NAME"),e("th",null,"ORGANISATION CODE"),e("th",null,"SUB-ORGANISATION CODE"),e("th",null,"REVENUE REFERENCE NO"),e("th",null,"GIFMIS REFERENCE CODE"),e("th",null,"PRICE"),e("th",null,"TAX TYPE"),e("th",null,"ITEM ORG CODE"),e("th",null,"SELF SERVICE"),e("th",null,"CUSTOM FIELD")])],-1),ps=O('<footer class="footer"><div class="container-fluid"><div class="row"><div class="col-sm-6"> BackOffice 0.1 \xA9 2022 </div><div class="col-sm-6"><div class="text-sm-right d-none d-sm-block"> Powered by Intelligence </div></div></div></div></footer>',1);function hs(r,o,h,b,t,v){const y=N("router-view");return i(),l(d,null,[e("div",V,[e("div",w,[e("div",E,[e("div",U,[F,e("div",k,[e("div",D,[e("div",A,[e("div",B,[t.errors.length?(i(),l("div",M,[z,e("ul",null,[(i(!0),l(d,null,u(t.errors,s=>(i(),l("li",null,n(s),1))),256))])])):f("",!0),t.message.length?(i(),l("div",q,[(i(!0),l(d,null,u(t.message,s=>(i(),l("strong",null,n(s),1))),256))])):f("",!0),e("div",L,[e("div",P,[G,e("div",K,[e("div",j,[e("form",{onSubmit:o[11]||(o[11]=x((...s)=>v.handleItem&&v.handleItem(...s),["prevent"]))},[e("div",H,[e("div",X,[e("div",Y,[J,a(e("select",{"onUpdate:modelValue":o[0]||(o[0]=s=>t.inputs.itemCode=s),class:"form-control",id:""},[Q,(i(!0),l(d,null,u(t.allitems,s=>(i(),l("option",{value:s.itemCode},n(s.itemCode),9,W))),256))],512),[[p,t.inputs.itemCode]])])]),e("div",Z,[e("div",$,[ee,a(e("select",{"onUpdate:modelValue":o[1]||(o[1]=s=>t.inputs.itemName=s),class:"form-control",id:""},[se,(i(!0),l(d,null,u(t.allitems,s=>(i(),l("option",{value:s.itemName},n(s.itemName),9,te))),256))],512),[[p,t.inputs.itemName]])])]),e("div",oe,[e("div",ie,[le,a(e("select",{"onUpdate:modelValue":o[2]||(o[2]=s=>t.inputs.organisationCode=s),class:"form-control"},[e("option",{value:t.customerDetails.organizationCode},n(t.customerDetails.organizationCode),9,ne)],512),[[p,t.inputs.organisationCode]])])]),e("div",ae,[e("div",re,[de,a(e("select",{"onUpdate:modelValue":o[3]||(o[3]=s=>t.inputs.subOrganisationCode=s),class:"form-control",id:""},[e("option",{value:t.customerDetails.subOrganisationCode},n(t.customerDetails.subOrganisationCode),9,ce)],512),[[p,t.inputs.subOrganisationCode]])])]),e("div",ue,[e("div",me,[_e,a(e("input",{class:"form-control",type:"text","onUpdate:modelValue":o[4]||(o[4]=s=>t.inputs.remitaRevenueReference=s)},null,512),[[m,t.inputs.remitaRevenueReference]])])]),e("div",pe,[e("div",he,[ve,a(e("input",{class:"form-control",type:"text","onUpdate:modelValue":o[5]||(o[5]=s=>t.inputs.gifmisReferenceCode=s)},null,512),[[m,t.inputs.gifmisReferenceCode]])])]),e("div",fe,[e("div",ge,[be,a(e("input",{class:"form-control",type:"text","onUpdate:modelValue":o[6]||(o[6]=s=>t.inputs.price=s)},null,512),[[m,t.inputs.price]])])]),e("div",Ce,[e("div",Oe,[ye,a(e("select",{"onUpdate:modelValue":o[7]||(o[7]=s=>t.inputs.taxType=s),class:"form-control",id:""},[Se,(i(!0),l(d,null,u(t.tax,s=>(i(),l("option",{value:s.taxValue},n(s.taxTypeName),9,Ie))),256))],512),[[p,t.inputs.taxType]])])]),e("div",xe,[e("div",Re,[Ne,a(e("input",{class:"form-control",type:"text","onUpdate:modelValue":o[8]||(o[8]=s=>t.inputs.itemOrgCode=s)},null,512),[[m,t.inputs.itemOrgCode]])])]),e("div",Te,[e("div",Ve,[we,Ee,a(e("input",{type:"checkbox","onUpdate:modelValue":o[9]||(o[9]=s=>t.inputs.isSelfService=s)},null,512),[[C,t.inputs.isSelfService]])])]),e("div",Ue,[e("div",Fe,[ke,De,a(e("input",{type:"checkbox","onUpdate:modelValue":o[10]||(o[10]=s=>t.inputs.hasCustomField=s)},null,512),[[C,t.inputs.hasCustomField]])])])]),t.inputs.hasCustomField?(i(),l("div",Ae,[Be,Me,(i(!0),l(d,null,u(t.inputs.customFields,s=>(i(),l("div",ze,[e("div",qe,[e("div",Le,[Pe,a(e("input",{class:"form-control",type:"text","onUpdate:modelValue":c=>s.itemCode=c},null,8,Ge),[[m,s.itemCode]])])]),e("div",Ke,[e("div",je,[He,a(e("input",{class:"form-control",type:"text","onUpdate:modelValue":c=>s.fieldKey=c},null,8,Xe),[[m,s.fieldKey]])])]),e("div",Ye,[e("div",Je,[Qe,a(e("select",{"onUpdate:modelValue":c=>s.fieldType=c,class:"form-control",id:""},ts,8,We),[[p,s.fieldType]])])]),e("div",os,[e("div",is,[ls,a(e("textarea",{class:"form-control",name:"",id:"",cols:"30",rows:"1","onUpdate:modelValue":c=>s.fieldOption=c},null,8,ns),[[m,s.fieldOption]])])])]))),256))])):f("",!0),as],32)])])])])])])])]),e("div",rs,[e("div",ds,[e("div",cs,[e("div",us,[e("table",ms,[_s,e("tbody",null,[(i(!0),l(d,null,u(t.itemList,s=>(i(),l("tr",null,[e("td",null,n(s.itemCode),1),e("td",null,n(s.itemName),1),e("td",null,n(s.organisationCode),1),e("td",null,n(s.subOrganisationCode),1),e("td",null,n(s.remitaRevenueReference),1),e("td",null,n(s.gifmisReferenceCode),1),e("td",null,n(s.price),1),e("td",null,n(s.taxType),1),e("td",null,n(s.itemOrgCode),1),e("td",null,n(s.isSelfService),1),e("td",null,n(s.hasCustomField),1)]))),256)),e("button",{class:"btn btn-success mt-2",onClick:o[12]||(o[12]=s=>v.submit())},"Submit")])])])])])])])]),ps])]),g(y)],64)}var vs=I(T,[["render",hs]]);const bs={__name:"SetupItemsView",setup(r){return(o,h)=>(i(),l("main",null,[g(S),g(vs)]))}};export{bs as default};

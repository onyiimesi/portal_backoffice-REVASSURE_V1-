import{H as V}from"./Header.47845ea9.js";import{_ as S,a as m,u as k,o as i,c as n,b as e,t as c,d as h,w as F,F as _,j as u,e as v,k as N,l,v as a,n as g,K as y,f as p,g as R,r as x}from"./index.e2874b00.js";const U={name:"edititem",data(){return{errors:[],message:[],allitem:[],alli:[],allorg:[],tax:[],customerDetails:{emailAddress:"",subOrganisationCode:"",organizationCode:"",firstName:"",lastName:"",middleName:"",gender:"",unit:""},itemList:[],allitems:{itemCode:"",itemName:"",organisationCode:"",subOrganisationCode:"",remitaRevenueReference:"",gifmisReferenceCode:"",price:"",taxType:"",itemOrgCode:"",isSelfService:"",hasCustomField:""},customFields:[{itemCode:"",fieldKey:"",fieldType:"",fieldOption:""}],role:""}},async mounted(){this.role=localStorage.getItem("role");const r=await m.get("api/Users/profile",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.customerDetails=r.data.result;const o=await m.get("api/Item/details/"+this.$route.params.itemOrgCode,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.allitems=o.data.result.itemDetails,this.customFields=o.data.result.customFields;const f=await m.get("api/ItemHeader/items",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.allitem=f.data.result;const b=await m.get("api/Organisation/organizations",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.allorg=b.data.result;const s=await m.get("api/Taxtype/alltaxtypes",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.tax=s.data.result},methods:{async editItem(){this.errors=[],this.message=[];const r=k();this.itemList.push(this.customFields),await m.put("api/Item/edit",{itemOrgCode:this.allitems.itemOrgCode,itemName:this.allitems.itemName,remitaRevenueReference:this.allitems.remitaRevenueReference,gifmisReferenceCode:this.allitems.gifmisReferenceCode,price:this.allitems.price,taxType:this.allitems.taxType,customFields:this.customFields,isSelfService:this.allitems.isSelfService,hasCustomField:this.allitems.hasCustomField},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then(o=>{r.success(o.data.message),this.itemList=[]}).catch(o=>{o.response.data.title&&r.error("Field(s) is empty")})}}},O={id:"layout-wrapper"},T={class:"main-content"},D={class:"page-content"},z={class:"container-fluid"},B={class:"row"},A={class:"col-12"},E={class:"page-title-box d-flex align-items-center justify-content-between"},M={class:"mb-0"},H=p("Edit Item "),K=e("br",null,null,-1),L=p(),P={style:{"font-size":"14px","font-weight":"500"}},j=p(),G={style:{"font-size":"14px","font-weight":"500"}},q={class:"page-title-right"},J={class:"breadcrumb m-0"},Q={class:"breadcrumb-item"},W=p("Home"),X=e("li",{class:"breadcrumb-item active"},"Edit Item",-1),Y={class:"row"},Z={class:"col-12"},$={class:"card"},ee={class:"card-body table-responsive"},te={key:0,class:"alert alert-danger"},se=e("b",null,"Please correct the following error(s):",-1),oe={key:1,class:"alert alert-success"},le={class:"row"},ie={class:"col-md-3"},ne={class:"form-group"},ae={class:"col-md-3"},re={class:"form-group"},de={class:"row"},ce={class:"col-md-3"},me={class:"form-group"},_e=e("label",{class:"control-label"},"GIFMIS Item",-1),ue=["value"],he={class:"col-md-3"},pe={class:"form-group"},fe=e("label",{class:"control-label"},"GIFMIS Reference Code",-1),ve={class:"col-md-3"},ge={class:"form-group"},be=e("label",{class:"control-label"},"Organisation Item Code",-1),Ce={class:"col-md-3"},ye={class:"form-group"},xe=e("label",{class:"control-label"},"Item Name",-1),we={class:"col-md-3"},Ie={class:"form-group"},Ve=e("label",{class:"control-label"},"Price",-1),Se={class:"col-md-3"},ke={class:"form-group"},Fe=e("label",{class:"control-label"},"Tax Type",-1),Ne=["value"],Re={class:"col-md-3"},Ue={class:"form-group"},Oe=e("label",{class:"control-label"},"Revenue Reference Number",-1),Te={class:"col-md-3"},De={class:"form-group"},ze=e("label",{class:"control-label"},"Self Service",-1),Be=e("br",null,null,-1),Ae={class:"col-md-3"},Ee={class:"form-group"},Me=e("label",{class:"control-label"},"Custom Fields",-1),He=e("br",null,null,-1),Ke={key:0,class:"mt-4 mb-4"},Le=e("h6",null,"Custom Fields",-1),Pe=e("hr",null,null,-1),je={class:"row"},Ge={class:"col-md-3"},qe={class:"form-group"},Je=e("label",{class:"control-label"},"Organisation Item Code",-1),Qe=["onUpdate:modelValue"],We={class:"col-md-3"},Xe={class:"form-group"},Ye=e("label",{class:"control-label"},"Field Name",-1),Ze=["onUpdate:modelValue"],$e={class:"col-md-2"},et={class:"form-group"},tt=e("label",{class:"control-label"},"Field Type",-1),st=["onUpdate:modelValue"],ot=e("option",null,null,-1),lt=e("option",{value:"text"},"Text",-1),it=e("option",{value:"dropdown"},"Dropdown",-1),nt=e("option",{value:"date-range"},"Date Range",-1),at=[ot,lt,it,nt],rt={class:"col-md-3"},dt={class:"form-group"},ct=e("label",{class:"control-label"},"Option",-1),mt=["onUpdate:modelValue"],_t={class:"col-md-1",style:{"margin-top":"30px"}},ut=["onClick"],ht=e("i",{class:"fa fa-times"},null,-1),pt=[ht],ft=e("button",{class:"btn btn-outline-success mt-4"},"Edit",-1),vt=R('<footer class="footer"><div class="container-fluid"><div class="row"><div class="col-sm-6"> BackOffice 0.1 \xA9 2022 </div><div class="col-sm-6"><div class="text-sm-right d-none d-sm-block"> Powered by Intelligence </div></div></div></div></footer>',1);function gt(r,o,f,b,s,C){const w=x("router-link"),I=x("router-view");return i(),n(_,null,[e("div",O,[e("div",T,[e("div",D,[e("div",z,[e("div",B,[e("div",A,[e("div",E,[e("h4",M,[H,K,L,e("span",P,c(s.customerDetails.organizationCode)+" // "+c(s.customerDetails.subOrganisationCode)+" //",1),j,e("span",G,c(s.customerDetails.lastName)+" "+c(s.customerDetails.firstName)+" // "+c(this.role),1)]),e("div",q,[e("ol",J,[e("li",Q,[h(w,{to:"/dashboard"},{default:F(()=>[W]),_:1})]),X])])])])]),e("div",Y,[e("div",Z,[e("div",$,[e("div",ee,[s.errors.length?(i(),n("div",te,[se,e("ul",null,[(i(!0),n(_,null,u(s.errors,t=>(i(),n("li",null,c(t),1))),256))])])):v("",!0),s.message.length?(i(),n("div",oe,[(i(!0),n(_,null,u(s.message,t=>(i(),n("strong",null,c(t),1))),256))])):v("",!0),e("form",{onSubmit:o[12]||(o[12]=N((...t)=>C.editItem&&C.editItem(...t),["prevent"]))},[e("div",le,[e("div",ie,[e("div",ne,[l(e("input",{class:"form-control",type:"hidden","onUpdate:modelValue":o[0]||(o[0]=t=>s.customerDetails.organizationCode=t)},null,512),[[a,s.customerDetails.organizationCode]])])]),e("div",ae,[e("div",re,[l(e("input",{class:"form-control",type:"hidden","onUpdate:modelValue":o[1]||(o[1]=t=>s.customerDetails.subOrganisationCode=t)},null,512),[[a,s.customerDetails.subOrganisationCode]])])])]),e("div",de,[e("div",ce,[e("div",me,[_e,l(e("select",{"onUpdate:modelValue":o[2]||(o[2]=t=>s.allitems.itemCode=t),class:"form-control"},[(i(!0),n(_,null,u(s.allitem,t=>(i(),n("option",{value:t.itemCode},c(t.itemName),9,ue))),256))],512),[[g,s.allitems.itemCode]])])]),e("div",he,[e("div",pe,[fe,l(e("input",{class:"form-control",type:"text","onUpdate:modelValue":o[3]||(o[3]=t=>s.allitems.gifmisReferenceCode=t)},null,512),[[a,s.allitems.gifmisReferenceCode]])])]),e("div",ve,[e("div",ge,[be,l(e("input",{class:"form-control",type:"text","onUpdate:modelValue":o[4]||(o[4]=t=>s.allitems.itemOrgCode=t)},null,512),[[a,s.allitems.itemOrgCode]])])]),e("div",Ce,[e("div",ye,[xe,l(e("input",{class:"form-control",type:"text","onUpdate:modelValue":o[5]||(o[5]=t=>s.allitems.itemName=t)},null,512),[[a,s.allitems.itemName]])])]),e("div",we,[e("div",Ie,[Ve,l(e("input",{class:"form-control",type:"text","onUpdate:modelValue":o[6]||(o[6]=t=>s.allitems.price=t)},null,512),[[a,s.allitems.price]])])]),e("div",Se,[e("div",ke,[Fe,l(e("select",{"onUpdate:modelValue":o[7]||(o[7]=t=>s.allitems.taxType=t),class:"form-control",id:""},[(i(!0),n(_,null,u(s.tax,t=>(i(),n("option",{value:t.taxValue},c(t.taxTypeName),9,Ne))),256))],512),[[g,s.allitems.taxType]])])]),e("div",Re,[e("div",Ue,[Oe,l(e("input",{class:"form-control",type:"text","onUpdate:modelValue":o[8]||(o[8]=t=>s.allitems.remitaRevenueReference=t)},null,512),[[a,s.allitems.remitaRevenueReference]])])]),e("div",Te,[e("div",De,[ze,Be,l(e("input",{type:"checkbox","onUpdate:modelValue":o[9]||(o[9]=t=>s.allitems.isSelfService=t)},null,512),[[y,s.allitems.isSelfService]])])]),e("div",Ae,[e("div",Ee,[Me,He,l(e("input",{type:"checkbox","onUpdate:modelValue":o[10]||(o[10]=t=>s.allitems.hasCustomField=t)},null,512),[[y,s.allitems.hasCustomField]])])])]),s.allitems.hasCustomField?(i(),n("div",Ke,[Le,Pe,(i(!0),n(_,null,u(s.customFields,t=>(i(),n("div",je,[e("div",Ge,[e("div",qe,[Je,l(e("input",{class:"form-control",onChange:o[11]||(o[11]=d=>r.change()),type:"text","onUpdate:modelValue":d=>t.itemCode=d},null,40,Qe),[[a,t.itemCode]])])]),e("div",We,[e("div",Xe,[Ye,l(e("input",{class:"form-control",type:"text","onUpdate:modelValue":d=>t.fieldKey=d},null,8,Ze),[[a,t.fieldKey]])])]),e("div",$e,[e("div",et,[tt,l(e("select",{"onUpdate:modelValue":d=>t.fieldType=d,class:"form-control",id:""},at,8,st),[[g,t.fieldType]])])]),e("div",rt,[e("div",dt,[ct,l(e("textarea",{class:"form-control",name:"",id:"",cols:"30",rows:"1","onUpdate:modelValue":d=>t.fieldOption=d},null,8,mt),[[a,t.fieldOption]])])]),e("div",_t,[e("span",{class:"btn btn-danger btn-sm",style:{margin:"5px 0 0 0"},onClick:d=>r.deleteRow(r.k,t)},pt,8,ut)])]))),256))])):v("",!0),ft],32)])])])])])]),vt])]),h(I)],64)}var bt=S(U,[["render",gt]]);const xt={__name:"EditItemView",setup(r){return(o,f)=>(i(),n("main",null,[h(V),h(bt)]))}};export{xt as default};

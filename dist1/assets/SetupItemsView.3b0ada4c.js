import{H as w}from"./Header.61007050.js";import{_ as R,a as h,u as y,o as l,c as n,b as e,t as a,d as v,w as k,F as _,k as g,e as f,l as V,n as d,v as m,q as b,N as x,f as r,h as N,r as I}from"./index.a5d27921.js";const T={name:"setupitems",data(){return{errors:[],message:[],allitems:[],allorg:[],tax:[],allsub:[],customerDetails:{emailAddress:"",subOrganisationCode:"",organizationCode:"",firstName:"",lastName:"",middleName:"",gender:"",unit:""},itemList:[],inputs:{itemCode:"",itemName:"",organisationCode:"",subOrganisationCode:"",remitaRevenueReference:"",gifmisReferenceCode:"",price:"",taxType:"",itemOrgCode:"",customFields:[{itemCode:"",fieldKey:"",fieldType:"",fieldOption:""}],isSelfService:"",hasCustomField:""},role:"",roless:"revenue-officer"}},async mounted(){this.role=localStorage.getItem("role"),this.roless!=this.role&&(localStorage.removeItem("token"),this.$router.push("/"));const i=await h.get("api/Users/profile",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.customerDetails=i.data.result,this.inputs.organisationCode=i.data.result.organizationCode,this.inputs.subOrganisationCode=i.data.result.subOrganisationCode;const s=await h.get("api/ItemHeader/items",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.allitems=s.data.result;const c=await h.get("api/Organisation/details/"+this.customerDetails.organizationCode,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.allorg=c.data.result;const C=await h.get("api/Taxtype/alltaxtypes",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.tax=C.data.result},methods:{async onChange(i){const s=await h.get("api/SubOrganisation/suborganizations/"+i.target.value,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.allsub=s.data.result},change(){this.inputs.customFields.push({itemCode:"",fieldKey:"",fieldType:"",fieldOption:""})},deleteRow(i,s){var c=this.inputs.customFields.indexOf(s);console.log(c,i),c>-1&&this.inputs.customFields.splice(c,1)},deleteItemRow(i,s){var c=this.itemList.indexOf(s);console.log(c,i),c>-1&&this.itemList.splice(c,1)},async handleItem(){this.errors=[],this.message=[];const i=y();this.inputs.itemCode||i.error("GIMIS Item Code required."),this.inputs.itemName||i.error("Item Name required."),this.inputs.organisationCode||i.error("Organisation Code required."),this.inputs.subOrganisationCode||i.error("Sub-Organisation Code required."),this.inputs.remitaRevenueReference||i.error("Remita Revenue required."),this.inputs.gifmisReferenceCode||i.error("GIFMIS Reference Code required."),this.inputs.price||i.error("Price required."),this.inputs.taxType||i.error("Tax Type required."),this.inputs.itemOrgCode?(this.itemList.push(this.inputs),this.inputs={itemCode:"",itemName:"",organisationCode:this.inputs.organisationCode,subOrganisationCode:this.inputs.organisationCode,remitaRevenueReference:"",gifmisReferenceCode:"",price:"",taxType:"",itemOrgCode:"",customFields:[{itemCode:"",fieldKey:"",fieldType:"",fieldOption:""}],isSelfService:"",hasCustomField:""}):i.error("Item Organisation Code required.")},async submit(){const i=y();await h.post("api/Item/additem",this.itemList,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then(s=>{i.success(s.data.message),this.itemList=[]}).catch(s=>{s.response.data.title&&(i.error("Item(s) not created, Custom fields are empty"),this.itemList=[])})}}},F={id:"layout-wrapper"},U={class:"main-content"},z={class:"page-content"},D={class:"container-fluid"},L={class:"row"},q={class:"col-12"},B={class:"page-title-box d-flex align-items-center justify-content-between"},M={class:"mb-0"},A=r("Create Items "),G=e("br",null,null,-1),K=r(),P={style:{"font-size":"14px","font-weight":"500"}},H=r(),j={style:{"font-size":"14px","font-weight":"500"}},E={class:"page-title-right"},J={class:"breadcrumb m-0"},Q={class:"breadcrumb-item"},W=r("Home"),X=e("li",{class:"breadcrumb-item active"},"Create Items",-1),Y={class:"row"},Z={class:"col-md-12"},$={class:"card"},ee={class:"card-body"},te={key:0,class:"alert alert-danger"},se=e("b",null,"Please correct the following error(s):",-1),oe={key:1,class:"alert alert-success"},ie={id:"accordion",class:"custom-accordion"},le={class:"card mb-1 shadow-none"},ne=e("a",{href:"#collapseOne",class:"text-dark","data-toggle":"collapse","aria-expanded":"true","aria-controls":"collapseOne"},[e("div",{class:"card-header",id:"headingOne"},[e("h6",{class:"m-0"},[r(" Create Items "),e("i",{class:"mdi mdi-minus float-right accor-plus-icon"})])])],-1),ae={id:"collapseOne",class:"collapse","aria-labelledby":"headingOne","data-parent":"#accordion"},re={class:"card-body"},de={class:"row"},ce={class:"col-md-3"},ue={class:"form-group"},me=e("label",{class:"control-label"},[r("GIFMIS Item "),e("span",{class:"text-danger"},"*")],-1),_e=["value"],pe={class:"col-md-3"},he={class:"form-group"},ge=e("label",{class:"control-label"},[r("GIFMIS Reference Code "),e("span",{class:"text-danger"},"*")],-1),fe={class:"col-md-3"},ve={class:"form-group"},be=e("label",{class:"control-label"},[r("Organisation Item Code "),e("span",{class:"text-danger"},"*")],-1),Ce={class:"col-md-3"},ye={class:"form-group"},xe=e("label",{class:"control-label"},[r("Item Name "),e("span",{class:"text-danger"},"*")],-1),Ie={class:"col-md-3"},Se={class:"form-group"},Oe=e("label",{class:"control-label"},[r("Price "),e("span",{class:"text-danger"},"*")],-1),we={class:"col-md-3"},Re={class:"form-group"},ke=e("label",{class:"control-label"},[r("Tax Type "),e("span",{class:"text-danger"},"*")],-1),Ve=["value"],Ne={class:"col-md-3"},Te={class:"form-group"},Fe=e("label",{class:"control-label"},[r("Revenue Reference Number "),e("span",{class:"text-danger"},"*")],-1),Ue={class:"col-md-3"},ze={class:"form-group"},De=e("label",{class:"control-label"},"Self Service",-1),Le=e("br",null,null,-1),qe={class:"col-md-3"},Be={class:"form-group"},Me=e("label",{class:"control-label"},"Custom Fields",-1),Ae=e("br",null,null,-1),Ge={key:0,class:"mt-4 mb-4"},Ke=e("h6",null,"Custom Fields",-1),Pe=e("hr",null,null,-1),He={class:"row"},je={class:"col-md-3"},Ee={class:"form-group"},Je=e("label",{class:"control-label"},[r("Organisation Item Code "),e("span",{class:"text-danger"},"*")],-1),Qe=["onUpdate:modelValue"],We={class:"col-md-3"},Xe={class:"form-group"},Ye=e("label",{class:"control-label"},[r("Field Name "),e("span",{class:"text-danger"},"*")],-1),Ze=["onUpdate:modelValue"],$e={class:"col-md-2"},et={class:"form-group"},tt=e("label",{class:"control-label"},[r("Field Type "),e("span",{class:"text-danger"},"*")],-1),st=["onUpdate:modelValue"],ot=e("option",null,null,-1),it=e("option",{value:"text"},"Text",-1),lt=e("option",{value:"dropdown"},"Dropdown",-1),nt=e("option",{value:"date-range"},"Date Range",-1),at=[ot,it,lt,nt],rt={class:"col-md-3"},dt={class:"form-group"},ct=e("label",{class:"control-label"},[r("Option "),e("span",{class:"text-danger"},"*")],-1),ut=["onUpdate:modelValue"],mt={class:"col-md-1",style:{"margin-top":"30px"}},_t=["onClick"],pt=e("i",{class:"fa fa-times"},null,-1),ht=[pt],gt=e("button",{class:"btn btn-outline-success mt-3"},"Save",-1),ft={class:"row"},vt={class:"col-md-12"},bt={class:"card"},Ct={class:"card-body table-responsive"},yt={id:"datatable",class:"table table-bordered dt-responsive nowrap",style:{"border-collapse":"collapse","border-spacing":"0",width:"100%"}},xt=e("thead",null,[e("tr",null,[e("th",null,"GIFMIS Item"),e("th",null,"GIFMIS Reference Code"),e("th",null,"Organisation Item Code"),e("th",null,"Item Name"),e("th",null,"Price"),e("th",null,"Tax Type"),e("th",null,"Revenue Reference Number"),e("th",null,"Self Service"),e("th",null,"Custom field"),e("th",null,"Action")])],-1),It=["onClick"],St=e("i",{class:"fa fa-times"},null,-1),Ot=[St],wt={key:0,class:"btn btn-outline-success mt-4",disabled:""},Rt=N('<footer class="footer"><div class="container-fluid"><div class="row"><div class="col-sm-6"> BackOffice 0.1 \xA9 2022 </div><div class="col-sm-6"><div class="text-sm-right d-none d-sm-block"> Powered by Intelligence </div></div></div></div></footer>',1);function kt(i,s,c,C,o,p){const S=I("router-link"),O=I("router-view");return l(),n(_,null,[e("div",F,[e("div",U,[e("div",z,[e("div",D,[e("div",L,[e("div",q,[e("div",B,[e("h4",M,[A,G,K,e("span",P,a(o.customerDetails.organizationCode)+" // "+a(o.customerDetails.subOrganisationCode)+" //",1),H,e("span",j,a(o.customerDetails.lastName)+" "+a(o.customerDetails.firstName)+" // "+a(this.role),1)]),e("div",E,[e("ol",J,[e("li",Q,[v(S,{to:"/dashboard"},{default:k(()=>[W]),_:1})]),X])])])])]),e("div",Y,[e("div",Z,[e("div",$,[e("div",ee,[o.errors.length?(l(),n("div",te,[se,e("ul",null,[(l(!0),n(_,null,g(o.errors,t=>(l(),n("li",null,a(t),1))),256))])])):f("",!0),o.message.length?(l(),n("div",oe,[(l(!0),n(_,null,g(o.message,t=>(l(),n("strong",null,a(t),1))),256))])):f("",!0),e("div",ie,[e("div",le,[ne,e("div",ae,[e("div",re,[e("form",{onSubmit:s[12]||(s[12]=V((...t)=>p.handleItem&&p.handleItem(...t),["prevent"]))},[d(e("input",{class:"form-control",type:"hidden","onUpdate:modelValue":s[0]||(s[0]=t=>o.inputs.organisationCode=t)},null,512),[[m,o.inputs.organisationCode]]),d(e("input",{class:"form-control",type:"hidden","onUpdate:modelValue":s[1]||(s[1]=t=>o.inputs.subOrganisationCode=t)},null,512),[[m,o.inputs.subOrganisationCode]]),e("div",de,[e("div",ce,[e("div",ue,[me,d(e("select",{"onUpdate:modelValue":s[2]||(s[2]=t=>o.inputs.itemCode=t),class:"form-control",id:""},[(l(!0),n(_,null,g(o.allitems,t=>(l(),n("option",{value:t.itemCode},a(t.itemName),9,_e))),256))],512),[[b,o.inputs.itemCode]])])]),e("div",pe,[e("div",he,[ge,d(e("input",{class:"form-control",type:"text","onUpdate:modelValue":s[3]||(s[3]=t=>o.inputs.gifmisReferenceCode=t)},null,512),[[m,o.inputs.gifmisReferenceCode]])])]),e("div",fe,[e("div",ve,[be,d(e("input",{class:"form-control",type:"text","onUpdate:modelValue":s[4]||(s[4]=t=>o.inputs.itemOrgCode=t)},null,512),[[m,o.inputs.itemOrgCode]])])]),e("div",Ce,[e("div",ye,[xe,d(e("input",{class:"form-control",type:"text","onUpdate:modelValue":s[5]||(s[5]=t=>o.inputs.itemName=t)},null,512),[[m,o.inputs.itemName]])])]),e("div",Ie,[e("div",Se,[Oe,d(e("input",{class:"form-control",type:"number","onUpdate:modelValue":s[6]||(s[6]=t=>o.inputs.price=t)},null,512),[[m,o.inputs.price]])])]),e("div",we,[e("div",Re,[ke,d(e("select",{"onUpdate:modelValue":s[7]||(s[7]=t=>o.inputs.taxType=t),class:"form-control",id:""},[(l(!0),n(_,null,g(o.tax,t=>(l(),n("option",{value:t.taxValue},a(t.taxTypeName),9,Ve))),256))],512),[[b,o.inputs.taxType]])])]),e("div",Ne,[e("div",Te,[Fe,d(e("input",{class:"form-control",type:"text","onUpdate:modelValue":s[8]||(s[8]=t=>o.inputs.remitaRevenueReference=t)},null,512),[[m,o.inputs.remitaRevenueReference]])])]),e("div",Ue,[e("div",ze,[De,Le,d(e("input",{type:"checkbox","onUpdate:modelValue":s[9]||(s[9]=t=>o.inputs.isSelfService=t)},null,512),[[x,o.inputs.isSelfService]])])]),e("div",qe,[e("div",Be,[Me,Ae,d(e("input",{type:"checkbox","onUpdate:modelValue":s[10]||(s[10]=t=>o.inputs.hasCustomField=t)},null,512),[[x,o.inputs.hasCustomField]])])])]),o.inputs.hasCustomField?(l(),n("div",Ge,[Ke,Pe,(l(!0),n(_,null,g(o.inputs.customFields,t=>(l(),n("div",He,[e("div",je,[e("div",Ee,[Je,d(e("input",{class:"form-control",onChange:s[11]||(s[11]=u=>p.change()),type:"text","onUpdate:modelValue":u=>t.itemCode=u},null,40,Qe),[[m,t.itemCode]])])]),e("div",We,[e("div",Xe,[Ye,d(e("input",{class:"form-control",type:"text","onUpdate:modelValue":u=>t.fieldKey=u},null,8,Ze),[[m,t.fieldKey]])])]),e("div",$e,[e("div",et,[tt,d(e("select",{"onUpdate:modelValue":u=>t.fieldType=u,class:"form-control",id:""},at,8,st),[[b,t.fieldType]])])]),e("div",rt,[e("div",dt,[ct,d(e("textarea",{class:"form-control",name:"",id:"",cols:"30",rows:"1","onUpdate:modelValue":u=>t.fieldOption=u},null,8,ut),[[m,t.fieldOption]])])]),e("div",mt,[e("span",{class:"btn btn-danger btn-sm",style:{margin:"5px 0 0 0"},onClick:u=>p.deleteRow(i.k,t)},ht,8,_t)])]))),256))])):f("",!0),gt],32)])])])])])])])]),e("div",ft,[e("div",vt,[e("div",bt,[e("div",Ct,[e("table",yt,[xt,e("tbody",null,[(l(!0),n(_,null,g(o.itemList,t=>(l(),n("tr",null,[e("td",null,a(t.itemCode),1),e("td",null,a(t.gifmisReferenceCode),1),e("td",null,a(t.itemName),1),e("td",null,a(t.itemOrgCode),1),e("td",null,a(t.price),1),e("td",null,a(t.taxType),1),e("td",null,a(t.remitaRevenueReference),1),e("td",null,a(t.isSelfService),1),e("td",null,a(t.hasCustomField),1),e("td",null,[e("button",{onClick:u=>p.deleteItemRow(i.k,t),class:"btn btn-outline-danger btn-sm"},Ot,8,It)])]))),256)),this.itemList==""?(l(),n("button",wt,"Submit")):f("",!0),this.itemList!=""?(l(),n("button",{key:1,class:"btn btn-outline-success mt-4",onClick:s[13]||(s[13]=t=>p.submit())},"Submit")):f("",!0)])])])])])])])]),Rt])]),v(O)],64)}var Vt=R(T,[["render",kt]]);const Ft={__name:"SetupItemsView",setup(i){return(s,c)=>(l(),n("main",null,[v(w),v(Vt)]))}};export{Ft as default};
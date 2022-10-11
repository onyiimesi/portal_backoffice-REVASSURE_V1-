import{H as k}from"./Header.47845ea9.js";import{_ as I,a as u,u as N,o as a,c as n,b as t,t as i,d as f,w as S,k as V,l as _,n as y,v,F as m,j as p,e as b,f as c,g as x,r as C}from"./index.e2874b00.js";const w={name:"customeruserinvoice",data(){return{errors:[],message:[],allitem:[],allitems:[],invoicesubtotal:0,invoicetotal:0,invoicetax:0,tax:[],price:[],allorg:[],allsub:[],allcurrency:[],customerDetails:{customerCode:"",fullNames:"",id:"",fullNames:""},orgDetails:{emailAddress:"",subOrganisationCode:"",organizationCode:"",firstName:"",lastName:"",middleName:"",gender:"",unit:""},organizationCode:"",subOrganizationCode:"",customerCode:"",currencyCode:"",itemList:[],items:[{itemCode:"",quantity:"",line_total:0}],role:""}},async mounted(){this.role=localStorage.getItem("role");const l=await u.get("api/Users/profile",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.orgDetails=l.data.result;const e=await u.get("api/Customer/details/"+this.$route.params.id,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.customerDetails=e.data.result;const d=await u.get("api/Currency/allcurrencies",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.allcurrency=d.data.result;const g=await u.get("api/Item/organizations/"+this.orgDetails.organizationCode,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.allitem=g.data.result;const s=await u.get("api/Organisation/details/"+this.orgDetails.organizationCode,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.allorg=s.data.result},methods:{calculateTotal(){var l,e;l=this.items.reduce(function(d,g){var s=parseFloat(g.line_total);if(!isNaN(s))return d+s},0),this.invoicesubtotal=l.toFixed(2),e=l*(this.allitems.taxType/100)+l,e=parseFloat(e),isNaN(e)?this.invoicetotal="0.00":this.invoicetotal=e.toFixed(2)},calculateLineTotal(l){var e=parseFloat(this.allitems.price)*parseFloat(l.quantity);isNaN(e)||(l.line_total=e.toFixed(2)),this.calculateTotal()},deleteRow(l,e){var d=this.items.indexOf(e);d>-1&&this.items.splice(d,1),this.calculateTotal()},async onChange(l){const e=await u.get("api/Item/details/"+l.target.value,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.allitems=e.data.result.itemDetails,this.items.push({itemCode:"",quantity:"",line_total:0})},async createInvoice(){this.errors=[],this.message=[];const l=N();this.currencyCode?(this.itemList.push(this.items),await u.post("api/Invoice/addinvoice",{organizationCode:this.orgDetails.organizationCode,SubOrganizationCode:this.orgDetails.subOrganisationCode,customerCode:this.customerDetails.customerCode,currencyCode:this.currencyCode,items:this.items},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then(e=>{l.success(e.data.message),this.currencyCode="",this.items=[{itemCode:"",quantity:"",line_total:0}],this.invoicesubtotal="",this.invoicetotal="",this.allitems=""}).catch(e=>{e.response.data.title&&l.error("Please fill in all the fields")})):l.error("Please choose a currency")}}},B={id:"layout-wrapper"},T={class:"main-content"},A={class:"page-content"},O={class:"container-fluid"},U={class:"row"},F={class:"col-12"},q={class:"page-title-box d-flex align-items-center justify-content-between"},P={class:"mb-0"},L=c("Create Customer Bill "),H=t("br",null,null,-1),M=c(),R={style:{"font-size":"14px","font-weight":"500"}},j=c(),E={style:{"font-size":"14px","font-weight":"500"}},K={class:"page-title-right"},G={class:"breadcrumb m-0"},Q={class:"breadcrumb-item"},J=c("Home"),W=t("li",{class:"breadcrumb-item active"},"Create Customer Bill",-1),X={class:"row"},Y={class:"col-lg-12"},Z={class:"row"},$={class:"col-md-6 m-0 p-0"},tt={class:"bg-white p-4 h-100"},et={class:""},st={class:"mb-4"},ot={class:"mb-3"},it={style:{"font-size":"18px"}},lt={class:"mb-3"},at={style:{"font-size":"18px"}},nt={class:"mb-3"},rt={style:{"font-size":"18px"}},ct={class:"col-md-6 p-0"},dt={class:"bg-white p-4"},ut={class:""},_t=x('<div class="form-group"><label for="">Invoice Date</label><input type="date" class="form-control"></div><div class="form-group"><label for="">Due Date</label><input type="date" class="form-control"></div>',2),ht={class:"form-group"},mt=t("label",{class:"control-label"},[c("Currency "),t("span",{class:"text-danger"},"*")],-1),gt=["value"],vt=["value"],pt=["value"],ft={class:"bg-white p-4 mb-4 w-100"},yt={class:""},bt={class:""},Ct={class:""},xt={class:"col-md-12"},Dt={class:"form-group"},zt={class:""},kt={class:""},It={class:"row"},Nt={class:"col-md-12"},St={key:0,class:"alert alert-danger"},Vt=t("b",null,"Please correct the following error(s):",-1),wt={key:1,class:"alert alert-success"},Bt={class:"table table-bordered text-center"},Tt=t("thead",{class:"bg-dark text-white"},[t("td",null,[c("Item Name & Price "),t("span",{class:"text-danger"},"*")]),t("td",null,[c("Quantity "),t("span",{class:"text-danger"},"*")]),t("td",null,"Amount"),t("td")],-1),At=["onUpdate:modelValue"],Ot=["value"],Ut=["onUpdate:modelValue","onKeyup"],Ft=["onClick"],qt=t("i",{class:"fa fa-times"},null,-1),Pt=[qt],Lt=t("hr",null,null,-1),Ht={class:"card-body"},Mt={class:"row"},Rt=t("div",{class:"col-md-6"},null,-1),jt={class:"col-md-6"},Et={class:"text-right"},Kt={style:{"font-size":"16px"}},Gt=c("Subtotal: "),Qt={style:{"font-size":"16px"}},Jt=c("VAT: "),Wt={class:"mt-4"},Xt={style:{"font-size":"16px"}},Yt=c("Grand Total: "),Zt=t("button",{class:"btn btn-success mt-3"},"Submit",-1),$t=x('<footer class="footer"><div class="container-fluid"><div class="row"><div class="col-sm-6"> BackOffice 0.1 \xA9 2022 </div><div class="col-sm-6"><div class="text-sm-right d-none d-sm-block"> Powered by Intelligence </div></div></div></div></footer>',1);function te(l,e,d,g,s,h){const D=C("router-link"),z=C("router-view");return a(),n(m,null,[t("div",B,[t("div",T,[t("div",A,[t("div",O,[t("div",U,[t("div",F,[t("div",q,[t("h4",P,[L,H,M,t("span",R,i(s.orgDetails.organizationCode)+" // "+i(s.orgDetails.subOrganisationCode)+" //",1),j,t("span",E,i(s.orgDetails.lastName)+" "+i(s.orgDetails.firstName)+" // "+i(this.role),1)]),t("div",K,[t("ol",G,[t("li",Q,[f(D,{to:"/dashboard"},{default:S(()=>[J]),_:1})]),W])])])])]),t("div",X,[t("form",{onSubmit:e[5]||(e[5]=V((...o)=>h.createInvoice&&h.createInvoice(...o),["prevent"])),class:"w-100"},[t("div",Y,[t("div",Z,[t("div",$,[t("div",tt,[t("div",et,[t("div",st,[t("h3",null,i(s.customerDetails.firstname)+" "+i(s.customerDetails.lastname),1)]),t("div",ot,[t("p",it,i(s.customerDetails.contactAddress),1)]),t("div",lt,[t("p",at,i(s.customerDetails.customerCode),1)]),t("div",nt,[t("p",rt,i(s.customerDetails.mobileNumber1)+" - "+i(s.customerDetails.emailAddress),1)])])])]),t("div",ct,[t("div",dt,[t("div",ut,[_t,t("div",ht,[mt,_(t("select",{"onUpdate:modelValue":e[0]||(e[0]=o=>s.currencyCode=o),class:"form-control"},[t("option",{value:this.allcurrency[0]},i(this.allcurrency[0]),9,gt),t("option",{value:this.allcurrency[1]},i(this.allcurrency[1]),9,vt),t("option",{value:this.allcurrency[2]},i(this.allcurrency[2]),9,pt)],512),[[y,s.currencyCode]])])])])])])]),t("div",ft,[t("div",yt,[t("div",bt,[t("div",Ct,[_(t("input",{class:"form-control",readonly:"",type:"hidden","onUpdate:modelValue":e[1]||(e[1]=o=>s.orgDetails.organizationCode=o)},null,512),[[v,s.orgDetails.organizationCode]])])]),t("div",xt,[t("div",Dt,[_(t("input",{class:"form-control",readonly:"",type:"hidden","onUpdate:modelValue":e[2]||(e[2]=o=>s.orgDetails.subOrganisationCode=o)},null,512),[[v,s.orgDetails.subOrganisationCode]])])]),t("div",zt,[t("div",kt,[_(t("input",{class:"form-control",readonly:"",type:"hidden","onUpdate:modelValue":e[3]||(e[3]=o=>s.customerDetails.customerCode=o)},null,512),[[v,s.customerDetails.customerCode]])])])]),t("div",It,[t("div",Nt,[s.errors.length?(a(),n("div",St,[Vt,t("ul",null,[(a(!0),n(m,null,p(s.errors,o=>(a(),n("li",null,i(o),1))),256))])])):b("",!0),s.message.length?(a(),n("div",wt,[(a(!0),n(m,null,p(s.message,o=>(a(),n("strong",null,i(o),1))),256))])):b("",!0),t("table",Bt,[Tt,(a(!0),n(m,null,p(s.items,o=>(a(),n("tbody",{key:o},[t("tr",null,[t("td",null,[_((a(),n("select",{"onUpdate:modelValue":r=>o.itemCode=r,class:"form-control",onChange:e[4]||(e[4]=r=>h.onChange(r)),key:o},[(a(!0),n(m,null,p(s.allitem,r=>(a(),n("option",{value:r.itemOrgCode},i(r.itemCode)+" - PRICE: "+i(r.price),9,Ot))),256))],40,At)),[[y,o.itemCode]])]),t("td",null,[_((a(),n("input",{class:"form-control",type:"number","onUpdate:modelValue":r=>o.quantity=r,onKeyup:r=>h.calculateLineTotal(o),key:o},null,40,Ut)),[[v,o.quantity]])]),t("td",null,[t("p",null,i(o.line_total),1)]),t("td",null,[t("span",{class:"btn btn-danger btn-sm",style:{margin:"5px 0 0 0"},onClick:r=>h.deleteRow(l.k,o)},Pt,8,Ft)])])]))),128))])])]),Lt,t("div",Ht,[t("div",Mt,[Rt,t("div",jt,[t("div",Et,[t("div",null,[t("p",Kt,[Gt,t("strong",null,i(s.invoicesubtotal),1)])]),t("div",null,[t("p",Qt,[Jt,t("strong",null,i(this.allitems.taxType),1)])]),t("div",Wt,[t("p",Xt,[Yt,t("strong",null,i(s.invoicetotal),1)])]),Zt])])])])])],32)])])]),$t])]),f(z)],64)}var ee=I(w,[["render",te]]);const ie={__name:"CreateUserInvoiceView",setup(l){return(e,d)=>(a(),n("main",null,[f(k),f(ee)]))}};export{ie as default};
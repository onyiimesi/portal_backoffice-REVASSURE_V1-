import{H as f}from"./Header.47845ea9.js";import{_ as g,a as h,o as n,c,b as t,t as e,d as i,w as _,e as D,f as o,F as m,j as y,g as v,r as b}from"./index.e2874b00.js";const w={name:"customerdetails",data(){return{errors:[],message:[],invoice:[],customerDetails:{customerCode:"",fullNames:"",id:"",fullNames:""},role:"",customerDet:{emailAddress:"",subOrganisationCode:"",organizationCode:"",firstName:"",lastName:"",middleName:"",gender:"",unit:""}}},async mounted(){this.role=localStorage.getItem("role");const l=await h.get("api/Users/profile",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.customerDet=l.data.result;const a=await h.get("api/Customer/customer/"+this.$route.params.customerCode,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.customerDetails=a.data.result;const u=await h.get("api/Invoice/customerinvoices/"+this.$route.params.customerCode,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.invoice=u.data.result},computed:{convertDate(l){let a=0;return l.replace(/_+/g,()=>"// ::"[a++])}}},x={id:"layout-wrapper"},C={class:"main-content"},N={class:"page-content"},z={class:"container-fluid"},k={class:"row"},A={class:"col-12"},I={class:"page-title-box d-flex align-items-center justify-content-between"},B={class:"mb-0"},S=o("Customer Details "),V=t("br",null,null,-1),P=o(),F={style:{"font-size":"14px","font-weight":"500"}},H=o(),O={style:{"font-size":"14px","font-weight":"500"}},R={class:"page-title-right"},j={class:"breadcrumb m-0"},M={class:"breadcrumb-item"},U=o("Home"),E=t("li",{class:"breadcrumb-item active"},"Customer Details",-1),L={class:"row mb-4"},T={class:"col-md-4"},q={key:0,class:"card"},G={class:"card-body"},J={class:"mb-3"},K=o("Create Bill"),Q={class:"mb-3"},W=o("Issue Rebate"),X={class:"mb-1"},Y=o("Update Deatails"),Z={class:"card mb-4"},$={class:"card-body"},tt=t("label",{for:""},"Customer Number",-1),et={style:{"font-size":"20px"}},st=t("hr",null,null,-1),ot=t("label",{for:""},"Full Name",-1),it={style:{"font-size":"20px"}},lt=t("hr",null,null,-1),at=t("label",{for:""},"Address",-1),nt={style:{"font-size":"20px"}},ct=t("hr",null,null,-1),rt=t("label",{for:""},"Contact Details",-1),dt={style:{"font-size":"20px"}},_t=t("br",null,null,-1),ut={class:"col-md-8"},ht={class:"card"},mt=t("div",{class:"card-header bg-white border-bottom"},[t("h4",{class:"text-dark"},"Recent Bills")],-1),bt={class:"card-body table-responsive"},vt={id:"datatable",class:"table table-bordered dt-responsive nowrap",style:{"border-collapse":"collapse","border-spacing":"0",width:"100%"}},pt=t("thead",null,[t("tr",null,[t("th",null,"S/N"),t("th",null,"#Invoice"),t("th",null,"Invoice Date"),t("th",null,"Amount Due"),t("th",null,"Payment Mode"),t("th",null,"Action")])],-1),ft=t("td",null,"25,000",-1),gt=t("td",null,[t("button",{class:"btn btn-outline-success btn-sm"},"View Details")],-1),Dt=v('<div class="card"><div class="card-header bg-white border-bottom"><h4 class="text-dark">Recent Payments</h4></div><div class="card-body table-responsive"><table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse:collapse;border-spacing:0;width:100%;"><thead><tr><th>S/N</th><th>#Invoice</th><th>Payment Date</th><th>Amount Paid</th><th>Payment Mode</th><th>Action</th></tr></thead><tbody><tr><td>1</td><td>Cash</td><td>22/04/22</td><td>35,000</td><td>In-00921</td><td><button class="btn btn-outline-success btn-sm">View Details</button></td></tr></tbody></table></div></div>',1),yt=v('<footer class="footer"><div class="container-fluid"><div class="row"><div class="col-sm-6"> BackOffice 0.1 \xA9 2022 </div><div class="col-sm-6"><div class="text-sm-right d-none d-sm-block"> Powered by Intelligence </div></div></div></div></footer>',1);function wt(l,a,u,Ct,s,Nt){const r=b("router-link"),p=b("router-view");return n(),c(m,null,[t("div",x,[t("div",C,[t("div",N,[t("div",z,[t("div",k,[t("div",A,[t("div",I,[t("h4",B,[S,V,P,t("span",F,e(s.customerDet.organizationCode)+" // "+e(s.customerDet.subOrganisationCode)+" //",1),H,t("span",O,e(s.customerDet.lastName)+" "+e(s.customerDet.firstName)+" // "+e(this.role),1)]),t("div",R,[t("ol",j,[t("li",M,[i(r,{to:"/dashboard"},{default:_(()=>[U]),_:1})]),E])])])])]),t("div",L,[t("div",T,[this.role=="billing-oficer"?(n(),c("div",q,[t("div",G,[t("div",J,[i(r,{to:"/create-user-bill/"+s.customerDetails.id,style:{color:"#000","font-weight":"bold","font-size":"14px","text-transform":"uppercase"}},{default:_(()=>[K]),_:1},8,["to"])]),t("div",Q,[i(r,{to:"/customer-details/"+s.customerDetails.id,style:{color:"#000","font-weight":"bold","font-size":"14px","text-transform":"uppercase"}},{default:_(()=>[W]),_:1},8,["to"])]),t("div",X,[i(r,{to:"/update-details/"+s.customerDetails.id,style:{color:"#000","font-weight":"bold","font-size":"14px","text-transform":"uppercase"}},{default:_(()=>[Y]),_:1},8,["to"])])])])):D("",!0),t("div",Z,[t("div",$,[t("div",null,[tt,t("h3",et,e(s.customerDetails.customerCode),1)]),st,t("div",null,[ot,t("h3",it,e(s.customerDetails.firstname)+" "+e(s.customerDetails.lastname),1)]),lt,t("div",null,[at,t("h3",nt,e(s.customerDetails.contactAddress),1)]),ct,t("div",null,[rt,t("h3",dt,[o(e(s.customerDetails.emailAddress)+" ",1),_t,o(e(s.customerDetails.mobileNumber1),1)])])])])]),t("div",ut,[t("div",ht,[mt,t("div",bt,[t("table",vt,[pt,t("tbody",null,[(n(!0),c(m,null,y(s.invoice,d=>(n(),c("tr",null,[t("td",null,e(d.id),1),t("td",null,e(d.invoiceCode),1),t("td",null,e(d.invoiceDate),1),t("td",null,e(d.invoiceAmount),1),ft,gt]))),256))])])])]),Dt])])])]),yt])]),i(p)],64)}var xt=g(w,[["render",wt]]);const At={__name:"CustomerDetailsView",setup(l){return(a,u)=>(n(),c("main",null,[i(f),i(xt)]))}};export{At as default};
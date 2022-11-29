import{_ as v,a as g,o as e,c as t,b as s,d as l,w as f,F as i,k as d,t as _,e as u,l as k,n as x,v as b,j as P,r as h}from"./index.a5d27921.js";const y={name:"passwordreset",data(){return{errors:[],message:[],newpassword:"",tokenid:""}},created(){this.tokenid=localStorage.getItem("tokenid"),console.log(this.tokenid)},methods:{async resetPassword(){this.errors=[],this.message=[];const a=await g.put("api/UserAccount/resetpassword",{accountid:this.tokenid,newpassword:this.newpassword});a?(this.message.push(a.data.message),this.newpassword=""):this.errors.push("Incorrect Parameter")}}},N={class:"p-0"},V={class:"row no-gutters"},R={class:"col-lg-4"},j={class:"authentication-page-content p-4 d-flex align-items-center min-vh-100"},B={class:"w-100"},C={class:"row justify-content-center"},E={class:"col-lg-9"},S={class:"text-center"},A={class:""},D=s("img",{src:P,class:"img-fluid",width:"180",height:"180",alt:""},null,-1),F=s("h4",{class:"font-size-18 mt-4"},"Enter a new password",-1),I={class:"p-2 mt-5"},M={key:0,class:"alert alert-danger"},U=s("b",null,"Please correct the following error(s):",-1),z={key:1,class:"alert alert-success"},L={class:"form-group auth-form-group-custom mb-4"},T=s("i",{class:"ri-user-2-line auti-custom-input-icon"},null,-1),q=s("label",{for:"username"},"New Password",-1),G=s("div",{class:"mt-4 text-center"},[s("button",{class:"btn btn-primary w-md waves-effect waves-light"},"Reset")],-1),H=s("div",{class:"mt-5 text-center"},[s("p",null,"\xA9 2022 Revenue Assurance Project.")],-1),J=s("div",{class:"col-lg-8"},[s("div",{class:"authentication-bg"},[s("div",{class:"bg-overlay"})])],-1);function K(a,n,m,Q,r,c){const p=h("router-link"),w=h("router-view");return e(),t(i,null,[s("div",null,[s("div",N,[s("div",V,[s("div",R,[s("div",j,[s("div",B,[s("div",C,[s("div",E,[s("div",null,[s("div",S,[s("div",A,[l(p,{to:"/",class:"logo"},{default:f(()=>[D]),_:1})]),F]),s("div",I,[r.errors.length?(e(),t("div",M,[U,s("ul",null,[(e(!0),t(i,null,d(r.errors,o=>(e(),t("li",null,_(o),1))),256))])])):u("",!0),r.message.length?(e(),t("div",z,[(e(!0),t(i,null,d(r.message,o=>(e(),t("strong",null,_(o),1))),256))])):u("",!0),s("form",{onSubmit:n[1]||(n[1]=k((...o)=>c.resetPassword&&c.resetPassword(...o),["prevent"]))},[s("div",L,[T,q,x(s("input",{type:"password","onUpdate:modelValue":n[0]||(n[0]=o=>r.newpassword=o),class:"form-control",placeholder:"Enter New Password"},null,512),[[b,r.newpassword]])]),G],32)]),H])])])])])]),J])])]),l(w)],64)}var O=v(y,[["render",K]]);const X={__name:"PasswordResetView",setup(a){return(n,m)=>(e(),t("main",null,[l(O)]))}};export{X as default};

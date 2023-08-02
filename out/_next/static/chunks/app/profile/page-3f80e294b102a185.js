(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[178],{986:function(e,t,r){Promise.resolve().then(r.bind(r,3929))},3929:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return M}});var s=r(5607),n=r(8570),a=r(9958);let i=n.forwardRef((e,t)=>{let{className:r,...n}=e;return(0,s.jsx)("div",{ref:t,className:(0,a.cn)("bg-card text-card-foreground rounded-xl border shadow",r),...n})});i.displayName="Card";let o=n.forwardRef((e,t)=>{let{className:r,...n}=e;return(0,s.jsx)("div",{ref:t,className:(0,a.cn)("flex flex-col space-y-1.5 p-6",r),...n})});o.displayName="CardHeader";let l=n.forwardRef((e,t)=>{let{className:r,...n}=e;return(0,s.jsx)("h3",{ref:t,className:(0,a.cn)("font-semibold leading-none tracking-tight",r),...n})});l.displayName="CardTitle";let c=n.forwardRef((e,t)=>{let{className:r,...n}=e;return(0,s.jsx)("p",{ref:t,className:(0,a.cn)("text-muted-foreground text-sm",r),...n})});c.displayName="CardDescription";let u=n.forwardRef((e,t)=>{let{className:r,...n}=e;return(0,s.jsx)("div",{ref:t,className:(0,a.cn)("p-6 pt-0",r),...n})});u.displayName="CardContent";let d=n.forwardRef((e,t)=>{let{className:r,...n}=e;return(0,s.jsx)("div",{ref:t,className:(0,a.cn)(" flex items-center p-6 pt-0",r),...n})});d.displayName="CardFooter";var h=r(1189),f=r(8251),m=r(6048),p=r(6028),x=r(7275),v=r(1821),j=r(3782),b=r(4614),g=r(5175),y=r(5697);let w=p.Ry({password:p.Z_().min(8).max(63),password_confirmation:p.Z_().min(8).max(63)}).refine(e=>e.password===e.password_confirmation,{message:"Passwords don't match",path:["password_confirmation"]}),C=()=>{let{logout:e}=(0,n.useContext)(x.Vo),t=(0,m.cI)({resolver:(0,f.F)(w),defaultValues:{password:"",password_confirmation:""}}),r=async t=>{console.log("values -->",t);try{await (0,v.N4)(t),(0,y.Am)({variant:"success",description:"Password changed successfully. Please login again."}),setTimeout(()=>{e()},2e3)}catch(e){console.error(e)}};return(0,s.jsx)(b.l0,{...t,children:(0,s.jsx)("form",{onSubmit:t.handleSubmit(r),children:(0,s.jsxs)("div",{className:"flex h-full flex-col justify-between space-y-4",children:[(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsx)(b.Wi,{control:t.control,name:"password",render:e=>{let{field:t}=e;return(0,s.jsxs)(b.xJ,{children:[(0,s.jsx)(b.lX,{children:"Password"}),(0,s.jsx)(b.NI,{children:(0,s.jsx)(g.I,{type:"password",autoComplete:"off",placeholder:"********",...t})}),(0,s.jsx)(b.zG,{})]})}}),(0,s.jsx)(b.Wi,{control:t.control,name:"password_confirmation",render:e=>{let{field:t}=e;return(0,s.jsxs)(b.xJ,{children:[(0,s.jsx)(b.lX,{children:"Confirm password"}),(0,s.jsx)(b.NI,{children:(0,s.jsx)(g.I,{type:"password",autoComplete:"off",placeholder:"********",...t})}),(0,s.jsx)(b.zG,{})]})}})]}),(0,s.jsx)(j.z,{type:"submit",className:"self-start",children:"Save password"})]})})})};var N=r(6884),R=r(4508);let E=p.Ry({first_name:p.Z_().min(1).max(127),last_name:p.Z_().min(1).max(127),email:p.Z_().email()}),_=()=>{let{toast:e}=(0,y.pm)(),t=(0,N.NL)(),{mutate:r}=(0,R.D)({mutationFn:v.O8,onSuccess:()=>{console.log("SUCCESS"),t.invalidateQueries(["profile"]),e({variant:"success",description:"Successfully changed"})},onError:e=>{console.log({error:e})}}),n=(0,m.cI)({resolver:(0,f.F)(E),defaultValues:{first_name:"",last_name:"",email:""}}),a=async e=>{console.log("values -->",e),r(e)};return(0,s.jsx)(b.l0,{...n,children:(0,s.jsxs)("form",{onSubmit:n.handleSubmit(a),className:"space-y-4",children:[(0,s.jsxs)("div",{className:"grid gap-4 lg:grid-cols-2 lg:gap-8",children:[(0,s.jsx)(b.Wi,{control:n.control,name:"first_name",render:e=>{let{field:t}=e;return(0,s.jsxs)(b.xJ,{children:[(0,s.jsx)(b.lX,{children:"First name"}),(0,s.jsx)(b.NI,{children:(0,s.jsx)(g.I,{autoComplete:"off",placeholder:"John",...t})}),(0,s.jsx)(b.zG,{})]})}}),(0,s.jsx)(b.Wi,{control:n.control,name:"last_name",render:e=>{let{field:t}=e;return(0,s.jsxs)(b.xJ,{children:[(0,s.jsx)(b.lX,{children:"Last name"}),(0,s.jsx)(b.NI,{children:(0,s.jsx)(g.I,{autoComplete:"off",placeholder:"Doe",...t})}),(0,s.jsx)(b.zG,{})]})}})]}),(0,s.jsx)(b.Wi,{control:n.control,name:"email",render:e=>{let{field:t}=e;return(0,s.jsxs)(b.xJ,{children:[(0,s.jsx)(b.lX,{children:"Email"}),(0,s.jsx)(b.NI,{children:(0,s.jsx)(g.I,{autoComplete:"off",placeholder:"johndoe@gmail.com",...t})}),(0,s.jsx)(b.zG,{})]})}}),(0,s.jsx)(j.z,{type:"submit",className:"mt-5",children:"Save changes"})]})})};function M(){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("title",{children:"Profile page"}),(0,s.jsx)("section",{className:"container grid items-center gap-6 pb-8 pt-6 md:py-10",children:(0,s.jsx)("div",{className:"mx-auto",children:(0,s.jsxs)(h.mQ,{defaultValue:"account",className:"w-[400px] lg:w-[800px]",children:[(0,s.jsxs)(h.dr,{className:"grid w-full grid-cols-2",children:[(0,s.jsx)(h.SP,{value:"account",children:"Account"}),(0,s.jsx)(h.SP,{value:"password",children:"Password"})]}),(0,s.jsx)(h.nU,{value:"account",children:(0,s.jsxs)(i,{children:[(0,s.jsxs)(o,{children:[(0,s.jsx)(l,{children:"Account"}),(0,s.jsx)(c,{children:"Make changes to your account here."})]}),(0,s.jsx)(u,{children:(0,s.jsx)(_,{})})]})}),(0,s.jsx)(h.nU,{value:"password",children:(0,s.jsxs)(i,{children:[(0,s.jsxs)(o,{children:[(0,s.jsx)(l,{children:"Password"}),(0,s.jsx)(c,{children:"You'll be logged out after password is changed."})]}),(0,s.jsx)(u,{children:(0,s.jsx)(C,{})})]})})]})})})]})}},8251:function(e,t,r){"use strict";r.d(t,{F:function(){return l}});var s=r(6048),n=function(e,t,r){if(e&&"reportValidity"in e){var n=(0,s.U2)(r,t);e.setCustomValidity(n&&n.message||""),e.reportValidity()}},a=function(e,t){var r=function(r){var s=t.fields[r];s&&s.ref&&"reportValidity"in s.ref?n(s.ref,r,e):s.refs&&s.refs.forEach(function(t){return n(t,r,e)})};for(var s in t.fields)r(s)},i=function(e,t){t.shouldUseNativeValidation&&a(e,t);var r={};for(var n in e){var i=(0,s.U2)(t.fields,n);(0,s.t8)(r,n,Object.assign(e[n]||{},{ref:i&&i.ref}))}return r},o=function(e,t){for(var r={};e.length;){var n=e[0],a=n.code,i=n.message,o=n.path.join(".");if(!r[o]){if("unionErrors"in n){var l=n.unionErrors[0].errors[0];r[o]={message:l.message,type:l.code}}else r[o]={message:i,type:a}}if("unionErrors"in n&&n.unionErrors.forEach(function(t){return t.errors.forEach(function(t){return e.push(t)})}),t){var c=r[o].types,u=c&&c[n.code];r[o]=(0,s.KN)(o,t,r,a,u?[].concat(u,n.message):n.message)}e.shift()}return r},l=function(e,t,r){return void 0===r&&(r={}),function(s,n,l){try{return Promise.resolve(function(n,i){try{var o=Promise.resolve(e["sync"===r.mode?"parse":"parseAsync"](s,t)).then(function(e){return l.shouldUseNativeValidation&&a({},l),{errors:{},values:r.raw?s:e}})}catch(e){return i(e)}return o&&o.then?o.then(void 0,i):o}(0,function(e){if(null!=e.errors)return{values:{},errors:i(o(e.errors,!l.shouldUseNativeValidation&&"all"===l.criteriaMode),l)};throw e}))}catch(e){return Promise.reject(e)}}}},3470:function(e,t,r){"use strict";r.d(t,{VY:function(){return M},aV:function(){return E},fC:function(){return R},xz:function(){return _}});var s=r(8580),n=r(8570),a=r(1294),i=r(4897),o=r(204),l=r(7084),c=r(8203),u=r(7365),d=r(1726),h=r(4635);let f="Tabs",[m,p]=(0,i.b)(f,[o.Pc]),x=(0,o.Pc)(),[v,j]=m(f),b=(0,n.forwardRef)((e,t)=>{let{__scopeTabs:r,value:a,onValueChange:i,defaultValue:o,orientation:l="horizontal",dir:f,activationMode:m="automatic",...p}=e,x=(0,u.gm)(f),[j,b]=(0,d.T)({prop:a,onChange:i,defaultProp:o});return(0,n.createElement)(v,{scope:r,baseId:(0,h.M)(),value:j,onValueChange:b,orientation:l,dir:x,activationMode:m},(0,n.createElement)(c.WV.div,(0,s.Z)({dir:x,"data-orientation":l},p,{ref:t})))}),g=(0,n.forwardRef)((e,t)=>{let{__scopeTabs:r,loop:a=!0,...i}=e,l=j("TabsList",r),u=x(r);return(0,n.createElement)(o.fC,(0,s.Z)({asChild:!0},u,{orientation:l.orientation,dir:l.dir,loop:a}),(0,n.createElement)(c.WV.div,(0,s.Z)({role:"tablist","aria-orientation":l.orientation},i,{ref:t})))}),y=(0,n.forwardRef)((e,t)=>{let{__scopeTabs:r,value:i,disabled:l=!1,...u}=e,d=j("TabsTrigger",r),h=x(r),f=C(d.baseId,i),m=N(d.baseId,i),p=i===d.value;return(0,n.createElement)(o.ck,(0,s.Z)({asChild:!0},h,{focusable:!l,active:p}),(0,n.createElement)(c.WV.button,(0,s.Z)({type:"button",role:"tab","aria-selected":p,"aria-controls":m,"data-state":p?"active":"inactive","data-disabled":l?"":void 0,disabled:l,id:f},u,{ref:t,onMouseDown:(0,a.M)(e.onMouseDown,e=>{l||0!==e.button||!1!==e.ctrlKey?e.preventDefault():d.onValueChange(i)}),onKeyDown:(0,a.M)(e.onKeyDown,e=>{[" ","Enter"].includes(e.key)&&d.onValueChange(i)}),onFocus:(0,a.M)(e.onFocus,()=>{let e="manual"!==d.activationMode;p||l||!e||d.onValueChange(i)})})))}),w=(0,n.forwardRef)((e,t)=>{let{__scopeTabs:r,value:a,forceMount:i,children:o,...u}=e,d=j("TabsContent",r),h=C(d.baseId,a),f=N(d.baseId,a),m=a===d.value,p=(0,n.useRef)(m);return(0,n.useEffect)(()=>{let e=requestAnimationFrame(()=>p.current=!1);return()=>cancelAnimationFrame(e)},[]),(0,n.createElement)(l.z,{present:i||m},({present:r})=>(0,n.createElement)(c.WV.div,(0,s.Z)({"data-state":m?"active":"inactive","data-orientation":d.orientation,role:"tabpanel","aria-labelledby":h,hidden:!r,id:f,tabIndex:0},u,{ref:t,style:{...e.style,animationDuration:p.current?"0s":void 0}}),r&&o))});function C(e,t){return`${e}-trigger-${t}`}function N(e,t){return`${e}-content-${t}`}let R=b,E=g,_=y,M=w},4508:function(e,t,r){"use strict";r.d(t,{D:function(){return h}});var s=r(8570),n=r(3395),a=r(7446),i=r(55),o=r(101),l=r(9405);class c extends l.l{constructor(e,t){super(),this.client=e,this.setOptions(t),this.bindMethods(),this.updateResult()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(e){var t;let r=this.options;this.options=this.client.defaultMutationOptions(e),(0,a.VS)(r,this.options)||this.client.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.currentMutation,observer:this}),null==(t=this.currentMutation)||t.setOptions(this.options)}onUnsubscribe(){if(!this.hasListeners()){var e;null==(e=this.currentMutation)||e.removeObserver(this)}}onMutationUpdate(e){this.updateResult();let t={listeners:!0};"success"===e.type?t.onSuccess=!0:"error"===e.type&&(t.onError=!0),this.notify(t)}getCurrentResult(){return this.currentResult}reset(){this.currentMutation=void 0,this.updateResult(),this.notify({listeners:!0})}mutate(e,t){return this.mutateOptions=t,this.currentMutation&&this.currentMutation.removeObserver(this),this.currentMutation=this.client.getMutationCache().build(this.client,{...this.options,variables:void 0!==e?e:this.options.variables}),this.currentMutation.addObserver(this),this.currentMutation.execute()}updateResult(){let e=this.currentMutation?this.currentMutation.state:(0,i.R)(),t={...e,isLoading:"loading"===e.status,isSuccess:"success"===e.status,isError:"error"===e.status,isIdle:"idle"===e.status,mutate:this.mutate,reset:this.reset};this.currentResult=t}notify(e){o.V.batch(()=>{if(this.mutateOptions&&this.hasListeners()){var t,r,s,n,a,i,o,l;e.onSuccess?(null==(t=(r=this.mutateOptions).onSuccess)||t.call(r,this.currentResult.data,this.currentResult.variables,this.currentResult.context),null==(s=(n=this.mutateOptions).onSettled)||s.call(n,this.currentResult.data,null,this.currentResult.variables,this.currentResult.context)):e.onError&&(null==(a=(i=this.mutateOptions).onError)||a.call(i,this.currentResult.error,this.currentResult.variables,this.currentResult.context),null==(o=(l=this.mutateOptions).onSettled)||o.call(l,void 0,this.currentResult.error,this.currentResult.variables,this.currentResult.context))}e.listeners&&this.listeners.forEach(({listener:e})=>{e(this.currentResult)})})}}var u=r(6884),d=r(1142);function h(e,t,r){let i=(0,a.lV)(e,t,r),l=(0,u.NL)({context:i.context}),[h]=s.useState(()=>new c(l,i));s.useEffect(()=>{h.setOptions(i)},[h,i]);let m=(0,n.$)(s.useCallback(e=>h.subscribe(o.V.batchCalls(e)),[h]),()=>h.getCurrentResult(),()=>h.getCurrentResult()),p=s.useCallback((e,t)=>{h.mutate(e,t).catch(f)},[h]);if(m.error&&(0,d.L)(h.options.useErrorBoundary,[m.error]))throw m.error;return{...m,mutate:p,mutateAsync:m.mutate}}function f(){}}},function(e){e.O(0,[468,28,246,492,31,501,524,744],function(){return e(e.s=986)}),_N_E=e.O()}]);
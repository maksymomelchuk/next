"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[492],{3592:function(e,t,r){r.d(t,{f:function(){return u}});var a=r(8580),s=r(8570),i=r(8203);let l=(0,s.forwardRef)((e,t)=>(0,s.createElement)(i.WV.label,(0,a.Z)({},e,{ref:t,onMouseDown:t=>{var r;null===(r=e.onMouseDown)||void 0===r||r.call(e,t),!t.defaultPrevented&&t.detail>1&&t.preventDefault()}}))),u=l},6048:function(e,t,r){r.d(t,{Gc:function(){return A},KN:function(){return B},Qr:function(){return j},RV:function(){return w},U2:function(){return p},cI:function(){return eV},t8:function(){return U}});var a=r(8570),s=e=>"checkbox"===e.type,i=e=>e instanceof Date,l=e=>null==e;let u=e=>"object"==typeof e;var n=e=>!l(e)&&!Array.isArray(e)&&u(e)&&!i(e),o=e=>n(e)&&e.target?s(e.target)?e.target.checked:e.target.value:e,f=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,d=(e,t)=>e.has(f(t)),c=e=>{let t=e.constructor&&e.constructor.prototype;return n(t)&&t.hasOwnProperty("isPrototypeOf")},y="undefined"!=typeof window&&void 0!==window.HTMLElement&&"undefined"!=typeof document;function m(e){let t;let r=Array.isArray(e);if(e instanceof Date)t=new Date(e);else if(e instanceof Set)t=new Set(e);else if(!(!(y&&(e instanceof Blob||e instanceof FileList))&&(r||n(e))))return e;else if(t=r?[]:{},r||c(e))for(let r in e)e.hasOwnProperty(r)&&(t[r]=m(e[r]));else t=e;return t}var h=e=>Array.isArray(e)?e.filter(Boolean):[],v=e=>void 0===e,p=(e,t,r)=>{if(!t||!n(e))return r;let a=h(t.split(/[,[\].]+?/)).reduce((e,t)=>l(e)?e:e[t],e);return v(a)||a===e?v(e[t])?r:e[t]:a};let g={BLUR:"blur",FOCUS_OUT:"focusout",CHANGE:"change"},_={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},b={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"},V=a.createContext(null),A=()=>a.useContext(V),w=e=>{let{children:t,...r}=e;return a.createElement(V.Provider,{value:r},t)};var F=(e,t,r,a=!0)=>{let s={defaultValues:t._defaultValues};for(let i in e)Object.defineProperty(s,i,{get:()=>(t._proxyFormState[i]!==_.all&&(t._proxyFormState[i]=!a||_.all),r&&(r[i]=!0),e[i])});return s},S=e=>n(e)&&!Object.keys(e).length,x=(e,t,r,a)=>{r(e);let{name:s,...i}=e;return S(i)||Object.keys(i).length>=Object.keys(t).length||Object.keys(i).find(e=>t[e]===(!a||_.all))},k=e=>Array.isArray(e)?e:[e],D=(e,t,r)=>r&&t?e===t:!e||!t||e===t||k(e).some(e=>e&&(e.startsWith(t)||t.startsWith(e)));function C(e){let t=a.useRef(e);t.current=e,a.useEffect(()=>{let r=!e.disabled&&t.current.subject&&t.current.subject.subscribe({next:t.current.next});return()=>{r&&r.unsubscribe()}},[e.disabled])}var O=e=>"string"==typeof e,E=(e,t,r,a,s)=>O(e)?(a&&t.watch.add(e),p(r,e,s)):Array.isArray(e)?e.map(e=>(a&&t.watch.add(e),p(r,e))):(a&&(t.watchAll=!0),r),L=e=>/^\w*$/.test(e),T=e=>h(e.replace(/["|']|\]/g,"").split(/\.|\[/));function U(e,t,r){let a=-1,s=L(t)?[t]:T(t),i=s.length,l=i-1;for(;++a<i;){let t=s[a],i=r;if(a!==l){let r=e[t];i=n(r)||Array.isArray(r)?r:isNaN(+s[a+1])?{}:[]}e[t]=i,e=e[t]}return e}let j=e=>e.render(function(e){let t=A(),{name:r,control:s=t.control,shouldUnregister:i}=e,l=d(s._names.array,r),u=function(e){let t=A(),{control:r=t.control,name:s,defaultValue:i,disabled:l,exact:u}=e||{},n=a.useRef(s);n.current=s,C({disabled:l,subject:r._subjects.values,next:e=>{D(n.current,e.name,u)&&f(m(E(n.current,r._names,e.values||r._formValues,!1,i)))}});let[o,f]=a.useState(r._getWatch(s,i));return a.useEffect(()=>r._removeUnmounted()),o}({control:s,name:r,defaultValue:p(s._formValues,r,p(s._defaultValues,r,e.defaultValue)),exact:!0}),n=function(e){let t=A(),{control:r=t.control,disabled:s,name:i,exact:l}=e||{},[u,n]=a.useState(r._formState),o=a.useRef(!0),f=a.useRef({isDirty:!1,isLoading:!1,dirtyFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1}),d=a.useRef(i);return d.current=i,C({disabled:s,next:e=>o.current&&D(d.current,e.name,l)&&x(e,f.current,r._updateFormState)&&n({...r._formState,...e}),subject:r._subjects.state}),a.useEffect(()=>(o.current=!0,f.current.isValid&&r._updateValid(!0),()=>{o.current=!1}),[r]),F(u,r,f.current,!1)}({control:s,name:r}),f=a.useRef(s.register(r,{...e.rules,value:u}));return f.current=s.register(r,e.rules),a.useEffect(()=>{let e=s._options.shouldUnregister||i,t=(e,t)=>{let r=p(s._fields,e);r&&(r._f.mount=t)};if(t(r,!0),e){let e=m(p(s._options.defaultValues,r));U(s._defaultValues,r,e),v(p(s._formValues,r))&&U(s._formValues,r,e)}return()=>{(l?e&&!s._state.action:e)?s.unregister(r):t(r,!1)}},[r,s,l,i]),{field:{name:r,value:u,onChange:a.useCallback(e=>f.current.onChange({target:{value:o(e),name:r},type:g.CHANGE}),[r]),onBlur:a.useCallback(()=>f.current.onBlur({target:{value:p(s._formValues,r),name:r},type:g.BLUR}),[r,s]),ref:e=>{let t=p(s._fields,r);t&&e&&(t._f.ref={focus:()=>e.focus(),select:()=>e.select(),setCustomValidity:t=>e.setCustomValidity(t),reportValidity:()=>e.reportValidity()})}},formState:n,fieldState:Object.defineProperties({},{invalid:{enumerable:!0,get:()=>!!p(n.errors,r)},isDirty:{enumerable:!0,get:()=>!!p(n.dirtyFields,r)},isTouched:{enumerable:!0,get:()=>!!p(n.touchedFields,r)},error:{enumerable:!0,get:()=>p(n.errors,r)}})}}(e));var B=(e,t,r,a,s)=>t?{...r[e],types:{...r[e]&&r[e].types?r[e].types:{},[a]:s||!0}}:{};let N=(e,t,r)=>{for(let a of r||Object.keys(e)){let r=p(e,a);if(r){let{_f:e,...a}=r;if(e&&t(e.name)){if(e.ref.focus){e.ref.focus();break}if(e.refs&&e.refs[0].focus){e.refs[0].focus();break}}else n(a)&&N(a,t)}}};var M=e=>({isOnSubmit:!e||e===_.onSubmit,isOnBlur:e===_.onBlur,isOnChange:e===_.onChange,isOnAll:e===_.all,isOnTouch:e===_.onTouched}),R=(e,t,r)=>!r&&(t.watchAll||t.watch.has(e)||[...t.watch].some(t=>e.startsWith(t)&&/^\.\w+/.test(e.slice(t.length)))),q=(e,t,r)=>{let a=h(p(e,r));return U(a,"root",t[r]),U(e,r,a),e},P=e=>"boolean"==typeof e,H=e=>"file"===e.type,W=e=>"function"==typeof e,I=e=>{if(!y)return!1;let t=e?e.ownerDocument:0;return e instanceof(t&&t.defaultView?t.defaultView.HTMLElement:HTMLElement)},$=e=>O(e),G=e=>"radio"===e.type,K=e=>e instanceof RegExp;let Q={value:!1,isValid:!1},Z={value:!0,isValid:!0};var z=e=>{if(Array.isArray(e)){if(e.length>1){let t=e.filter(e=>e&&e.checked&&!e.disabled).map(e=>e.value);return{value:t,isValid:!!t.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!v(e[0].attributes.value)?v(e[0].value)||""===e[0].value?Z:{value:e[0].value,isValid:!0}:Z:Q}return Q};let J={isValid:!1,value:null};var X=e=>Array.isArray(e)?e.reduce((e,t)=>t&&t.checked&&!t.disabled?{isValid:!0,value:t.value}:e,J):J;function Y(e,t,r="validate"){if($(e)||Array.isArray(e)&&e.every($)||P(e)&&!e)return{type:r,message:$(e)?e:"",ref:t}}var ee=e=>n(e)&&!K(e)?e:{value:e,message:""},et=async(e,t,r,a,i)=>{let{ref:u,refs:o,required:f,maxLength:d,minLength:c,min:y,max:m,pattern:h,validate:g,name:_,valueAsNumber:V,mount:A,disabled:w}=e._f,F=p(t,_);if(!A||w)return{};let x=o?o[0]:u,k=e=>{a&&x.reportValidity&&(x.setCustomValidity(P(e)?"":e||""),x.reportValidity())},D={},C=G(u),E=s(u),L=(V||H(u))&&v(u.value)&&v(F)||I(u)&&""===u.value||""===F||Array.isArray(F)&&!F.length,T=B.bind(null,_,r,D),U=(e,t,r,a=b.maxLength,s=b.minLength)=>{let i=e?t:r;D[_]={type:e?a:s,message:i,ref:u,...T(e?a:s,i)}};if(i?!Array.isArray(F)||!F.length:f&&(!(C||E)&&(L||l(F))||P(F)&&!F||E&&!z(o).isValid||C&&!X(o).isValid)){let{value:e,message:t}=$(f)?{value:!!f,message:f}:ee(f);if(e&&(D[_]={type:b.required,message:t,ref:x,...T(b.required,t)},!r))return k(t),D}if(!L&&(!l(y)||!l(m))){let e,t;let a=ee(m),s=ee(y);if(l(F)||isNaN(F)){let r=u.valueAsDate||new Date(F),i=e=>new Date(new Date().toDateString()+" "+e),l="time"==u.type,n="week"==u.type;O(a.value)&&F&&(e=l?i(F)>i(a.value):n?F>a.value:r>new Date(a.value)),O(s.value)&&F&&(t=l?i(F)<i(s.value):n?F<s.value:r<new Date(s.value))}else{let r=u.valueAsNumber||(F?+F:F);l(a.value)||(e=r>a.value),l(s.value)||(t=r<s.value)}if((e||t)&&(U(!!e,a.message,s.message,b.max,b.min),!r))return k(D[_].message),D}if((d||c)&&!L&&(O(F)||i&&Array.isArray(F))){let e=ee(d),t=ee(c),a=!l(e.value)&&F.length>+e.value,s=!l(t.value)&&F.length<+t.value;if((a||s)&&(U(a,e.message,t.message),!r))return k(D[_].message),D}if(h&&!L&&O(F)){let{value:e,message:t}=ee(h);if(K(e)&&!F.match(e)&&(D[_]={type:b.pattern,message:t,ref:u,...T(b.pattern,t)},!r))return k(t),D}if(g){if(W(g)){let e=await g(F,t),a=Y(e,x);if(a&&(D[_]={...a,...T(b.validate,a.message)},!r))return k(a.message),D}else if(n(g)){let e={};for(let a in g){if(!S(e)&&!r)break;let s=Y(await g[a](F,t),x,a);s&&(e={...s,...T(a,s.message)},k(s.message),r&&(D[_]=e))}if(!S(e)&&(D[_]={ref:x,...e},!r))return D}}return k(!0),D};function er(e,t){let r=Array.isArray(t)?t:L(t)?[t]:T(t),a=1===r.length?e:function(e,t){let r=t.slice(0,-1).length,a=0;for(;a<r;)e=v(e)?a++:e[t[a++]];return e}(e,r),s=r.length-1,i=r[s];return a&&delete a[i],0!==s&&(n(a)&&S(a)||Array.isArray(a)&&function(e){for(let t in e)if(e.hasOwnProperty(t)&&!v(e[t]))return!1;return!0}(a))&&er(e,r.slice(0,-1)),e}function ea(){let e=[];return{get observers(){return e},next:t=>{for(let r of e)r.next&&r.next(t)},subscribe:t=>(e.push(t),{unsubscribe:()=>{e=e.filter(e=>e!==t)}}),unsubscribe:()=>{e=[]}}}var es=e=>l(e)||!u(e);function ei(e,t){if(es(e)||es(t))return e===t;if(i(e)&&i(t))return e.getTime()===t.getTime();let r=Object.keys(e),a=Object.keys(t);if(r.length!==a.length)return!1;for(let s of r){let r=e[s];if(!a.includes(s))return!1;if("ref"!==s){let e=t[s];if(i(r)&&i(e)||n(r)&&n(e)||Array.isArray(r)&&Array.isArray(e)?!ei(r,e):r!==e)return!1}}return!0}var el=e=>"select-multiple"===e.type,eu=e=>G(e)||s(e),en=e=>I(e)&&e.isConnected,eo=e=>{for(let t in e)if(W(e[t]))return!0;return!1};function ef(e,t={}){let r=Array.isArray(e);if(n(e)||r)for(let r in e)Array.isArray(e[r])||n(e[r])&&!eo(e[r])?(t[r]=Array.isArray(e[r])?[]:{},ef(e[r],t[r])):l(e[r])||(t[r]=!0);return t}var ed=(e,t)=>(function e(t,r,a){let s=Array.isArray(t);if(n(t)||s)for(let s in t)Array.isArray(t[s])||n(t[s])&&!eo(t[s])?v(r)||es(a[s])?a[s]=Array.isArray(t[s])?ef(t[s],[]):{...ef(t[s])}:e(t[s],l(r)?{}:r[s],a[s]):a[s]=!ei(t[s],r[s]);return a})(e,t,ef(t)),ec=(e,{valueAsNumber:t,valueAsDate:r,setValueAs:a})=>v(e)?e:t?""===e?NaN:e?+e:e:r&&O(e)?new Date(e):a?a(e):e;function ey(e){let t=e.ref;return(e.refs?e.refs.every(e=>e.disabled):t.disabled)?void 0:H(t)?t.files:G(t)?X(e.refs).value:el(t)?[...t.selectedOptions].map(({value:e})=>e):s(t)?z(e.refs).value:ec(v(t.value)?e.ref.value:t.value,e)}var em=(e,t,r,a)=>{let s={};for(let r of e){let e=p(t,r);e&&U(s,r,e._f)}return{criteriaMode:r,names:[...e],fields:s,shouldUseNativeValidation:a}},eh=e=>v(e)?e:K(e)?e.source:n(e)?K(e.value)?e.value.source:e.value:e,ev=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function ep(e,t,r){let a=p(e,r);if(a||L(r))return{error:a,name:r};let s=r.split(".");for(;s.length;){let a=s.join("."),i=p(t,a),l=p(e,a);if(i&&!Array.isArray(i)&&r!==a)break;if(l&&l.type)return{name:a,error:l};s.pop()}return{name:r}}var eg=(e,t,r,a,s)=>!s.isOnAll&&(!r&&s.isOnTouch?!(t||e):(r?a.isOnBlur:s.isOnBlur)?!e:(r?!a.isOnChange:!s.isOnChange)||e),e_=(e,t)=>!h(p(e,t)).length&&er(e,t);let eb={mode:_.onSubmit,reValidateMode:_.onChange,shouldFocusError:!0};function eV(e={}){let t=a.useRef(),[r,u]=a.useState({isDirty:!1,isValidating:!1,isLoading:W(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},errors:{},defaultValues:W(e.defaultValues)?void 0:e.defaultValues});t.current||(t.current={...function(e={},t){let r,a={...eb,...e},u={submitCount:0,isDirty:!1,isLoading:W(a.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},errors:{}},f={},c=(n(a.defaultValues)||n(a.values))&&m(a.defaultValues||a.values)||{},b=a.shouldUnregister?{}:m(c),V={action:!1,mount:!1,watch:!1},A={mount:new Set,unMount:new Set,array:new Set,watch:new Set},w=0,F={isDirty:!1,dirtyFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},x={values:ea(),array:ea(),state:ea()},D=e.resetOptions&&e.resetOptions.keepDirtyValues,C=M(a.mode),L=M(a.reValidateMode),T=a.criteriaMode===_.all,j=e=>t=>{clearTimeout(w),w=setTimeout(e,t)},B=async e=>{if(F.isValid||e){let e=a.resolver?S((await z()).errors):await X(f,!0);e!==u.isValid&&x.state.next({isValid:e})}},$=e=>F.isValidating&&x.state.next({isValidating:e}),G=(e,t)=>{U(u.errors,e,t),x.state.next({errors:u.errors})},K=(e,t,r,a)=>{let s=p(f,e);if(s){let i=p(b,e,v(r)?p(c,e):r);v(i)||a&&a.defaultChecked||t?U(b,e,t?i:ey(s._f)):eo(e,i),V.mount&&B()}},Q=(e,t,r,a,s)=>{let i=!1,l=!1,n={name:e};if(!r||a){F.isDirty&&(l=u.isDirty,u.isDirty=n.isDirty=Y(),i=l!==n.isDirty);let r=ei(p(c,e),t);l=p(u.dirtyFields,e),r?er(u.dirtyFields,e):U(u.dirtyFields,e,!0),n.dirtyFields=u.dirtyFields,i=i||F.dirtyFields&&!r!==l}if(r){let t=p(u.touchedFields,e);t||(U(u.touchedFields,e,r),n.touchedFields=u.touchedFields,i=i||F.touchedFields&&t!==r)}return i&&s&&x.state.next(n),i?n:{}},Z=(t,a,s,i)=>{let l=p(u.errors,t),n=F.isValid&&P(a)&&u.isValid!==a;if(e.delayError&&s?(r=j(()=>G(t,s)))(e.delayError):(clearTimeout(w),r=null,s?U(u.errors,t,s):er(u.errors,t)),(s?!ei(l,s):l)||!S(i)||n){let e={...i,...n&&P(a)?{isValid:a}:{},errors:u.errors,name:t};u={...u,...e},x.state.next(e)}$(!1)},z=async e=>a.resolver(b,a.context,em(e||A.mount,f,a.criteriaMode,a.shouldUseNativeValidation)),J=async e=>{let{errors:t}=await z();if(e)for(let r of e){let e=p(t,r);e?U(u.errors,r,e):er(u.errors,r)}else u.errors=t;return t},X=async(e,t,r={valid:!0})=>{for(let s in e){let i=e[s];if(i){let{_f:e,...s}=i;if(e){let s=A.array.has(e.name),l=await et(i,b,T,a.shouldUseNativeValidation&&!t,s);if(l[e.name]&&(r.valid=!1,t))break;t||(p(l,e.name)?s?q(u.errors,l,e.name):U(u.errors,e.name,l[e.name]):er(u.errors,e.name))}s&&await X(s,t,r)}}return r.valid},Y=(e,t)=>(e&&t&&U(b,e,t),!ei(eF(),c)),ee=(e,t,r)=>E(e,A,{...V.mount?b:v(t)?c:O(e)?{[e]:t}:t},r,t),eo=(e,t,r={})=>{let a=p(f,e),i=t;if(a){let r=a._f;r&&(r.disabled||U(b,e,ec(t,r)),i=I(r.ref)&&l(t)?"":t,el(r.ref)?[...r.ref.options].forEach(e=>e.selected=i.includes(e.value)):r.refs?s(r.ref)?r.refs.length>1?r.refs.forEach(e=>(!e.defaultChecked||!e.disabled)&&(e.checked=Array.isArray(i)?!!i.find(t=>t===e.value):i===e.value)):r.refs[0]&&(r.refs[0].checked=!!i):r.refs.forEach(e=>e.checked=e.value===i):H(r.ref)?r.ref.value="":(r.ref.value=i,r.ref.type||x.values.next({name:e,values:{...b}})))}(r.shouldDirty||r.shouldTouch)&&Q(e,i,r.shouldTouch,r.shouldDirty,!0),r.shouldValidate&&ew(e)},ef=(e,t,r)=>{for(let a in t){let s=t[a],l=`${e}.${a}`,u=p(f,l);!A.array.has(e)&&es(s)&&(!u||u._f)||i(s)?eo(l,s,r):ef(l,s,r)}},eV=(e,r,a={})=>{let s=p(f,e),i=A.array.has(e),n=m(r);U(b,e,n),i?(x.array.next({name:e,values:{...b}}),(F.isDirty||F.dirtyFields)&&a.shouldDirty&&x.state.next({name:e,dirtyFields:ed(c,b),isDirty:Y(e,n)})):!s||s._f||l(n)?eo(e,n,a):ef(e,n,a),R(e,A)&&x.state.next({...u}),x.values.next({name:e,values:{...b}}),V.mount||t()},eA=async e=>{let t=e.target,s=t.name,i=!0,l=p(f,s);if(l){let n,d;let c=t.type?ey(l._f):o(e),y=e.type===g.BLUR||e.type===g.FOCUS_OUT,m=!ev(l._f)&&!a.resolver&&!p(u.errors,s)&&!l._f.deps||eg(y,p(u.touchedFields,s),u.isSubmitted,L,C),h=R(s,A,y);U(b,s,c),y?(l._f.onBlur&&l._f.onBlur(e),r&&r(0)):l._f.onChange&&l._f.onChange(e);let v=Q(s,c,y,!1),_=!S(v)||h;if(y||x.values.next({name:s,type:e.type,values:{...b}}),m)return F.isValid&&B(),_&&x.state.next({name:s,...h?{}:v});if(!y&&h&&x.state.next({...u}),$(!0),a.resolver){let{errors:e}=await z([s]),t=ep(u.errors,f,s),r=ep(e,f,t.name||s);n=r.error,s=r.name,d=S(e)}else n=(await et(l,b,T,a.shouldUseNativeValidation))[s],(i=isNaN(c)||c===p(b,s,c))&&(n?d=!1:F.isValid&&(d=await X(f,!0)));i&&(l._f.deps&&ew(l._f.deps),Z(s,d,n,v))}},ew=async(e,t={})=>{let r,s;let i=k(e);if($(!0),a.resolver){let t=await J(v(e)?e:i);r=S(t),s=e?!i.some(e=>p(t,e)):r}else e?((s=(await Promise.all(i.map(async e=>{let t=p(f,e);return await X(t&&t._f?{[e]:t}:t)}))).every(Boolean))||u.isValid)&&B():s=r=await X(f);return x.state.next({...!O(e)||F.isValid&&r!==u.isValid?{}:{name:e},...a.resolver||!e?{isValid:r}:{},errors:u.errors,isValidating:!1}),t.shouldFocus&&!s&&N(f,e=>e&&p(u.errors,e),e?i:A.mount),s},eF=e=>{let t={...c,...V.mount?b:{}};return v(e)?t:O(e)?p(t,e):e.map(e=>p(t,e))},eS=(e,t)=>({invalid:!!p((t||u).errors,e),isDirty:!!p((t||u).dirtyFields,e),isTouched:!!p((t||u).touchedFields,e),error:p((t||u).errors,e)}),ex=(e,t,r)=>{let a=(p(f,e,{_f:{}})._f||{}).ref;U(u.errors,e,{...t,ref:a}),x.state.next({name:e,errors:u.errors,isValid:!1}),r&&r.shouldFocus&&a&&a.focus&&a.focus()},ek=(e,t={})=>{for(let r of e?k(e):A.mount)A.mount.delete(r),A.array.delete(r),t.keepValue||(er(f,r),er(b,r)),t.keepError||er(u.errors,r),t.keepDirty||er(u.dirtyFields,r),t.keepTouched||er(u.touchedFields,r),a.shouldUnregister||t.keepDefaultValue||er(c,r);x.values.next({values:{...b}}),x.state.next({...u,...t.keepDirty?{isDirty:Y()}:{}}),t.keepIsValid||B()},eD=(e,t={})=>{let r=p(f,e),s=P(t.disabled);return U(f,e,{...r||{},_f:{...r&&r._f?r._f:{ref:{name:e}},name:e,mount:!0,...t}}),A.mount.add(e),r?s&&U(b,e,t.disabled?void 0:p(b,e,ey(r._f))):K(e,!0,t.value),{...s?{disabled:t.disabled}:{},...a.progressive?{required:!!t.required,min:eh(t.min),max:eh(t.max),minLength:eh(t.minLength),maxLength:eh(t.maxLength),pattern:eh(t.pattern)}:{},name:e,onChange:eA,onBlur:eA,ref:s=>{if(s){eD(e,t),r=p(f,e);let a=v(s.value)&&s.querySelectorAll&&s.querySelectorAll("input,select,textarea")[0]||s,i=eu(a),l=r._f.refs||[];(i?l.find(e=>e===a):a===r._f.ref)||(U(f,e,{_f:{...r._f,...i?{refs:[...l.filter(en),a,...Array.isArray(p(c,e))?[{}]:[]],ref:{type:a.type,name:e}}:{ref:a}}}),K(e,!1,void 0,a))}else(r=p(f,e,{}))._f&&(r._f.mount=!1),(a.shouldUnregister||t.shouldUnregister)&&!(d(A.array,e)&&V.action)&&A.unMount.add(e)}}},eC=()=>a.shouldFocusError&&N(f,e=>e&&p(u.errors,e),A.mount),eO=(e,t)=>async r=>{r&&(r.preventDefault&&r.preventDefault(),r.persist&&r.persist());let s=m(b);if(x.state.next({isSubmitting:!0}),a.resolver){let{errors:e,values:t}=await z();u.errors=e,s=t}else await X(f);er(u.errors,"root"),S(u.errors)?(x.state.next({errors:{}}),await e(s,r)):(t&&await t({...u.errors},r),eC(),setTimeout(eC)),x.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:S(u.errors),submitCount:u.submitCount+1,errors:u.errors})},eE=(r,a={})=>{let s=r||c,i=m(s),l=r&&!S(r)?i:c;if(a.keepDefaultValues||(c=s),!a.keepValues){if(a.keepDirtyValues||D)for(let e of A.mount)p(u.dirtyFields,e)?U(l,e,p(b,e)):eV(e,p(l,e));else{if(y&&v(r))for(let e of A.mount){let t=p(f,e);if(t&&t._f){let e=Array.isArray(t._f.refs)?t._f.refs[0]:t._f.ref;if(I(e)){let t=e.closest("form");if(t){t.reset();break}}}}f={}}b=e.shouldUnregister?a.keepDefaultValues?m(c):{}:m(l),x.array.next({values:{...l}}),x.values.next({values:{...l}})}A={mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},V.mount||t(),V.mount=!F.isValid||!!a.keepIsValid,V.watch=!!e.shouldUnregister,x.state.next({submitCount:a.keepSubmitCount?u.submitCount:0,isDirty:a.keepDirty?u.isDirty:!!(a.keepDefaultValues&&!ei(r,c)),isSubmitted:!!a.keepIsSubmitted&&u.isSubmitted,dirtyFields:a.keepDirtyValues?u.dirtyFields:a.keepDefaultValues&&r?ed(c,r):{},touchedFields:a.keepTouched?u.touchedFields:{},errors:a.keepErrors?u.errors:{},isSubmitting:!1,isSubmitSuccessful:!1})},eL=(e,t)=>eE(W(e)?e(b):e,t);return{control:{register:eD,unregister:ek,getFieldState:eS,handleSubmit:eO,setError:ex,_executeSchema:z,_getWatch:ee,_getDirty:Y,_updateValid:B,_removeUnmounted:()=>{for(let e of A.unMount){let t=p(f,e);t&&(t._f.refs?t._f.refs.every(e=>!en(e)):!en(t._f.ref))&&ek(e)}A.unMount=new Set},_updateFieldArray:(e,t=[],r,a,s=!0,i=!0)=>{if(a&&r){if(V.action=!0,i&&Array.isArray(p(f,e))){let t=r(p(f,e),a.argA,a.argB);s&&U(f,e,t)}if(i&&Array.isArray(p(u.errors,e))){let t=r(p(u.errors,e),a.argA,a.argB);s&&U(u.errors,e,t),e_(u.errors,e)}if(F.touchedFields&&i&&Array.isArray(p(u.touchedFields,e))){let t=r(p(u.touchedFields,e),a.argA,a.argB);s&&U(u.touchedFields,e,t)}F.dirtyFields&&(u.dirtyFields=ed(c,b)),x.state.next({name:e,isDirty:Y(e,t),dirtyFields:u.dirtyFields,errors:u.errors,isValid:u.isValid})}else U(b,e,t)},_getFieldArray:t=>h(p(V.mount?b:c,t,e.shouldUnregister?p(c,t,[]):[])),_reset:eE,_resetDefaultValues:()=>W(a.defaultValues)&&a.defaultValues().then(e=>{eL(e,a.resetOptions),x.state.next({isLoading:!1})}),_updateFormState:e=>{u={...u,...e}},_subjects:x,_proxyFormState:F,get _fields(){return f},get _formValues(){return b},get _state(){return V},set _state(value){V=value},get _defaultValues(){return c},get _names(){return A},set _names(value){A=value},get _formState(){return u},set _formState(value){u=value},get _options(){return a},set _options(value){a={...a,...value}}},trigger:ew,register:eD,handleSubmit:eO,watch:(e,t)=>W(e)?x.values.subscribe({next:r=>e(ee(void 0,t),r)}):ee(e,t,!0),setValue:eV,getValues:eF,reset:eL,resetField:(e,t={})=>{p(f,e)&&(v(t.defaultValue)?eV(e,p(c,e)):(eV(e,t.defaultValue),U(c,e,t.defaultValue)),t.keepTouched||er(u.touchedFields,e),t.keepDirty||(er(u.dirtyFields,e),u.isDirty=t.defaultValue?Y(e,p(c,e)):Y()),!t.keepError&&(er(u.errors,e),F.isValid&&B()),x.state.next({...u}))},clearErrors:e=>{e&&k(e).forEach(e=>er(u.errors,e)),x.state.next({errors:e?u.errors:{}})},unregister:ek,setError:ex,setFocus:(e,t={})=>{let r=p(f,e),a=r&&r._f;if(a){let e=a.refs?a.refs[0]:a.ref;e.focus&&(e.focus(),t.shouldSelect&&e.select())}},getFieldState:eS}}(e,()=>u(e=>({...e}))),formState:r});let f=t.current.control;return f._options=e,C({subject:f._subjects.state,next:e=>{x(e,f._proxyFormState,f._updateFormState,!0)&&u({...f._formState})}}),a.useEffect(()=>{!e.values||ei(e.values,f._defaultValues)&&ei(e.values,f._formValues)?f._resetDefaultValues():f._reset(e.values,f._options.resetOptions)},[e.values,f]),a.useEffect(()=>{f._state.mount||(f._updateValid(),f._state.mount=!0),f._state.watch&&(f._state.watch=!1,f._subjects.state.next({...f._formState})),f._removeUnmounted()}),t.current.formState=F(r,f),t.current}}}]);
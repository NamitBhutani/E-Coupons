import{S as te,i as re,s as ae,k as o,q as U,a as p,e as Y,l as n,m as d,r as q,h as l,c as _,n as s,b as N,G as e,H as Z}from"./index.a7df7965.js";function ee(R){let r,c;return{c(){r=o("p"),c=U("username is taken"),this.h()},l(u){r=n(u,"P",{class:!0});var a=d(r);c=q(a,"username is taken"),a.forEach(l),this.h()},h(){s(r,"class","error")},m(u,a){N(u,r,a),e(r,c)},d(u){u&&l(r)}}}function se(R){var J;let r,c,u,a,f,v,x,O,S,h,H,b,I,C,F,E,G,y,k,M,$,P,j,w,z,B,L,i=((J=R[0])==null?void 0:J.username)&&ee();return{c(){r=o("h1"),c=U("Register as Vendor"),u=p(),a=o("form"),f=o("div"),v=o("div"),x=o("label"),O=U("Username"),S=p(),h=o("input"),H=p(),b=o("div"),I=o("label"),C=U("Email"),F=p(),E=o("input"),G=p(),y=o("div"),k=o("label"),M=U("Password"),$=p(),P=o("input"),j=p(),w=o("button"),z=U("Register as Vendor"),B=p(),i&&i.c(),L=Y(),this.h()},l(t){r=n(t,"H1",{class:!0});var m=d(r);c=q(m,"Register as Vendor"),m.forEach(l),u=_(t),a=n(t,"FORM",{action:!0,method:!0,class:!0});var V=d(a);f=n(V,"DIV",{class:!0});var T=d(f);v=n(T,"DIV",{});var D=d(v);x=n(D,"LABEL",{for:!0});var K=d(x);O=q(K,"Username"),K.forEach(l),S=_(D),h=n(D,"INPUT",{type:!0,name:!0,id:!0}),D.forEach(l),H=_(T),b=n(T,"DIV",{});var g=d(b);I=n(g,"LABEL",{for:!0});var Q=d(I);C=q(Q,"Email"),Q.forEach(l),F=_(g),E=n(g,"INPUT",{type:!0,name:!0,id:!0}),g.forEach(l),G=_(T),y=n(T,"DIV",{});var A=d(y);k=n(A,"LABEL",{for:!0});var W=d(k);M=q(W,"Password"),W.forEach(l),$=_(A),P=n(A,"INPUT",{type:!0,name:!0,id:!0}),A.forEach(l),T.forEach(l),j=_(V),w=n(V,"BUTTON",{type:!0});var X=d(w);z=q(X,"Register as Vendor"),X.forEach(l),V.forEach(l),B=_(t),i&&i.l(t),L=Y(),this.h()},h(){s(r,"class","svelte-ib1gx2"),s(x,"for","username"),s(h,"type","text"),s(h,"name","username"),s(h,"id","username"),h.required=!0,s(I,"for","email"),s(E,"type","email"),s(E,"name","email"),s(E,"id","email"),E.required=!0,s(k,"for","password"),s(P,"type","password"),s(P,"name","password"),s(P,"id","password"),P.required=!0,s(f,"class","grid"),s(w,"type","submit"),s(a,"action","?/registerVendor"),s(a,"method","POST"),s(a,"class","svelte-ib1gx2")},m(t,m){N(t,r,m),e(r,c),N(t,u,m),N(t,a,m),e(a,f),e(f,v),e(v,x),e(x,O),e(v,S),e(v,h),e(f,H),e(f,b),e(b,I),e(I,C),e(b,F),e(b,E),e(f,G),e(f,y),e(y,k),e(k,M),e(y,$),e(y,P),e(a,j),e(a,w),e(w,z),N(t,B,m),i&&i.m(t,m),N(t,L,m)},p(t,[m]){var V;(V=t[0])!=null&&V.username?i||(i=ee(),i.c(),i.m(L.parentNode,L)):i&&(i.d(1),i=null)},i:Z,o:Z,d(t){t&&l(r),t&&l(u),t&&l(a),t&&l(B),i&&i.d(t),t&&l(L)}}}function le(R,r,c){let{form:u}=r;return R.$$set=a=>{"form"in a&&c(0,u=a.form)},[u]}class ie extends te{constructor(r){super(),re(this,r,le,se,ae,{form:0})}}const ne=ie;export{ne as component};

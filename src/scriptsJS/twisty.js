import{a as Ur,b as it,c as F,d as w,e as ee,f as v,g as te,h as ve,j as bt,l as kt,m as nt,n as L,o as A,p as I,q as Dt,r as Q,s as Ct,t as Et,v as st}from"../chunk-3W66HQ3K.js";import{f as Lt,g as rt}from"../chunk-TQJ6AFPT.js";import{c as St,f as At,g as It}from"../chunk-63RPDGN2.js";import{b as xt,m as zt,q as Tt}from"../chunk-EVMUEBUO.js";import"../chunk-VRF557EU.js";import{a as vt,b as yt,c as Ke,f as et,i as tt,k as p,l as ge,n as je,o as fe,p as we,q as Mt,r as T}from"../chunk-H5TKWHAY.js";import{b as a,c as d,d as u,f as N}from"../chunk-5YIZAH6A.js";function ut(e,t){if(e===t)return!0;if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++)if(e[r]!==t[r])return!1;return!0}function Nt(e,t,r){if(e===t)return!0;if(e.length!==t.length)return!1;for(let i=0;i<e.length;i++)if(!r(e[i],t[i]))return!1;return!0}function wr(e,t,r=0){return(e%t+t+r)%t-r}function Pt(e,t,r){return wr(e-t,r-t)+t}var Br=class{constructor(e){this.model=e,this.catchingUp=!1,this.pendingFrame=!1,this.scheduler=new ve(this.animFrame.bind(this)),this.catchUpMs=500,this.lastTimestamp=0}start(){this.catchingUp||(this.lastTimestamp=performance.now()),this.catchingUp=!0,this.pendingFrame=!0,this.scheduler.requestAnimFrame()}stop(){this.catchingUp=!1,this.scheduler.cancelAnimFrame()}animFrame(e){this.scheduler.requestAnimFrame();let t=(e-this.lastTimestamp)/this.catchUpMs;this.lastTimestamp=e,this.model.catchUpMove.set((async()=>{let r=await this.model.catchUpMove.get();if(r.move===null)return r;let i=r.amount+t;return i>=1?(this.pendingFrame=!0,this.stop(),this.model.timestampRequest.set("end"),{move:null,amount:0}):(this.pendingFrame=!1,{move:r.move,amount:i})})())}},ye,ht,Me,tr,Wr=(tr=class{constructor(e,t){d(this,ye);d(this,Me,void 0);this.delegate=t,this.playing=!1,this.direction=1,this.lastDatestamp=0,this.scheduler=new ve(this.animFrame.bind(this)),u(this,Me,new it),this.model=e,this.lastTimestampPromise=N(this,ye,ht).call(this),this.model.playingInfo.addFreshListener(this.onPlayingProp.bind(this)),this.catchUpHelper=new Br(this.model),this.model.catchUpMove.addFreshListener(this.onCatchUpMoveProp.bind(this))}async onPlayingProp(e){e.playing!==this.playing&&(e.playing?this.play(e):this.pause())}async onCatchUpMoveProp(e){let t=e.move!==null;t!==this.catchUpHelper.catchingUp&&(t?this.catchUpHelper.start():this.catchUpHelper.stop()),this.scheduler.requestAnimFrame()}jumpToStart(e){this.model.timestampRequest.set("start"),this.pause(),e?.flash&&this.delegate.flash()}jumpToEnd(e){this.model.timestampRequest.set("end"),this.pause(),e?.flash&&this.delegate.flash()}playPause(){this.playing?this.pause():this.play()}async play(e){let t=e?.direction??1,r=await this.model.coarseTimelineInfo.get();(e?.autoSkipToOtherEndIfStartingAtBoundary??!0)&&(t===1&&r.atEnd&&(this.model.timestampRequest.set("start"),this.delegate.flash()),t===-1&&r.atStart&&(this.model.timestampRequest.set("end"),this.delegate.flash())),this.model.playingInfo.set({playing:!0,direction:t,untilBoundary:e?.untilBoundary??"entire-timeline",loop:e?.loop??!1}),this.playing=!0,this.lastDatestamp=performance.now(),this.lastTimestampPromise=N(this,ye,ht).call(this),this.scheduler.requestAnimFrame()}pause(){this.playing=!1,this.scheduler.cancelAnimFrame(),this.model.playingInfo.set({playing:!1,untilBoundary:"entire-timeline"})}async animFrame(e){this.playing&&this.scheduler.requestAnimFrame();let t=this.lastDatestamp,r=await a(this,Me).queue(Promise.all([this.model.playingInfo.get(),this.lastTimestampPromise,this.model.timeRange.get(),this.model.tempoScale.get(),this.model.currentMoveInfo.get()])),[i,n,s,o,l]=r;if(!i.playing){this.playing=!1;return}let h=l.earliestEnd;(l.currentMoves.length===0||i.untilBoundary==="entire-timeline")&&(h=s.end);let c=l.latestStart;(l.currentMoves.length===0||i.untilBoundary==="entire-timeline")&&(c=s.start);let f=(e-t)*this.direction*o;f=Math.max(f,1),f*=i.direction;let m=n+f,x=null;m>=h?i.loop?m=Pt(m,s.start,s.end):(m===s.end?x="end":m=h,this.playing=!1,this.model.playingInfo.set({playing:!1})):m<=c&&(i.loop?m=Pt(m,s.start,s.end):(m===s.start?x="start":m=c,this.playing=!1,this.model.playingInfo.set({playing:!1}))),this.lastDatestamp=e,this.lastTimestampPromise=Promise.resolve(m),this.model.timestampRequest.set(x??m)}},ye=new WeakSet,ht=async function(){return(await this.model.detailedTimelineInfo.get()).timestamp},Me=new WeakMap,tr),qr=class{constructor(e,t){this.model=e,this.animationController=new Wr(e,t)}jumpToStart(e){this.animationController.jumpToStart(e)}jumpToEnd(e){this.animationController.jumpToEnd(e)}togglePlay(e){typeof e>"u"&&this.animationController.playPause(),e?this.animationController.play():this.animationController.pause()}async visitTwizzleLink(){let e=document.createElement("a");e.href=await this.model.twizzleLink(),e.target="_blank",e.click()}},Hr={"bottom-row":!0,none:!0},Qr=class extends w{getDefaultValue(){return"auto"}},vr=new A(`
:host {
  width: 384px;
  height: 256px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
}

.wrapper > * {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.wrapper.back-view-side-by-side {
  grid-template-columns: 1fr 1fr;
}

.wrapper.back-view-top-right {
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 3fr;
}

.wrapper.back-view-top-right > :nth-child(1) {
  grid-row: 1 / 3;
  grid-column: 1 / 3;
}

.wrapper.back-view-top-right > :nth-child(2) {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
}
`),Ve="http://www.w3.org/2000/svg",Rt="data-copy-id",Ot=0;function Yr(){return Ot+=1,`svg${Ot.toString()}`}var Gr={dim:{white:"#dddddd",orange:"#884400",limegreen:"#008800",red:"#660000","rgb(34, 102, 255)":"#000088",yellow:"#888800","rgb(102, 0, 153)":"rgb(50, 0, 76)",purple:"#3f003f"},oriented:"#44ddcc",ignored:"#555555",invisible:"#00000000"},_r=class{constructor(e,t,r){if(this.kpuzzle=e,this.originalColors={},this.gradients={},!t)throw new Error(`No SVG definition for puzzle type: ${e.name()}`);this.svgID=Yr(),this.wrapperElement=document.createElement("div"),this.wrapperElement.classList.add("svg-wrapper"),this.wrapperElement.innerHTML=t;let i=this.wrapperElement.querySelector("svg");if(!i)throw new Error("Could not get SVG element");if(this.svgElement=i,Ve!==i.namespaceURI)throw new Error("Unexpected XML namespace");i.style.maxWidth="100%",i.style.maxHeight="100%",this.gradientDefs=document.createElementNS(Ve,"defs"),i.insertBefore(this.gradientDefs,i.firstChild);for(let n in e.definition.orbits){let s=e.definition.orbits[n];for(let o=0;o<s.numPieces;o++)for(let l=0;l<s.numOrientations;l++){let h=this.elementID(n,o,l),c=this.elementByID(h),f=c?.style.fill;r?(()=>{let m=r.orbits;if(!m)return;let x=m[n];if(!x)return;let z=x.pieces[o];if(!z)return;let S=z.facelets[l];if(!S)return;let V=typeof S=="string"?S:S?.mask,me=Gr[V];typeof me=="string"?f=me:me&&(f=me[f])})():f=c?.style.fill,this.originalColors[h]=f,this.gradients[h]=this.newGradient(h,f),this.gradientDefs.appendChild(this.gradients[h]),c?.setAttribute("style",`fill: url(#grad-${this.svgID}-${h})`)}}for(let n of Array.from(i.querySelectorAll(`[${Rt}]`))){let s=n.getAttribute(Rt);n.setAttribute("style",`fill: url(#grad-${this.svgID}-${s})`)}}drawState(e,t,r){this.draw(e,t,r)}draw(e,t,r){let i=e.experimentalToTransformation(),n=t?.experimentalToTransformation();if(!i)throw new Error("Distinguishable pieces are not handled for SVG yet!");for(let s in i.kpuzzle.definition.orbits){let o=i.kpuzzle.definition.orbits[s],l=i.transformationData[s],h=n?n.transformationData[s]:null;for(let c=0;c<o.numPieces;c++)for(let f=0;f<o.numOrientations;f++){let m=this.elementID(s,c,f),x=this.elementID(s,l.permutation[c],(o.numOrientations-l.orientation[c]+f)%o.numOrientations),z=!1;if(h){let S=this.elementID(s,h.permutation[c],(o.numOrientations-h.orientation[c]+f)%o.numOrientations);x===S&&(z=!0),r=r||0;let V=100*(1-r*r*(2-r*r));this.gradients[m].children[0].setAttribute("stop-color",this.originalColors[x]),this.gradients[m].children[1].setAttribute("stop-color",this.originalColors[x]),this.gradients[m].children[1].setAttribute("offset",`${Math.max(V-5,0)}%`),this.gradients[m].children[2].setAttribute("offset",`${Math.max(V-5,0)}%`),this.gradients[m].children[3].setAttribute("offset",`${V}%`),this.gradients[m].children[4].setAttribute("offset",`${V}%`),this.gradients[m].children[4].setAttribute("stop-color",this.originalColors[S]),this.gradients[m].children[5].setAttribute("stop-color",this.originalColors[S])}else z=!0;z&&(this.gradients[m].children[0].setAttribute("stop-color",this.originalColors[x]),this.gradients[m].children[1].setAttribute("stop-color",this.originalColors[x]),this.gradients[m].children[1].setAttribute("offset","100%"),this.gradients[m].children[2].setAttribute("offset","100%"),this.gradients[m].children[3].setAttribute("offset","100%"),this.gradients[m].children[4].setAttribute("offset","100%"))}}}newGradient(e,t){let r=document.createElementNS(Ve,"radialGradient");r.setAttribute("id",`grad-${this.svgID}-${e}`),r.setAttribute("r","70.7107%");let i=[{offset:0,color:t},{offset:0,color:t},{offset:0,color:"black"},{offset:0,color:"black"},{offset:0,color:t},{offset:100,color:t}];for(let n of i){let s=document.createElementNS(Ve,"stop");s.setAttribute("offset",`${n.offset}%`),s.setAttribute("stop-color",n.color),s.setAttribute("stop-opacity","1"),r.appendChild(s)}return r}elementID(e,t,r){return`${e}-l${t}-o${r}`}elementByID(e){return this.wrapperElement.querySelector(`#${e}`)}},Zr=new A(`
:host {
  width: 384px;
  height: 256px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
}

.svg-wrapper,
twisty-2d-svg,
svg {
  width: 100%;
  height: 100%;
  display: grid;
  min-height: 0;
}

svg {
  animation: fade-in 0.25s ease-in;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
`),_,Z,rr,yr=(rr=class extends I{constructor(t,r,i,n,s){super();d(this,_,void 0);d(this,Z,void 0);this.model=t,this.kpuzzle=r,this.svgSource=i,this.options=n,this.puzzleLoader=s,this.scheduler=new ve(this.render.bind(this)),u(this,_,null),u(this,Z,new te),this.addCSS(Zr),this.resetSVG(),a(this,Z).addListener(this.model.puzzleID,o=>{s?.id!==o&&this.disconnect()}),a(this,Z).addListener(this.model.legacyPosition,this.onPositionChange.bind(this)),this.options?.experimentalStickeringMask&&this.experimentalSetStickeringMask(this.options.experimentalStickeringMask)}disconnect(){a(this,Z).disconnect()}onPositionChange(t){try{if(t.movesInProgress.length>0){let r=t.movesInProgress[0].move,i=r;t.movesInProgress[0].direction===-1&&(i=r.invert());let n=t.state.applyMove(i);this.svgWrapper.draw(t.state,n,t.movesInProgress[0].fraction)}else this.svgWrapper.draw(t.state),u(this,_,t)}catch(r){console.warn("Bad position (this doesn't necessarily mean something is wrong). Pre-emptively disconnecting:",this.puzzleLoader?.id,r),this.disconnect()}}scheduleRender(){this.scheduler.requestAnimFrame()}experimentalSetStickeringMask(t){this.resetSVG(t)}resetSVG(t){this.svgWrapper&&this.removeElement(this.svgWrapper.wrapperElement),this.kpuzzle&&(this.svgWrapper=new _r(this.kpuzzle,this.svgSource,t),this.addElement(this.svgWrapper.wrapperElement),a(this,_)&&this.onPositionChange(a(this,_)))}render(){}},_=new WeakMap,Z=new WeakMap,rr);L.define("twisty-2d-puzzle",yr);var xe,ze,ir,$r=(ir=class{constructor(e,t,r,i){d(this,xe,new te);d(this,ze,null);this.model=e,this.schedulable=t,this.puzzleLoader=r,this.effectiveVisualization=i,this.twisty2DPuzzle(),a(this,xe).addListener(this.model.twistySceneModel.stickeringMask,async n=>{(await this.twisty2DPuzzle()).experimentalSetStickeringMask(n)})}disconnect(){a(this,xe).disconnect()}scheduleRender(){}async twisty2DPuzzle(){return a(this,ze)??u(this,ze,(async()=>{let e=this.effectiveVisualization==="experimental-2D-LL"?this.puzzleLoader.llSVG():this.puzzleLoader.svg();return new yr(this.model,await this.puzzleLoader.kpuzzle(),await e,{},this.puzzleLoader)})())}},xe=new WeakMap,ze=new WeakMap,ir),Te,Le,U,nr,Mr=(nr=class extends I{constructor(t,r){super();d(this,Te,new te);d(this,Le,void 0);d(this,U,null);this.model=t,this.effectiveVisualization=r}disconnect(){a(this,Te).disconnect()}async connectedCallback(){this.addCSS(vr),this.model&&a(this,Te).addListener(this.model.twistyPlayerModel.puzzleLoader,this.onPuzzleLoader.bind(this))}async scene(){return a(this,Le)??u(this,Le,(async()=>new(await Q).Scene)())}scheduleRender(){a(this,U)?.scheduleRender()}currentTwisty2DPuzzleWrapper(){return a(this,U)}async setCurrentTwisty2DPuzzleWrapper(t){let r=a(this,U);u(this,U,t),r?.disconnect();let i=t.twisty2DPuzzle();this.contentWrapper.textContent="",this.addElement(await i)}async onPuzzleLoader(t){a(this,U)?.disconnect();let r=new $r(this.model.twistyPlayerModel,this,t,this.effectiveVisualization);this.setCurrentTwisty2DPuzzleWrapper(r)}},Te=new WeakMap,Le=new WeakMap,U=new WeakMap,nr);L.define("twisty-2d-scene-wrapper",Mr);var B,sr,Xe=(sr=class{constructor(e,t,r){d(this,B,null);this.elem=e,this.prefix=t,this.validSuffixes=r}clearValue(){a(this,B)&&this.elem.contentWrapper.classList.remove(a(this,B)),u(this,B,null)}setValue(e){if(!this.validSuffixes.includes(e))throw new Error(`Invalid suffix: ${e}`);let t=`${this.prefix}${e}`,r=a(this,B)!==t;return r&&(this.clearValue(),this.elem.contentWrapper.classList.add(t),u(this,B,t)),r}},B=new WeakMap,sr),Se,ar,xr=(ar=class{constructor(){d(this,Se,void 0);this.promise=new Promise((e,t)=>{u(this,Se,e),this.reject=t})}handleNewValue(e){a(this,Se).call(this,e)}},Se=new WeakMap,ar),b,Ae,or,zr=(or=class extends EventTarget{constructor(t,r,i,n){super();d(this,b,new te);d(this,Ae,null);this.model=t,this.schedulable=r,this.puzzleLoader=i,this.visualizationStrategy=n,this.twisty3DPuzzle(),a(this,b).addListener(this.model.puzzleLoader,s=>{this.puzzleLoader.id!==s.id&&this.disconnect()}),a(this,b).addListener(this.model.legacyPosition,async s=>{try{(await this.twisty3DPuzzle()).onPositionChange(s),this.scheduleRender()}catch{this.disconnect()}}),a(this,b).addListener(this.model.twistySceneModel.hintFacelet,async s=>{(await this.twisty3DPuzzle()).experimentalUpdateOptions({hintFacelets:s==="auto"?"floating":s}),this.scheduleRender()}),a(this,b).addListener(this.model.twistySceneModel.foundationDisplay,async s=>{(await this.twisty3DPuzzle()).experimentalUpdateOptions({showFoundation:s!=="none"}),this.scheduleRender()}),a(this,b).addListener(this.model.twistySceneModel.stickeringMask,async s=>{(await this.twisty3DPuzzle()).setStickeringMask(s),this.scheduleRender()}),a(this,b).addListener(this.model.twistySceneModel.faceletScale,async s=>{(await this.twisty3DPuzzle()).experimentalUpdateOptions({faceletScale:s}),this.scheduleRender()}),a(this,b).addMultiListener3([this.model.twistySceneModel.stickeringMask,this.model.twistySceneModel.foundationStickerSprite,this.model.twistySceneModel.hintStickerSprite],async s=>{"experimentalUpdateTexture"in await this.twisty3DPuzzle()&&((await this.twisty3DPuzzle()).experimentalUpdateTexture(s[0].specialBehaviour==="picture",s[1],s[2]),this.scheduleRender())})}disconnect(){a(this,b).disconnect()}scheduleRender(){this.schedulable.scheduleRender(),this.dispatchEvent(new CustomEvent("render-scheduled"))}async twisty3DPuzzle(){return a(this,Ae)??u(this,Ae,(async()=>{let t=Dt();if(this.puzzleLoader.id==="3x3x3"&&this.visualizationStrategy==="Cube3D"){let[r,i,n,s]=await Promise.all([this.model.twistySceneModel.foundationStickerSprite.get(),this.model.twistySceneModel.hintStickerSprite.get(),this.model.twistySceneModel.stickeringMask.get(),this.model.twistySceneModel.initialHintFaceletsAnimation.get()]);return(await t).cube3DShim(()=>this.schedulable.scheduleRender(),{foundationSprite:r,hintSprite:i,experimentalStickeringMask:n,initialHintFaceletsAnimation:s})}else{let[r,i,n,s]=await Promise.all([this.model.twistySceneModel.hintFacelet.get(),this.model.twistySceneModel.foundationStickerSprite.get(),this.model.twistySceneModel.hintStickerSprite.get(),this.model.twistySceneModel.faceletScale.get()]),o=(await t).pg3dShim(()=>this.schedulable.scheduleRender(),this.puzzleLoader,r==="auto"?"floating":r,s,this.puzzleLoader.id==="kilominx");return o.then(l=>l.experimentalUpdateTexture(!0,i??void 0,n??void 0)),o}})())}async raycastMove(t,r){let i=await this.twisty3DPuzzle();if(!("experimentalGetControlTargets"in i)){console.info("not PG3D! skipping raycast");return}let n=i.experimentalGetControlTargets(),[s,o]=await Promise.all([t,this.model.twistySceneModel.movePressCancelOptions.get()]),l=s.intersectObjects(n);if(l.length>0){let h=i.getClosestMoveToAxis(l[0].point,r);h?this.model.experimentalAddMove(h.move,{cancel:o}):console.info("Skipping move!")}}},b=new WeakMap,Ae=new WeakMap,or),He,ne,P,Ie,$,R,be,Qe,lr,pt=(lr=class extends I{constructor(t){super();d(this,He,new Xe(this,"back-view-",["auto","none","side-by-side","top-right"]));d(this,ne,new te);d(this,P,null);d(this,Ie,void 0);d(this,$,new Set);d(this,R,null);d(this,be,new xr);d(this,Qe,new it);this.model=t}disconnect(){a(this,ne).disconnect()}async connectedCallback(){this.addCSS(vr);let t=new st(this.model,this);this.addVantage(t),this.model&&(a(this,ne).addMultiListener([this.model.puzzleLoader,this.model.visualizationStrategy],this.onPuzzle.bind(this)),a(this,ne).addListener(this.model.backView,this.onBackView.bind(this))),this.scheduleRender()}setBackView(t){let r=["side-by-side","top-right"].includes(t),i=a(this,P)!==null;a(this,He).setValue(t),r?i||(u(this,P,new st(this.model,this,{backView:!0})),this.addVantage(a(this,P)),this.scheduleRender()):a(this,P)&&(this.removeVantage(a(this,P)),u(this,P,null))}onBackView(t){this.setBackView(t)}async onPress(t){let r=a(this,R);if(!r){console.info("no wrapper; skipping scene wrapper press!");return}let i=(async()=>{let[n,s]=await Promise.all([t.detail.cameraPromise,Q]),o=new s.Raycaster,l=new(await Q).Vector2(t.detail.pressInfo.normalizedX,t.detail.pressInfo.normalizedY);return o.setFromCamera(l,n),o})();r.raycastMove(i,{invert:!t.detail.pressInfo.rightClick,depth:t.detail.pressInfo.keys.ctrlOrMetaKey?"rotation":t.detail.pressInfo.keys.shiftKey?"secondSlice":"none"})}async scene(){return a(this,Ie)??u(this,Ie,(async()=>new(await Q).Scene)())}addVantage(t){t.addEventListener("press",this.onPress.bind(this)),a(this,$).add(t),this.contentWrapper.appendChild(t)}removeVantage(t){a(this,$).delete(t),t.remove(),t.disconnect(),a(this,R)?.disconnect()}experimentalVantages(){return a(this,$).values()}scheduleRender(){for(let t of a(this,$))t.scheduleRender()}async setCurrentTwisty3DPuzzleWrapper(t,r){let i=a(this,R);try{u(this,R,r),i?.disconnect(),t.add(await r.twisty3DPuzzle())}finally{i&&t.remove(await i.twisty3DPuzzle())}a(this,be).handleNewValue(r)}async experimentalTwisty3DPuzzleWrapper(){return a(this,R)||a(this,be).promise}async onPuzzle(t){if(t[1]==="2D")return;a(this,R)?.disconnect();let[r,i]=await a(this,Qe).queue(Promise.all([this.scene(),new zr(this.model,this,t[0],t[1])]));this.setCurrentTwisty3DPuzzleWrapper(r,i)}},He=new WeakMap,ne=new WeakMap,P=new WeakMap,Ie=new WeakMap,$=new WeakMap,R=new WeakMap,be=new WeakMap,Qe=new WeakMap,lr);L.define("twisty-3d-scene-wrapper",pt);var Xr=new A(`
:host {
  width: 384px;
  height: 24px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.wrapper {
  grid-auto-flow: column;
}

.viewer-link-none .twizzle-link-button {
  display: none;
}

.wrapper twisty-button,
.wrapper twisty-control-button {
  width: inherit;
  height: inherit;
}
`),Jr=new A(`
:host:not([hidden]) {
  display: grid;
}

:host {
  width: 48px;
  height: 24px;
}

.wrapper {
  width: 100%;
  height: 100%;
}

button {
  width: 100%;
  height: 100%;
  border: none;
  
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  background-color: rgba(196, 196, 196, 0.75);
}

button:enabled {
  background-color: rgba(196, 196, 196, 0.75)
}

.dark-mode button:enabled {
  background-color: #88888888;
}

button:disabled {
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0.25;
  pointer-events: none;
}

.dark-mode button:disabled {
  background-color: #ffffff44;
}

button:enabled:hover {
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

/* TODO: fullscreen icons have too much padding?? */
.svg-skip-to-start button,
button.svg-skip-to-start {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNjQzIDEwMzdxMTktMTkgMzItMTN0MTMgMzJ2MTQ3MnEwIDI2LTEzIDMydC0zMi0xM2wtNzEwLTcxMHEtOS05LTEzLTE5djcxMHEwIDI2LTEzIDMydC0zMi0xM2wtNzEwLTcxMHEtOS05LTEzLTE5djY3OHEwIDI2LTE5IDQ1dC00NSAxOUg5NjBxLTI2IDAtNDUtMTl0LTE5LTQ1VjEwODhxMC0yNiAxOS00NXQ0NS0xOWgxMjhxMjYgMCA0NSAxOXQxOSA0NXY2NzhxNC0xMSAxMy0xOWw3MTAtNzEwcTE5LTE5IDMyLTEzdDEzIDMydjcxMHE0LTExIDEzLTE5eiIvPjwvc3ZnPg==");
}

.svg-skip-to-end button,
button.svg-skip-to-end {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik05NDEgMjU0N3EtMTkgMTktMzIgMTN0LTEzLTMyVjEwNTZxMC0yNiAxMy0zMnQzMiAxM2w3MTAgNzEwcTggOCAxMyAxOXYtNzEwcTAtMjYgMTMtMzJ0MzIgMTNsNzEwIDcxMHE4IDggMTMgMTl2LTY3OHEwLTI2IDE5LTQ1dDQ1LTE5aDEyOHEyNiAwIDQ1IDE5dDE5IDQ1djE0MDhxMCAyNi0xOSA0NXQtNDUgMTloLTEyOHEtMjYgMC00NS0xOXQtMTktNDV2LTY3OHEtNSAxMC0xMyAxOWwtNzEwIDcxMHEtMTkgMTktMzIgMTN0LTEzLTMydi03MTBxLTUgMTAtMTMgMTl6Ii8+PC9zdmc+");
}

.svg-step-forward button,
button.svg-step-forward {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNjg4IDE1NjhxMCAyNi0xOSA0NWwtNTEyIDUxMnEtMTkgMTktNDUgMTl0LTQ1LTE5cS0xOS0xOS0xOS00NXYtMjU2aC0yMjRxLTk4IDAtMTc1LjUgNnQtMTU0IDIxLjVxLTc2LjUgMTUuNS0xMzMgNDIuNXQtMTA1LjUgNjkuNXEtNDkgNDIuNS04MCAxMDF0LTQ4LjUgMTM4LjVxLTE3LjUgODAtMTcuNSAxODEgMCA1NSA1IDEyMyAwIDYgMi41IDIzLjV0Mi41IDI2LjVxMCAxNS04LjUgMjV0LTIzLjUgMTBxLTE2IDAtMjgtMTctNy05LTEzLTIydC0xMy41LTMwcS03LjUtMTctMTAuNS0yNC0xMjctMjg1LTEyNy00NTEgMC0xOTkgNTMtMzMzIDE2Mi00MDMgODc1LTQwM2gyMjR2LTI1NnEwLTI2IDE5LTQ1dDQ1LTE5cTI2IDAgNDUgMTlsNTEyIDUxMnExOSAxOSAxOSA0NXoiLz48L3N2Zz4=");
}

.svg-step-backward button,
button.svg-step-backward {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNjg4IDIwNDhxMCAxNjYtMTI3IDQ1MS0zIDctMTAuNSAyNHQtMTMuNSAzMHEtNiAxMy0xMyAyMi0xMiAxNy0yOCAxNy0xNSAwLTIzLjUtMTB0LTguNS0yNXEwLTkgMi41LTI2LjV0Mi41LTIzLjVxNS02OCA1LTEyMyAwLTEwMS0xNy41LTE4MXQtNDguNS0xMzguNXEtMzEtNTguNS04MC0xMDF0LTEwNS41LTY5LjVxLTU2LjUtMjctMTMzLTQyLjV0LTE1NC0yMS41cS03Ny41LTYtMTc1LjUtNmgtMjI0djI1NnEwIDI2LTE5IDQ1dC00NSAxOXEtMjYgMC00NS0xOWwtNTEyLTUxMnEtMTktMTktMTktNDV0MTktNDVsNTEyLTUxMnExOS0xOSA0NS0xOXQ0NSAxOXExOSAxOSAxOSA0NXYyNTZoMjI0cTcxMyAwIDg3NSA0MDMgNTMgMTM0IDUzIDMzM3oiLz48L3N2Zz4=");
}

.svg-pause button,
button.svg-pause {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNTYwIDEwODh2MTQwOHEwIDI2LTE5IDQ1dC00NSAxOWgtNTEycS0yNiAwLTQ1LTE5dC0xOS00NVYxMDg4cTAtMjYgMTktNDV0NDUtMTloNTEycTI2IDAgNDUgMTl0MTkgNDV6bS04OTYgMHYxNDA4cTAgMjYtMTkgNDV0LTQ1IDE5aC01MTJxLTI2IDAtNDUtMTl0LTE5LTQ1VjEwODhxMC0yNiAxOS00NXQ0NS0xOWg1MTJxMjYgMCA0NSAxOXQxOSA0NXoiLz48L3N2Zz4=");
}

.svg-play button,
button.svg-play {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNDcyLjUgMTgyM2wtMTMyOCA3MzhxLTIzIDEzLTM5LjUgM3QtMTYuNS0zNlYxMDU2cTAtMjYgMTYuNS0zNnQzOS41IDNsMTMyOCA3MzhxMjMgMTMgMjMgMzF0LTIzIDMxeiIvPjwvc3ZnPg==");
}

.svg-enter-fullscreen button,
button.svg-enter-fullscreen {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgd2lkdGg9IjI4Ij48cGF0aCBkPSJNMiAyaDI0djI0SDJ6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTkgMTZIN3Y1aDV2LTJIOXYtM3ptLTItNGgyVjloM1Y3SDd2NXptMTIgN2gtM3YyaDV2LTVoLTJ2M3pNMTYgN3YyaDN2M2gyVjdoLTV6Ii8+PC9zdmc+");
}

.svg-exit-fullscreen button,
button.svg-exit-fullscreen {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgd2lkdGg9IjI4Ij48cGF0aCBkPSJNMiAyaDI0djI0SDJ6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTcgMThoM3YzaDJ2LTVIN3Yyem0zLThIN3YyaDVWN2gtMnYzem02IDExaDJ2LTNoM3YtMmgtNXY1em0yLTExVjdoLTJ2NWg1di0yaC0zeiIvPjwvc3ZnPg==");
}

.svg-twizzle-tw button,
button.svg-twizzle-tw {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODY0IiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzk3LjU4MSAxNTEuMTh2NTcuMDg0aC04OS43MDN2MjQwLjM1MmgtNjYuOTU1VjIwOC4yNjRIMTUxLjIydi01Ny4wODNoMjQ2LjM2MXptNTQuMzEgNzEuNjc3bDcuNTEyIDMzLjY5MmMyLjcxOCAxMi4xNiA1LjU4IDI0LjY4IDguNTg0IDM3LjU1NWEyMTgwLjc3NSAyMTgwLjc3NSAwIDAwOS40NDIgMzguODQzIDEyNjYuMyAxMjY2LjMgMCAwMDEwLjA4NiAzNy41NTVjMy43Mi0xMi41OSA3LjM2OC0yNS40NjYgMTAuOTQ1LTM4LjYyOCAzLjU3Ni0xMy4xNjIgNy4wMS0yNi4xMSAxMC4zLTM4Ljg0M2w1Ljc2OS0yMi40NTZjMS4yNDgtNC44ODcgMi40NzItOS43MDUgMy42NzQtMTQuNDU1IDMuMDA0LTExLjg3NSA1LjY1MS0yMi45NjIgNy45NC0zMy4yNjNoNDYuMzU0bDIuMzg0IDEwLjU2M2EyMDAwLjc3IDIwMDAuNzcgMCAwMDMuOTM1IDE2LjgyOGw2LjcxMSAyNy43MWMxLjIxMyA0Ljk1NiAyLjQ1IDkuOTggMy43MDkgMTUuMDczYTMxMTkuNzc3IDMxMTkuNzc3IDAgMDA5Ljg3MSAzOC44NDMgMTI0OS4yMjcgMTI0OS4yMjcgMCAwMDEwLjczIDM4LjYyOCAxOTA3LjYwNSAxOTA3LjYwNSAwIDAwMTAuMzAxLTM3LjU1NSAxMzk3Ljk0IDEzOTcuOTQgMCAwMDkuNjU3LTM4Ljg0M2w0LjQtMTkuMDQ2Yy43MTUtMy4xMyAxLjQyMS02LjIzNiAyLjExOC05LjMyMWw5LjU3Ny00Mi44OGg2Ni41MjZhMjk4OC43MTggMjk4OC43MTggMCAwMS0xOS41MjkgNjYuMzExbC01LjcyOCAxOC40ODJhMzIzNy40NiAzMjM3LjQ2IDAgMDEtMTQuMDE1IDQzLjc1MmMtNi40MzggMTkuNi0xMi43MzMgMzcuNjk4LTE4Ljg4NSA1NC4yOTRsLTMuMzA2IDguODI1Yy00Ljg4NCAxMi44OTgtOS40MzMgMjQuMjYzLTEzLjY0NyAzNC4wOTVoLTQ5Ljc4N2E4NDE3LjI4OSA4NDE3LjI4OSAwIDAxLTIxLjAzMS02NC44MDkgMTI4OC42ODYgMTI4OC42ODYgMCAwMS0xOC44ODUtNjQuODEgMTk3Mi40NDQgMTk3Mi40NDQgMCAwMS0xOC4yNCA2NC44MSAyNTc5LjQxMiAyNTc5LjQxMiAwIDAxLTIwLjM4OCA2NC44MWgtNDkuNzg3Yy00LjY4Mi0xMC45MjYtOS43Mi0yMy43NDMtMTUuMTEtMzguNDUxbC0xLjYyOS00LjQ3Yy01LjI1OC0xNC41MjEtMTAuNjgtMzAuMTkyLTE2LjI2Ni00Ny4wMTRsLTIuNDA0LTcuMjhjLTYuNDM4LTE5LjYtMTMuMDItNDAuMzQ0LTE5Ljc0My02Mi4yMzRhMjk4OC43MDcgMjk4OC43MDcgMCAwMS0xOS41MjktNjYuMzExaDY3LjM4NXoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==");
}
`),K=typeof document>"u"?null:document,Kr=K?.fullscreenEnabled||!!K?.webkitFullscreenEnabled;function ei(){return document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen()}function jt(){return document.fullscreenElement?document.fullscreenElement:document.webkitFullscreenElement??null}function ti(e){return e.requestFullscreen?e.requestFullscreen():e.webkitRequestFullscreen()}var ri=["skip-to-start","skip-to-end","step-forward","step-backward","pause","play","enter-fullscreen","exit-fullscreen","twizzle-tw"],ii=class extends v{derive(e){return{fullscreen:{enabled:Kr,icon:document.fullscreenElement===null?"enter-fullscreen":"exit-fullscreen",title:"Enter fullscreen"},"jump-to-start":{enabled:!e.coarseTimelineInfo.atStart,icon:"skip-to-start",title:"Restart"},"play-step-backwards":{enabled:!e.coarseTimelineInfo.atStart,icon:"step-backward",title:"Step backward"},"play-pause":{enabled:!(e.coarseTimelineInfo.atStart&&e.coarseTimelineInfo.atEnd),icon:e.coarseTimelineInfo.playing?"pause":"play",title:e.coarseTimelineInfo.playing?"Pause":"Play"},"play-step":{enabled:!e.coarseTimelineInfo.atEnd,icon:"step-forward",title:"Step forward"},"jump-to-end":{enabled:!e.coarseTimelineInfo.atEnd,icon:"skip-to-end",title:"Skip to End"},"twizzle-link":{enabled:!0,icon:"twizzle-tw",title:"View at Twizzle",hidden:e.viewerLink==="none"}}}},Vt={fullscreen:!0,"jump-to-start":!0,"play-step-backwards":!0,"play-pause":!0,"play-step":!0,"jump-to-end":!0,"twizzle-link":!0},Ye,Lr,cr,Tr=(cr=class extends I{constructor(t,r,i){super();d(this,Ye);this.model=t,this.controller=r,this.defaultFullscreenElement=i,this.buttons=null}connectedCallback(){this.addCSS(Xr);let t={};for(let r in Vt){let i=new Sr;t[r]=i,i.htmlButton.addEventListener("click",()=>N(this,Ye,Lr).call(this,r)),this.addElement(i)}this.buttons=t,this.model?.buttonAppearance.addFreshListener(this.update.bind(this)),this.model?.twistySceneModel.colorScheme.addFreshListener(this.updateColorScheme.bind(this))}async onFullscreenButton(){if(!this.defaultFullscreenElement)throw new Error("Attempted to go fullscreen without an element.");if(jt()===this.defaultFullscreenElement)ei();else{this.buttons?.fullscreen.setIcon("exit-fullscreen"),ti(await this.model?.twistySceneModel.fullscreenElement.get()??this.defaultFullscreenElement);let t=()=>{jt()!==this.defaultFullscreenElement&&(this.buttons?.fullscreen.setIcon("enter-fullscreen"),window.removeEventListener("fullscreenchange",t))};window.addEventListener("fullscreenchange",t)}}async update(t){for(let r in Vt){let i=this.buttons[r],n=t[r];i.htmlButton.disabled=!n.enabled,i.htmlButton.title=n.title,i.setIcon(n.icon),i.hidden=!!n.hidden}}updateColorScheme(t){for(let r of Object.values(this.buttons??{}))r.updateColorScheme(t)}},Ye=new WeakSet,Lr=function(t){switch(t){case"fullscreen":{this.onFullscreenButton();break}case"jump-to-start":{this.controller?.jumpToStart({flash:!0});break}case"play-step-backwards":{this.controller?.animationController.play({direction:-1,untilBoundary:"move"});break}case"play-pause":{this.controller?.togglePlay();break}case"play-step":{this.controller?.animationController.play({direction:1,untilBoundary:"move"});break}case"jump-to-end":{this.controller?.jumpToEnd({flash:!0});break}case"twizzle-link":{this.controller?.visitTwizzleLink();break}default:throw new Error("Missing command")}},cr);L.define("twisty-buttons",Tr);var ke,dr,Sr=(dr=class extends I{constructor(){super(...arguments);d(this,ke,void 0);this.htmlButton=document.createElement("button"),u(this,ke,new Xe(this,"svg-",ri))}updateColorScheme(t){this.contentWrapper.classList.toggle("dark-mode",t==="dark")}connectedCallback(){this.addCSS(Jr),this.addElement(this.htmlButton)}setIcon(t){a(this,ke).setValue(t)}},ke=new WeakMap,dr);L.define("twisty-button",Sr);var ni=new A(`
:host {
  width: 384px;
  height: 16px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  background: rgba(196, 196, 196, 0.75);
}

input:not(:disabled) {
  cursor: ew-resize;
}

.wrapper.dark-mode {
  background: #666666;
}
`),si=!1,We=!1;K?.addEventListener("mousedown",function(e){e.which&&(We=!0)},!0);K?.addEventListener("mouseup",function(e){e.which&&(We=!1)},!0);var mt=0,Ue=0;K?.addEventListener("mousedown",()=>{Ue++},!1);K?.addEventListener("mousemove",Ar,!1);K?.addEventListener("mouseenter",Ar,!1);function Ar(e){mt=e.pageY}var Ft=0,Ut=0,at=!1,ot=0,De,ur,Ir=(ur=class extends I{constructor(t,r){super();d(this,De,null);this.model=t,this.controller=r}async onDetailedTimelineInfo(t){let r=await this.inputElem();r.min=t.timeRange.start.toString(),r.max=t.timeRange.end.toString(),r.disabled=r.min===r.max,r.value=t.timestamp.toString()}async connectedCallback(){this.addCSS(ni),this.addElement(await this.inputElem()),this.model?.twistySceneModel.colorScheme.addFreshListener(this.updateColorScheme.bind(this))}updateColorScheme(t){this.contentWrapper.classList.toggle("dark-mode",t==="dark")}async inputElem(){return a(this,De)??u(this,De,(async()=>{let t=document.createElement("input");return t.type="range",t.disabled=!0,this.model?.detailedTimelineInfo.addFreshListener(this.onDetailedTimelineInfo.bind(this)),t.addEventListener("input",this.onInput.bind(this)),t.addEventListener("keydown",this.onKeypress.bind(this)),t})())}async onInput(t){if(at)return;let r=await this.inputElem();await this.slowDown(t,r);let i=parseInt(r.value);this.model?.playingInfo.set({playing:!1}),this.model?.timestampRequest.set(i)}onKeypress(t){switch(t.key){case"ArrowLeft":case"ArrowRight":{this.controller?.animationController.play({direction:t.key==="ArrowLeft"?-1:1,untilBoundary:"move"}),t.preventDefault();break}case" ":{this.controller?.togglePlay(),t.preventDefault();break}}}async slowDown(t,r){if(!!si&&We){let i=r.getBoundingClientRect(),n=i.top+i.height/2;console.log(n,t,mt,We);let s=Math.abs(n-mt),o=1;s>64&&(o=Math.max(Math.pow(2,-(s-64)/64),1/32));let l=parseInt(r.value);if(console.log("cl",ot,Ue,l),ot===Ue){let h=(l-Ut)*o;console.log("delta",h,s),at=!0;let c=l;c=Ft+h*o+(l-Ft)*Math.min(1,Math.pow(1/2,s*s/64)),r.value=c.toString(),console.log(o),at=!1,this.contentWrapper.style.opacity=o.toString()}else ot=Ue;Ut=l}}},De=new WeakMap,ur);L.define("twisty-scrubber",Ir);var Bt=null;async function Wt(e,t){let[{PerspectiveCamera:r,Scene:i},n,s,o,l,h,c]=await Promise.all([Q,await e.puzzleLoader.get(),await e.visualizationStrategy.get(),await e.twistySceneModel.stickeringRequest.get(),await e.twistySceneModel.stickeringMaskRequest.get(),await e.legacyPosition.get(),await e.twistySceneModel.orbitCoordinates.get()]),f=t?.width??2048,m=t?.height??2048,x=f/m,z=Bt??(Bt=await(async()=>new r(20,x,.1,20))()),S=new i,V=new zr(e,{scheduleRender:()=>{}},n,s);S.add(await V.twisty3DPuzzle()),await Et(z,c);let wt=(await Ct(f,m,S,z)).toDataURL(),Vr=await br(e);return{dataURL:wt,download:async Fr=>{kr(wt,Fr??Vr)}}}async function br(e){let[t,r]=await Promise.all([e.puzzleID.get(),e.alg.get()]);return`[${t}]${r.alg.experimentalNumChildAlgNodes()===0?"":` ${r.alg.toString()}`}`}function kr(e,t,r="png"){let i=document.createElement("a");i.href=e,i.download=`${t}.${r}`,i.click()}var ai=new A(`
:host {
  width: 384px;
  height: 256px;
  display: grid;

  -webkit-user-select: none;
  user-select: none;
}

.wrapper {
  display: grid;
  overflow: hidden;
  contain: size;
  grid-template-rows: 7fr minmax(1.5em, 0.5fr) minmax(2em, 1fr);
}

.wrapper > * {
  width: inherit;
  height: inherit;
  overflow: hidden;
}

.wrapper.controls-none {
  grid-template-rows: 7fr;
}

.wrapper.controls-none twisty-scrubber,
.wrapper.controls-none twisty-control-button-panel ,
.wrapper.controls-none twisty-scrubber,
.wrapper.controls-none twisty-buttons {
  display: none;
}

twisty-scrubber {
  background: rgba(196, 196, 196, 0.5);
}

.wrapper.checkered,
.wrapper.checkered-transparent {
  background-color: #EAEAEA;
  background-image: linear-gradient(45deg, #DDD 25%, transparent 25%, transparent 75%, #DDD 75%, #DDD),
    linear-gradient(45deg, #DDD 25%, transparent 25%, transparent 75%, #DDD 75%, #DDD);
  background-size: 32px 32px;
  background-position: 0 0, 16px 16px;
}

.wrapper.checkered-transparent {
  background-color: #F4F4F4;
  background-image: linear-gradient(45deg, #DDDDDD88 25%, transparent 25%, transparent 75%, #DDDDDD88 75%, #DDDDDD88),
    linear-gradient(45deg, #DDDDDD88 25%, transparent 25%, transparent 75%, #DDDDDD88 75%, #DDDDDD88);
}

.wrapper.dark-mode {
  background-color: #444;
  background-image: linear-gradient(45deg, #DDDDDD0b 25%, transparent 25%, transparent 75%, #DDDDDD0b 75%, #DDDDDD0b),
    linear-gradient(45deg, #DDDDDD0b 25%, transparent 25%, transparent 75%, #DDDDDD0b 75%, #DDDDDD0b);
}

.visualization-wrapper > * {
  width: 100%;
  height: 100%;
}

.error-elem {
  width: 100%;
  height: 100%;
  display: none;
  place-content: center;
  font-family: sans-serif;
  box-shadow: inset 0 0 2em rgb(255, 0, 0);
  color: red;
  text-shadow: 0 0 0.2em white;
  background: rgba(255, 255, 255, 0.25);
}

.wrapper.error .visualization-wrapper {
  display: none;
}

.wrapper.error .error-elem {
  display: grid;
}
`),qt=class extends w{getDefaultValue(){return null}},gt=class extends F{getDefaultValue(){return null}derive(e){return typeof e=="string"?new URL(e,location.href):e}},pe=class{constructor(e){this.warnings=Object.freeze(e?.warnings??[]),this.errors=Object.freeze(e?.errors??[]),Object.freeze(this)}add(e){return new pe({warnings:this.warnings.concat(e?.warnings??[]),errors:this.errors.concat(e?.errors??[])})}log(){this.errors.length>0?console.error(`\u{1F6A8} ${this.errors[0]}`):this.warnings.length>0?console.warn(`\u26A0\uFE0F ${this.warnings[0]}`):console.info("\u{1F60E} No issues!")}};function Dr(e){try{let t=T.fromString(e),r=[];return t.toString()!==e&&r.push("Alg is non-canonical!"),{alg:t,issues:new pe({warnings:r})}}catch(t){return{alg:new T,issues:new pe({errors:[`Malformed alg: ${t.toString()}`]})}}}function oi(e,t){return e.alg.isIdentical(t.alg)&&ut(e.issues.warnings,t.issues.warnings)&&ut(e.issues.errors,t.issues.errors)}var Ht=class extends F{getDefaultValue(){return{alg:new T,issues:new pe}}canReuseValue(e,t){return oi(e,t)}async derive(e){return typeof e=="string"?Dr(e):{alg:e,issues:new pe}}},li=class extends v{derive(e){return e.kpuzzle.algToTransformation(e.setupAlg.alg)}},ci=class extends v{derive(e){if(e.setupTransformation)return e.setupTransformation;switch(e.setupAnchor){case"start":return e.setupAlgTransformation;case"end":{let r=e.indexer.transformationAtIndex(e.indexer.numAnimatedLeaves()).invert();return e.setupAlgTransformation.applyTransformation(r)}default:throw new Error("Unimplemented!")}}},di=class extends w{getDefaultValue(){return{move:null,amount:0}}canReuseValue(e,t){return e.move===t.move&&e.amount===t.amount}},ui=class extends v{derive(e){return{stateIndex:e.currentMoveInfo.stateIndex,movesFinishing:e.currentMoveInfo.movesFinishing.map(t=>t.move),movesFinished:e.currentMoveInfo.movesFinished.map(t=>t.move)}}canReuseValue(e,t){return e.stateIndex===t.stateIndex&&Nt(e.movesFinishing,t.movesFinishing,(r,i)=>r.isIdentical(i))&&Nt(e.movesFinished,t.movesFinished,(r,i)=>r.isIdentical(i))}},hi=class extends v{derive(e){function t(r){return e.detailedTimelineInfo.atEnd&&e.catchUpMove.move!==null&&r.currentMoves.push({move:e.catchUpMove.move,direction:-1,fraction:1-e.catchUpMove.amount,startTimestamp:-1,endTimestamp:-1}),r}if(e.indexer.currentMoveInfo)return t(e.indexer.currentMoveInfo(e.detailedTimelineInfo.timestamp));{let r=e.indexer.timestampToIndex(e.detailedTimelineInfo.timestamp),i={stateIndex:r,currentMoves:[],movesFinishing:[],movesFinished:[],movesStarting:[],latestStart:-1/0,earliestEnd:1/0};if(e.indexer.numAnimatedLeaves()>0){let n=e.indexer.getAnimLeaf(r)?.as(p);if(!n)return t(i);let s=e.indexer.indexToMoveStartTimestamp(r),o=e.indexer.moveDuration(r),l=o?(e.detailedTimelineInfo.timestamp-s)/o:0,h=s+o,c={move:n,direction:1,fraction:l,startTimestamp:s,endTimestamp:h};l===0?i.movesStarting.push(c):l===1?i.movesFinishing.push(c):(i.currentMoves.push(c),i.latestStart=Math.max(i.latestStart,s),i.earliestEnd=Math.min(i.earliestEnd,h))}return t(i)}}},pi=class extends v{derive(e){let t=e.indexer.transformationAtIndex(e.currentLeavesSimplified.stateIndex);t=e.anchoredStart.applyTransformation(t);for(let r of e.currentLeavesSimplified.movesFinishing)t=t.applyMove(r);for(let r of e.currentLeavesSimplified.movesFinished)t=t.applyMove(r);return t.toKState()}};function G(e){switch(Math.abs(e)){case 0:return 0;case 1:return 1e3;case 2:return 1500;default:return 2e3}}var Cr=class extends fe{constructor(e=G){super(),this.durationForAmount=e}traverseAlg(e){let t=0;for(let r of e.childAlgNodes())t+=this.traverseAlgNode(r);return t}traverseGrouping(e){return e.amount*this.traverseAlg(e.alg)}traverseMove(e){return this.durationForAmount(e.amount)}traverseCommutator(e){return 2*(this.traverseAlg(e.A)+this.traverseAlg(e.B))}traverseConjugate(e){return 2*this.traverseAlg(e.A)+this.traverseAlg(e.B)}traversePause(e){return this.durationForAmount(1)}traverseNewline(e){return this.durationForAmount(1)}traverseLineComment(e){return this.durationForAmount(0)}},mi=class{constructor(e,t){this.kpuzzle=e,this.durationFn=new Cr(G),this.moves=new T(t.experimentalExpand())}getAnimLeaf(e){return Array.from(this.moves.childAlgNodes())[e]}indexToMoveStartTimestamp(e){let t=new T(Array.from(this.moves.childAlgNodes()).slice(0,e));return this.durationFn.traverseAlg(t)}timestampToIndex(e){let t=0,r;for(r=0;r<this.numAnimatedLeaves();r++)if(t+=this.durationFn.traverseMove(this.getAnimLeaf(r)),t>=e)return r;return r}stateAtIndex(e){return this.kpuzzle.startState().applyTransformation(this.transformationAtIndex(e))}transformationAtIndex(e){let t=this.kpuzzle.identityTransformation();for(let r of Array.from(this.moves.childAlgNodes()).slice(0,e))t=t.applyMove(r);return t}algDuration(){return this.durationFn.traverseAlg(this.moves)}numAnimatedLeaves(){return It(this.moves)}moveDuration(e){return this.durationFn.traverseMove(this.getAnimLeaf(e))}},Qt={u:"y",l:"x",f:"z",r:"x",b:"z",d:"y",m:"x",e:"y",s:"z",x:"x",y:"y",z:"z"};function gi(e,t){return Qt[e.family[0].toLowerCase()]===Qt[t.family[0].toLowerCase()]}var fi=class extends fe{traverseAlg(e){let t=[];for(let r of e.childAlgNodes())t.push(this.traverseAlgNode(r));return Array.prototype.concat(...t)}traverseGroupingOnce(e){if(e.experimentalIsEmpty())return[];for(let n of e.childAlgNodes())if(!n.is(p))return this.traverseAlg(e);let t=Array.from(e.childAlgNodes()),r=G(t[0].amount);for(let n=0;n<t.length-1;n++){for(let s=1;s<t.length;s++)if(!gi(t[n],t[s]))return this.traverseAlg(e);r=Math.max(r,G(t[n].amount))}let i=t.map(n=>({animLeafAlgNode:n,msUntilNext:0,duration:r}));return i[i.length-1].msUntilNext=r,i}traverseGrouping(e){let t=[],r=e.amount>0?e.alg:e.alg.invert();for(let i=0;i<Math.abs(e.amount);i++)t.push(this.traverseGroupingOnce(r));return Array.prototype.concat(...t)}traverseMove(e){let t=G(e.amount);return[{animLeafAlgNode:e,msUntilNext:t,duration:t}]}traverseCommutator(e){let t=[],r=[e.A,e.B,e.A.invert(),e.B.invert()];for(let i of r)t.push(this.traverseGroupingOnce(i));return Array.prototype.concat(...t)}traverseConjugate(e){let t=[],r=[e.A,e.B,e.A.invert()];for(let i of r)t.push(this.traverseGroupingOnce(i));return Array.prototype.concat(...t)}traversePause(e){if(e.experimentalNISSGrouping)return[];let t=G(1);return[{animLeafAlgNode:e,msUntilNext:t,duration:t}]}traverseNewline(e){return[]}traverseLineComment(e){return[]}},wi=we(fi);function vi(e){let t=0;return wi(e).map(i=>{let n={animLeaf:i.animLeafAlgNode,start:t,end:t+i.duration};return t+=i.msUntilNext,n})}var yi={"y' y' U' E D R2 r2 F2 B2 U E D' R2 L2' z2 S2 U U D D S2 F2' B2":[{animLeaf:new p("y",-1),start:0,end:1e3},{animLeaf:new p("y",-1),start:1e3,end:2e3},{animLeaf:new p("U",-1),start:1e3,end:1600},{animLeaf:new p("E",1),start:1200,end:1800},{animLeaf:new p("D"),start:1400,end:2e3},{animLeaf:new p("R",2),start:2e3,end:3500},{animLeaf:new p("r",2),start:2e3,end:3500},{animLeaf:new p("F",2),start:3500,end:4200},{animLeaf:new p("B",2),start:3800,end:4500},{animLeaf:new p("U",1),start:4500,end:5500},{animLeaf:new p("E",1),start:4500,end:5500},{animLeaf:new p("D",-1),start:4500,end:5500},{animLeaf:new p("R",2),start:5500,end:6500},{animLeaf:new p("L",-2),start:5500,end:6500},{animLeaf:new p("z",2),start:5500,end:6500},{animLeaf:new p("S",2),start:6500,end:7500},{animLeaf:new p("U"),start:7500,end:8e3},{animLeaf:new p("D"),start:7750,end:8250},{animLeaf:new p("U"),start:8e3,end:8500},{animLeaf:new p("D"),start:8250,end:8750},{animLeaf:new p("S",2),start:8750,end:9250},{animLeaf:new p("F",-2),start:8750,end:1e4},{animLeaf:new p("B",2),start:8750,end:1e4}],"M' R' U' D' M R":[{animLeaf:new p("M",-1),start:0,end:1e3},{animLeaf:new p("R",-1),start:0,end:1e3},{animLeaf:new p("U",-1),start:1e3,end:2e3},{animLeaf:new p("D",-1),start:1e3,end:2e3},{animLeaf:new p("M"),start:2e3,end:3e3},{animLeaf:new p("R"),start:2e3,end:3e3}],"U' E' r E r2' E r U E":[{animLeaf:new p("U",-1),start:0,end:1e3},{animLeaf:new p("E",-1),start:0,end:1e3},{animLeaf:new p("r"),start:1e3,end:2500},{animLeaf:new p("E"),start:2500,end:3500},{animLeaf:new p("r",-2),start:3500,end:5e3},{animLeaf:new p("E"),start:5e3,end:6e3},{animLeaf:new p("r"),start:6e3,end:7e3},{animLeaf:new p("U"),start:7e3,end:8e3},{animLeaf:new p("E"),start:7e3,end:8e3}]},Yt=class{constructor(e,t){this.kpuzzle=e,this.animLeaves=yi[t.toString()]??vi(t)}getAnimLeaf(e){return this.animLeaves[Math.min(e,this.animLeaves.length-1)]?.animLeaf??null}getAnimLeafWithRange(e){return this.animLeaves[Math.min(e,this.animLeaves.length-1)]}indexToMoveStartTimestamp(e){let t=0;return this.animLeaves.length>0&&(t=this.animLeaves[Math.min(e,this.animLeaves.length-1)].start),t}timestampToIndex(e){let t=0;for(t=0;t<this.animLeaves.length;t++)if(this.animLeaves[t].start>=e)return Math.max(0,t-1);return Math.max(0,t-1)}timestampToPosition(e,t){let r=this.currentMoveInfo(e),i=t??this.kpuzzle.identityTransformation().toKState();for(let n of this.animLeaves.slice(0,r.stateIndex)){let s=n.animLeaf.as(p);s!==null&&(i=i.applyMove(s))}return{state:i,movesInProgress:r.currentMoves}}currentMoveInfo(e){let t=1/0;for(let c of this.animLeaves)if(c.start<=e&&c.end>=e)t=Math.min(t,c.start);else if(c.start>e)break;let r=[],i=[],n=[],s=[],o=-1/0,l=1/0,h=0;for(let c of this.animLeaves)if(c.end<=t)h++;else{if(c.start>e)break;{let f=c.animLeaf.as(p);if(f!==null){let m=(e-c.start)/(c.end-c.start),x=!1;m>1&&(m=1,x=!0);let z={move:f,direction:1,fraction:m,startTimestamp:c.start,endTimestamp:c.end};switch(m){case 0:{i.push(z);break}case 1:{x?s.push(z):n.push(z);break}default:r.push(z),o=Math.max(o,c.start),l=Math.min(l,c.end)}}}}return{stateIndex:h,currentMoves:r,latestStart:o,earliestEnd:l,movesStarting:i,movesFinishing:n,movesFinished:s}}stateAtIndex(e,t){let r=t??this.kpuzzle.startState();for(let i=0;i<this.animLeaves.length&&i<e;i++){let s=this.animLeaves[i].animLeaf.as(p);s!==null&&(r=r.applyMove(s))}return r}transformationAtIndex(e){let t=this.kpuzzle.identityTransformation();for(let r of this.animLeaves.slice(0,e)){let i=r.animLeaf.as(p);i!==null&&(t=t.applyMove(i))}return t}algDuration(){let e=0;for(let t of this.animLeaves)e=Math.max(e,t.end);return e}numAnimatedLeaves(){return this.animLeaves.length}moveDuration(e){let t=this.getAnimLeafWithRange(e);return t.end-t.start}},Y=class{constructor(e,t,r,i,n=[]){this.moveCount=e,this.duration=t,this.forward=r,this.backward=i,this.children=n}},Mi=class extends fe{constructor(e){super(),this.kpuzzle=e,this.durationFn=new Cr(G),this.cache={},this.identity=e.identityTransformation(),this.dummyLeaf=new Y(0,0,this.identity,this.identity,[])}traverseAlg(e){let t=0,r=0,i=this.identity,n=[];for(let s of e.childAlgNodes()){let o=this.traverseAlgNode(s);t+=o.moveCount,r+=o.duration,i===this.identity?i=o.forward:i=i.applyTransformation(o.forward),n.push(o)}return new Y(t,r,i,i.invert(),n)}traverseGrouping(e){let t=this.traverseAlg(e.alg);return this.mult(t,e.amount,[t])}traverseMove(e){let t=e.toString(),r=this.cache[t];if(r)return r;let i=this.kpuzzle.moveToTransformation(e);return r=new Y(1,this.durationFn.traverseAlgNode(e),i,i.invert()),this.cache[t]=r,r}traverseCommutator(e){let t=this.traverseAlg(e.A),r=this.traverseAlg(e.B),i=t.forward.applyTransformation(r.forward),n=t.backward.applyTransformation(r.backward),s=i.applyTransformation(n),o=new Y(2*(t.moveCount+r.moveCount),2*(t.duration+r.duration),s,s.invert(),[t,r]);return this.mult(o,1,[o,t,r])}traverseConjugate(e){let t=this.traverseAlg(e.A),r=this.traverseAlg(e.B),n=t.forward.applyTransformation(r.forward).applyTransformation(t.backward),s=new Y(2*t.moveCount+r.moveCount,2*t.duration+r.duration,n,n.invert(),[t,r]);return this.mult(s,1,[s,t,r])}traversePause(e){return e.experimentalNISSGrouping?this.dummyLeaf:new Y(1,this.durationFn.traverseAlgNode(e),this.identity,this.identity)}traverseNewline(e){return this.dummyLeaf}traverseLineComment(e){return this.dummyLeaf}mult(e,t,r){let i=Math.abs(t),n=e.forward.selfMultiply(t);return new Y(e.moveCount*i,e.duration*i,n,n.invert(),r)}},M=class{constructor(e,t){this.apd=e,this.back=t}},xi=class extends je{constructor(e,t,r){super(),this.kpuzzle=e,this.algOrAlgNode=t,this.apd=r,this.i=-1,this.dur=-1,this.goali=-1,this.goaldur=-1,this.move=void 0,this.back=!1,this.moveDuration=0,this.st=this.kpuzzle.identityTransformation(),this.root=new M(this.apd,!1)}moveByIndex(e){return this.i>=0&&this.i===e?this.move!==void 0:this.dosearch(e,1/0)}moveByDuration(e){return this.dur>=0&&this.dur<e&&this.dur+this.moveDuration>=e?this.move!==void 0:this.dosearch(1/0,e)}dosearch(e,t){return this.goali=e,this.goaldur=t,this.i=0,this.dur=0,this.move=void 0,this.moveDuration=0,this.back=!1,this.st=this.kpuzzle.identityTransformation(),this.algOrAlgNode.is(T)?this.traverseAlg(this.algOrAlgNode,this.root):this.traverseAlgNode(this.algOrAlgNode,this.root)}traverseAlg(e,t){if(!this.firstcheck(t))return!1;let r=t.back?e.experimentalNumChildAlgNodes()-1:0;for(let i of yt(e.childAlgNodes(),t.back?-1:1)){if(this.traverseAlgNode(i,new M(t.apd.children[r],t.back)))return!0;r+=t.back?-1:1}return!1}traverseGrouping(e,t){if(!this.firstcheck(t))return!1;let r=this.domult(t,e.amount);return this.traverseAlg(e.alg,new M(t.apd.children[0],r))}traverseMove(e,t){return this.firstcheck(t)?(this.move=e,this.moveDuration=t.apd.duration,this.back=t.back,!0):!1}traverseCommutator(e,t){if(!this.firstcheck(t))return!1;let r=this.domult(t,1);return r?this.traverseAlg(e.B,new M(t.apd.children[2],!r))||this.traverseAlg(e.A,new M(t.apd.children[1],!r))||this.traverseAlg(e.B,new M(t.apd.children[2],r))||this.traverseAlg(e.A,new M(t.apd.children[1],r)):this.traverseAlg(e.A,new M(t.apd.children[1],r))||this.traverseAlg(e.B,new M(t.apd.children[2],r))||this.traverseAlg(e.A,new M(t.apd.children[1],!r))||this.traverseAlg(e.B,new M(t.apd.children[2],!r))}traverseConjugate(e,t){if(!this.firstcheck(t))return!1;let r=this.domult(t,1);return r?this.traverseAlg(e.A,new M(t.apd.children[1],!r))||this.traverseAlg(e.B,new M(t.apd.children[2],r))||this.traverseAlg(e.A,new M(t.apd.children[1],r)):this.traverseAlg(e.A,new M(t.apd.children[1],r))||this.traverseAlg(e.B,new M(t.apd.children[2],r))||this.traverseAlg(e.A,new M(t.apd.children[1],!r))}traversePause(e,t){return this.firstcheck(t)?(this.move=e,this.moveDuration=t.apd.duration,this.back=t.back,!0):!1}traverseNewline(e,t){return!1}traverseLineComment(e,t){return!1}firstcheck(e){return e.apd.moveCount+this.i<=this.goali&&e.apd.duration+this.dur<this.goaldur?this.keepgoing(e):!0}domult(e,t){let r=e.back;if(t===0)return r;t<0&&(r=!r,t=-t);let i=e.apd.children[0],n=Math.min(Math.floor((this.goali-this.i)/i.moveCount),Math.ceil((this.goaldur-this.dur)/i.duration-1));return n>0&&this.keepgoing(new M(i,r),n),r}keepgoing(e,t=1){return this.i+=t*e.apd.moveCount,this.dur+=t*e.apd.duration,t!==1?e.back?this.st=this.st.applyTransformation(e.apd.backward.selfMultiply(t)):this.st=this.st.applyTransformation(e.apd.forward.selfMultiply(t)):e.back?this.st=this.st.applyTransformation(e.apd.backward):this.st=this.st.applyTransformation(e.apd.forward),!1}},zi=16;function Ti(e,t){let r=new Ke,i=new Ke;for(let n of e.childAlgNodes())i.push(n),i.experimentalNumAlgNodes()>=t&&(r.push(new ge(i.toAlg())),i.reset());return r.push(new ge(i.toAlg())),r.toAlg()}var Li=class extends fe{traverseAlg(e){let t=e.experimentalNumChildAlgNodes();return t<zi?e:Ti(e,Math.ceil(Math.sqrt(t)))}traverseGrouping(e){return new ge(this.traverseAlg(e.alg),e.amount)}traverseMove(e){return e}traverseCommutator(e){return new et(this.traverseAlg(e.A),this.traverseAlg(e.B))}traverseConjugate(e){return new et(this.traverseAlg(e.A),this.traverseAlg(e.B))}traversePause(e){return e}traverseNewline(e){return e}traverseLineComment(e){return e}},Si=we(Li),Gt=class{constructor(e,t){this.kpuzzle=e;let r=new Mi(this.kpuzzle),i=Si(t);this.decoration=r.traverseAlg(i),this.walker=new xi(this.kpuzzle,i,this.decoration)}getAnimLeaf(e){if(this.walker.moveByIndex(e)){if(!this.walker.move)throw new Error("`this.walker.mv` missing");let t=this.walker.move;return this.walker.back?t.invert():t}return null}indexToMoveStartTimestamp(e){if(this.walker.moveByIndex(e)||this.walker.i===e)return this.walker.dur;throw new Error(`Out of algorithm: index ${e}`)}indexToMovesInProgress(e){if(this.walker.moveByIndex(e)||this.walker.i===e)return this.walker.dur;throw new Error(`Out of algorithm: index ${e}`)}stateAtIndex(e,t){return this.walker.moveByIndex(e),(t??this.kpuzzle.startState()).applyTransformation(this.walker.st)}transformationAtIndex(e){return this.walker.moveByIndex(e),this.walker.st}numAnimatedLeaves(){return this.decoration.moveCount}timestampToIndex(e){return this.walker.moveByDuration(e),this.walker.i}algDuration(){return this.decoration.duration}moveDuration(e){return this.walker.moveByIndex(e),this.walker.moveDuration}},Ai=class extends v{derive(e){switch(e.indexerConstructorRequest){case"auto":return St(e.alg.alg)<100&&e.puzzle==="3x3x3"&&e.visualizationStrategy==="Cube3D"?Yt:Gt;case"tree":return Gt;case"simple":return mi;case"simultaneous":return Yt;default:throw new Error("Invalid indexer request!")}}},Ii=class extends w{getDefaultValue(){return"auto"}},bi=class extends v{derive(e){return new e.indexerConstructor(e.kpuzzle,e.algWithIssues.alg)}},ki=class extends v{derive(e){return{state:e.state,movesInProgress:e.currentMoveInfo.currentMoves}}},Di=!0,_t=class extends v{async derive(e){try{return Di&&e.kpuzzle.algToTransformation(e.algWithIssues.alg),e.algWithIssues}catch(t){return{alg:new T,issues:new pe({errors:[`Invalid alg for puzzle: ${t.toString()}`]})}}}},Ci=class extends w{getDefaultValue(){return"start"}},Ei=class extends w{getDefaultValue(){return null}},Ni=class extends v{async derive(e){return e.puzzleLoader.kpuzzle()}},Pi=class extends w{getDefaultValue(){return ee}},Ri=class extends v{async derive(e){return e.puzzleLoader.id}},Oi=class extends w{getDefaultValue(){return ee}},ji=class extends v{derive(e){if(e.puzzleIDRequest&&e.puzzleIDRequest!==ee){let t=rt[e.puzzleIDRequest];return t||this.userVisibleErrorTracker.set({errors:[`Invalid puzzle ID: ${e.puzzleIDRequest}`]}),t}return e.puzzleDescriptionRequest&&e.puzzleDescriptionRequest!==ee?Tt(e.puzzleDescriptionRequest):Lt}},Vi=class extends v{derive(e){return{playing:e.playingInfo.playing,atStart:e.detailedTimelineInfo.atStart,atEnd:e.detailedTimelineInfo.atEnd}}canReuseValue(e,t){return e.playing===t.playing&&e.atStart===t.atStart&&e.atEnd===t.atEnd}},Ge,Er,hr,Fi=(hr=class extends v{constructor(){super(...arguments);d(this,Ge)}derive(t){let r=N(this,Ge,Er).call(this,t),i=!1,n=!1;return r>=t.timeRange.end&&(n=!0,r=Math.min(t.timeRange.end,r)),r<=t.timeRange.start&&(i=!0,r=Math.max(t.timeRange.start,r)),{timestamp:r,timeRange:t.timeRange,atStart:i,atEnd:n}}canReuseValue(t,r){return t.timestamp===r.timestamp&&t.timeRange.start===r.timeRange.start&&t.timeRange.end===r.timeRange.end&&t.atStart===r.atStart&&t.atEnd===r.atEnd}},Ge=new WeakSet,Er=function(t){switch(t.timestampRequest){case"auto":return t.setupAnchor==="start"&&t.setupAlg.alg.experimentalIsEmpty()?t.timeRange.end:t.timeRange.start;case"start":return t.timeRange.start;case"end":return t.timeRange.end;case"anchor":return t.setupAnchor==="start"?t.timeRange.start:t.timeRange.end;case"opposite-anchor":return t.setupAnchor==="start"?t.timeRange.end:t.timeRange.start;default:return t.timestampRequest}},hr),Ui=class extends F{async getDefaultValue(){return{direction:1,playing:!1,untilBoundary:"entire-timeline",loop:!1}}async derive(e,t){let r=await t,i=Object.assign({},r);return Object.assign(i,e),i}canReuseValue(e,t){return e.direction===t.direction&&e.playing===t.playing&&e.untilBoundary===t.untilBoundary&&e.loop===t.loop}},Bi=class extends F{getDefaultValue(){return 1}derive(e){return e<0?1:e}},Wi={auto:!0,start:!0,end:!0,anchor:!0,"opposite-anchor":!0},qi=class extends w{getDefaultValue(){return"auto"}set(e){let t=this.get();super.set((async()=>this.validInput(await e)?e:t)())}validInput(e){return!!(typeof e=="number"||Wi[e])}},ls={none:!0,"side-by-side":!0,"top-right":!0},Hi=class extends w{getDefaultValue(){return"auto"}},Qi=class extends v{derive(e){return{start:0,end:e.indexer.algDuration()}}},Yi=class extends w{getDefaultValue(){return"auto"}},Gi=class extends w{getDefaultValue(){return"auto"}},_i=class extends v{derive(e){switch(e.puzzleID){case"clock":case"square1":case"redi_cube":case"melindas2x2x2x2":return"2D";case"3x3x3":switch(e.visualizationRequest){case"auto":case"3D":return"Cube3D";default:return e.visualizationRequest}default:switch(e.visualizationRequest){case"auto":case"3D":return"PG3D";case"experimental-2D-LL":return["2x2x2","4x4x4","megaminx"].includes(e.puzzleID)?"experimental-2D-LL":"2D";default:return e.visualizationRequest}}}},Zi=class extends w{getDefaultValue(){return"auto"}},$i=class extends w{getDefaultValue(){return"auto"}},Xi=class extends w{getDefaultValue(){return"auto"}},Zt=null;async function Ji(){return Zt??(Zt=new(await Q).TextureLoader)}var $t=class extends v{async derive(e){let{spriteURL:t}=e;return t===null?null:new Promise(async(r,i)=>{let n=()=>{console.warn("Could not load sprite:",t.toString()),r(null)};try{(await Ji()).load(t.toString(),r,n,n)}catch{n()}})}},Ki={facelets:["regular","regular","regular","regular","regular"]};async function en(e){let{definition:t}=await e.kpuzzle(),r={orbits:{}};for(let[i,n]of Object.entries(t.orbits))r.orbits[i]={pieces:new Array(n.numPieces).fill(Ki)};return r}var tn=class extends v{getDefaultValue(){return{orbits:{}}}async derive(e){return e.stickeringMaskRequest?e.stickeringMaskRequest:e.stickeringRequest==="picture"?{specialBehaviour:"picture",orbits:{}}:e.puzzleLoader.stickeringMask?.(e.stickeringRequest??"full")??en(e.puzzleLoader)}},rn={"-":"Regular",D:"Dim",I:"Ignored",X:"Invisible",O:"IgnoreNonPrimary",P:"PermuteNonPrimary",o:"Ignoriented","?":"OrientationWithoutPermutation","@":"Regular"};function nn(e){let t={orbits:{}},r=e.split(",");for(let i of r){let[n,s,...o]=i.split(":");if(o.length>0)throw new Error(`Invalid serialized orbit stickering mask (too many colons): \`${i}\``);let l=[];t.orbits[n]={pieces:l};for(let h of s){let c=rn[h];l.push(xt(c))}}return t}var sn=class extends F{getDefaultValue(){return null}derive(e){return e===null?null:typeof e=="string"?nn(e):e}},an=class extends w{getDefaultValue(){return null}},on=class extends w{getDefaultValue(){return"auto"}},ln=class extends w{getDefaultValue(){return{}}},cn=class extends w{getDefaultValue(){return"auto"}},dn=class extends w{getDefaultValue(){return"auto"}},un=class extends v{derive(e){return e.colorSchemeRequest==="dark"?"dark":"light"}},hn=class extends w{getDefaultValue(){return"auto"}},pn=class extends w{getDefaultValue(){return null}},mn=35,gn=class extends w{getDefaultValue(){return mn}};function Nr(e,t){return e.latitude===t.latitude&&e.longitude===t.longitude&&e.distance===t.distance}var fn=class extends F{getDefaultValue(){return"auto"}canReuseValue(e,t){return e===t||Nr(e,t)}async derive(e,t){if(e==="auto")return"auto";let r=await t;r==="auto"&&(r={});let i=Object.assign({},r);return Object.assign(i,e),typeof i.latitude<"u"&&(i.latitude=Math.min(Math.max(i.latitude,-90),90)),typeof i.longitude<"u"&&(i.longitude=wr(i.longitude,360,180)),i}},wn=class extends v{canReuseValue(e,t){return Nr(e,t)}async derive(e){if(e.orbitCoordinatesRequest==="auto")return Jt(e.puzzleID,e.strategy);let t=Object.assign(Object.assign({},Jt(e.puzzleID,e.strategy),e.orbitCoordinatesRequest));if(Math.abs(t.latitude)<=e.latitudeLimit)return t;{let{latitude:r,longitude:i,distance:n}=t;return{latitude:e.latitudeLimit*Math.sign(r),longitude:i,distance:n}}}},vn={latitude:31.717474411461005,longitude:0,distance:5.877852522924731},yn={latitude:35,longitude:30,distance:6},Xt={latitude:35,longitude:30,distance:6.25},Mn={latitude:Math.atan(1/2)*kt,longitude:0,distance:6.7},xn={latitude:26.56505117707799,longitude:0,distance:6};function Jt(e,t){if(e[1]==="x")return t==="Cube3D"?yn:Xt;switch(e){case"megaminx":case"gigaminx":return Mn;case"pyraminx":case"master_tetraminx":return xn;case"skewb":return Xt;default:return vn}}var zn=class{constructor(e){this.twistyPlayerModel=e,this.background=new dn,this.colorSchemeRequest=new hn,this.dragInput=new on,this.foundationDisplay=new $i,this.foundationStickerSpriteURL=new gt,this.fullscreenElement=new pn,this.hintFacelet=new bt,this.hintStickerSpriteURL=new gt,this.initialHintFaceletsAnimation=new Xi,this.latitudeLimit=new gn,this.movePressInput=new cn,this.movePressCancelOptions=new ln,this.orbitCoordinatesRequest=new fn,this.stickeringMaskRequest=new sn,this.stickeringRequest=new an,this.faceletScale=new Zi,this.colorScheme=new un({colorSchemeRequest:this.colorSchemeRequest}),this.foundationStickerSprite=new $t({spriteURL:this.foundationStickerSpriteURL}),this.hintStickerSprite=new $t({spriteURL:this.hintStickerSpriteURL}),this.orbitCoordinates=new wn({orbitCoordinatesRequest:this.orbitCoordinatesRequest,latitudeLimit:this.latitudeLimit,puzzleID:e.puzzleID,strategy:e.visualizationStrategy}),this.stickeringMask=new tn({stickeringMaskRequest:this.stickeringMaskRequest,stickeringRequest:this.stickeringRequest,puzzleLoader:e.puzzleLoader})}},Tn={errors:[]},Ln=class extends w{getDefaultValue(){return Tn}reset(){this.set(this.getDefaultValue())}canReuseValue(e,t){return ut(e.errors,t.errors)}},Sn=class{constructor(){this.userVisibleErrorTracker=new Ln,this.alg=new Ht,this.backView=new Hi,this.controlPanel=new Qr,this.catchUpMove=new di,this.indexerConstructorRequest=new Ii,this.playingInfo=new Ui,this.puzzleDescriptionRequest=new Pi,this.puzzleIDRequest=new Oi,this.setupAnchor=new Ci,this.setupAlg=new Ht,this.setupTransformation=new Ei,this.tempoScale=new Bi,this.timestampRequest=new qi,this.viewerLink=new Yi,this.visualizationFormat=new Gi,this.title=new qt,this.videoURL=new gt,this.competitionID=new qt,this.puzzleLoader=new ji({puzzleIDRequest:this.puzzleIDRequest,puzzleDescriptionRequest:this.puzzleDescriptionRequest},this.userVisibleErrorTracker),this.kpuzzle=new Ni({puzzleLoader:this.puzzleLoader}),this.puzzleID=new Ri({puzzleLoader:this.puzzleLoader}),this.puzzleAlg=new _t({algWithIssues:this.alg,kpuzzle:this.kpuzzle}),this.puzzleSetupAlg=new _t({algWithIssues:this.setupAlg,kpuzzle:this.kpuzzle}),this.visualizationStrategy=new _i({visualizationRequest:this.visualizationFormat,puzzleID:this.puzzleID}),this.indexerConstructor=new Ai({alg:this.alg,puzzle:this.puzzleID,visualizationStrategy:this.visualizationStrategy,indexerConstructorRequest:this.indexerConstructorRequest}),this.setupAlgTransformation=new li({setupAlg:this.puzzleSetupAlg,kpuzzle:this.kpuzzle}),this.indexer=new bi({indexerConstructor:this.indexerConstructor,algWithIssues:this.puzzleAlg,kpuzzle:this.kpuzzle}),this.anchorTransformation=new ci({setupTransformation:this.setupTransformation,setupAnchor:this.setupAnchor,setupAlgTransformation:this.setupAlgTransformation,indexer:this.indexer}),this.timeRange=new Qi({indexer:this.indexer}),this.detailedTimelineInfo=new Fi({timestampRequest:this.timestampRequest,timeRange:this.timeRange,setupAnchor:this.setupAnchor,setupAlg:this.setupAlg}),this.coarseTimelineInfo=new Vi({detailedTimelineInfo:this.detailedTimelineInfo,playingInfo:this.playingInfo}),this.currentMoveInfo=new hi({indexer:this.indexer,detailedTimelineInfo:this.detailedTimelineInfo,catchUpMove:this.catchUpMove}),this.buttonAppearance=new ii({coarseTimelineInfo:this.coarseTimelineInfo,viewerLink:this.viewerLink}),this.currentLeavesSimplified=new ui({currentMoveInfo:this.currentMoveInfo}),this.currentState=new pi({anchoredStart:this.anchorTransformation,currentLeavesSimplified:this.currentLeavesSimplified,indexer:this.indexer}),this.legacyPosition=new ki({currentMoveInfo:this.currentMoveInfo,state:this.currentState}),this.twistySceneModel=new zn(this)}async twizzleLink(){let[e,t,r,i,n,s,o,l]=await Promise.all([this.viewerLink.get(),this.puzzleID.get(),this.puzzleDescriptionRequest.get(),this.alg.get(),this.setupAlg.get(),this.setupAnchor.get(),this.twistySceneModel.stickeringRequest.get(),this.twistySceneModel.twistyPlayerModel.title.get()]),h=e==="experimental-twizzle-explorer",c=new URL(`https://alpha.twizzle.net/${h?"explore":"edit"}/`);return i.alg.experimentalIsEmpty()||c.searchParams.set("alg",i.alg.toString()),n.alg.experimentalIsEmpty()||c.searchParams.set("setup-alg",n.alg.toString()),s!=="start"&&c.searchParams.set("setup-anchor",s),o!=="full"&&o!==null&&c.searchParams.set("experimental-stickering",o),h&&r!==ee?c.searchParams.set("puzzle-description",r):t!=="3x3x3"&&c.searchParams.set("puzzle",t),l&&c.searchParams.set("title",l),c.toString()}experimentalAddAlgLeaf(e,t){let r=e.as(p);r?this.experimentalAddMove(r,t):this.alg.set((async()=>{let n=(await this.alg.get()).alg.concat(new T([e]));return this.timestampRequest.set("end"),n})())}experimentalAddMove(e,t){let r=typeof e=="string"?new p(e):e;this.alg.set((async()=>{let[{alg:i},n]=await Promise.all([this.alg.get(),this.puzzleLoader.get()]),s=Mt(i,r,{...t,...await zt(n)});return this.timestampRequest.set("end"),this.catchUpMove.set({move:r,amount:0}),s})())}experimentalRemoveFinalChild(){this.alg.set((async()=>{let e=(await this.alg.get()).alg,t=Array.from(e.childAlgNodes()),[r]=t.splice(-1);if(!r)return e;this.timestampRequest.set("end");let i=r.as(p);return i&&this.catchUpMove.set({move:i.invert(),amount:0}),new T(t)})())}};function g(e){return new Error(`Cannot get \`.${e}\` directly from a \`TwistyPlayer\`.`)}var An=class extends I{constructor(){super(...arguments),this.experimentalModel=new Sn,this.experimentalGet=new In(this.experimentalModel)}set alg(e){this.experimentalModel.alg.set(e)}get alg(){throw g("alg")}set experimentalSetupAlg(e){this.experimentalModel.setupAlg.set(e)}get experimentalSetupAlg(){throw g("setup")}set experimentalSetupAnchor(e){this.experimentalModel.setupAnchor.set(e)}get experimentalSetupAnchor(){throw g("anchor")}set puzzle(e){this.experimentalModel.puzzleIDRequest.set(e)}get puzzle(){throw g("puzzle")}set experimentalPuzzleDescription(e){this.experimentalModel.puzzleDescriptionRequest.set(e)}get experimentalPuzzleDescription(){throw g("experimentalPuzzleDescription")}set timestamp(e){this.experimentalModel.timestampRequest.set(e)}get timestamp(){throw g("timestamp")}set hintFacelets(e){this.experimentalModel.twistySceneModel.hintFacelet.set(e)}get hintFacelets(){throw g("hintFacelets")}set experimentalStickering(e){this.experimentalModel.twistySceneModel.stickeringRequest.set(e)}get experimentalStickering(){throw g("experimentalStickering")}set experimentalStickeringMaskOrbits(e){this.experimentalModel.twistySceneModel.stickeringMaskRequest.set(e)}get experimentalStickeringMaskOrbits(){throw g("experimentalStickeringMaskOrbits")}set experimentalFaceletScale(e){this.experimentalModel.twistySceneModel.faceletScale.set(e)}get experimentalFaceletScale(){throw g("experimentalFaceletScale")}set backView(e){this.experimentalModel.backView.set(e)}get backView(){throw g("backView")}set background(e){this.experimentalModel.twistySceneModel.background.set(e)}get background(){throw g("background")}set colorScheme(e){this.experimentalModel.twistySceneModel.colorSchemeRequest.set(e)}get colorScheme(){throw g("colorScheme")}set controlPanel(e){this.experimentalModel.controlPanel.set(e)}get controlPanel(){throw g("controlPanel")}set visualization(e){this.experimentalModel.visualizationFormat.set(e)}get visualization(){throw g("visualization")}set experimentalTitle(e){this.experimentalModel.title.set(e)}get experimentalTitle(){throw g("experimentalTitle")}set experimentalVideoURL(e){this.experimentalModel.videoURL.set(e)}get experimentalVideoURL(){throw g("experimentalVideoURL")}set experimentalCompetitionID(e){this.experimentalModel.competitionID.set(e)}get experimentalCompetitionID(){throw g("experimentalCompetitionID")}set viewerLink(e){this.experimentalModel.viewerLink.set(e)}get viewerLink(){throw g("viewerLink")}set experimentalMovePressInput(e){this.experimentalModel.twistySceneModel.movePressInput.set(e)}get experimentalMovePressInput(){throw g("experimentalMovePressInput")}set experimentalMovePressCancelOptions(e){this.experimentalModel.twistySceneModel.movePressCancelOptions.set(e)}get experimentalMovePressCancelOptions(){throw g("experimentalMovePressCancelOptions")}set cameraLatitude(e){this.experimentalModel.twistySceneModel.orbitCoordinatesRequest.set({latitude:e})}get cameraLatitude(){throw g("cameraLatitude")}set cameraLongitude(e){this.experimentalModel.twistySceneModel.orbitCoordinatesRequest.set({longitude:e})}get cameraLongitude(){throw g("cameraLongitude")}set cameraDistance(e){this.experimentalModel.twistySceneModel.orbitCoordinatesRequest.set({distance:e})}get cameraDistance(){throw g("cameraDistance")}set cameraLatitudeLimit(e){this.experimentalModel.twistySceneModel.latitudeLimit.set(e)}get cameraLatitudeLimit(){throw g("cameraLatitudeLimit")}set indexer(e){this.experimentalModel.indexerConstructorRequest.set(e)}get indexer(){throw g("indexer")}set tempoScale(e){this.experimentalModel.tempoScale.set(e)}get tempoScale(){throw g("tempoScale")}set experimentalSprite(e){this.experimentalModel.twistySceneModel.foundationStickerSpriteURL.set(e)}get experimentalSprite(){throw g("experimentalSprite")}set experimentalHintSprite(e){this.experimentalModel.twistySceneModel.hintStickerSpriteURL.set(e)}get experimentalHintSprite(){throw g("experimentalHintSprite")}set fullscreenElement(e){this.experimentalModel.twistySceneModel.fullscreenElement.set(e)}get fullscreenElement(){throw g("fullscreenElement")}set experimentalInitialHintFaceletsAnimation(e){this.experimentalModel.twistySceneModel.initialHintFaceletsAnimation.set(e)}get experimentalInitialHintFaceletsAnimation(){throw g("experimentalInitialHintFaceletsAnimation")}set experimentalDragInput(e){this.experimentalModel.twistySceneModel.dragInput.set(e)}get experimentalDragInput(){throw g("experimentalDragInput")}},In=class{constructor(e){this.model=e}async alg(){return(await this.model.alg.get()).alg}async setupAlg(){return(await this.model.setupAlg.get()).alg}puzzleID(){return this.model.puzzleID.get()}async timestamp(){return(await this.model.detailedTimelineInfo.get()).timestamp}},lt="data-",qe={alg:"alg","experimental-setup-alg":"experimentalSetupAlg","experimental-setup-anchor":"experimentalSetupAnchor",puzzle:"puzzle","experimental-puzzle-description":"experimentalPuzzleDescription",visualization:"visualization","hint-facelets":"hintFacelets","experimental-stickering":"experimentalStickering","experimental-stickering-mask-orbits":"experimentalStickeringMaskOrbits",background:"background","color-scheme":"colorScheme","control-panel":"controlPanel","back-view":"backView","experimental-initial-hint-facelets-animation":"experimentalInitialHintFaceletsAnimation","viewer-link":"viewerLink","experimental-move-press-input":"experimentalMovePressInput","experimental-drag-input":"experimentalDragInput","experimental-title":"experimentalTitle","experimental-video-url":"experimentalVideoURL","experimental-competition-id":"experimentalCompetitionID","camera-latitude":"cameraLatitude","camera-longitude":"cameraLongitude","camera-distance":"cameraDistance","camera-latitude-limit":"cameraLatitudeLimit","tempo-scale":"tempoScale","experimental-sprite":"experimentalSprite","experimental-hint-sprite":"experimentalHintSprite"},bn=Object.fromEntries(Object.values(qe).map(e=>[e,!0])),kn={experimentalMovePressCancelOptions:!0},Ce,se,X,ae,oe,D,le,ce,_e,Pr,pr,Je=(pr=class extends An{constructor(t={}){super();d(this,_e);d(this,Ce,void 0);d(this,se,void 0);d(this,X,void 0);d(this,ae,void 0);d(this,oe,void 0);d(this,D,void 0);d(this,le,void 0);d(this,ce,void 0);this.controller=new qr(this.experimentalModel,this),this.experimentalCanvasClickCallback=()=>{},u(this,Ce,new Xe(this,"controls-",["auto"].concat(Object.keys(Hr)))),u(this,se,document.createElement("div")),u(this,X,document.createElement("div")),u(this,ae,!1),u(this,oe,"auto"),u(this,D,null),u(this,le,new xr),u(this,ce,null);for(let[r,i]of Object.entries(t)){if(!(bn[r]||kn[r])){console.warn(`Invalid config passed to TwistyPlayer: ${r}`);break}this[r]=i}}async connectedCallback(){if(a(this,ae))return;u(this,ae,!0),this.addCSS(ai),this.addElement(a(this,se)).classList.add("visualization-wrapper"),this.addElement(a(this,X)).classList.add("error-elem"),a(this,X).textContent="Error",this.experimentalModel.userVisibleErrorTracker.addFreshListener(r=>{let i=r.errors[0]??null;this.contentWrapper.classList.toggle("error",!!i),i&&(a(this,X).textContent=i)});let t=new Ir(this.experimentalModel,this.controller);this.contentWrapper.appendChild(t),this.buttons=new Tr(this.experimentalModel,this.controller,this),this.contentWrapper.appendChild(this.buttons),this.experimentalModel.twistySceneModel.background.addFreshListener(r=>{this.contentWrapper.classList.toggle("checkered",["auto","checkered"].includes(r)),this.contentWrapper.classList.toggle("checkered-transparent",r==="checkered-transparent")}),this.experimentalModel.twistySceneModel.colorScheme.addFreshListener(r=>{this.contentWrapper.classList.toggle("dark-mode",["dark"].includes(r))}),this.experimentalModel.controlPanel.addFreshListener(r=>{a(this,Ce).setValue(r)}),this.experimentalModel.visualizationStrategy.addFreshListener(N(this,_e,Pr).bind(this)),this.experimentalModel.puzzleID.addFreshListener(this.flash.bind(this))}experimentalSetFlashLevel(t){u(this,oe,t)}flash(){a(this,oe)==="auto"&&a(this,D)?.animate([{opacity:.25},{opacity:1}],{duration:250,easing:"ease-out"})}async experimentalCurrentVantages(){this.connectedCallback();let t=a(this,D);return t instanceof pt?t.experimentalVantages():[]}async experimentalCurrentCanvases(){let t=await this.experimentalCurrentVantages(),r=[];for(let i of t)r.push((await i.canvasInfo()).canvas);return r}async experimentalCurrentThreeJSPuzzleObject(t){this.connectedCallback();let i=await(await a(this,le).promise).experimentalTwisty3DPuzzleWrapper(),n=i.twisty3DPuzzle(),s=(async()=>{await n,await new Promise(o=>setTimeout(o,0))})();if(t){let o=new ve(async()=>{});i.addEventListener("render-scheduled",async()=>{o.requestIsPending()||(o.requestAnimFrame(),await s,t())})}return n}jumpToStart(t){this.controller.jumpToStart(t)}jumpToEnd(t){this.controller.jumpToEnd(t)}play(){this.controller.togglePlay(!0)}pause(){this.controller.togglePlay(!1)}togglePlay(t){this.controller.togglePlay(t)}experimentalAddMove(t,r){this.experimentalModel.experimentalAddMove(t,r)}experimentalAddAlgLeaf(t,r){this.experimentalModel.experimentalAddAlgLeaf(t,r)}static get observedAttributes(){let t=[];for(let r of Object.keys(qe))t.push(r,lt+r);return t}experimentalRemoveFinalChild(){this.experimentalModel.experimentalRemoveFinalChild()}attributeChangedCallback(t,r,i){t.startsWith(lt)&&(t=t.slice(lt.length));let n=qe[t];!n||(this[n]=i)}async experimentalScreenshot(t){return(await Wt(this.experimentalModel,t)).dataURL}async experimentalDownloadScreenshot(t){if(["2D","experimental-2D-LL"].includes(await this.experimentalModel.visualizationStrategy.get())){let i=await a(this,D).currentTwisty2DPuzzleWrapper().twisty2DPuzzle(),n=new XMLSerializer().serializeToString(i.svgWrapper.svgElement),s=URL.createObjectURL(new Blob([n]));kr(s,t??await br(this.experimentalModel),"svg")}else await(await Wt(this.experimentalModel)).download(t)}},Ce=new WeakMap,se=new WeakMap,X=new WeakMap,ae=new WeakMap,oe=new WeakMap,D=new WeakMap,le=new WeakMap,ce=new WeakMap,_e=new WeakSet,Pr=function(t){if(t!==a(this,ce)){a(this,D)?.remove(),a(this,D)?.disconnect();let r;switch(t){case"2D":case"experimental-2D-LL":{r=new Mr(this.experimentalModel.twistySceneModel,t);break}case"Cube3D":case"PG3D":{r=new pt(this.experimentalModel),a(this,le).handleNewValue(r);break}default:throw new Error("Invalid visualization")}a(this,se).appendChild(r),u(this,D,r),u(this,ce,t)}},pr);L.define("twisty-player",Je);var Dn=new A(`
:host {
  display: inline;
}

.wrapper {
  display: inline;
}

a:not(:hover) {
  color: inherit;
  text-decoration: none;
}

twisty-alg-leaf-elem.twisty-alg-comment {
  color: rgba(0, 0, 0, 0.4);
}

.wrapper.current-move {
  background: rgba(66, 133, 244, 0.3);
  margin-left: -0.1em;
  margin-right: -0.1em;
  padding-left: 0.1em;
  padding-right: 0.1em;
  border-radius: 0.1em;
}
`);async function Cn(e){return new Promise((t,r)=>{let i=document.getElementById(e);i&&t(i);let n=new MutationObserver(s=>{for(let o of s)o.attributeName==="id"&&o.target instanceof Element&&o.target.getAttribute("id")===e&&(t(o.target),n.disconnect())});n.observe(document.body,{attributeFilter:["id"],subtree:!0})})}var En=250,re=class extends I{constructor(e,t,r,i,n,s){if(super({mode:"open"}),this.algOrAlgNode=i,this.classList.add(e),this.addCSS(Dn),s){let o=this.contentWrapper.appendChild(document.createElement("a"));o.href="#",o.textContent=t,o.addEventListener("click",l=>{l.preventDefault(),r.twistyAlgViewer.jumpToIndex(r.earliestMoveIndex,n)})}else this.contentWrapper.appendChild(document.createElement("span")).textContent=t}pathToIndex(e){return[]}setCurrentMove(e){this.contentWrapper.classList.toggle("current-move",e)}};L.define("twisty-alg-leaf-elem",re);var ie=class extends nt{constructor(e,t){super(),this.algOrAlgNode=t,this.queue=[],this.classList.add(e)}addString(e){this.queue.push(document.createTextNode(e))}addElem(e){return this.queue.push(e.element),e.moveCount}flushQueue(e=1){for(let t of Rr(this.queue,e))this.append(t);this.queue=[]}pathToIndex(e){return[]}};L.define("twisty-alg-wrapper-elem",ie);function Nn(e){return e===1?-1:1}function Pn(e,t){return t<0?Nn(e):e}function Rr(e,t){if(t===1)return e;let r=Array.from(e);return r.reverse(),r}var Rn=class extends je{traverseAlg(e,t){let r=0,i=new ie("twisty-alg-alg",e),n=!0;for(let s of vt(e.childAlgNodes(),t.direction))n||i.addString(" "),n=!1,s.as(tt)?.experimentalNISSGrouping&&i.addString("^("),s.as(ge)?.experimentalNISSPlaceholder||(r+=i.addElem(this.traverseAlgNode(s,{earliestMoveIndex:t.earliestMoveIndex+r,twistyAlgViewer:t.twistyAlgViewer,direction:t.direction}))),s.as(tt)?.experimentalNISSGrouping&&i.addString(")");return i.flushQueue(t.direction),{moveCount:r,element:i}}traverseGrouping(e,t){let r=e.experimentalAsSquare1Tuple(),i=Pn(t.direction,e.amount),n=0,s=new ie("twisty-alg-grouping",e);return s.addString("("),r?(n+=s.addElem({moveCount:1,element:new re("twisty-alg-move",r[0].amount.toString(),t,r[0],!0,!0)}),s.addString(", "),n+=s.addElem({moveCount:1,element:new re("twisty-alg-move",r[1].amount.toString(),t,r[1],!0,!0)})):n+=s.addElem(this.traverseAlg(e.alg,{earliestMoveIndex:t.earliestMoveIndex+n,twistyAlgViewer:t.twistyAlgViewer,direction:i})),s.addString(`)${e.experimentalRepetitionSuffix}`),s.flushQueue(),{moveCount:n*Math.abs(e.amount),element:s}}traverseMove(e,t){let r=new re("twisty-alg-move",e.toString(),t,e,!0,!0);return t.twistyAlgViewer.highlighter.addMove(e.startCharIndex,r),{moveCount:1,element:r}}traverseCommutator(e,t){let r=0,i=new ie("twisty-alg-commutator",e);i.addString("["),i.flushQueue();let[n,s]=Rr([e.A,e.B],t.direction);return r+=i.addElem(this.traverseAlg(n,{earliestMoveIndex:t.earliestMoveIndex+r,twistyAlgViewer:t.twistyAlgViewer,direction:t.direction})),i.addString(", "),r+=i.addElem(this.traverseAlg(s,{earliestMoveIndex:t.earliestMoveIndex+r,twistyAlgViewer:t.twistyAlgViewer,direction:t.direction})),i.flushQueue(t.direction),i.addString("]"),i.flushQueue(),{moveCount:r*2,element:i}}traverseConjugate(e,t){let r=0,i=new ie("twisty-alg-conjugate",e);i.addString("[");let n=i.addElem(this.traverseAlg(e.A,{earliestMoveIndex:t.earliestMoveIndex+r,twistyAlgViewer:t.twistyAlgViewer,direction:t.direction}));return r+=n,i.addString(": "),r+=i.addElem(this.traverseAlg(e.B,{earliestMoveIndex:t.earliestMoveIndex+r,twistyAlgViewer:t.twistyAlgViewer,direction:t.direction})),i.addString("]"),i.flushQueue(),{moveCount:r+n,element:i}}traversePause(e,t){return e.experimentalNISSGrouping?this.traverseAlg(e.experimentalNISSGrouping.alg,t):{moveCount:1,element:new re("twisty-alg-pause",".",t,e,!0,!0)}}traverseNewline(e,t){let r=new ie("twisty-alg-newline",e);return r.append(document.createElement("br")),{moveCount:0,element:r}}traverseLineComment(e,t){return{moveCount:0,element:new re("twisty-alg-line-comment",`//${e.text}`,t,e,!1,!1)}}},On=we(Rn),jn=class{constructor(){this.moveCharIndexMap=new Map,this.currentElem=null}addMove(e,t){this.moveCharIndexMap.set(e,t)}set(e){let t=e?this.moveCharIndexMap.get(e.startCharIndex)??null:null;this.currentElem!==t&&(this.currentElem?.classList.remove("twisty-alg-current-move"),this.currentElem?.setCurrentMove(!1),t?.classList.add("twisty-alg-current-move"),t?.setCurrentMove(!0),this.currentElem=t)}},Ee,C,Ze,jr,mr,Or=(mr=class extends nt{constructor(t){super();d(this,Ze);d(this,Ee,void 0);d(this,C,void 0);this.highlighter=new jn,u(this,C,null),this.lastClickTimestamp=null,t?.twistyPlayer&&(this.twistyPlayer=t?.twistyPlayer)}connectedCallback(){}setAlg(t){u(this,Ee,On(t,{earliestMoveIndex:0,twistyAlgViewer:this,direction:1}).element),this.textContent="",this.appendChild(a(this,Ee))}get twistyPlayer(){return a(this,C)}set twistyPlayer(t){N(this,Ze,jr).call(this,t)}async jumpToIndex(t,r){let i=a(this,C);if(i){i.pause();let n=(async()=>{let s=await i.experimentalModel.indexer.get(),o=r?En:0;return s.indexToMoveStartTimestamp(t)+s.moveDuration(t)-o})();i.experimentalModel.timestampRequest.set(await n),this.lastClickTimestamp===await n?(i.play(),this.lastClickTimestamp=null):this.lastClickTimestamp=await n}}async attributeChangedCallback(t,r,i){if(t==="for"){let n=document.getElementById(i);if(n||console.info("for= elem does not exist, waiting for one"),await customElements.whenDefined("twisty-player"),n=await Cn(i),!(n instanceof Je)){console.warn("for= elem is not a twisty-player");return}this.twistyPlayer=n}}static get observedAttributes(){return["for"]}},Ee=new WeakMap,C=new WeakMap,Ze=new WeakSet,jr=async function(t){if(a(this,C)){console.warn("twisty-player reassignment is not supported");return}if(t===null)throw new Error("clearing twistyPlayer is not supported");u(this,C,t),a(this,C).experimentalModel.alg.addFreshListener(n=>{this.setAlg(n.alg)});let r=(await a(this,C).experimentalModel.alg.get()).alg,i="startCharIndex"in r?r:T.fromString(r.toString());this.setAlg(i),t.experimentalModel.currentMoveInfo.addFreshListener(n=>{let s=n.currentMoves[0];if(s??(s=n.movesStarting[0]),s??(s=n.movesFinishing[0]),!s)this.highlighter.set(null);else{let o=s.move;this.highlighter.set(o)}}),t.experimentalModel.detailedTimelineInfo.addFreshListener(n=>{n.timestamp!==this.lastClickTimestamp&&(this.lastClickTimestamp=null)})},mr);L.define("twisty-alg-viewer",Or);var Vn=class extends je{traverseAlg(e,t){let r=[],i=0;for(let n of e.childAlgNodes()){let s=this.traverseAlgNode(n,{numMovesSofar:t.numMovesSofar+i});r.push(s.tokens),i+=s.numLeavesInside}return{tokens:Array.prototype.concat(...r),numLeavesInside:i}}traverseGrouping(e,t){let r=this.traverseAlg(e.alg,t);return{tokens:r.tokens,numLeavesInside:r.numLeavesInside*e.amount}}traverseMove(e,t){return{tokens:[{leaf:e,idx:t.numMovesSofar}],numLeavesInside:1}}traverseCommutator(e,t){let r=this.traverseAlg(e.A,t),i=this.traverseAlg(e.B,{numMovesSofar:t.numMovesSofar+r.numLeavesInside});return{tokens:r.tokens.concat(i.tokens),numLeavesInside:r.numLeavesInside*2+i.numLeavesInside}}traverseConjugate(e,t){let r=this.traverseAlg(e.A,t),i=this.traverseAlg(e.B,{numMovesSofar:t.numMovesSofar+r.numLeavesInside});return{tokens:r.tokens.concat(i.tokens),numLeavesInside:r.numLeavesInside*2+i.numLeavesInside*2}}traversePause(e,t){return{tokens:[{leaf:e,idx:t.numMovesSofar}],numLeavesInside:1}}traverseNewline(e,t){return{tokens:[],numLeavesInside:0}}traverseLineComment(e,t){return{tokens:[],numLeavesInside:0}}},Fn=we(Vn),Un=class extends w{getDefaultValue(){return""}},Bn=class extends v{derive(e){return Dr(e.value)}},Wn=class extends F{getDefaultValue(){return{selectionStart:0,selectionEnd:0,endChangedMostRecently:!1}}async derive(e,t){let{selectionStart:r,selectionEnd:i}=e,n=await t,s=e.selectionStart===n.selectionStart&&e.selectionEnd!==(await t).selectionEnd;return{selectionStart:r,selectionEnd:i,endChangedMostRecently:s}}},qn=class extends v{derive(e){return e.selectionInfo.endChangedMostRecently?e.selectionInfo.selectionEnd:e.selectionInfo.selectionStart}},Hn=class extends v{derive(e){return Fn(e.algWithIssues.alg,{numMovesSofar:0}).tokens}},Qn=class extends v{derive(e){function t(i){if(i===null)return null;let n;return e.targetChar<i.leaf.startCharIndex?n="before":e.targetChar===i.leaf.startCharIndex?n="start":e.targetChar<i.leaf.endCharIndex?n="inside":e.targetChar===i.leaf.endCharIndex?n="end":n="after",{leafInfo:i,where:n}}let r=null;for(let i of e.leafTokens){if(e.targetChar<i.leaf.startCharIndex&&r!==null)return t(r);if(e.targetChar<=i.leaf.endCharIndex)return t(i);r=i}return t(r)}},Yn=class{constructor(){this.valueProp=new Un,this.selectionProp=new Wn,this.targetCharProp=new qn({selectionInfo:this.selectionProp}),this.algEditorAlgWithIssues=new Bn({value:this.valueProp}),this.leafTokensProp=new Hn({algWithIssues:this.algEditorAlgWithIssues}),this.leafToHighlight=new Qn({leafTokens:this.leafTokensProp,targetChar:this.targetCharProp})}},Gn=new A(`
:host {
  width: 384px;
  display: grid;
}

.wrapper {
  /*overflow: hidden;
  resize: horizontal;*/

  background: var(--background, none);
  display: grid;
}

textarea, .carbon-copy {
  grid-area: 1 / 1 / 2 / 2;

  width: 100%;
  font-family: sans-serif;
  line-height: 1.2em;

  font-size: var(--font-size, inherit);
  font-family: var(--font-family, sans-serif);

  box-sizing: border-box;

  padding: var(--padding, 0.5em);
  /* Prevent horizontal growth. */
  overflow-x: hidden;
}

textarea {
  resize: none;
  background: none;
  z-index: 2;
  overflow: hidden;
  border: 1px solid var(--border-color, rgba(0, 0, 0, 0.25));
}

.carbon-copy {
  white-space: pre-wrap;
  word-wrap: break-word;
  color: transparent;
  user-select: none;
  pointer-events: none;

  z-index: 1;
}

.carbon-copy .highlight {
  background: var(--highlight-color, rgba(255, 128, 0, 0.5));
  padding: 0.1em 0.2em;
  margin: -0.1em -0.2em;
  border-radius: 0.2em;
}

.wrapper.issue-warning textarea,
.wrapper.valid-for-puzzle-warning textarea {
  outline: none;
  border: 1px solid rgba(200, 200, 0, 0.5);
  background: rgba(255, 255, 0, 0.1);
}

.wrapper.issue-error textarea,
.wrapper.valid-for-puzzle-error textarea {
  outline: none;
  border: 1px solid red;
  background: rgba(255, 0, 0, 0.1);
}
`),Fe="for-twisty-player",Kt="placeholder",er="twisty-player-prop",y,O,W,E,q,Ne,k,j,de,Be,ue,Pe,ft,he,gr,_n=(gr=class extends I{constructor(t){super();d(this,de);d(this,Pe);d(this,y,void 0);d(this,O,void 0);d(this,W,void 0);d(this,E,void 0);d(this,q,void 0);d(this,Ne,void 0);d(this,k,void 0);d(this,j,void 0);d(this,ue,void 0);d(this,he,void 0);this.model=new Yn,u(this,y,document.createElement("textarea")),u(this,O,document.createElement("div")),u(this,W,document.createElement("span")),u(this,E,document.createElement("span")),u(this,q,document.createElement("span")),u(this,Ne,new Xe(this,"valid-for-puzzle-",["none","warning","error"])),u(this,k,null),this.debugNeverRequestTimestamp=!1,u(this,ue,!1),u(this,he,null),a(this,O).classList.add("carbon-copy"),this.addElement(a(this,O)),a(this,y).rows=1,this.addElement(a(this,y)),a(this,W).classList.add("prefix"),a(this,O).appendChild(a(this,W)),a(this,E).classList.add("highlight"),a(this,O).appendChild(a(this,E)),a(this,q).classList.add("suffix"),a(this,O).appendChild(a(this,q)),a(this,y).placeholder="Alg",a(this,y).setAttribute("spellcheck","false"),this.addCSS(Gn),a(this,y).addEventListener("input",()=>{u(this,ue,!0),this.onInput()}),a(this,y).addEventListener("blur",()=>this.onBlur()),document.addEventListener("selectionchange",()=>this.onSelectionChange()),t?.twistyPlayer&&(this.twistyPlayer=t.twistyPlayer),u(this,j,t?.twistyPlayerProp??"alg"),t?.twistyPlayerProp==="alg"&&this.model.leafToHighlight.addFreshListener(r=>{r&&this.highlightLeaf(r.leafInfo.leaf)})}set algString(t){a(this,y).value=t,this.onInput()}get algString(){return a(this,y).value}set placeholder(t){a(this,y).placeholder=t}onInput(){a(this,E).hidden=!0,this.highlightLeaf(null);let t=a(this,y).value.trimEnd();this.model.valueProp.set(t),a(this,de,Be)?.set(t)}async onSelectionChange(){if(document.activeElement!==this||this.shadow.activeElement!==a(this,y)||a(this,j)!=="alg")return;let{selectionStart:t,selectionEnd:r}=a(this,y);this.model.selectionProp.set({selectionStart:t,selectionEnd:r})}async onBlur(){}setAlgIssueClassForPuzzle(t){a(this,Ne).setValue(t)}highlightLeaf(t){if(a(this,j)==="alg"){if(t===null){a(this,W).textContent="",a(this,E).textContent="",a(this,q).textContent=N(this,Pe,ft).call(this,a(this,y).value);return}t!==a(this,he)&&(u(this,he,t),a(this,W).textContent=a(this,y).value.slice(0,t.startCharIndex),a(this,E).textContent=a(this,y).value.slice(t.startCharIndex,t.endCharIndex),a(this,q).textContent=N(this,Pe,ft).call(this,a(this,y).value.slice(t.endCharIndex)),a(this,E).hidden=!1)}}get twistyPlayer(){return a(this,k)}set twistyPlayer(t){if(a(this,k)){console.warn("twisty-player reassignment/clearing is not supported");return}u(this,k,t),t&&((async()=>this.algString=a(this,de,Be)?(await a(this,de,Be).get()).alg.toString():"")(),a(this,j)==="alg"&&(a(this,k)?.experimentalModel.puzzleAlg.addFreshListener(r=>{if(r.issues.errors.length===0){this.setAlgIssueClassForPuzzle(r.issues.warnings.length===0?"none":"warning");let i=r.alg,n=T.fromString(this.algString);i.isIdentical(n)||(this.algString=i.toString(),this.onInput())}else this.setAlgIssueClassForPuzzle("error")}),this.model.leafToHighlight.addFreshListener(async r=>{if(r===null)return;let[i,n]=await Promise.all([await t.experimentalModel.indexer.get(),await t.experimentalModel.timestampRequest.get()]);if(n==="auto"&&!a(this,ue))return;let s=i.indexToMoveStartTimestamp(r.leafInfo.idx),o=i.moveDuration(r.leafInfo.idx),l;switch(r.where){case"before":{l=s;break}case"start":case"inside":{l=s+o/4;break}case"end":case"after":{l=s+o;break}default:throw console.log("invalid where"),new Error("Invalid where!")}this.debugNeverRequestTimestamp||t.experimentalModel.timestampRequest.set(l)}),t.experimentalModel.currentLeavesSimplified.addFreshListener(async r=>{let n=(await t.experimentalModel.indexer.get()).getAnimLeaf(r.stateIndex);this.highlightLeaf(n)})))}attributeChangedCallback(t,r,i){switch(t){case Fe:{let n=document.getElementById(i);if(!n){console.warn(`${Fe}= elem does not exist`);return}if(!(n instanceof Je)){console.warn(`${Fe}=is not a twisty-player`);return}this.twistyPlayer=n;return}case Kt:{this.placeholder=i;return}case er:{if(a(this,k))throw console.log("cannot set prop"),new Error("cannot set prop after twisty player");u(this,j,i);return}}}static get observedAttributes(){return[Fe,Kt,er]}},y=new WeakMap,O=new WeakMap,W=new WeakMap,E=new WeakMap,q=new WeakMap,Ne=new WeakMap,k=new WeakMap,j=new WeakMap,de=new WeakSet,Be=function(){return a(this,k)===null?null:a(this,k).experimentalModel[a(this,j)]},ue=new WeakMap,Pe=new WeakSet,ft=function(t){return t.endsWith(`
`)?`${t} `:t},he=new WeakMap,gr);L.define("twisty-alg-editor",_n);var Zn=new A(`
.wrapper {
  background: rgb(255, 245, 235);
  border: 1px solid rgba(0, 0, 0, 0.25);

  /* Workaround from https://stackoverflow.com/questions/40010597/how-do-i-apply-opacity-to-a-css-color-variable */
  --text-color: 0, 0, 0;
  --heading-background: 255, 230, 210;

  color: rgb(var(--text-color));
}

.setup-alg, twisty-alg-viewer {
  padding: 0.5em 1em;
}

.heading {
  background: rgba(var(--heading-background), 1);
  color: rgba(var(--text-color), 1);
  font-weight: bold;
  padding: 0.25em 0.5em;
  display: grid;
  grid-template-columns: auto 1fr;

  /* For the move count hover elems. */
  position: sticky;
}

.heading.title {
  background: rgb(255, 245, 235);
  font-size: 150%;
  white-space: pre-wrap;
}

.heading .move-count {
  font-weight: initial;
  text-align: right;
  color: rgba(var(--text-color), 0.4);
}

.wrapper.dark-mode .heading .move-count {
  color: rgba(var(--text-color), 0.7);
}

.heading a {
  text-decoration: none;
  color: inherit;
}

twisty-player {
  width: 100%;
  min-height: 128px;
  height: 288px;
  resize: vertical;
  overflow-y: hidden;
}

twisty-player + .heading {
  padding-top: 0.5em;
}

twisty-alg-viewer {
  display: inline-block;
}

.wrapper {
  container-type: inline-size;
}

.scrollable-region {
  border-top: 1px solid rgba(0, 0, 0, 0.25);
}

.scrollable-region {
  max-height: 18em;
  overflow-y: auto;
}

@container (min-width: 512px) {
  .responsive-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  twisty-player {
    height: 320px
  }
  .scrollable-region {
    border-top: none;
    border-left: 1px solid rgba(0, 0, 0, 0.25);
    contain: strict;
    max-height: 100cqh;
  }
}

.wrapper:fullscreen,
.wrapper:fullscreen .responsive-wrapper {
  width: 100%;
  height: 100%;
}

.wrapper:fullscreen twisty-player,
.wrapper:fullscreen .scrollable-region {
  height: 50%;
}

@container (min-width: 512px) {
  .wrapper:fullscreen twisty-player,
  .wrapper:fullscreen .scrollable-region {
    height: 100%;
  }
}

/* TODO: dedup with Twizzle Editor */
.move-count > span:hover:before {
  background-color: rgba(var(--heading-background), 1);
  color: rgba(var(--text-color), 1);
  backdrop-filter: blur(4px);
  z-index: 100;
  position: absolute;
  padding: 0.5em;
  top: 1.5em;
  right: 0;
  content: attr(data-before);
  white-space: pre-wrap;
  text-align: left;
}

.move-count > span:hover {
  color: rgba(var(--text-color), 1);
  cursor: help;
}
`),$n=new A(`
.wrapper {
  background: white;
  --heading-background: 232, 239, 253
}

.wrapper.dark-mode {
  --text-color: 236, 236, 236;
  --heading-background: 29, 29, 29;
}

.scrollable-region {
  overflow-y: auto;
}

.wrapper.dark-mode {
  background: #262626;
  --text-color: 142, 142, 142;
  border-color: #FFFFFF44;
  color-scheme: dark;
}

.wrapper.dark-mode .heading:not(.title) {
  background: #1d1d1d;
}

.heading.title {
  background: none;
}
`);function Xn(e="",t=location.href){let r={alg:"alg","setup-alg":"experimental-setup-alg","setup-anchor":"experimental-setup-anchor",puzzle:"puzzle",stickering:"experimental-stickering","puzzle-description":"experimental-puzzle-description",title:"experimental-title","video-url":"experimental-video-url",competition:"experimental-competition-id"},i=new URL(t).searchParams,n={};for(let[s,o]of Object.entries(r)){let l=i.get(e+s);if(l!==null){let h=qe[o];n[h]=l}}return n}var ct="outer block moves (e.g. R, Rw, or 4r)",dt="inner block moves (e.g. M or 2-5r)",Jn={OBTM:`HTM = OBTM ("Outer Block Turn Metric"):
\u2022 ${dt} count as 2 turns
\u2022 ${ct} count as 1 turn
\u2022 rotations (e.g. x) count as 0 turns`,OBQTM:`QTM = OBQTM ("Outer Block Quantum Turn Metric"):
\u2022 ${dt} count as 2 turns per quantum (e.g. M2 counts as 4)
\u2022 ${ct} count as 1 turn per quantum (e.g. R2 counts as 2)
\u2022 rotations (e.g. x) count as 0 turns`,RBTM:`STM = RBTM ("Range Block Turn Metric"):
\u2022 ${dt} count as 1 turn
\u2022 ${ct} count as 1 turn
\u2022 rotations (e.g. x) count as 0 turns`,ETM:`ETM ("Execution Turn Metric"):
\u2022 all moves (including rotations) count as 1 turn`},Kn={OBTM:"h",OBQTM:"q",RBTM:"s",ETM:"e"},Re,$e,H,J,Oe,fr,es=(fr=class extends I{constructor(t){super({mode:"open"});d(this,Re,void 0);d(this,$e,void 0);d(this,H,void 0);d(this,J,void 0);d(this,Oe,void 0);this.options=t,this.twistyPlayer=null,this.a=null}fallback(){if(this.contentWrapper.textContent="",this.a){let t=this.contentWrapper.appendChild(document.createElement("span"));t.textContent="\u2757\uFE0F",t.title="Could not show a player for link",this.addElement(this.a)}a(this,Re)?.remove(),a(this,$e)?.remove()}async connectedCallback(){if(u(this,J,this.addElement(document.createElement("div"))),a(this,J).classList.add("responsive-wrapper"),this.options?.colorScheme&&this.contentWrapper.classList.add("dark-mode"),u(this,Re,this.addCSS(Zn)),this.options?.cdnForumTweaks&&this.addCSS($n),this.a=this.querySelector("a"),!this.a)return;let t=Xn("",this.a.href),r=this.a?.href,{hostname:i,pathname:n}=new URL(r);if(i!=="alpha.twizzle.net"){this.fallback();return}if(["/edit/","/explore/"].includes(n)){let s=n==="/explore/";if(t.puzzle&&!(t.puzzle in rt)){let h=(await import("../puzzle-geometry-IYCQENYE.js")).getPuzzleDescriptionString(t.puzzle);delete t.puzzle,t.experimentalPuzzleDescription=h}if(this.twistyPlayer=a(this,J).appendChild(new Je({background:this.options?.cdnForumTweaks?"checkered-transparent":"checkered",colorScheme:this.options?.colorScheme?"dark":"light",...t,viewerLink:s?"experimental-twizzle-explorer":"auto"})),this.twistyPlayer.fullscreenElement=this.contentWrapper,t.experimentalTitle&&(this.twistyPlayer.experimentalTitle=t.experimentalTitle),u(this,H,a(this,J).appendChild(document.createElement("div"))),a(this,H).classList.add("scrollable-region"),t.experimentalTitle&&this.addHeading(t.experimentalTitle).classList.add("title"),t.experimentalSetupAlg){this.addHeading("Setup",async()=>(await this.twistyPlayer?.experimentalModel.setupAlg.get())?.alg.toString()??null);let h=a(this,H).appendChild(document.createElement("div"));h.classList.add("setup-alg"),h.textContent=new T(t.experimentalSetupAlg).toString()}let o=this.addHeading("Moves",async()=>(await this.twistyPlayer?.experimentalModel.alg.get())?.alg.toString()??null);u(this,Oe,o.appendChild(ts(this.twistyPlayer.experimentalModel))),a(this,Oe).classList.add("move-count"),a(this,H).appendChild(new Or({twistyPlayer:this.twistyPlayer})).part.add("twisty-alg-viewer")}else this.fallback()}addHeading(t,r){let i=a(this,H).appendChild(document.createElement("div"));i.classList.add("heading");let n=i.appendChild(document.createElement("span"));if(n.textContent=t,r){n.textContent+=" ";let s=n.appendChild(document.createElement("a"));s.textContent="\u{1F4CB}",s.href="#",s.title="Copy to clipboard";async function o(l){s.textContent=l,await new Promise(h=>setTimeout(h,2e3)),s.textContent===l&&(s.textContent="\u{1F4CB}")}s.addEventListener("click",async l=>{l.preventDefault(),s.textContent="\u2026\u{1F4CB}";let h=await r();if(h)try{await navigator.clipboard.writeText(h),o("\u2705\u{1F4CB}")}catch(c){throw o("\u274C\u{1F4CB}"),c}else o("\u274C\u{1F4CB}")})}return i}},Re=new WeakMap,$e=new WeakMap,H=new WeakMap,J=new WeakMap,Oe=new WeakMap,fr);L.define("twizzle-link",es);function ts(e,t=document.createElement("span")){async function r(){let[i,n]=await Promise.all([e.puzzleAlg.get(),e.puzzleLoader.get()]);if(i.issues.errors.length!==0){t.textContent="";return}let s=!0;function o(l){s?s=!1:t.append(", ");let h=t.appendChild(document.createElement("span")),c=At(n,l,i.alg),f=h.appendChild(document.createElement("span"));f.textContent=c.toString(),f.classList.add("move-number"),h.append(`${Kn[l]}`),h.setAttribute("data-before",Jn[l]??"")}t.textContent="(",n.id==="3x3x3"&&(o("OBTM"),o("OBQTM"),o("RBTM")),o("ETM"),t.append(")")}return e.puzzleAlg.addFreshListener(r),e.puzzleID.addFreshListener(r),t}export{ee as EXPERIMENTAL_PROP_NO_VALUE,_r as ExperimentalKPuzzleSVGWrapper,mi as SimpleAlgIndexer,Gt as TreeAlgIndexer,_n as TwistyAlgEditor,Or as TwistyAlgViewer,Je as TwistyPlayer,es as TwizzleLink,ls as backViewLayouts,Ur as setTwistyDebug};
//# sourceMappingURL=twisty.js.map

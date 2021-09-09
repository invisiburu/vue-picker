(()=>{"use strict";var e={438:(e,l,a)=>{var t=a(963),o=a(252),u=a(577);(0,o.dD)("data-v-1411bc78");const n={class:"demo"},i=(0,o._)("p",{class:"demo__description"},[(0,o.Uk)(" Try out how the default select behaves comparing to the vue-picker."),(0,o._)("br"),(0,o.Uk)(" Try the keyboard shortcuts, ensure the input field reacts to change of the external model, etc. ")],-1),d={class:"demo__values"},s=(0,o._)("h4",{class:"demo__values-title"},"Values:",-1),v={class:"demo__table"},c=(0,o._)("tr",{class:"table__table-row"},[(0,o._)("th",{class:"demo__table-cell"},"val1"),(0,o._)("th",{class:"demo__table-cell"},"val2"),(0,o._)("th",{class:"demo__table-cell"},"val3"),(0,o._)("th",{class:"demo__table-cell"},"val4"),(0,o._)("th",{class:"demo__table-cell"},"val5"),(0,o._)("th",{class:"demo__table-cell"},"val6")],-1),r={class:"table__table-row"},p={class:"demo__table-cell"},_={class:"demo__table-cell"},m={class:"demo__table-cell"},f={class:"demo__table-cell"},V={class:"demo__table-cell"},b={class:"demo__table-cell"},w={class:"demo__units"},k={class:"demo__unit"},y=(0,o._)("p",{class:"demo__lbl"},"Default select (val1)",-1),U=(0,o.uE)('<option value="" data-v-1411bc78>Empty</option><option value="" disabled data-v-1411bc78>Empty disabled</option><option value="val-1" data-v-1411bc78>Value 1</option><option value="val-2" data-v-1411bc78>Value 2</option><option value="val-3" disabled data-v-1411bc78>Value 3 (disabled)</option><option value="val-4" disabled data-v-1411bc78>Value 4 (disabled)</option><option value="val-5" data-v-1411bc78>Value 5</option><option value="val-6" data-v-1411bc78>Value 6</option><option value="val-7" data-v-1411bc78>Value 7</option><option value="val-8" data-v-1411bc78>Value 8</option><option value="val-9" data-v-1411bc78>Value 9</option><option value="val-10" data-v-1411bc78>Value 10</option><option value="val-11" data-v-1411bc78>Value 11</option><option value="val-12" data-v-1411bc78>Value 12</option><option value="val-13" data-v-1411bc78>Value 13</option><option value="val-14" data-v-1411bc78>Value 14</option><option value="val-15" data-v-1411bc78>Value 15</option><option value="val-16" data-v-1411bc78>Value 16</option><option value="val-17" data-v-1411bc78>Value 17</option><option value="val-18" data-v-1411bc78>Value 18</option><option value="val-19" data-v-1411bc78>Value 19</option><option value="val-20" data-v-1411bc78>Value 20</option><option value="val-21" data-v-1411bc78>Value 21</option><option value="val-22" data-v-1411bc78>Value 22</option>',24),g=[U],W={class:"demo__unit"},h=(0,o._)("p",{class:"demo__lbl"},"Default select disabled (val1)",-1),D=(0,o.uE)('<option value="" data-v-1411bc78>Empty</option><option value="" disabled data-v-1411bc78>Empty disabled</option><option value="val-1" data-v-1411bc78>Value 1</option><option value="val-2" data-v-1411bc78>Value 2</option><option value="val-3" disabled data-v-1411bc78>Value 3 (disabled)</option><option value="val-4" disabled data-v-1411bc78>Value 4 (disabled)</option><option value="val-5" data-v-1411bc78>Value 5</option><option value="val-6" data-v-1411bc78>Value 6</option><option value="val-7" data-v-1411bc78>Value 7</option><option value="val-8" data-v-1411bc78>Value 8</option><option value="val-9" data-v-1411bc78>Value 9</option><option value="val-10" data-v-1411bc78>Value 10</option><option value="val-11" data-v-1411bc78>Value 11</option><option value="val-12" data-v-1411bc78>Value 12</option><option value="val-13" data-v-1411bc78>Value 13</option><option value="val-14" data-v-1411bc78>Value 14</option><option value="val-15" data-v-1411bc78>Value 15</option><option value="val-16" data-v-1411bc78>Value 16</option><option value="val-17" data-v-1411bc78>Value 17</option><option value="val-18" data-v-1411bc78>Value 18</option><option value="val-19" data-v-1411bc78>Value 19</option><option value="val-20" data-v-1411bc78>Value 20</option><option value="val-21" data-v-1411bc78>Value 21</option><option value="val-22" data-v-1411bc78>Value 22</option>',24),O=[D],H={class:"demo__unit"},x=(0,o._)("p",{class:"demo__lbl"},"Default select preset (val2)",-1),E=(0,o.uE)('<option value="" data-v-1411bc78>Empty</option><option value="" disabled data-v-1411bc78>Empty disabled</option><option value="val-1" data-v-1411bc78>Value 1</option><option value="val-2" data-v-1411bc78>Value 2</option><option value="val-3" disabled data-v-1411bc78>Value 3 (disabled)</option><option value="val-4" disabled data-v-1411bc78>Value 4 (disabled)</option><option value="val-5" data-v-1411bc78>Value 5</option><option value="val-6" data-v-1411bc78>Value 6</option><option value="val-7" data-v-1411bc78>Value 7</option><option value="val-8" data-v-1411bc78>Value 8</option><option value="val-9" data-v-1411bc78>Value 9</option><option value="val-10" data-v-1411bc78>Value 10</option>',12),P=[E],S={class:"demo__units"},C={class:"demo__unit"},I=(0,o._)("p",{class:"demo__lbl"},"VuePicker (val1)",-1),M=(0,o.Uk)("Empty"),z=(0,o.Uk)("Empty disabled"),T=(0,o.Uk)("Value 1"),R=(0,o.Uk)("Value 2"),B=(0,o.Uk)("Value 3"),$=(0,o.Uk)("Value 4 (disabled)"),K=(0,o.Uk)("Value 5 (disabled)"),L=(0,o.Uk)("Value 6"),Y=(0,o.Uk)("Custom text: Hello"),j=(0,o.Uk)("Value 8"),A={class:"demo__unit"},F=(0,o._)("p",{class:"demo__lbl"},"Disabled (val1)",-1),J=(0,o.Uk)("Empty"),N=(0,o.Uk)("Empty disabled"),q=(0,o.Uk)("Value 1"),X=(0,o.Uk)("Value 2"),G=(0,o.Uk)("Value 3"),Q=(0,o.Uk)("Value 4 (disabled)"),Z=(0,o.Uk)("Value 5 (disabled)"),ee=(0,o.Uk)("Value 6"),le=(0,o.Uk)("Custom text: Hello"),ae=(0,o.Uk)("Value 8"),te={class:"demo__unit"},oe=(0,o._)("p",{class:"demo__lbl"},"Long (val1)",-1),ue=(0,o.Uk)("Empty"),ne={class:"demo__unit"},ie=(0,o._)("p",{class:"demo__lbl"},"Preset value (val2)",-1),de=(0,o.Uk)("Empty"),se=(0,o.Uk)("Value 1"),ve=(0,o.Uk)("Value 2"),ce=(0,o.Uk)("Value 3"),re={class:"demo__unit"},pe=(0,o._)("p",{class:"demo__lbl"},"With placeholder (val3)",-1),_e=(0,o.Uk)("Empty"),me=(0,o.Uk)("Value 1"),fe=(0,o.Uk)("Value 2"),Ve=(0,o.Uk)("Value 3"),be={class:"demo__unit"},we=(0,o._)("p",{class:"demo__lbl"},"No model",-1),ke=(0,o.Uk)("Empty"),ye=(0,o.Uk)("Value 1"),Ue=(0,o.Uk)("Value 2"),ge=(0,o.Uk)("Value 3"),We={class:"demo__unit"},he=(0,o._)("p",{class:"demo__lbl"},"Custom dropdown (val4)",-1),De={class:"demo__dropdown-custom"},Oe={class:"demo__unit"},He=(0,o._)("p",{class:"demo__lbl"},"Custom options (val5)",-1),xe=(0,o.Uk)("Empty"),Ee=(0,o.Uk)("Value 1 "),Pe=(0,o._)("i",null,"Italics",-1),Se=(0,o.Uk)("Value 2 "),Ce=(0,o._)("p",{style:{display:"inline-block",margin:"0"}},[(0,o._)("strong",null,"Strong P")],-1),Ie=(0,o._)("del",null,"Value 3",-1),Me=(0,o.Uk)(" Custom text"),ze={class:"demo__unit"},Te=(0,o._)("p",{class:"demo__lbl"},"Custom opener (val6)",-1),Re={key:0},Be=(0,o._)("i",{class:"demo__dot"},null,-1),$e=(0,o.Uk)("Empty"),Ke=(0,o.Uk)("Value "),Le=(0,o._)("i",null,"Italics",-1),Ye=(0,o.Uk)("Value "),je=(0,o._)("strong",null,"Strong",-1),Ae=(0,o._)("del",null,"Value 3",-1),Fe=(0,o.Uk)(" Custom text"),Je={class:"demo__unit"},Ne=(0,o._)("p",{class:"demo__lbl"},"Unmountable (val1)",-1),qe=(0,o._)("span",null," Is mounted ",-1),Xe=(0,o.Uk)("Empty"),Ge=(0,o.Uk)("Empty disabled"),Qe=(0,o.Uk)("Value 1"),Ze=(0,o.Uk)("Value 2"),el=(0,o.Uk)("Value 3"),ll=(0,o.Uk)("Value 4 (disabled)"),al=(0,o.Uk)("Value 5 (disabled)"),tl=(0,o.Uk)("Value 6"),ol=(0,o.Uk)("Custom text: Hello"),ul=(0,o.Uk)("Value 8"),nl=(0,o._)("h3",null,"Dynamic options:",-1),il={class:"demo__values"},dl=(0,o._)("h4",{class:"demo__values-title"},"Dynamic values:",-1),sl={class:"demo__table"},vl=(0,o._)("tr",{class:"table__table-row"},[(0,o._)("th",{class:"demo__table-cell"},"d-val1"),(0,o._)("th",{class:"demo__table-cell"},"d-val2")],-1),cl={class:"table__table-row"},rl={class:"demo__table-cell"},pl={class:"demo__table-cell"},_l={class:"demo__units"},ml={class:"demo__unit"},fl=(0,o._)("p",{class:"demo__lbl"},"Default select (d-val1)",-1),Vl=(0,o._)("option",{value:""},"Empty",-1),bl=["value"],wl={class:"demo__unit"},kl=(0,o._)("p",{class:"demo__lbl"},"Custom select (d-val1)",-1),yl=(0,o.Uk)("Empty"),Ul={class:"demo__unit"},gl=(0,o._)("p",{class:"demo__lbl"},"All options re-generated, value reset",-1),Wl={class:"demo__units"},hl={class:"demo__unit"},Dl=(0,o._)("p",{class:"demo__lbl"},"Default select (d-val2)",-1),Ol=(0,o._)("option",{value:""},"Empty",-1),Hl=["value"],xl={class:"demo__unit"},El=(0,o._)("p",{class:"demo__lbl"},"Custom select (d-val2)",-1),Pl=(0,o.Uk)("Empty"),Sl={class:"demo__unit"},Cl=(0,o._)("p",{class:"demo__lbl"},"Options and value stay, texts re-generated",-1);function Il(e,l,a,U,D,E){const Il=(0,o.up)("VuePickerOption"),Ml=(0,o.up)("VuePicker");return(0,o.wg)(),(0,o.iD)("div",n,[i,(0,o._)("div",d,[s,(0,o._)("table",v,[c,(0,o._)("tr",r,[(0,o._)("td",p,(0,u.zw)(U.selVal1),1),(0,o._)("td",_,(0,u.zw)(U.selVal2),1),(0,o._)("td",m,(0,u.zw)(U.selVal3),1),(0,o._)("td",f,(0,u.zw)(U.selVal4),1),(0,o._)("td",V,(0,u.zw)(U.selVal5),1),(0,o._)("td",b,(0,u.zw)(U.selVal6),1)])])]),(0,o._)("div",w,[(0,o._)("div",k,[y,(0,o.wy)((0,o._)("select",{class:"demo__picker","onUpdate:modelValue":l[0]||(l[0]=e=>U.selVal1=e)},g,512),[[t.bM,U.selVal1]])]),(0,o._)("div",W,[h,(0,o.wy)((0,o._)("select",{class:"demo__picker","onUpdate:modelValue":l[1]||(l[1]=e=>U.selVal1=e),disabled:""},O,512),[[t.bM,U.selVal1]])]),(0,o._)("div",H,[x,(0,o.wy)((0,o._)("select",{class:"demo__picker","onUpdate:modelValue":l[2]||(l[2]=e=>U.selVal2=e)},P,512),[[t.bM,U.selVal2]])])]),(0,o._)("div",S,[(0,o._)("div",C,[I,(0,o.Wm)(Ml,{class:"demo__picker",modelValue:U.selVal1,"onUpdate:modelValue":l[3]||(l[3]=e=>U.selVal1=e),isAutofocus:!0},{default:(0,o.w5)((()=>[(0,o.Wm)(Il,{value:""},{default:(0,o.w5)((()=>[M])),_:1}),(0,o.Wm)(Il,{value:"",isDisabled:!0},{default:(0,o.w5)((()=>[z])),_:1}),(0,o.Wm)(Il,{value:"val-1"},{default:(0,o.w5)((()=>[T])),_:1}),(0,o.Wm)(Il,{value:"val-2"},{default:(0,o.w5)((()=>[R])),_:1}),(0,o.Wm)(Il,{value:"val-3"},{default:(0,o.w5)((()=>[B])),_:1}),(0,o.Wm)(Il,{value:"val-4",isDisabled:!0},{default:(0,o.w5)((()=>[$])),_:1}),(0,o.Wm)(Il,{value:"val-5",isDisabled:!0},{default:(0,o.w5)((()=>[K])),_:1}),(0,o.Wm)(Il,{value:"val-6"},{default:(0,o.w5)((()=>[L])),_:1}),(0,o.Wm)(Il,{value:"val-7",text:"Hello"},{default:(0,o.w5)((()=>[Y])),_:1}),(0,o.Wm)(Il,{value:"val-8"},{default:(0,o.w5)((()=>[j])),_:1})])),_:1},8,["modelValue"])]),(0,o._)("div",A,[F,(0,o.Wm)(Ml,{class:"demo__picker",modelValue:U.selVal1,"onUpdate:modelValue":l[4]||(l[4]=e=>U.selVal1=e),isDisabled:!0},{default:(0,o.w5)((()=>[(0,o.Wm)(Il,{value:""},{default:(0,o.w5)((()=>[J])),_:1}),(0,o.Wm)(Il,{value:"",isDisabled:!0},{default:(0,o.w5)((()=>[N])),_:1}),(0,o.Wm)(Il,{value:"val-1"},{default:(0,o.w5)((()=>[q])),_:1}),(0,o.Wm)(Il,{value:"val-2"},{default:(0,o.w5)((()=>[X])),_:1}),(0,o.Wm)(Il,{value:"val-3"},{default:(0,o.w5)((()=>[G])),_:1}),(0,o.Wm)(Il,{value:"val-4",isDisabled:!0},{default:(0,o.w5)((()=>[Q])),_:1}),(0,o.Wm)(Il,{value:"val-5",isDisabled:!0},{default:(0,o.w5)((()=>[Z])),_:1}),(0,o.Wm)(Il,{value:"val-6"},{default:(0,o.w5)((()=>[ee])),_:1}),(0,o.Wm)(Il,{value:"val-7",text:"Hello"},{default:(0,o.w5)((()=>[le])),_:1}),(0,o.Wm)(Il,{value:"val-8"},{default:(0,o.w5)((()=>[ae])),_:1})])),_:1},8,["modelValue"])]),(0,o._)("div",te,[oe,(0,o.Wm)(Ml,{class:"demo__picker",modelValue:U.selVal1,"onUpdate:modelValue":l[5]||(l[5]=e=>U.selVal1=e)},{default:(0,o.w5)((()=>[(0,o.Wm)(Il,{value:""},{default:(0,o.w5)((()=>[ue])),_:1}),((0,o.wg)(),(0,o.iD)(o.HY,null,(0,o.Ko)(100,(e=>(0,o.Wm)(Il,{key:e,value:"val-"+e},{default:(0,o.w5)((()=>[(0,o.Uk)("Value "+(0,u.zw)(e),1)])),_:2},1032,["value"]))),64))])),_:1},8,["modelValue"])]),(0,o._)("div",ne,[ie,(0,o.Wm)(Ml,{class:"demo__picker",modelValue:U.selVal2,"onUpdate:modelValue":l[6]||(l[6]=e=>U.selVal2=e)},{default:(0,o.w5)((()=>[(0,o.Wm)(Il,{value:""},{default:(0,o.w5)((()=>[de])),_:1}),(0,o.Wm)(Il,{value:"val-1"},{default:(0,o.w5)((()=>[se])),_:1}),(0,o.Wm)(Il,{value:"val-2"},{default:(0,o.w5)((()=>[ve])),_:1}),(0,o.Wm)(Il,{value:"val-3"},{default:(0,o.w5)((()=>[ce])),_:1})])),_:1},8,["modelValue"])]),(0,o._)("div",re,[pe,(0,o.Wm)(Ml,{class:"demo__picker",modelValue:U.selVal3,"onUpdate:modelValue":l[7]||(l[7]=e=>U.selVal3=e),placeholder:"Select..."},{default:(0,o.w5)((()=>[(0,o.Wm)(Il,{value:""},{default:(0,o.w5)((()=>[_e])),_:1}),(0,o.Wm)(Il,{value:"val-1"},{default:(0,o.w5)((()=>[me])),_:1}),(0,o.Wm)(Il,{value:"val-2"},{default:(0,o.w5)((()=>[fe])),_:1}),(0,o.Wm)(Il,{value:"val-3"},{default:(0,o.w5)((()=>[Ve])),_:1})])),_:1},8,["modelValue"])]),(0,o._)("div",be,[we,(0,o.Wm)(Ml,{class:"demo__picker"},{default:(0,o.w5)((()=>[(0,o.Wm)(Il,{value:""},{default:(0,o.w5)((()=>[ke])),_:1}),(0,o.Wm)(Il,{value:"val-1"},{default:(0,o.w5)((()=>[ye])),_:1}),(0,o.Wm)(Il,{value:"val-2"},{default:(0,o.w5)((()=>[Ue])),_:1}),(0,o.Wm)(Il,{value:"val-3"},{default:(0,o.w5)((()=>[ge])),_:1})])),_:1})]),(0,o._)("div",We,[he,(0,o.Wm)(Ml,{class:"demo__picker",modelValue:U.selVal4,"onUpdate:modelValue":l[8]||(l[8]=e=>U.selVal4=e)},{dropdownInner:(0,o.w5)((()=>[(0,o._)("div",De,[((0,o.wg)(),(0,o.iD)(o.HY,null,(0,o.Ko)(24,(e=>(0,o.Wm)(Il,{key:e,value:"val-"+e},{default:(0,o.w5)((()=>[(0,o.Uk)("Value "+(0,u.zw)(e),1)])),_:2},1032,["value"]))),64))])])),_:1},8,["modelValue"])]),(0,o._)("div",Oe,[He,(0,o.Wm)(Ml,{class:"demo__picker",modelValue:U.selVal5,"onUpdate:modelValue":l[9]||(l[9]=e=>U.selVal5=e)},{default:(0,o.w5)((()=>[(0,o.Wm)(Il,{value:""},{default:(0,o.w5)((()=>[xe])),_:1}),(0,o.Wm)(Il,{value:"val-1"},{default:(0,o.w5)((()=>[Ee,Pe])),_:1}),(0,o.Wm)(Il,{value:"val-2"},{default:(0,o.w5)((()=>[Se,Ce])),_:1}),(0,o.Wm)(Il,{value:"val-3",text:"Custom text"},{default:(0,o.w5)((()=>[Ie,Me])),_:1})])),_:1},8,["modelValue"])]),(0,o._)("div",ze,[Te,(0,o.Wm)(Ml,{class:"demo__picker",modelValue:U.selVal6,"onUpdate:modelValue":l[10]||(l[10]=e=>U.selVal6=e)},{opener:(0,o.w5)((({opener:e})=>[e.value?((0,o.wg)(),(0,o.iD)("span",Re,[Be,(0,o._)("i",null,"V:"+(0,u.zw)(e.value),1),(0,o._)("span",null," - "+(0,u.zw)(e.text),1)])):(0,o.kq)("",!0)])),default:(0,o.w5)((()=>[(0,o.Wm)(Il,{value:""},{default:(0,o.w5)((()=>[$e])),_:1}),(0,o.Wm)(Il,{value:"val-1"},{default:(0,o.w5)((()=>[Ke,Le])),_:1}),(0,o.Wm)(Il,{value:"val-2"},{default:(0,o.w5)((()=>[Ye,je])),_:1}),(0,o.Wm)(Il,{value:"val-3",text:"Custom text"},{default:(0,o.w5)((()=>[Ae,Fe])),_:1})])),_:1},8,["modelValue"])]),(0,o._)("div",Je,[Ne,(0,o._)("label",null,[(0,o.wy)((0,o._)("input",{type:"checkbox","onUpdate:modelValue":l[11]||(l[11]=e=>U.isMounted=e)},null,512),[[t.e8,U.isMounted]]),qe]),U.isMounted?((0,o.wg)(),(0,o.j4)(Ml,{key:0,class:"demo__picker",modelValue:U.selVal1,"onUpdate:modelValue":l[12]||(l[12]=e=>U.selVal1=e),isAutofocus:!0},{default:(0,o.w5)((()=>[(0,o.Wm)(Il,{value:""},{default:(0,o.w5)((()=>[Xe])),_:1}),(0,o.Wm)(Il,{value:"",isDisabled:!0},{default:(0,o.w5)((()=>[Ge])),_:1}),(0,o.Wm)(Il,{value:"val-1"},{default:(0,o.w5)((()=>[Qe])),_:1}),(0,o.Wm)(Il,{value:"val-2"},{default:(0,o.w5)((()=>[Ze])),_:1}),(0,o.Wm)(Il,{value:"val-3"},{default:(0,o.w5)((()=>[el])),_:1}),(0,o.Wm)(Il,{value:"val-4",isDisabled:!0},{default:(0,o.w5)((()=>[ll])),_:1}),(0,o.Wm)(Il,{value:"val-5",isDisabled:!0},{default:(0,o.w5)((()=>[al])),_:1}),(0,o.Wm)(Il,{value:"val-6"},{default:(0,o.w5)((()=>[tl])),_:1}),(0,o.Wm)(Il,{value:"val-7",text:"Hello"},{default:(0,o.w5)((()=>[ol])),_:1}),(0,o.Wm)(Il,{value:"val-8"},{default:(0,o.w5)((()=>[ul])),_:1})])),_:1},8,["modelValue"])):(0,o.kq)("",!0)])]),nl,(0,o._)("div",il,[dl,(0,o._)("table",sl,[vl,(0,o._)("tr",cl,[(0,o._)("td",rl,(0,u.zw)(U.dynVal1),1),(0,o._)("td",pl,(0,u.zw)(U.dynVal2),1)])])]),(0,o._)("div",_l,[(0,o._)("div",ml,[fl,(0,o.wy)((0,o._)("select",{class:"demo__picker","onUpdate:modelValue":l[13]||(l[13]=e=>U.dynVal1=e)},[Vl,((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(U.dynOpts1,(e=>((0,o.wg)(),(0,o.iD)("option",{key:e.value,value:e.value},(0,u.zw)(e.text),9,bl)))),128))],512),[[t.bM,U.dynVal1]])]),(0,o._)("div",wl,[kl,(0,o.Wm)(Ml,{class:"demo__picker",modelValue:U.dynVal1,"onUpdate:modelValue":l[14]||(l[14]=e=>U.dynVal1=e)},{default:(0,o.w5)((()=>[(0,o.Wm)(Il,{value:""},{default:(0,o.w5)((()=>[yl])),_:1}),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(U.dynOpts1,(e=>((0,o.wg)(),(0,o.j4)(Il,{key:e.value,value:e.value},{default:(0,o.w5)((()=>[(0,o.Uk)((0,u.zw)(e.text),1)])),_:2},1032,["value"])))),128))])),_:1},8,["modelValue"])]),(0,o._)("div",Ul,[gl,(0,o._)("button",{type:"button",onClick:l[15]||(l[15]=e=>U.genDynOpts1())},"Re-generate")])]),(0,o._)("div",Wl,[(0,o._)("div",hl,[Dl,(0,o.wy)((0,o._)("select",{class:"demo__picker","onUpdate:modelValue":l[16]||(l[16]=e=>U.dynVal2=e)},[Ol,((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(U.dynOpts2,(e=>((0,o.wg)(),(0,o.iD)("option",{key:e.value,value:e.value},(0,u.zw)(e.text),9,Hl)))),128))],512),[[t.bM,U.dynVal2]])]),(0,o._)("div",xl,[El,(0,o.Wm)(Ml,{class:"demo__picker",modelValue:U.dynVal2,"onUpdate:modelValue":l[17]||(l[17]=e=>U.dynVal2=e)},{default:(0,o.w5)((()=>[(0,o.Wm)(Il,{value:""},{default:(0,o.w5)((()=>[Pl])),_:1}),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(U.dynOpts2,(e=>((0,o.wg)(),(0,o.j4)(Il,{key:e.value,value:e.value,text:e.text},{default:(0,o.w5)((()=>[(0,o.Uk)((0,u.zw)(e.text),1)])),_:2},1032,["value","text"])))),128))])),_:1},8,["modelValue"])]),(0,o._)("div",Sl,[Cl,(0,o._)("button",{type:"button",onClick:l[18]||(l[18]=e=>U.genDynOpts2())},"Re-generate")])])])}(0,o.Cn)();var Ml=a(262);const zl={setup(){const e=(e=String(l(1,25)),a=l(1,25),t=((e,l)=>`val-${e}-${l}`),o=((e,l)=>`Value-${e} #${l}`))=>{const u=[];for(let l=0;l<a;l++)u.push({value:t(e,l),text:o(e,l)});return console.log("Generated options:",u),u},l=(e,l)=>Math.floor(Math.random()*(l-e))+e,a=(0,Ml.iH)(e()),t=(0,Ml.iH)(void 0),o=()=>{a.value=e(),t.value=void 0};let u=0;const n=(0,Ml.iH)(e("X",8,void 0)),i=(0,Ml.iH)(void 0),d=()=>{u++,n.value=e("X",8,void 0,((e,l)=>`New (${u}) Value #${l}`))},s=(0,Ml.iH)(!1);return{selVal1:(0,Ml.iH)(void 0),selVal2:(0,Ml.iH)("val-2"),selVal3:(0,Ml.iH)(void 0),selVal4:(0,Ml.iH)(void 0),selVal5:(0,Ml.iH)(void 0),selVal6:(0,Ml.iH)(void 0),dynOpts1:a,dynVal1:t,genDynOpts1:o,dynOpts2:n,dynVal2:i,genDynOpts2:d,isMounted:s}}};zl.render=Il,zl.__scopeId="data-v-1411bc78";const Tl=zl;function Rl(){var e=(0,Ml.iH)(!1),l=(0,Ml.iH)(),a=function(){},t=[],u=[],n=[],i=function(){e.value?s():d()},d=function(){e.value=!0,a=Bl(l.value,(function(){return s(!0)})),t.forEach((function(e){return e()}))},s=function(l){void 0===l&&(l=!1),e.value=!1,a(),u.forEach((function(e){return e(l)}))},v=function(e){t.push(e),n.push((function(){t=t.filter((function(l){return l!==e}))}))},c=function(e){u.push(e),n.push((function(){u=u.filter((function(l){return l!==e}))}))};return(0,o.JJ)("dropdownHide",(function(){return s()})),(0,o.Ah)((function(){a(),n.forEach((function(e){return e()}))})),{isShown:e,clickOutRef:l,toggle:i,show:d,hide:s,onShow:v,onHide:c}}function Bl(e,l){var a=function(a){e.contains(a.target)||l()};return document.addEventListener("click",a,!1),function(){document.removeEventListener("click",a,!1)}}function $l(){return{hide:(0,o.f3)("dropdownHide",(function(){}))}}function Kl(e){var l=(0,Ml.iH)(null),a={},t=[],u=!1,n=-1,i=function(){},d=function(e){void 0===e&&(e="");var t=a[e];if(t!==l.value){if(l.value&&l.value.setIsSelected(!1),!t)return l.value=null,n=-1,void i(null);t.setIsSelected(!0),l.value=t,n=p(t.value),i(t.value)}},s=function(e,a){void 0===e&&(e=1),void 0===a&&(a=n);var o=a+e,u=t[a+e];if(u){if(u.disabled)return s(e,o);var i=u.dataset.value;d(i),l.value.focus()}},v=function(){return n<0?r():s(-1)},c=function(){return s(1,-1)},r=function(){return s(-1,t.length)};(0,o.JJ)("registerOption",(function(e){return u=!0,a[e.value]=a[e.value]||e,function(){u=!0,delete a[e.value]}})),(0,o.JJ)("selectByValue",d),(0,o.bv)((function(){return _()})),(0,o.ic)((function(){return(0,o.Y3)(_)}));var p=function(e){for(var l=0;l<t.length;l++){var a=t[l];if(a.dataset.value===e)return l}return-1},_=function(){u&&(u=!1,t=e.value.querySelectorAll(".vue-picker-option"),l.value&&(n=p(l.value)))};return{current:l,onSelect:function(e){void 0===e&&(e=function(){}),i=e},selectByValue:d,selectNext:s,selectPrev:v,selectFirst:c,selectLast:r}}function Ll(){return{registerOption:(0,o.f3)("registerOption",(function(e){return function(){}})),selectByValue:(0,o.f3)("selectByValue",(function(e){}))}}function Yl(e,l){var a=function(a){jl(e,l,a)},t=function(e){e.addEventListener("keydown",a)},o=function(e){e.removeEventListener("keydown",a)};return{listenOn:t,unlistenOn:o}}function jl(e,l,a){switch(a.key){case"Esc":case"Escape":case"Tab":if(!e.isShown.value)break;a.preventDefault(),a.stopPropagation(),e.hide();break;case"Enter":a.preventDefault(),a.stopPropagation(),e.toggle();break;case"Up":case"ArrowUp":a.preventDefault(),a.stopPropagation(),a.altKey?e.toggle():l.selectPrev();break;case"Down":case"ArrowDown":a.preventDefault(),a.stopPropagation(),a.altKey?e.toggle():l.selectNext();break;case"Home":a.preventDefault(),a.stopPropagation(),l.selectFirst();break;case"End":a.preventDefault(),a.stopPropagation(),l.selectLast();break}}var Al={name:"VuePicker",emits:["open","close","update:modelValue"],props:{modelValue:{type:String,default:""},placeholder:{type:String,default:""},isDisabled:{type:Boolean,default:!1},isAutofocus:{type:Boolean,default:!1}},setup:function(e,l){var a=l.emit,t=(0,Ml.BK)(e),u=t.modelValue,n=t.placeholder,i=t.isAutofocus,d=(0,Ml.iH)(),s=(0,Ml.iH)(),v=Rl(),c=Kl(s),r=Yl(v,c);c.onSelect((function(e){v.isShown.value||p(void 0!==e?e:u.value)})),(0,o.YP)(u,(function(e,l){e!==l&&c.selectByValue(e)})),(0,o.bv)((function(){r.listenOn(d.value),v.onShow((function(){r.listenOn(document),c.current.value?(0,o.Y3)((function(){return c.current.value.focus()})):d.value.blur(),a("open")})),v.onHide((function(e){r.unlistenOn(document),(0,o.Y3)((function(){return d.value.focus()})),p(),a("close",e)})),i.value&&d.value.focus(),u.value&&c.selectByValue(u.value)})),(0,o.Jd)((function(){r.unlistenOn(d.value),r.unlistenOn(document)}));var p=function(e){void 0===e&&(e=_()),"string"===typeof e&&a("update:modelValue",e)},_=function(){return c.current.value&&c.current.value.value};return{openerRef:d,dropdownRef:s,dropdownIsShown:v.isShown,dropdownClickOutRef:v.clickOutRef,dropdownToggle:function(){return v.toggle()},curOpt:c.current,curOptVal:(0,Ml.Fl)((function(){return _()})),openerTxt:(0,Ml.Fl)((function(){return!u.value&&n.value?n.value:c.current.value&&c.current.value.optTxt})),openerHtml:(0,Ml.Fl)((function(){return!u.value&&n.value?n.value:c.current.value&&c.current.value.optHtml}))}}},Fl=["disabled"],Jl=["innerHTML"],Nl=(0,o._)("i",{class:"vue-picker__opener-ico"},null,-1),ql={ref:"dropdownRef",class:"vue-picker__dropdown"};function Xl(e,l,a,n,i,d){return(0,o.wg)(),(0,o.iD)("div",{ref:"dropdownClickOutRef",class:(0,u.C_)(["vue-picker",{"vue-picker_open":n.dropdownIsShown,"vue-picker_disabled":a.isDisabled,"vue-picker_has-val":a.placeholder?a.modelValue:n.curOptVal}])},[(0,o._)("button",{ref:"openerRef",class:"vue-picker__opener",type:"button",onClick:l[0]||(l[0]=function(e){return n.dropdownToggle()}),disabled:a.isDisabled},[(0,o.WI)(e.$slots,"opener",{opener:{value:n.curOpt&&n.curOpt.value,text:n.openerTxt,opt:n.curOpt}},(function(){return[(0,o._)("span",{class:"vue-picker__opener-txt",innerHTML:n.openerHtml},null,8,Jl)]})),(0,o.WI)(e.$slots,"openerIco",{},(function(){return[Nl]}))],8,Fl),(0,o.wy)((0,o._)("div",ql,[(0,o.WI)(e.$slots,"dropdownInner",{},(function(){return[(0,o.WI)(e.$slots,"default")]}))],512),[[t.F8,n.dropdownIsShown]])],2)}Al.render=Xl,Al.__file="src/components/VuePicker.vue";var Gl={name:"VuePickerOption",props:{value:{type:String,default:""},text:{type:String,default:""},isDisabled:{type:Boolean,default:!1}},setup:function(e){var l=(0,Ml.iH)(),a=(0,Ml.iH)(!1),t=Ll(),u=t.registerOption,n=t.selectByValue,i=$l(),d=i.hide,s={value:e.value,optHtml:(0,Ml.Fl)((function(){var a=l.value&&l.value.innerHTML;return e.text||a||e.value})),optTxt:(0,Ml.Fl)((function(){var a=l.value&&l.value.innerText;return e.text||a||e.value})),setIsSelected:function(e){a.value=e},focus:function(){l.value&&l.value.focus()}},v=u(s);return(0,o.Jd)(v),{btnRef:l,isSelected:a,selectMyValue:function(){n(e.value),d()}}}},Ql=["disabled","data-value"];function Zl(e,l,a,n,i,d){return(0,o.wg)(),(0,o.iD)("button",{ref:"btnRef",class:(0,u.C_)(["vue-picker-option",{"vue-picker-option_cur":n.isSelected}]),type:"button",onClick:l[0]||(l[0]=function(e){return n.selectMyValue(e)}),onKeydown:l[1]||(l[1]=(0,t.D2)((0,t.iM)((function(){}),["prevent","stop"]),["space"])),disabled:a.isDisabled,"data-value":a.value},[(0,o.WI)(e.$slots,"default")],42,Ql)}function ea(e){ea.installed||(ea.installed=!0,e.component("VuePicker",Al),e.component("VuePickerOption",Gl))}Gl.render=Zl,Gl.__file="src/components/VuePickerOption.vue","undefined"!==typeof window?window.VuePicker=ea:"undefined"!==typeof a.g&&(a.g.VuePicker=ea);const la=(0,t.ri)(Tl);la.component("VuePicker",Al),la.component("VuePickerOption",Gl),la.mount("#app")}},l={};function a(t){var o=l[t];if(void 0!==o)return o.exports;var u=l[t]={exports:{}};return e[t](u,u.exports,a),u.exports}a.m=e,(()=>{var e=[];a.O=(l,t,o,u)=>{if(!t){var n=1/0;for(v=0;v<e.length;v++){for(var[t,o,u]=e[v],i=!0,d=0;d<t.length;d++)(!1&u||n>=u)&&Object.keys(a.O).every((e=>a.O[e](t[d])))?t.splice(d--,1):(i=!1,u<n&&(n=u));if(i){e.splice(v--,1);var s=o();void 0!==s&&(l=s)}}return l}u=u||0;for(var v=e.length;v>0&&e[v-1][2]>u;v--)e[v]=e[v-1];e[v]=[t,o,u]}})(),(()=>{a.d=(e,l)=>{for(var t in l)a.o(l,t)&&!a.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:l[t]})}})(),(()=>{a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{a.o=(e,l)=>Object.prototype.hasOwnProperty.call(e,l)})(),(()=>{var e={826:0};a.O.j=l=>0===e[l];var l=(l,t)=>{var o,u,[n,i,d]=t,s=0;if(n.some((l=>0!==e[l]))){for(o in i)a.o(i,o)&&(a.m[o]=i[o]);if(d)var v=d(a)}for(l&&l(t);s<n.length;s++)u=n[s],a.o(e,u)&&e[u]&&e[u][0](),e[n[s]]=0;return a.O(v)},t=self["webpackChunk_invisiburu_vue_picker"]=self["webpackChunk_invisiburu_vue_picker"]||[];t.forEach(l.bind(null,0)),t.push=l.bind(null,t.push.bind(t))})();var t=a.O(void 0,[998],(()=>a(438)));t=a.O(t)})();
//# sourceMappingURL=index.391f42a0.js.map
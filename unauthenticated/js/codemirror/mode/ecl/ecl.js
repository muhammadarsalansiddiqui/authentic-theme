(function(b){if(typeof exports=="object"&&typeof module=="object"){b(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],b)}else{b(CodeMirror)}}})(function(b){b.defineMode("ecl",function(w){function G(f){var d={},c=f.split(" ");for(var e=0;e<c.length;++e){d[c[e]]=true}return d}function M(c,d){if(!d.startOfLine){return false}c.skipToEnd();return"meta"}var E=w.indentUnit;var x=G("abs acos allnodes ascii asin asstring atan atan2 ave case choose choosen choosesets clustersize combine correlation cos cosh count covariance cron dataset dedup define denormalize distribute distributed distribution ebcdic enth error evaluate event eventextra eventname exists exp failcode failmessage fetch fromunicode getisvalid global graph group hash hash32 hash64 hashcrc hashmd5 having if index intformat isvalid iterate join keyunicode length library limit ln local log loop map matched matchlength matchposition matchtext matchunicode max merge mergejoin min nolocal nonempty normalize parse pipe power preload process project pull random range rank ranked realformat recordof regexfind regexreplace regroup rejected rollup round roundup row rowdiff sample set sin sinh sizeof soapcall sort sorted sqrt stepped stored sum table tan tanh thisnode topn tounicode transfer trim truncate typeof ungroup unicodeorder variance which workunit xmldecode xmlencode xmltext xmlunicode");var A=G("apply assert build buildindex evaluate fail keydiff keypatch loadxml nothor notify output parallel sequential soapcall wait");var C=G("__compressed__ all and any as atmost before beginc++ best between case const counter csv descend encrypt end endc++ endmacro except exclusive expire export extend false few first flat from full function group header heading hole ifblock import in interface joined keep keyed last left limit load local locale lookup macro many maxcount maxlength min skew module named nocase noroot noscan nosort not of only opt or outer overwrite packed partition penalty physicallength pipe quote record relationship repeat return right scan self separator service shared skew skip sql store terminator thor threshold token transform trim true type unicodeorder unsorted validate virtual whole wild within xml xpath");var F=G("ascii big_endian boolean data decimal ebcdic integer pattern qstring real record rule set of string token udecimal unicode unsigned varstring varunicode");var v=G("checkpoint deprecated failcode failmessage failure global independent onwarning persist priority recovery stored success wait when");var D=G("catch class do else finally for if switch try while");var L=G("true false null");var N={"#":M};var I=/[+\-*&%=<>!?|\/]/;var z;function a(i,g){var d=i.next();if(N[d]){var f=N[d](i,g);if(f!==false){return f}}if(d=='"'||d=="'"){g.tokenize=J(d);return g.tokenize(i,g)}if(/[\[\]{}\(\),;\:\.]/.test(d)){z=d;return null}if(/\d/.test(d)){i.eatWhile(/[\w\.]/);return"number"}if(d=="/"){if(i.eat("*")){g.tokenize=H;return H(i,g)}if(i.eat("/")){i.skipToEnd();return"comment"}}if(I.test(d)){i.eatWhile(I);return"operator"}i.eatWhile(/[\w\$_]/);var c=i.current().toLowerCase();if(x.propertyIsEnumerable(c)){if(D.propertyIsEnumerable(c)){z="newstatement"}return"keyword"}else{if(A.propertyIsEnumerable(c)){if(D.propertyIsEnumerable(c)){z="newstatement"}return"variable"}else{if(C.propertyIsEnumerable(c)){if(D.propertyIsEnumerable(c)){z="newstatement"}return"variable-2"}else{if(F.propertyIsEnumerable(c)){if(D.propertyIsEnumerable(c)){z="newstatement"}return"variable-3"}else{if(v.propertyIsEnumerable(c)){if(D.propertyIsEnumerable(c)){z="newstatement"}return"builtin"}else{var e=c.length-1;while(e>=0&&(!isNaN(c[e])||c[e]=="_")){--e}if(e>0){var h=c.substr(0,e+1);if(F.propertyIsEnumerable(h)){if(D.propertyIsEnumerable(h)){z="newstatement"}return"variable-3"}}}}}}}if(L.propertyIsEnumerable(c)){return"atom"}return null}function J(c){return function(e,h){var g=false,d,f=false;while((d=e.next())!=null){if(d==c&&!g){f=true;break}g=!g&&d=="\\"}if(f||!g){h.tokenize=a}return"string"}}function H(f,c){var e=false,d;while(d=f.next()){if(d=="/"&&e){c.tokenize=a;break}e=(d=="*")}return"comment"}function B(f,d,e,g,c){this.indented=f;this.column=d;this.type=e;this.align=g;this.prev=c}function K(c,e,d){return c.context=new B(c.indented,e,d,null,c.context)}function y(c){var d=c.context.type;if(d==")"||d=="]"||d=="}"){c.indented=c.context.indented}return c.context=c.context.prev}return{startState:function(c){return{tokenize:null,context:new B((c||0)-E,0,"top",false),indented:0,startOfLine:true}},token:function(f,c){var e=c.context;if(f.sol()){if(e.align==null){e.align=false}c.indented=f.indentation();c.startOfLine=true}if(f.eatSpace()){return null}z=null;var d=(c.tokenize||a)(f,c);if(d=="comment"||d=="meta"){return d}if(e.align==null){e.align=true}if((z==";"||z==":")&&e.type=="statement"){y(c)}else{if(z=="{"){K(c,f.column(),"}")}else{if(z=="["){K(c,f.column(),"]")}else{if(z=="("){K(c,f.column(),")")}else{if(z=="}"){while(e.type=="statement"){e=y(c)}if(e.type=="}"){e=y(c)}while(e.type=="statement"){e=y(c)}}else{if(z==e.type){y(c)}else{if(e.type=="}"||e.type=="top"||(e.type=="statement"&&z=="newstatement")){K(c,f.column(),"statement")}}}}}}}c.startOfLine=false;return d},indent:function(f,d){if(f.tokenize!=a&&f.tokenize!=null){return 0}var e=f.context,g=d&&d.charAt(0);if(e.type=="statement"&&g=="}"){e=e.prev}var c=g==e.type;if(e.type=="statement"){return e.indented+(g=="{"?0:E)}else{if(e.align){return e.column+(c?0:1)}else{return e.indented+(c?0:E)}}},electricChars:"{}"}});b.defineMIME("text/x-ecl","ecl")});
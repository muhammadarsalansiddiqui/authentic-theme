(function(b){if(typeof exports=="object"&&typeof module=="object"){b(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],b)}else{b(CodeMirror)}}})(function(q){q.defineMode("verilog",function(b,af){var ae=b.indentUnit,k=af.statementIndentUnit||ae,ad=af.dontAlignCalls,W=af.noIndentKeywords||[],V=af.multiLineStrings,ap=af.hooks||{};function ah(z){var x={},w=z.split(" ");for(var y=0;y<w.length;++y){x[w[y]]=true}return x}var Z=ah("accept_on alias always always_comb always_ff always_latch and assert assign assume automatic before begin bind bins binsof bit break buf bufif0 bufif1 byte case casex casez cell chandle checker class clocking cmos config const constraint context continue cover covergroup coverpoint cross deassign default defparam design disable dist do edge else end endcase endchecker endclass endclocking endconfig endfunction endgenerate endgroup endinterface endmodule endpackage endprimitive endprogram endproperty endspecify endsequence endtable endtask enum event eventually expect export extends extern final first_match for force foreach forever fork forkjoin function generate genvar global highz0 highz1 if iff ifnone ignore_bins illegal_bins implements implies import incdir include initial inout input inside instance int integer interconnect interface intersect join join_any join_none large let liblist library local localparam logic longint macromodule matches medium modport module nand negedge nettype new nexttime nmos nor noshowcancelled not notif0 notif1 null or output package packed parameter pmos posedge primitive priority program property protected pull0 pull1 pulldown pullup pulsestyle_ondetect pulsestyle_onevent pure rand randc randcase randsequence rcmos real realtime ref reg reject_on release repeat restrict return rnmos rpmos rtran rtranif0 rtranif1 s_always s_eventually s_nexttime s_until s_until_with scalared sequence shortint shortreal showcancelled signed small soft solve specify specparam static string strong strong0 strong1 struct super supply0 supply1 sync_accept_on sync_reject_on table tagged task this throughout time timeprecision timeunit tran tranif0 tranif1 tri tri0 tri1 triand trior trireg type typedef union unique unique0 unsigned until until_with untyped use uwire var vectored virtual void wait wait_order wand weak weak0 weak1 while wildcard wire with within wor xnor xor");var X=/[\+\-\*\/!~&|^%=?:]/;var j=/[\[\]{}()]/;var al=/\d[0-9_]*/;var ab=/\d*\s*'s?d\s*\d[0-9_]*/i;var f=/\d*\s*'s?b\s*[xz01][xz01_]*/i;var g=/\d*\s*'s?o\s*[xz0-7][xz0-7_]*/i;var c=/\d*\s*'s?h\s*[0-9a-fxz?][0-9a-fxz?_]*/i;var aq=/(\d[\d_]*(\.\d[\d_]*)?E-?[\d_]+)|(\d[\d_]*\.\d[\d_]*)/i;var ar=/^((\w+)|[)}\]])/;var aa=/[)}\]]/;var h;var an;var aj=ah("case checker class clocking config function generate interface module package primitive program property specify sequence table task");var ao={};for(var d in aj){ao[d]="end"+d}ao.begin="end";ao.casex="endcase";ao.casez="endcase";ao["do"]="while";ao.fork="join;join_any;join_none";ao.covergroup="endgroup";for(var i in W){var d=W[i];if(ao[d]){ao[d]=undefined}}var U=ah("always always_comb always_ff always_latch assert assign assume else export for foreach forever if import initial repeat while");function a(z,w){var x=z.peek(),y;if(ap[x]&&(y=ap[x](z,w))!=false){return y}if(ap.tokenBase&&(y=ap.tokenBase(z,w))!=false){return y}if(/[,;:\.]/.test(x)){h=z.next();return null}if(j.test(x)){h=z.next();return"bracket"}if(x=="`"){z.next();if(z.eatWhile(/[\w\$_]/)){return"def"}else{return null}}if(x=="$"){z.next();if(z.eatWhile(/[\w\$_]/)){return"meta"}else{return null}}if(x=="#"){z.next();z.eatWhile(/[\d_.]/);return"def"}if(x=='"'){z.next();w.tokenize=ac(x);return w.tokenize(z,w)}if(x=="/"){z.next();if(z.eat("*")){w.tokenize=ak;return ak(z,w)}if(z.eat("/")){z.skipToEnd();return"comment"}z.backUp(1)}if(z.match(aq)||z.match(ab)||z.match(f)||z.match(g)||z.match(c)||z.match(al)||z.match(aq)){return"number"}if(z.eatWhile(X)){return"meta"}if(z.eatWhile(/[\w\$_]/)){var A=z.current();if(Z[A]){if(ao[A]){h="newblock"}if(U[A]){h="newstatement"}an=A;return"keyword"}return"variable"}z.next();return null}function ac(w){return function(z,B){var A=false,x,y=false;while((x=z.next())!=null){if(x==w&&!A){y=true;break}A=!A&&x=="\\"}if(y||!(A||V)){B.tokenize=a}return"string"}}function ak(z,w){var y=false,x;while(x=z.next()){if(x=="/"&&y){w.tokenize=a;break}y=(x=="*")}return"comment"}function Y(z,x,y,A,w){this.indented=z;this.column=x;this.type=y;this.align=A;this.prev=w}function ag(A,x,w){var y=A.indented;var z=new Y(y,x,w,null,A.context);return A.context=z}function e(w){var x=w.context.type;if(x==")"||x=="]"||x=="}"){w.indented=w.context.indented}return w.context=w.context.prev}function ai(w,y){if(w==y){return true}else{var z=y.split(";");for(var x in z){if(w==z[x]){return true}}return false}}function am(){var A=[];for(var x in ao){if(ao[x]){var z=ao[x].split(";");for(var y in z){A.push(z[y])}}}var w=new RegExp("[{}()\\[\\]]|("+A.join("|")+")$");return w}return{electricInput:am(),startState:function(w){var x={tokenize:null,context:new Y((w||0)-ae,0,"top",false),indented:0,startOfLine:true};if(ap.startState){ap.startState(x)}return x},token:function(z,w){var y=w.context;if(z.sol()){if(y.align==null){y.align=false}w.indented=z.indentation();w.startOfLine=true}if(ap.token){var x=ap.token(z,w);if(x!==undefined){return x}}if(z.eatSpace()){return null}h=null;an=null;var x=(w.tokenize||a)(z,w);if(x=="comment"||x=="meta"||x=="variable"){return x}if(y.align==null){y.align=true}if(h==y.type){e(w)}else{if((h==";"&&y.type=="statement")||(y.type&&ai(an,y.type))){y=e(w);while(y&&y.type=="statement"){y=e(w)}}else{if(h=="{"){ag(w,z.column(),"}")}else{if(h=="["){ag(w,z.column(),"]")}else{if(h=="("){ag(w,z.column(),")")}else{if(y&&y.type=="endcase"&&h==":"){ag(w,z.column(),"statement")}else{if(h=="newstatement"){ag(w,z.column(),"statement")}else{if(h=="newblock"){if(an=="function"&&y&&(y.type=="statement"||y.type=="endgroup")){}else{if(an=="task"&&y&&y.type=="statement"){}else{var A=ao[an];ag(w,z.column(),A)}}}}}}}}}}w.startOfLine=false;return x},indent:function(A,w){if(A.tokenize!=a&&A.tokenize!=null){return q.Pass}if(ap.indent){var z=ap.indent(A);if(z>=0){return z}}var x=A.context,B=w&&w.charAt(0);if(x.type=="statement"&&B=="}"){x=x.prev}var C=false;var y=w.match(ar);if(y){C=ai(y[0],x.type)}if(x.type=="statement"){return x.indented+(B=="{"?0:k)}else{if(aa.test(x.type)&&x.align&&!ad){return x.column+(C?0:1)}else{if(x.type==")"&&!C){return x.indented+k}else{return x.indented+(C?0:ae)}}}},blockCommentStart:"/*",blockCommentEnd:"*/",lineComment:"//"}});q.defineMIME("text/x-verilog",{name:"verilog"});q.defineMIME("text/x-systemverilog",{name:"verilog"});var l={"|":"link",">":"property","$":"variable","$$":"variable","?$":"qualifier","?*":"qualifier","-":"hr","/":"property","/-":"property","@":"variable-3","@-":"variable-3","@++":"variable-3","@+=":"variable-3","@+=-":"variable-3","@--":"variable-3","@-=":"variable-3","%+":"tag","%-":"tag","%":"tag",">>":"tag","<<":"tag","<>":"tag","#":"tag","^":"attribute","^^":"attribute","^!":"attribute","*":"variable-2","**":"variable-2","\\":"keyword",'"':"comment"};var u={"/":"beh-hier",">":"beh-hier","-":"phys-hier","|":"pipe","?":"when","@":"stage","\\":"keyword"};var p=3;var r=false;var m=/^([~!@#\$%\^&\*-\+=\?\/\\\|'"<>]+)([\d\w_]*)/;var v=/^[! ]  /;var s=/^[! ] */;var t=/^\/[\/\*]/;function o(d,b,a){var c=b/p;return"tlv-"+d.tlvIndentationStyle[c]+"-"+a}function n(a){var b;return(b=a.match(m,false))&&b[2].length>0}q.defineMIME("text/x-tlv",{name:"verilog",hooks:{electricInput:false,token:function(i,d){var c=undefined;var a;if(i.sol()&&!d.tlvInBlockComment){if(i.peek()=="\\"){c="def";i.skipToEnd();if(i.string.match(/\\SV/)){d.tlvCodeActive=false}else{if(i.string.match(/\\TLV/)){d.tlvCodeActive=true}}}if(d.tlvCodeActive&&i.pos==0&&(d.indented==0)&&(a=i.match(s,false))){d.indented=a[0].length}var j=d.indented;var b=j/p;if(b<=d.tlvIndentationStyle.length){var h=i.string.length==j;var e=b*p;if(e<i.string.length){var y=i.string.slice(e);var f=y[0];if(u[f]&&((a=y.match(m))&&l[a[1]])){j+=p;if(!(f=="\\"&&e>0)){d.tlvIndentationStyle[b]=u[f];if(r){d.statementComment=false}b++}}}if(!h){while(d.tlvIndentationStyle.length>b){d.tlvIndentationStyle.pop()}}}d.tlvNextIndent=j}if(d.tlvCodeActive){var g=false;if(r){g=(i.peek()!=" ")&&(c===undefined)&&!d.tlvInBlockComment&&(i.column()==d.tlvIndentationStyle.length*p);if(g){if(d.statementComment){g=false}d.statementComment=i.match(t,false)}}var a;if(c!==undefined){c+=" "+o(d,0,"scope-ident")}else{if(((i.pos/p)<d.tlvIndentationStyle.length)&&(a=i.match(i.sol()?v:/^   /))){c="tlv-indent-"+(((i.pos%2)==0)?"even":"odd")+" "+o(d,i.pos-p,"indent");if(a[0].charAt(0)=="!"){c+=" tlv-alert-line-prefix"}if(n(i)){c+=" "+o(d,i.pos,"before-scope-ident")}}else{if(d.tlvInBlockComment){if(i.match(/^.*?\*\//)){d.tlvInBlockComment=false;if(r&&!i.eol()){d.statementComment=false}}else{i.skipToEnd()}c="comment"}else{if((a=i.match(t))&&!d.tlvInBlockComment){if(a[0]=="//"){i.skipToEnd()}else{d.tlvInBlockComment=true}c="comment"}else{if(a=i.match(m)){var z=a[1];var k=a[2];if(l.hasOwnProperty(z)&&(k.length>0||i.eol())){c=l[z];if(i.column()==d.indented){c+=" "+o(d,i.column(),"scope-ident")}}else{i.backUp(i.current().length-1);c="tlv-default"}}else{if(i.match(/^\t+/)){c="tlv-tab"}else{if(i.match(/^[\[\]{}\(\);\:]+/)){c="meta"}else{if(a=i.match(/^[mM]4([\+_])?[\w\d_]*/)){c=(a[1]=="+")?"tlv-m4-plus":"tlv-m4"}else{if(i.match(/^ +/)){if(i.eol()){c="error"}else{c="tlv-default"}}else{if(i.match(/^[\w\d_]+/)){c="number"}else{i.next();c="tlv-default"}}}}}}}}}}if(g){c+=" tlv-statement"}}else{if(i.match(/^[mM]4([\w\d_]*)/)){c="tlv-m4"}}return c},indent:function(a){return(a.tlvCodeActive==true)?a.tlvNextIndent:-1},startState:function(a){a.tlvIndentationStyle=[];a.tlvCodeActive=true;a.tlvNextIndent=-1;a.tlvInBlockComment=false;if(r){a.statementComment=false}}}})});
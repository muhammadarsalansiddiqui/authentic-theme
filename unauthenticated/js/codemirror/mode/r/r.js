(function(b){if(typeof exports=="object"&&typeof module=="object"){b(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],b)}else{b(CodeMirror)}}})(function(b){b.registerHelper("wordChars","r",/[\w.]/);b.defineMode("r",function(z){function F(c){var d=c.split(" "),e={};for(var f=0;f<d.length;++f){e[d[f]]=true}return e}var v=F("NULL NA Inf NaN NA_integer_ NA_real_ NA_complex_ NA_character_");var E=F("list quote bquote eval return call parse deparse");var w=F("if else repeat while function for in next break");var x=F("if else repeat while function for");var C=/[+\-*\/^<>=!&|~$:]/;var s;function y(c,e){s=null;var f=c.next();if(f=="#"){c.skipToEnd();return"comment"}else{if(f=="0"&&c.eat("x")){c.eatWhile(/[\da-f]/i);return"number"}else{if(f=="."&&c.eat(/\d/)){c.match(/\d*(?:e[+\-]?\d+)?/);return"number"}else{if(/\d/.test(f)){c.match(/\d*(?:\.\d+)?(?:e[+\-]\d+)?L?/);return"number"}else{if(f=="'"||f=='"'){e.tokenize=r(f);return"string"}else{if(f=="`"){c.match(/[^`]+`/);return"variable-3"}else{if(f=="."&&c.match(/.[.\d]+/)){return"keyword"}else{if(/[\w\.]/.test(f)&&f!="_"){c.eatWhile(/[\w\.]/);var d=c.current();if(v.propertyIsEnumerable(d)){return"atom"}if(w.propertyIsEnumerable(d)){if(x.propertyIsEnumerable(d)&&!c.match(/\s*if(\s+|$)/,false)){s="block"}return"keyword"}if(E.propertyIsEnumerable(d)){return"builtin"}return"variable"}else{if(f=="%"){if(c.skipTo("%")){c.next()}return"operator variable-2"}else{if((f=="<"&&c.eat("-"))||(f=="<"&&c.match("<-"))||(f=="-"&&c.match(/>>?/))){return"operator arrow"}else{if(f=="="&&e.ctx.argList){return"arg-is"}else{if(C.test(f)){if(f=="$"){return"operator dollar"}c.eatWhile(C);return"operator"}else{if(/[\(\){}\[\];]/.test(f)){s=f;if(f==";"){return"semi"}return null}else{return null}}}}}}}}}}}}}}function r(c){return function(d,e){if(d.eat("\\")){var f=d.next();if(f=="x"){d.match(/^[a-f0-9]{2}/i)}else{if((f=="u"||f=="U")&&d.eat("{")&&d.skipTo("}")){d.next()}else{if(f=="u"){d.match(/^[a-f0-9]{4}/i)}else{if(f=="U"){d.match(/^[a-f0-9]{8}/i)}else{if(/[0-7]/.test(f)){d.match(/^[0-7]{1,2}/)}}}}}return"string-2"}else{var g;while((g=d.next())!=null){if(g==c){e.tokenize=y;break}if(g=="\\"){d.backUp(1);break}}return"string"}}}var D=1,u=2,A=4;function t(d,e,c){d.ctx={type:e,indent:d.indent,flags:0,column:c.column(),prev:d.ctx}}function B(c,d){var e=c.ctx;c.ctx={type:e.type,indent:e.indent,flags:e.flags|d,column:e.column,prev:e.prev}}function a(c){c.indent=c.ctx.indent;c.ctx=c.ctx.prev}return{startState:function(){return{tokenize:y,ctx:{type:"top",indent:-z.indentUnit,flags:u},indent:0,afterIdent:false}},token:function(c,d){if(c.sol()){if((d.ctx.flags&3)==0){d.ctx.flags|=u}if(d.ctx.flags&A){a(d)}d.indent=c.indentation()}if(c.eatSpace()){return null}var e=d.tokenize(c,d);if(e!="comment"&&(d.ctx.flags&u)==0){B(d,D)}if((s==";"||s=="{"||s=="}")&&d.ctx.type=="block"){a(d)}if(s=="{"){t(d,"}",c)}else{if(s=="("){t(d,")",c);if(d.afterIdent){d.ctx.argList=true}}else{if(s=="["){t(d,"]",c)}else{if(s=="block"){t(d,"block",c)}else{if(s==d.ctx.type){a(d)}else{if(d.ctx.type=="block"&&e!="comment"){B(d,A)}}}}}}d.afterIdent=e=="variable"||e=="keyword";return e},indent:function(c,f){if(c.tokenize!=y){return 0}var d=f&&f.charAt(0),g=c.ctx,e=d==g.type;if(g.flags&A){g=g.prev}if(g.type=="block"){return g.indent+(d=="{"?0:z.indentUnit)}else{if(g.flags&D){return g.column+(e?0:1)}else{return g.indent+(e?0:z.indentUnit)}}},lineComment:"#"}});b.defineMIME("text/x-rsrc","r")});
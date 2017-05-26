(function(b){if(typeof exports=="object"&&typeof module=="object"){b(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],b)}else{b(CodeMirror)}}})(function(b){b.defineMode("vb",function(aa,W){var ak="error";function V(c){return new RegExp("^(("+c.join(")|(")+"))\\b","i")}var X=new RegExp("^[\\+\\-\\*/%&\\\\|\\^~<>!]");var N=new RegExp("^[\\(\\)\\[\\]\\{\\}@,:`=;\\.]");var al=new RegExp("^((==)|(<>)|(<=)|(>=)|(<>)|(<<)|(>>)|(//)|(\\*\\*))");var ad=new RegExp("^((\\+=)|(\\-=)|(\\*=)|(%=)|(/=)|(&=)|(\\|=)|(\\^=))");var R=new RegExp("^((//=)|(>>=)|(<<=)|(\\*\\*=))");var ae=new RegExp("^[_A-Za-z][_A-Za-z0-9]*");var J=["class","module","sub","enum","select","while","if","function","get","set","property","try"];var Q=["else","elseif","case","catch"];var L=["next","loop"];var P=["and","or","not","xor","in"];var ai=V(P);var a=["as","dim","break","continue","optional","then","until","goto","byval","byref","new","handles","property","return","const","private","protected","friend","public","shared","static","true","false"];var I=["integer","string","double","decimal","boolean","short","char","float","single"];var ac=V(a);var Y=V(I);var ab='"';var K=V(J);var T=V(Q);var af=V(L);var S=V(["end"]);var aj=V(["do"]);var U=null;b.registerHelper("hintWords","vb",J.concat(Q).concat(L).concat(P).concat(a).concat(I));function Z(d,c){c.currentIndent++}function ah(d,c){c.currentIndent--}function M(c,d){if(c.eatSpace()){return null}var e=c.peek();if(e==="'"){c.skipToEnd();return"comment"}if(c.match(/^((&H)|(&O))?[0-9\.a-f]/i,false)){var f=false;if(c.match(/^\d*\.\d+F?/i)){f=true}else{if(c.match(/^\d+\.\d*F?/)){f=true}else{if(c.match(/^\.\d+F?/)){f=true}}}if(f){c.eat(/J/i);return"number"}var g=false;if(c.match(/^&H[0-9a-f]+/i)){g=true}else{if(c.match(/^&O[0-7]+/i)){g=true}else{if(c.match(/^[1-9]\d*F?/)){c.eat(/J/i);g=true}else{if(c.match(/^0(?![\dx])/i)){g=true}}}}if(g){c.eat(/L/i);return"number"}}if(c.match(ab)){d.tokenize=H(c.current());return d.tokenize(c,d)}if(c.match(R)||c.match(ad)){return null}if(c.match(al)||c.match(X)||c.match(ai)){return"operator"}if(c.match(N)){return null}if(c.match(aj)){Z(c,d);d.doInCurrentLine=true;return"keyword"}if(c.match(K)){if(!d.doInCurrentLine){Z(c,d)}else{d.doInCurrentLine=false}return"keyword"}if(c.match(T)){return"keyword"}if(c.match(S)){ah(c,d);ah(c,d);return"keyword"}if(c.match(af)){ah(c,d);return"keyword"}if(c.match(Y)){return"keyword"}if(c.match(ac)){return"keyword"}if(c.match(ae)){return"variable"}c.next();return ak}function H(e){var c=e.length==1;var d="string";return function(f,g){while(!f.eol()){f.eatWhile(/[^'"]/);if(f.match(e)){g.tokenize=M;return d}else{f.eat(/['"]/)}}if(c){if(W.singleLineStringErrors){return ak}else{g.tokenize=M}}return d}}function O(c,e){var f=e.tokenize(c,e);var d=c.current();if(d==="."){f=e.tokenize(c,e);if(f==="variable"){return"variable"}else{return ak}}var g="[({".indexOf(d);if(g!==-1){Z(c,e)}if(U==="dedent"){if(ah(c,e)){return ak}}g="])}".indexOf(d);if(g!==-1){if(ah(c,e)){return ak}}return f}var ag={electricChars:"dDpPtTfFeE ",startState:function(){return{tokenize:M,lastToken:null,currentIndent:0,nextLineIndent:0,doInCurrentLine:false}},token:function(c,d){if(c.sol()){d.currentIndent+=d.nextLineIndent;d.nextLineIndent=0;d.doInCurrentLine=0}var e=O(c,d);d.lastToken={style:e,content:c.current()};return e},indent:function(c,e){var d=e.replace(/^\s+|\s+$/g,"");if(d.match(af)||d.match(S)||d.match(T)){return aa.indentUnit*(c.currentIndent-1)}if(c.currentIndent<0){return 0}return c.currentIndent*aa.indentUnit},lineComment:"'"};return ag});b.defineMIME("text/x-vb","vb")});
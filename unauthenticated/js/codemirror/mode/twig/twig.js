(function(b){if(typeof exports=="object"&&typeof module=="object"){b(require("../../lib/codemirror"),require("../../addon/mode/multiplex"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror","../../addon/mode/multiplex"],b)}else{b(CodeMirror)}}})(function(b){b.defineMode("twig:inner",function(){var k=["and","as","autoescape","endautoescape","block","do","endblock","else","elseif","extends","for","endfor","embed","endembed","filter","endfilter","flush","from","if","endif","in","is","include","import","not","or","set","spaceless","endspaceless","with","endwith","trans","endtrans","blocktrans","endblocktrans","macro","endmacro","use","verbatim","endverbatim"],l=/^[+\-*&%=<>!?|~^]/,a=/^[:\[\(\{]/,i=["true","false","null","empty","defined","divisibleby","divisible by","even","odd","iterable","sameas","same as"],j=/^(\d[+\-\*\/])?\d+(\.\d+)?/;k=new RegExp("(("+k.join(")|(")+"))\\b");i=new RegExp("(("+i.join(")|(")+"))\\b");function h(c,d){var e=c.peek();if(d.incomment){if(!c.skipTo("#}")){c.skipToEnd()}else{c.eatWhile(/\#|}/);d.incomment=false}return"comment"}else{if(d.intag){if(d.operator){d.operator=false;if(c.match(i)){return"atom"}if(c.match(j)){return"number"}}if(d.sign){d.sign=false;if(c.match(i)){return"atom"}if(c.match(j)){return"number"}}if(d.instring){if(e==d.instring){d.instring=false}c.next();return"string"}else{if(e=="'"||e=='"'){d.instring=e;c.next();return"string"}else{if(c.match(d.intag+"}")||c.eat("-")&&c.match(d.intag+"}")){d.intag=false;return"tag"}else{if(c.match(l)){d.operator=true;return"operator"}else{if(c.match(a)){d.sign=true}else{if(c.eat(" ")||c.sol()){if(c.match(k)){return"keyword"}if(c.match(i)){return"atom"}if(c.match(j)){return"number"}if(c.sol()){c.next()}}else{c.next()}}}}}}return"variable"}else{if(c.eat("{")){if(c.eat("#")){d.incomment=true;if(!c.skipTo("#}")){c.skipToEnd()}else{c.eatWhile(/\#|}/);d.incomment=false}return"comment"}else{if(e=c.eat(/\{|%/)){d.intag=e;if(e=="{"){d.intag="}"}c.eat("-");return"tag"}}}}}c.next()}return{startState:function(){return{}},token:function(c,d){return h(c,d)}}});b.defineMode("twig",function(f,e){var a=b.getMode(f,"twig:inner");if(!e||!e.base){return a}return b.multiplexingMode(b.getMode(f,e.base),{open:/\{[{#%]/,close:/[}#%]\}/,mode:a,parseDelimiters:true})});b.defineMIME("text/x-twig","twig")});
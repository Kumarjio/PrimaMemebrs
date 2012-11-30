function makeWhiteSpace(c){var b=[],a=true;for(;c>0;c--){b.push((a||c==1)?nbsp:" ");a=!a}return b.join("")}function fixSpaces(a){if(a.charAt(0)==" "){a=nbsp+a.slice(1)}return a.replace(/[\t \u00a0]{2,}/g,function(b){return makeWhiteSpace(b.length)})}function cleanText(a){return a.replace(/\u00a0/g," ").replace(/\u200b/g,"")}function makePartSpan(b,c){var d=b;if(b.nodeType==3){d=b.nodeValue}else{b=c.createTextNode(d)}var a=c.createElement("SPAN");a.isPart=true;a.appendChild(b);a.currentText=d;return a}var webkitLastLineHack=webkit?function(a){var b=a.lastChild;if(!b||!b.isPart||b.textContent!="\u200b"){a.appendChild(makePartSpan("\u200b",a.ownerDocument))}}:function(){};var Editor=(function(){var f={P:true,DIV:true,LI:true};function b(k){return fixSpaces(k.replace(/\t/g,"  ").replace(/\u00a0/g," ")).replace(/\r\n?/g,"\n").split("\n")}function c(l){var n=l.ownerDocument;var k=[];var o=true;function m(p){if(p.nodeType==3){var q=p.nodeValue=fixSpaces(p.nodeValue.replace(/[\r\u200b]/g,"").replace(/\n/g," "));if(q.length){o=false}k.push(p)}else{if(p.nodeName=="BR"&&p.childNodes.length==0){o=true;k.push(p)}else{forEach(p.childNodes,m);if(!o&&f.hasOwnProperty(p.nodeName)){o=true;k.push(n.createElement("BR"))}}}}m(l);return k}function d(k){function l(x,y){n=y;return x}function s(y,x,z){return function(){return y(x,z)}}function t(){n=t;throw StopIteration}var n=s(u,k,t);var m=k.ownerDocument;var o=[];function r(z){var y=z.parentNode;var x=z.nextSibling;return function(A){y.insertBefore(A,x)}}var v=null;function p(x){var y="\n";if(x.nodeType==3){select.snapshotChanged();x=makePartSpan(x,m);y=x.currentText}x.dirty=true;o.push(x);v(x);return y}function q(y,z){var x=[];forEach(c(y),function(A){x.push(p(A))});return l(x.join(""),z)}function w(x){if(x.isPart&&x.childNodes.length==1&&x.firstChild.nodeType==3){x.currentText=x.firstChild.nodeValue;return !/[\n\t\r]/.test(x.currentText)}return false}function u(x,y){if(x.nextSibling){y=s(u,x.nextSibling,y)}if(w(x)){o.push(x);return l(x.currentText,y)}else{if(x.nodeName=="BR"){o.push(x);return l("\n",y)}else{v=r(x);removeElement(x);return q(x,y)}}}return{next:function(){return n()},nodes:o}}function g(k){if(k.nodeName=="BR"){return 1}else{return k.currentText.length}}function h(k){while(k&&k.nodeName!="BR"){k=k.previousSibling}return k}function j(l,k){if(!l){l=k.firstChild}else{if(l.nodeName=="BR"){l=l.nextSibling}}while(l&&l.nodeName!="BR"){l=l.nextSibling}return l}function i(n,m,l){this.editor=n;this.history=n.history;this.history.commit();this.atOccurrence=false;this.fallbackSize=15;var p;if(l&&(p=select.cursorPos(this.editor.container))){this.line=p.node;this.offset=p.offset}else{this.line=null;this.offset=0}this.valid=!!m;var o=m.split("\n"),k=this;this.matches=(o.length==1)?function(){var q=cleanText(k.history.textAfter(k.line).slice(k.offset)).indexOf(m);if(q>-1){return{from:{node:k.line,offset:k.offset+q},to:{node:k.line,offset:k.offset+q+m.length}}}}:function(){var t=cleanText(k.history.textAfter(k.line).slice(k.offset));var s=t.lastIndexOf(o[0]);if(s==-1||s!=t.length-o[0].length){return false}var q=k.offset+s;var r=k.history.nodeAfter(k.line);for(var u=1;u<o.length-1;u++){if(cleanText(k.history.textAfter(r))!=o[u]){return false}r=k.history.nodeAfter(r)}if(cleanText(k.history.textAfter(r)).indexOf(o[o.length-1])!=0){return false}return{from:{node:k.line,offset:q},to:{node:r,offset:o[o.length-1].length}}}}i.prototype={findNext:function(){if(!this.valid){return false}this.atOccurrence=false;var k=this;if(this.line&&!this.line.parentNode){this.line=null;this.offset=0}function m(n){if(k.history.textAfter(n.node).length<n.offset){k.line=n.node;k.offset=n.offset+1}else{k.line=k.history.nodeAfter(n.node);k.offset=0}}while(true){var l=this.matches();if(l){this.atOccurrence=l;m(l.from);return true}this.line=this.history.nodeAfter(this.line);this.offset=0;if(!this.line){this.valid=false;return false}}},select:function(){if(this.atOccurrence){select.setCursorPos(this.editor.container,this.atOccurrence.from,this.atOccurrence.to);select.scrollToCursor(this.editor.container)}},replace:function(l){if(this.atOccurrence){var k=this.editor.replaceRange(this.atOccurrence.from,this.atOccurrence.to,l);this.line=k.node;this.offset=k.offset;this.atOccurrence=false}}};function e(n){this.options=n;window.indentUnit=n.indentUnit;this.parent=parent;this.doc=document;var k=this.container=this.doc.body;this.win=window;this.history=new History(k,n.undoDepth,n.undoDelay,this,n.onChange);var m=this;if(!e.Parser){throw"No parser loaded."}if(n.parserConfig&&e.Parser.configure){e.Parser.configure(n.parserConfig)}if(!n.readOnly){select.setCursorPos(k,{node:null,offset:0})}this.dirty=[];if(n.content){this.importCode(n.content)}else{k.appendChild(this.doc.createElement("BR"))}if(!n.readOnly){if(n.continuousScanning!==false){this.scanner=this.documentScanner(n.linesPerPass);this.delayScanning()}function o(){if(document.body.contentEditable!=undefined&&internetExplorer){document.body.contentEditable="true"}else{document.designMode="on"}document.documentElement.style.borderWidth="0";if(!n.textWrapping){k.style.whiteSpace="nowrap"}}try{o()}catch(q){var l=addEventHandler(document,"focus",function(){l();o()},true)}addEventHandler(document,"keydown",method(this,"keyDown"));addEventHandler(document,"keypress",method(this,"keyPress"));addEventHandler(document,"keyup",method(this,"keyUp"));function p(){m.cursorActivity(false)}addEventHandler(document.body,"mouseup",p);addEventHandler(document.body,"paste",function(r){p();if(internetExplorer){m.replaceSelection(window.clipboardData.getData("Text"));r.stop()}});addEventHandler(document.body,"cut",p);if(this.options.autoMatchParens){addEventHandler(document.body,"click",method(this,"scheduleParenBlink"))}}}function a(k){return(k>=16&&k<=18)||(k>=33&&k<=40)}e.prototype={importCode:function(k){this.history.push(null,null,b(k));this.history.reset()},getCode:function(){if(!this.container.firstChild){return""}var k=[];select.markSelection(this.win);forEach(d(this.container.firstChild),method(k,"push"));webkitLastLineHack(this.container);select.selectMarked();return cleanText(k.join(""))},checkLine:function(k){if(k===false||!(k==null||k.parentNode==this.container)){throw parent.CodeMirror.InvalidLineHandle}},cursorPosition:function(l){if(l==null){l=true}var k=select.cursorPos(this.container,l);if(k){return{line:k.node,character:k.offset}}else{return{line:null,character:0}}},firstLine:function(){return null},lastLine:function(){if(this.container.lastChild){return h(this.container.lastChild)}else{return null}},nextLine:function(l){this.checkLine(l);var k=j(l,this.container);return k||false},prevLine:function(k){this.checkLine(k);if(k==null){return false}return h(k.previousSibling)},selectLines:function(o,k,n,m){this.checkLine(o);var p={node:o,offset:k},l=null;if(m!==undefined){this.checkLine(n);l={node:n,offset:m}}select.setCursorPos(this.container,p,l)},lineContent:function(k){this.checkLine(k);var l=[];for(k=k?k.nextSibling:this.container.firstChild;k&&k.nodeName!="BR";k=k.nextSibling){l.push(nodeText(k))}return cleanText(l.join(""))},setLineContent:function(k,l){this.history.commit();this.replaceRange({node:k,offset:0},{node:k,offset:this.history.textAfter(k).length},l);this.addDirtyNode(k);this.scheduleHighlight()},insertIntoLine:function(r,l,m){var n=null;if(l=="end"){n=j(r,this.container)}else{for(var p=r?r.nextSibling:this.container.firstChild;p;p=p.nextSibling){if(l==0){n=p;break}var q=(p.innerText||p.textContent||p.nodeValue||"");if(q.length>l){n=p.nextSibling;m=q.slice(0,l)+m+q.slice(l);removeElement(p);break}l-=q.length}}var s=b(m),o=this.container.ownerDocument;for(var k=0;k<s.length;k++){if(k>0){this.container.insertBefore(o.createElement("BR"),n)}this.container.insertBefore(makePartSpan(s[k],o),n)}this.addDirtyNode(r);this.scheduleHighlight()},selectedText:function(){var l=this.history;l.commit();var n=select.cursorPos(this.container,true),k=select.cursorPos(this.container,false);if(!n||!k){return""}if(n.node==k.node){return l.textAfter(n.node).slice(n.offset,k.offset)}var m=[l.textAfter(n.node).slice(n.offset)];for(pos=l.nodeAfter(n.node);pos!=k.node;pos=l.nodeAfter(pos)){m.push(l.textAfter(pos))}m.push(l.textAfter(k.node).slice(0,k.offset));return cleanText(m.join("\n"))},replaceSelection:function(l){this.history.commit();var m=select.cursorPos(this.container,true),k=select.cursorPos(this.container,false);if(!m||!k){return}k=this.replaceRange(m,k,l);select.setCursorPos(this.container,m,k)},replaceRange:function(p,o,n){var m=b(n);m[0]=this.history.textAfter(p.node).slice(0,p.offset)+m[0];var l=m[m.length-1];m[m.length-1]=l+this.history.textAfter(o.node).slice(o.offset);var k=this.history.nodeAfter(o.node);this.history.push(p.node,k,m);return{node:this.history.nodeBefore(k),offset:l.length}},getSearchCursor:function(l,k){return new i(this,l,k)},reindent:function(){if(this.container.firstChild){this.indentRegion(null,this.container.lastChild)}},grabKeys:function(k,l){this.frozen=k;this.keyFilter=l},ungrabKeys:function(){this.frozen="leave";this.keyFilter=null},keyDown:function(l){if(this.frozen=="leave"){this.frozen=null}if(this.frozen&&(!this.keyFilter||this.keyFilter(l.keyCode))){l.stop();this.frozen(l);return}var k=l.keyCode;this.delayScanning();if(this.options.autoMatchParens){this.scheduleParenBlink()}if(k==13){if(l.ctrlKey){this.reparseBuffer()}else{select.insertNewlineAtCursor(this.win);this.indentAtCursor();select.scrollToCursor(this.container)}l.stop()}else{if(k==9&&this.options.tabMode!="default"){this.handleTab(!l.ctrlKey&&!l.shiftKey);l.stop()}else{if(k==32&&l.shiftKey&&this.options.tabMode=="default"){this.handleTab(true);l.stop()}else{if((k==219||k==221)&&l.ctrlKey){this.blinkParens(l.shiftKey);l.stop()}else{if(l.metaKey&&(k==37||k==39)){var m=select.selectionTopNode(this.container);if(m===false||!this.container.firstChild){return}if(k==37){select.focusAfterNode(h(m),this.container)}else{end=j(m,this.container);select.focusAfterNode(end?end.previousSibling:this.container.lastChild,this.container)}l.stop()}else{if(l.ctrlKey||l.metaKey){if((l.shiftKey&&k==90)||k==89){select.scrollToNode(this.history.redo());l.stop()}else{if(k==90||k==8){select.scrollToNode(this.history.undo());l.stop()}else{if(k==83&&this.options.saveFunction){this.options.saveFunction();l.stop()}}}}}}}}}},keyPress:function(l){var k=/indent|default/.test(this.options.tabMode)&&e.Parser.electricChars;if((this.frozen&&(!this.keyFilter||this.keyFilter(l.keyCode)))||l.code==13||(l.code==9&&this.options.tabMode!="default")||(l.keyCode==32&&l.shiftKey&&this.options.tabMode=="default")){l.stop()}else{if(k&&k.indexOf(l.character)!=-1){this.parent.setTimeout(method(this,"indentAtCursor"),0)}}},keyUp:function(k){this.cursorActivity(a(k.keyCode))},indentLineAfter:function(r,o){var p=r?r.nextSibling:this.container.firstChild;if(p&&!hasClass(p,"whitespace")){p=null}var k=p?p.nextSibling:(r?r.nextSibling:this.container.firstChild);var m=(r&&k&&k.currentText)?k.currentText:"";var l=0,q=p?p.currentText.length:0;if(o!=null&&this.options.tabMode=="shift"){l=o?q+indentUnit:Math.max(0,q-indentUnit)}else{if(r){l=r.indentation(m,q,o)}else{if(e.Parser.firstIndentation){l=e.Parser.firstIndentation(m,q,o)}}}var n=l-q;if(n<0){if(l==0){if(k){select.snapshotMove(p.firstChild,k.firstChild,0)}removeElement(p);p=null}else{select.snapshotMove(p.firstChild,p.firstChild,n,true);p.currentText=makeWhiteSpace(l);p.firstChild.nodeValue=p.currentText}}else{if(n>0){if(p){p.currentText=makeWhiteSpace(l);p.firstChild.nodeValue=p.currentText}else{p=makePartSpan(makeWhiteSpace(l),this.doc);p.className="whitespace";if(r){insertAfter(p,r)}else{this.container.insertBefore(p,this.container.firstChild)}}if(k){select.snapshotMove(k.firstChild,p.firstChild,q,false,true)}}}if(n!=0){this.addDirtyNode(r)}return p},highlightAtCursor:function(){var n=select.selectionTopNode(this.container,true);var m=select.selectionTopNode(this.container,false);if(n===false||!m){return}if(m.nextSibling){m=m.nextSibling}select.markSelection(this.win);var l=m.nodeType==3;if(!l){m.dirty=true}while(m.parentNode==this.container&&(l||m.dirty)){var k=this.highlight(n,1,true);if(k){n=k.node}if(!k||k.left){break}}select.selectMarked()},handleTab:function(l){if(this.options.tabMode=="spaces"){select.insertTabAtCursor(this.win)}else{if(!select.somethingSelected(this.win)){this.indentAtCursor(l)}else{var m=select.selectionTopNode(this.container,true),k=select.selectionTopNode(this.container,false);if(m===false||k===false){return}this.indentRegion(m,k,l)}}},scheduleParenBlink:function(){if(this.parenEvent){this.parent.clearTimeout(this.parenEvent)}var k=this;this.parenEvent=this.parent.setTimeout(function(){k.blinkParens()},300)},isNearParsedNode:function(k){var l=0;while(k&&(!k.parserFromHere||k.dirty)){l+=(k.textContent||k.innerText||"-").length;if(l>800){return false}k=k.previousSibling}return true},blinkParens:function(v){if(this.parenEvent){this.parent.clearTimeout(this.parenEvent)}this.parenEvent=null;function r(x){if(x.currentText){var w=x.currentText.match(/^[\s\u00a0]*([\(\)\[\]{}])[\s\u00a0]*$/);return w&&w[1]}}function o(w){return/[\(\[\{]/.test(w)}var k,t=this,s=select.selectionTopNode(this.container,true);if(!s||!this.isNearParsedNode(s)){return}this.highlightAtCursor();s=select.selectionTopNode(this.container,true);if(!(s&&((k=r(s))||(s=s.nextSibling)&&(k=r(s))))){return}var q=s.className,m=o(k),n=matching[k];function p(){var w=[],y,x=true;for(var z=s;z;z=m?z.nextSibling:z.previousSibling){if(z.className==q&&z.nodeName=="SPAN"&&(y=r(z))){if(o(y)==m){w.push(y)}else{if(!w.length){x=false}else{if(w.pop()!=matching[y]){x=false}}}if(!w.length){break}}else{if(z.dirty||z.nodeName!="SPAN"&&z.nodeName!="BR"){return{node:z,status:"dirty"}}}}return{node:z,status:z&&x}}function l(x,w){x.style.fontWeight="bold";x.style.color=w?"#8F8":"#F88";t.parent.setTimeout(function(){x.style.fontWeight="";x.style.color=""},500)}while(true){var u=p();if(u.status=="dirty"){this.highlight(u.node,1);u.node.dirty=false;continue}else{l(s,u.status);if(u.node){l(u.node,u.status);if(v){select.focusAfterNode(u.node.previousSibling,this.container)}}break}}},indentAtCursor:function(l){if(!this.container.firstChild){return}this.highlightAtCursor();var n=select.selectionTopNode(this.container,false);if(n===false){return}var k=h(n);var m=this.indentLineAfter(k,l);if(n==k&&m){n=m}if(n==m){select.focusAfterNode(n,this.container)}},indentRegion:function(n,l,m){select.markSelection(this.win);n=h(n);l=j(l,this.container);do{this.highlight(n);var k=this.highlight(n,1);this.indentLineAfter(n,m);n=k?k.node:null}while(n!=l);select.selectMarked()},cursorActivity:function(k){if(internetExplorer){this.container.createTextRange().execCommand("unlink");this.selectionSnapshot=select.selectionCoords(this.win)}var l=this.options.cursorActivity;if(!k||l){var m=select.selectionTopNode(this.container,false);if(m===false||!this.container.firstChild){return}m=m||this.container.firstChild;if(l){l(m)}if(!k){this.scheduleHighlight();this.addDirtyNode(m)}}},reparseBuffer:function(){forEach(this.container.childNodes,function(k){k.dirty=true});if(this.container.firstChild){this.addDirtyNode(this.container.firstChild)}},addDirtyNode:function(l){l=l||this.container.firstChild;if(!l){return}for(var k=0;k<this.dirty.length;k++){if(this.dirty[k]==l){return}}if(l.nodeType!=3){l.dirty=true}this.dirty.push(l)},scheduleHighlight:function(){var k=this;this.parent.clearTimeout(this.highlightTimeout);this.highlightTimeout=this.parent.setTimeout(function(){k.highlightDirty()},this.options.passDelay)},getDirtyNode:function(){while(this.dirty.length>0){var k=this.dirty.pop();try{while(k&&k.parentNode!=this.container){k=k.parentNode}if(k&&(k.dirty||k.nodeType==3)){return k}}catch(l){}}return null},highlightDirty:function(m){if(!window.select){return}var l=m?Infinity:this.options.linesPerPass;if(!this.options.readOnly){select.markSelection(this.win)}var n;while(l>0&&(n=this.getDirtyNode())){var k=this.highlight(n,l);if(k){l=k.left;if(k.node&&k.dirty){this.addDirtyNode(k.node)}}}if(!this.options.readOnly){select.selectMarked()}if(n){this.scheduleHighlight()}return this.dirty.length==0},documentScanner:function(k){var l=this,m=null;return function(){if(m&&m.parentNode!=l.container){m=null}select.markSelection(l.win);var n=l.highlight(m,k,true);select.selectMarked();var o=n?(n.node&&n.node.nextSibling):null;m=(m==o)?null:o;l.delayScanning()}},delayScanning:function(){if(this.scanner){this.parent.clearTimeout(this.documentScan);this.documentScan=this.parent.setTimeout(this.scanner,this.options.continuousScanning)}},highlight:function(w,A,r){var l=this.container,y=this,o=this.options.activeTokens,n=w;if(!l.firstChild){return}if(A==null){if(!w){return}else{w=w.previousSibling}}while(w&&(!w.parserFromHere||w.dirty)){w=w.previousSibling}if(w&&!w.nextSibling){return}function k(C,B){return !B.reduced&&B.currentText==C.value&&B.className==C.style}function z(B,C){B.currentText=B.currentText.substring(C);B.reduced=true}function p(C){var B=makePartSpan(C.value,y.doc);B.className=C.style;return B}var u=d(w?w.nextSibling:l.firstChild),x=stringStream(u),v=w?w.parserFromHere(x):e.Parser.make(x);var q={current:null,get:function(){if(!this.current){this.current=u.nodes.shift()}return this.current},next:function(){this.current=null},remove:function(){l.removeChild(this.get());this.current=null},getNonEmpty:function(){var C=this.get();while(C&&C.nodeName=="SPAN"&&C.currentText==""){var B=C;this.remove();C=this.get();select.snapshotMove(B.firstChild,C&&(C.firstChild||C),0)}return C}};var t=false,m=true,s=0;forEach(v,function(D){var C=q.getNonEmpty();if(D.value=="\n"){if(C.nodeName!="BR"){throw"Parser out of sync. Expected BR."}if(C.dirty||!C.indentation){t=true}if(t||!w||(w.oldNextSibling!=w.nextSibling)){y.history.touch(w)}if(w){w.oldNextSibling=w.nextSibling}w=C;C.parserFromHere=v.copy();C.indentation=D.indentation;C.dirty=false;if(A==null&&C==n){throw StopIteration}if((A!==undefined&&--A<=0)||(!t&&!m&&s>1&&!r)){throw StopIteration}m=t;t=false;s=0;q.next()}else{if(C.nodeName!="SPAN"){throw"Parser out of sync. Expected SPAN."}if(C.dirty){t=true}s++;if(k(D,C)){C.dirty=false;q.next()}else{t=true;var B=p(D);l.insertBefore(B,C);if(o){o(B,D,y)}var G=D.value.length;var F=0;while(G>0){C=q.get();var E=C.currentText.length;select.snapshotReplaceNode(C.firstChild,B.firstChild,G,F);if(E>G){z(C,G);G=0}else{G-=E;F+=E;q.remove()}}}}});if(t||!w||(w.oldNextSibling!=w.nextSibling)){y.history.touch(w)}webkitLastLineHack(this.container);return{left:A,node:q.getNonEmpty(),dirty:t}}};return e})();addEventHandler(window,"load",function(){var a=window.frameElement.CodeMirror;a.editor=new Editor(a.options);this.parent.setTimeout(method(a,"init"),0)});
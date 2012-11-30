function copy_text_to_clipboard(g,b){if(!g){alert("No text provided to copy_text_to_clipboard to copy.");return false}if(window.clipboardData){try{if(b){g=g.replace(/\s*<BR>\s*/gi,"\r\n").replace(/\s*<P>\s*/gi,"\r\n\r\n").replace(/<\/\w+.*?>/ig,"")}window.clipboardData.setData("Text",g);return true}catch(d){alert("Your browser currently does not support copying to the clipboard.");return false}}else{if(navigator.userAgent.match(/ Gecko\//)){if(!b){g=g.replace(/</g,"&lt;")}var f=document.createElement("iframe");f.setAttribute("width","1");f.setAttribute("height","1");f.setAttribute("frameborder","0");f.setAttribute("scrolling","no");var a=document.body;var c=a.appendChild(f);function h(){c.contentDocument.designMode="on";c.contentDocument.body.innerHTML=g;var j=c.contentWindow.getSelection();j.removeAllRanges();c.contentWindow.focus();var i;if(typeof j!="undefined"){try{i=j.getRangeAt(0)}catch(k){i=c.contentDocument.createRange()}}else{i=c.contentDocument.createRange()}i.selectNodeContents(c.contentDocument.body);j.addRange(i);try{c.contentDocument.execCommand("copy",null,null)}catch(k){if(confirm("Cannot access Cut/Copy/Paste for security reasons. Click OK to get instructions from InfoGears to enable cut/copy/paste in your browser. (Note: A new window will popup. It may popup behind this window.)")){window.open("http://www.infogears.com/cgi-bin/infogears/mozilla_firefox_copy_paste")}a.removeChild(c);return false}a.removeChild(c);return true}setTimeout(h,100);return true}else{alert("Your browser currently does not support copying to the clipboard. Please upgrade to the latest version of Mozilla FireFox or Internet Explorer")}}return false}function copy_element_to_clipboard(c,d){if(!c){alert("Element not found for copy action in copy_element_to_clipboard.");return false}if(typeof(c.selectedIndex)!="undefined"){if(c.multiple){var a=new Array();for(var b=0;b<c.options.length;b++){if(c.options[b].selected){a.push(c.options[b].value)}}return copy_text_to_clipboard(a.join("|~~|"),d)}else{if(c.selectedIndex<0){alert("No selection in select box.");return false}}return copy_text_to_clipboard(c.options[c.selectedIndex].value,d)}else{if(c.value){return copy_text_to_clipboard(c.value,d)}else{if(c.innerText&&d){return copy_text_to_clipboard(c.innerText,0)}else{if(c.innerHTML){return copy_text_to_clipboard(c.innerHTML,d)}else{alert("Your browser does not support copying of elements. Please upgrade to the latest version of Mozilla FireFox or Internet Explorer")}}}}return false};
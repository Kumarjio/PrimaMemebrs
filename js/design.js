(function(a){a.dequeue=function(d,c){return a(d).dequeue(c)}})(jQuery);$.fn.substrCount=function(b){var a=this.text();var c=0;while((pos=a.indexOf(b))!=-1){a=a.substr(pos+b.length);c++}return c};textareaResizer=function(){$("textarea").each(function(){var f=$(this);cl=f.attr("class");if(cl&&-1!=cl.indexOf("noresize")){return}var g=f.text();var c=30;if(g.length){var b=f.substrCount($.browser.msie?"\r":"\n");if(b>20){c=200}else{c=70+10*b}}f.height(c);var e=null;$(this).wrap('<div class="resizable-textarea"></div>').parent().append($('<div class="resizable-textarea2" style="width: '+(f.width()+10)+'px;"></div>').bind("mousedown",a));$("textarea [@class=checkbox]").bind("mousedown",a);$("div.resizable-textarea2",$(this).parent()).bind("mousedown",a);var d=$("div.resizable-textarea2",$(this).parent())[0];function a(j){e=f.height()-getMousePosition(j).y;if($.browser.opera){e-=6}$(document).bind("mousemove",i).bind("mouseup",h);stopPropagation(j)}function i(j){f.height(Math.max(15,e+getMousePosition(j).y)+"px");stopPropagation(j)}function h(j){$(document).unbind()}})};function getMousePosition(a){return a.pageX?{x:a.pageX,y:a.pageY}:{x:a.clientX+(document.documentElement?document.documentElement.scrollLeft:document.body.scrollLeft),y:a.clientY+(document.documentElement?document.documentElement.scrollTop:document.body.scrollTop)}}function stopPropagation(a){a=a||event;a.stopPropagation?a.stopPropagation():a.cancelBubble=true}$(document).ready(init_design);function init_design(){$("table.tab tr").hover(function(){if(!$(this).hasClass("not_hover")){$(this).addClass("hover")}},function(){$(this).removeClass("hover")});$("table.statistics tr").hover(function(){$(this).css("background-color","#d9d9d9")},function(){$(this).css("background-color","")});$("input").not("[type=checkbox],[type=radio]").focus(function(a){$(this).addClass("hover")});$("input").not("[type=checkbox],[type=radio]").blur(function(){$(this).removeClass("hover")});$("textarea").focus(function(){$(this).addClass("hover")});$("textarea").blur(function(){$(this).removeClass("hover")});$("div.tooltip").css("opacity",0.1);$("img.tip").bind("mouseover",function(){$("div.tooltip").stopAll().pause(300).fadeTo(400,1)}).bind("mouseout",function(){$("div.tooltip").stopAll().fadeTo(400,0,function(){$(this).hide()})})}var first=true;var prev=false;function select_tab(d,b,e){if(first){first=false;$("#test").css("top",d);$("#test").css("height",b);$("#test").css("display","block");$("#cursor_"+e.substr(3)+"_1").css("visibility","visible");var c=$("#cursor_"+e.substr(3)+"_1").parent().children()[1];$(c).addClass("over");prev="#cursor_"+e.substr(3)+"_1"}else{$("#center").block();$("#block_msg").css("opacity",0.5);$("#test").animate({top:d,height:b},500,"easein",function(){if(prev){$(prev).css("visibility","hidden");var f=$(prev).parent().children()[1];$(f).removeClass("over")}$("#cursor_"+e.substr(3)+"_1").css("visibility","visible");var f=$("#cursor_"+e.substr(3)+"_1").parent().children()[1];$(f).addClass("over");prev="#cursor_"+e.substr(3)+"_1";$("#center").unblock()})}};
var validator;function myPanelOnLoad(){try{validator=new FormValidator();validator.add("level_name","check_max_len(val, 64)&&val");validator.items.level_name.checkOnEvent("keyup");$("input[@type=checkbox]").each(function(b,c){validator.add(c.name);if(b<temp_vars_set.count){validator.items[c.name].checkOnEvent("change",errorBoxControl)}});validator.checkAll()}catch(a){alert("myTabOnLoad: "+a.message);_sys_error("Error:","FAIL",a)}}function myPanelDestructor(){validator=null}function myOnSave(b,c){try{var k=base_url+"admin_control/";if(c){if(confirm(temp_vars_set.cancelText)){var f={action:""};load_panel(k+"levels/",f,{"0":base_url+"js/admin/init.js"})}}else{displayMessageEx();var j=validator.checkAll();var h=0;var a=false;for(key in validator.items){if(key!="level_name"&&typeof(validator.items[key])!="function"){if(validator.items[key].value){a=true;break}else{a=false}h++;if(h>=temp_vars_set.count){break}}}if(!a||!j){var d=new Array();if(!a){d.push("empty_list")}if(!j){d.push("validation_fail")}displayMessageEx(d,true);validator.setOnCheck(errorBoxControl)}else{var f={action:"save"};var g=validator.getItems();g.id=b;for(key in g){if(typeof(g[key])!="function"){f[key]=g[key]}}on_post_error=save_error;additional_accept=after_save;load_panel(k+"levels_edit/",f,{"0":base_url+"js/admin/init.js"})}}}catch(i){alert("myOnSave: "+i.message);_sys_error("Error:","FAIL",i)}}function after_save(b){var a=getTempVarsSet(false,b);displayMessageEx(a)}function save_error(b){var a=getTempVarsSet(false,b);displayMessageEx(a,true)}function errorBoxControl(){try{var b=false;for(key in validator.items){if(typeof(validator.items[key])!="function"){b=validator.items[key].error.is_error?true:b}}if(!b){displayMessageEx(false,true);validator.setOnCheck()}}catch(a){alert("errorBoxControl: "+a.message)}};
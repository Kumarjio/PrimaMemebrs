var validator;function myPanelOnLoad(){try{validator=new FormValidator();validator.add("title","check_max_len(val,64)&&val");validator.items.title.checkOnEvent("keyup");validator.add("description","check_max_len(val,100)");validator.add("required_mark");validator.add("field_type","on_type_change(val)");validator.items.field_type.checkOnEvent("change");validator.add("field_values","check_field_values(val)");validator.items.field_values.checkOnEvent("keyup");validator.add("default_value","check_default_value(val)");validator.items.default_value.checkOnEvent("keyup");validator.add("check_rule","check_rule()");validator.items.check_rule.checkOnEvent("change");validator.items.field_type.check();validator.items.check_rule.check()}catch(a){alert("myTabOnLoad: "+a.message);_sys_error("Error:","FAIL",a)}}function on_type_change(a){switch(parseInt(a)){case 1:$("#"+validator.items.required_mark.id).parent().parent().show();$("#"+validator.items.check_rule.id).parent().parent().show();$("#"+validator.items.field_values.id).parents("tr").hide();validator.items.field_values.setValue("");break;case 2:$("#"+validator.items.required_mark.id).parent().parent().hide();$("#"+validator.items.check_rule.id).parent().parent().hide();$("#"+validator.items.field_values.id).parents("tr").show();validator.items.check_rule.setValue("");$("#"+validator.items.required_mark.id).attr("checked",false);break;case 3:$("#"+validator.items.required_mark.id).parent().parent().show();$("#"+validator.items.check_rule.id).parent().parent().hide();$("#"+validator.items.field_values.id).parents("tr").show();validator.items.check_rule.setValue("");break;case 4:$("#"+validator.items.required_mark.id).parent().parent().show();$("#"+validator.items.check_rule.id).parent().parent().show();$("#"+validator.items.field_values.id).parents("tr").hide();validator.items.field_values.setValue("");break;case 5:$("#"+validator.items.required_mark.id).parent().parent().show();$("#"+validator.items.check_rule.id).parent().parent().hide();$("#"+validator.items.field_values.id).parents("tr").show();validator.items.check_rule.setValue("");break;case 6:$("#"+validator.items.required_mark.id).parent().parent().show();$("#"+validator.items.check_rule.id).parent().parent().hide();$("#"+validator.items.field_values.id).parents("tr").show();validator.items.check_rule.setValue("");break}return true}function check_field_values(a){validator.items.field_type.check();if(validator.items.field_type.value!=1&&validator.items.field_type.value!=4){if(!a){return false}a=a.replace(/\r/g,"");if(a.indexOf("\n\n")>=0){return false}if(a.charAt(a.length-1)=="\n"){return false}if(validator.items.field_type.value==6&&a.indexOf("\n")>=0){return false}if(!isUniqueArray(a.split("\n"))){return false}}return true}function check_default_value(c){var b=parseInt(validator.items.check_rule.value);if(!c){return true}if(validator.items.field_type.value!=1&&validator.items.field_type.value!=4){validator.items.field_values.check();var a=validator.items.field_values.value.replace(/\r/g,"").split("\n");if($.inArray(c,a)<0){return false}}else{switch(b){case 2:return check_int(c);case 4:return check_mail(c);case 6:return check_phone(c)}}return true}function check_rule(){validator.items.default_value.check();return true}function myPanelDestructor(){validator=null}function myOnSave(h,d){try{var f=base_url+"config/";params=getPagerParams();if(d){if(confirm(temp_vars_set.cancelText)){load_panel(f+"add_fields/",params,{"0":base_url+"js/admin/init.js"})}}else{displayMessageEx();if(!validator.checkAll()){var c=new Array();c.push("validation_fail");displayMessageEx(c,true)}else{var b=validator.getItems();b.id=h;for(key in b){if(typeof(b[key])!="function"){params[key]=b[key]}}on_post_error=save_error;additional_accept=after_save;on_post_message=after_save;params.action="add";var a=f+"add_fields_add/";if(h!=""){params.action="edit";a=f+"add_field_edit/"}if(params.field_type!=1||params.field_type!=4){params.field_values=params.field_values.replace(/\r/g,"")}load_panel(a,params,{"0":base_url+"js/admin/init.js"})}validator.setOnCheck(errorBoxControl)}}catch(g){alert("myOnSave: "+g.message);_sys_error("Error:","FAIL",g)}}function after_save(b){var a=getTempVarsSet(false,b);displayMessageEx(a)}function save_error(b){var a=getTempVarsSet(false,b);displayMessageEx(a,true)}function save_message(b){var a=getTempVarsSet(false,b);displayMessageEx(a)}function errorBoxControl(){try{var b=false;for(key in validator.items){if(typeof(validator.items[key])!="function"){b=validator.items[key].error.is_error?true:b}}if(!b){displayMessageEx(false,true);validator.setOnCheck()}}catch(a){alert("errorBoxControl: "+a.message)}};
function after_load_template_edit_form_error(a){_msg_panel_hide();if(a!=""){_error_panel_show(a)}}function load_template_edit_form(b){try{if(b>0){var c={id:b};on_post_error=after_load_template_edit_form_error;document.location.hash=document.location.hash+"/"+b+"/edit";load_panel(base_url+"newsletter/template_edit",c);return}}catch(a){_sys_error("template_edit:load_template_edit_form","Loads Email Template Edit form",a)}}function after_save_template_success(c){_error_panel_hide();msg=c;after_panel_load=after_panel_loaded;try{var b={cpage:current_page,ppage:per_page,ord:sort_by,ord_type:sort_how};_set_menu_cursor("4","1");load_panel(base_url+"newsletter/template_list",b)}catch(a){_sys_error("template_edit:after_save_template_success","Getting pager params for email template list",a)}}function after_save_template_error(a){_msg_panel_hide();if(a!=""){_error_panel_show(a)}}function save_template(d){_msg_panel_hide();_error_panel_hide();try{if(d>0){var a=$("#tpl_name").val();var g=$("#tpl_subject").val();var b=$("#tpl_message").val();var f={id:d,name:a,subject:g,message:b,action:"save"};if(_validate_template_fields(f)){on_post_success=after_add_template_success;on_post_error=after_add_template_error;document.location.hash=document.location.hash.split("/").slice(0,-2).join("/");load_panel(base_url+"newsletter/template_edit",f)}}}catch(c){_sys_error("template_edit:save_template","Collects email template fields values for updating",c)}};
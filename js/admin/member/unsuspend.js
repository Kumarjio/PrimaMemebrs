function load_suspended_mbr_list(b){try{_msg_panel_hide();_error_panel_hide();if(b){$.each(b,function(d,e){if(d=="ppage"&&!isNaN(e)){per_page=e;current_page=1}else{if(d=="cpage"){current_page=(e>0)?e:1}else{if(d=="ord"){sort_by=e;sort_how=(sort_how=="asc")?"desc":"asc"}}}return})}var c={cpage:current_page,ppage:per_page,ord:sort_by,ord_type:sort_how};moveSlideTab(2,5,"unsuspend_delete");load_panel(base_url+"member/unsuspend",c)}catch(a){_sys_error("unsuspend:load_suspended_mbr_list","Generates suspended members list",a)}}function after_delete_suspmember_success(c){msg=c;after_panel_load=after_panel_loaded;try{var b={cpage:current_page,ppage:per_page,ord:sort_by,ord_type:sort_how};load_panel(base_url+"member/unsuspend",b)}catch(a){_sys_error("unsuspend:after_delete_suspmember_success","Loading member list after delete",a)}}function after_delete_suspmember_error(a){if(a!=""){_error_panel_show(a)}}function delete_suspmember(b){try{_msg_panel_hide();_error_panel_hide();if(parseInt(b)>0){var a=$("#delete_question").text();if(confirm(a)){var f={mbrlist:b+"!"};on_post_success=after_delete_suspmember_success;on_post_error=after_delete_suspmember_error;load_panel(base_url+"member/delete_user/",f);return}}else{var c=_get_selected_members();if(c==""){$("#jsvalid_error_mbr_notchecked").show();$("#error_panel").show();return false}var a=$("#delete_question").text();if(confirm(a)){var f={mbrlist:c};on_post_success=after_delete_suspmember_success;on_post_error=after_delete_suspmember_error;load_panel(base_url+"member/delete_user/",f)}}}catch(d){_sys_error("unsuspend:delete_suspmember","shows error of member deleting",d)}};
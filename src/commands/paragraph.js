(function(root){
    'use strict';

    function latex_paragraph(cursor, jump_width, title, content){
        if(cursor.carriage_return().line_feed()){
            cursor.use_cfg(root.cursor_default_cfg.paragraph_title);
            var surplus_title = root.commands.normal(cursor, title);
            if(surplus_title != ''){
                return {
                    page_satisfid : false,
                    surplus_title : surplus_title,
                    surplus_title : content
                };
            };

            cursor.use_cfg(root.cursor_default_cfg.paragraph_body);
            cursor.jump_space(jump_width * cursor.get_font_size());
            var surplus_content = root.commands.normal(cursor, content);
            if(surplus_content != ''){
                return {
                    page_satisfid : false,
                    surplus_title : '',
                    surplus_title : surplus_content
                };
            };

            return {
                page_satisfid : true,
                surplus_title : '',
                surplus_content : ''
            };
        };
        return {
            page_satisfid : false,
            surplus_title : title,
            surplus_content : content
        };
    };

    root.commands.paragraph = latex_paragraph;

})(this.latex);

(function(root){
    'use strict';

    function latex_normal(cursor, text){
        var text_length = text.length;
        for(var i = 0; i < text_length; i++){
            if(cursor.write_word(text[i]) === false){
                if(cursor.carriage_return().line_feed() === false){
                    return text.substring(i);
                };
                i--;
            };
        };
        return '';
    };

    root.commands.normal = latex_normal;
})(this.latex);

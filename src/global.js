(function(root){
    'use strict';

    root.latex = {};
    root.latex.blocks = {};

    root.latex.blocks.abstract_block = {
        get_width : function(cursor) {
            return this.get_block_width(cursor);
        },

        get_height : function(cursor) {
            return this.get_block_height(cursor);
        },
        render : function(cursor) {
            this.block_render(cursor);
            return this;
        },
        get_class_name : function() {
            return this.get_block_name();
        }
    };

    root.latex.blocks.get_param_length = function(alpha) {
        var result = 0;
        var stack = [];
        for(var i = 0; i < alpha.length; i++){
            if(stack.length != 0) { result++; };
            if(alpha[i] === '\\' && (alpha[i + 1] === '{' || alpha[i + 1] === '}')) {
                if(stack.length != 0) { result++; };
                i++;
                continue; 
            };
            if(alpha[i] === '{'){
                stack.push('{');
            }
            else if(alpha[i] == '}'){
                stack.pop();
                if(stack.length === 0) return result - 1;
            };
        };
        return 0;
    };
})(this);

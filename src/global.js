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
        }
    };
})(this);

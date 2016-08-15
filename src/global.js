(function(root){
    'use strict';

    root.latex = {};
    root.latex.blocks = {};

    root.latex.blocks.abstract_block = {
        get_width : function() {
            return this.get_block_width();
        },

        get_height : function() {
            return this.get_block_height();
        },
        render : function() {
            this.block_render();
            return this;
        }
    };
})(this);

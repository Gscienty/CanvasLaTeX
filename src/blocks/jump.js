(function(root){
    'use strict';

    root.jump = function(spacing){
        var self = {};
        self.spacing = spacing;

        this.get_block_width = function(cursor){
            return cursor.get_size() * self.spacing;
        };

        this.get_block_height = function(cursor){
            return cursor.get_measure('').height;
        };

        this.block_render = function(cursor){
            cursor.jump_space(self.spacing);
        };
    };

    root.jump.prototype = root.abstract_block;

})(this.latex.blocks);

(function(root){
    'use strict';

    root.blocks.jump = function(spacing){
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

    root.blocks.jump.prototype = root.blocks.abstract_block;

    root.blocks.jump.build = function(alpha){
        const block_length = 5;
        const param_length = root.blocks.get_param_length(alpha.substring(block_length));
        return [alpha.substring(block_length + param_length + 2), new root.blocks.jump((new root.line_buf()).append(alpha.substr(block_length + 1, param_length)))];
    };

    root.blocks.jump.test = function(alpha) { return /^\\jump/.test(alpha); };

})(this.latex);

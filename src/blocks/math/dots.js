(function(root){
    'use strict';

    root.blocks.cdots = function(){
        var self = {};
        self.dots = '···';

        this.get_block_width = function(cursor){
            return cursor.get_measure(self.dots).width;
        };

        this.get_block_height = function(cursor){
            return cursor.get_measure(self.dots).height;
        };

        this.block_render = function(cursor){
            cursor.write_word(self.dots);
        };
    };

    root.blocks.cdots.prototype = root.blocks.abstract_block;

    root.blocks.cdots.build = function(alpha){
        const block_length = 6;
        return [alpha.substring(block_length), new root.blocks.cdots()];
    };

    root.blocks.cdots.test = function(alpha) { return /^\\cdots/.test(alpha); };

    root.blocks.vdots = function(){
        var self = {};
        self.dots = '·';

        this.get_block_width = function(cursor){
            return cursor.get_measure(self.dots).width;
        };

        this.get_block_height = function(cursor){
            return cursor.get_measure(self.dots).height * 2;
        };

        this.block_render = function(cursor){
            const origin_y = cursor.get_y();
            const origin_x = cursor.get_x();
            const dots_height = cursor.get_measure(self.dots).height;
            cursor.write_word(self.dots);
            cursor.set_x(origin_x).set_y(origin_y - 0.5 * dots_height);
            cursor.write_word(self.dots);
            cursor.set_x(origin_x).set_y(origin_y - dots_height);
            cursor.write_word(self.dots);
        };
    };

    root.blocks.vdots.prototype = root.blocks.abstract_block;
    
    root.blocks.vdots.build = function(alpha){
        const block_length = 6;
        return [alpha.substring(block_length), new root.blocks.vdots()];
    };
})(this.latex);
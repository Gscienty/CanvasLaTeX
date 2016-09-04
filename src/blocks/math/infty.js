(function(root){
    'use strict';

    root.blocks.infty = function(){
        var self = {};
        self.word = '∞';

        this.get_block_width = function(cursor){
            return cursor.get_measure(self.word).width;
        };

        this.get_block_height = function(cursor){
            return cursor.get_measure(self.word).height;
        };

        this.block_render = function(cursor){
            cursor.write_word(self.word);
        };
    };

    root.blocks.infty.prototype = root.blocks.abstract_block;

    root.blocks.infty.build = function(alpha){
        const block_length = 6;
        return [alpha.substring(block_length), new root.blocks.infty()];
    };

    root.blocks.infty.test = function(alpha) { return /^\\infty/.test(alpha); };

})(this.latex);
(function(root){
    'use strict';

    root.blocks.alpha = function(){
        var self = {};
        self.word = 'α';

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

    root.blocks.alpha.prototype = root.blocks.abstract_block;

    root.blocks.alpha.build = function(alpha){
        const block_length = 6;
        return [alpha.substring(block_length), new root.blocks.alpha()];
    };

    root.blocks.alpha.test = function(alpha) { return /^\\alpha/.test(alpha); };

})(this.latex);
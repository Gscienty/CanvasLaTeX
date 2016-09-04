(function(root){
    'use strict';

    root.blocks.times = function(){
        var self = {};
        self.word = '×';

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

    root.blocks.times.prototype = root.blocks.abstract_block;

    root.blocks.times.build = function(alpha){
        const block_length = 6;
        return [alpha.substring(block_length), new root.blocks.times()];
    };

    root.blocks.times.test = function(alpha) { return /^\\times/.test(alpha); };

})(this.latex);
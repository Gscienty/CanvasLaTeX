(function(root){
    'use strict';

    root.blocks.delta = function(){
        var self = {};
        self.word = 'Δ';

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

    root.blocks.delta.prototype = root.blocks.abstract_block;

    root.blocks.delta.build = function(alpha){
        const block_length = 6;
        return [alpha.substring(block_length), new root.blocks.delta()];
    };

    root.blocks.delta.test = function(alpha) { return /^\\delta/.test(alpha); };

})(this.latex);
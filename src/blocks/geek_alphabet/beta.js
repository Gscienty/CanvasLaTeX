(function(root){
    'use strict';

    root.blocks.beta = function(){
        var self = {};
        self.word = 'β';

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

    root.blocks.beta.prototype = root.blocks.abstract_block;

    root.blocks.beta.build = function(alpha){
        const block_length = 5;
        return [alpha.substring(block_length), new root.blocks.beta()];
    };

    root.blocks.beta.test = function(alpha) { return /^\\beta/.test(alpha); };

})(this.latex);
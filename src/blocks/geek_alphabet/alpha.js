(function(root){
    'use strict';

    root.blocks.alpha = {};
    root.blocks.alpha.build = function(alpha){ return root.blocks.simple.build('α' + alpha.substring(6)); };
    root.blocks.alpha.test = function(alpha) { return /^\\alpha/.test(alpha); };

    root.blocks.A = {};
    root.blocks.A.build = function(alpha){ return root.block_length.simple.build('A' + alpha.substring(2)); };
    root.blocks.A.test = function(alpha) { return /^\\A/.test(alpha); };
})(this.latex);
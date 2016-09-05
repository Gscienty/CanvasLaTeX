(function(root){
    'use strict';

    root.blocks.beta = {};
    root.blocks.beta.build = function(alpha){ return root.blocks.simple.build('β' + alpha.substring(5)); };
    root.blocks.beta.test = function(alpha) { return /^\\beta/.test(alpha); };

    root.blocks.B = {};
    root.blocks.B.build = function(alpha){ return root.blocks.simple.build('B' + alpha.substring(2)); };
    root.blocks.B.test = function(alpha) { return /^\\B/.test(alpha); };
})(this.latex);
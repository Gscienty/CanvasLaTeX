(function(root){
    'use strict';

    root.blocks.epsilon = {};
    root.blocks.epsilon.build = function(alpha){ return root.blocks.simple.build('ε' + alpha.substring(8)); };
    root.blocks.epsilon.test = function(alpha) { return /^\\epsilon/.test(alpha); };

    root.blocks.Epsilon = {};
    root.blocks.Epsilon.build = function(alpha){ return root.block_length.simple.build('E' + alpha.substring(8)); };
    root.blocks.Epsilon.test = function(alpha) { return /^\\Epsilon/.test(alpha); };
})(this.latex);
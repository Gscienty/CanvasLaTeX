(function(root){
    'use strict';

    root.blocks.Delta = {};
    root.blocks.Delta.build = function(alpha){ return root.blocks.simple.build('Δ' + alpha.substring(6)); };
    root.blocks.Delta.test = function(alpha) { return /^\\Delta/.test(alpha); };

    root.blocks.delta = {};
    root.blocks.delta.build = function(alpha){ return root.blocks.simple.build('δ' + alpha.substring(6)); };
    root.blocks.delta.test = function(alpha) { return /^\\delta/.test(alpha); };
})(this.latex);
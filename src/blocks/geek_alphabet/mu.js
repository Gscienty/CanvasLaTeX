(function(root){
    'use strict';

    root.blocks.mu = {};
    root.blocks.mu.build = function(alpha){ return root.blocks.simple('μ' + alpha.substring(3)); };
    root.blocks.mu.test = function(alpha) { return /^\\mu/.test(alpha); };


    root.blocks.Mu = {};
    root.blocks.Mu.build = function(alpha){ return root.blocks.simple('Μ' + alpha.substring(3)); };
    root.blocks.Mu.test = function(alpha) { return /^\\Mu/.test(alpha); };

})(this.latex);
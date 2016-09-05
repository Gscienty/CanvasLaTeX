(function(root){
    'use strict';

    root.blocks.sigma = {};
    root.blocks.sigma.build = function(alpha){ return root.blocks.simple.build('σ' + alpha.substring(6)); };
    root.blocks.sigma.test = function(alpha) { return /^\\sigma/.test(alpha); };


    root.blocks.Sigma = {};
    root.blocks.Sigma.build = function(alpha){ return root.blocks.simple.build('∑' + alpha.substring(6)); };
    root.blocks.Sigma.test = function(alpha) { return /^\\Sigma/.test(alpha); };

})(this.latex);
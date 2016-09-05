(function(root){
    'use strict';

    root.blocks.gamma = {};
    root.blocks.gamma.build = function(alpha){ return root.blocks.simple('γ' + alpha.substring(6)); };
    root.blocks.gamma.test = function(alpha) { return /^\\gamma/.test(alpha); };


    root.blocks.Gamma = {};
    root.blocks.Gamma.build = function(alpha){ return root.blocks.simple('Γ' + alpha.substring(6)); };
    root.blocks.Gamma.test = function(alpha) { return /^\\Gamma/.test(alpha); };

})(this.latex);
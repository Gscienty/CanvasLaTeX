(function(root){
    'use strict';

    root.blocks.tau = {};
    root.blocks.tau.build = function(alpha){ return root.blocks.simple('τ' + alpha.substring(4)); };
    root.blocks.tau.test = function(alpha) { return /^\\tau/.test(alpha); };


    root.blocks.Tau = {};
    root.blocks.Tau.build = function(alpha){ return root.blocks.simple('Τ' + alpha.substring(4)); };
    root.blocks.Tau.test = function(alpha) { return /^\\Tau/.test(alpha); };

})(this.latex);
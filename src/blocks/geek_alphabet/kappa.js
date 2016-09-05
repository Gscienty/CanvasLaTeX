(function(root){
    'use strict';

    root.blocks.kappa = {};
    root.blocks.kappa.build = function(alpha){ return root.blocks.simple('κ' + alpha.substring(6)); };
    root.blocks.kappa.test = function(alpha) { return /^\\kappa/.test(alpha); };


    root.blocks.Kappa = {};
    root.blocks.Kappa.build = function(alpha){ return root.blocks.simple('Κ' + alpha.substring(6)); };
    root.blocks.Kappa.test = function(alpha) { return /^\\Kappa/.test(alpha); };

})(this.latex);
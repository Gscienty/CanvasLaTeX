(function(root){
    'use strict';

    root.blocks.rho = {};
    root.blocks.rho.build = function(alpha){ return root.blocks.simple.build('ρ' + alpha.substring(4)); };
    root.blocks.rho.test = function(alpha) { return /^\\rho/.test(alpha); };


    root.blocks.Rho = {};
    root.blocks.Rho.build = function(alpha){ return root.blocks.simple.build('Ρ' + alpha.substring(4)); };
    root.blocks.Rho.test = function(alpha) { return /^\\Rho/.test(alpha); };

})(this.latex);
(function(root){
    'use strict';

    root.blocks.psi = {};
    root.blocks.psi.build = function(alpha){ return root.blocks.simple.build('ψ' + alpha.substring(4)); };
    root.blocks.psi.test = function(alpha) { return /^\\psi/.test(alpha); };


    root.blocks.Psi = {};
    root.blocks.Psi.build = function(alpha){ return root.blocks.simple.build('Ψ' + alpha.substring(4)); };
    root.blocks.Psi.test = function(alpha) { return /^\\Psi/.test(alpha); };

})(this.latex);
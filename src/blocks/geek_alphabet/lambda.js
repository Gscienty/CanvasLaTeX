(function(root){
    'use strict';

    root.blocks.lambda = {};
    root.blocks.lambda.build = function(alpha){ return root.blocks.simple.build('λ' + alpha.substring(7)); };
    root.blocks.lambda.test = function(alpha) { return /^\\lambda/.test(alpha); };

    root.blocks.Lambda = {};
    root.blocks.Lambda.build = function(alpha){ return root.blocks.simple.build('∧' + alpha.substring(7)); };
    root.blocks.Lambda.test = function(alpha) { return /^\\Lambda/.test(alpha); };
})(this.latex);
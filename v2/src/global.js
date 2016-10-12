(() => {
    'use strict';

    this.latex = {};
    this.latex.blocks = {};

    this.latex.blocks.interface = {
        width : (cursor) => { return this.width(cursor); },
        height : (cursor) => { return this.height(cursor); },
        render : (cursor) => { this.render(cursor); },
        name : () =>  { return this.name; }
    };

    this.latex.blocks.parameter_length = (alpha) => {
        var result = 0;
        var stack = [];
        for(var i = 0; i < alpha.length; i++){
            if(stack.length != 0) { result++; };
            if(alpha[i] === '\\' && (alpha[i + 1] === '{' || alpha[i + 1] === '}')) {
                if(stack.length != 0) { result++; };
                i++;
                continue; 
            };
            if(alpha[i] === '{'){
                stack.push('{');
            }
            else if(alpha[i] == '}'){
                stack.pop();
                if(stack.length === 0) return result - 1;
            };
        };
        return 0;
    };
}).call(this);
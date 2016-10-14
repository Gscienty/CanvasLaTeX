((global) => {
    Array.prototype.each = function(func) {
        for(var i = 0; i < this.length; i++){
            func(this[i]);
        };
    };

    Number.prototype.add = function(num) { return this + num; };
    Number.prototype.mul = function(num) { return this * num; };


    Object.prototype.each = function(func) {
        for(var name in this){
            if(name === 'each' || name === 'get') continue;
            func(name, this[name]);
        };
    };

    Object.prototype.get = function(judgefunc) {
        for(var name in this){
            if(judgefunc(name, this[name])) { return this[name]; };
        };
        return null;
    };

    global.latex = {};
    global.latex.blocks = {};

    global.latex.utils = {
        GetParameterLength : (alpha) => {
            var result = 0;
            var stack = [];
            for(var i = 0; i < alpha.length; i++){
                if(stack.length != 0) { result++; };
                if(alpha[i] === '\\' && (alpha[i + 1] === '{ ' || alpha[i + 1] === '}')){
                    if(stack.length != 0) { result++; };
                    i++;
                    continue;
                };
                if(alpha[i] === '{'){
                    stack.push('{');
                }
                else if(alpha[i] === '}'){
                    stack.pop();
                    if(stack.length === 0) { return result - 1};
                };
            };

            return 0;
        },

        InstanceCopy : (obj) => {
            var result = {};
            for(var name in obj) {
                result[name] = obj[name];
            };
            return result;
        }
    };
})(this);
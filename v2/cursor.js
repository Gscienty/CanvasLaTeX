((root) => {
    'use strict';

    root.cursor = {
        GetInstance : (canvas) => {
            var self = {};

            self.context = canvas.getContext('2d');
            self.size = 18;
            self.family = 'new times roman';
            self.color = 'black';
            self.style = 'normal';
            self.position = { X : 0, Y : 56 };

            self.Assemble = () => {
                self.context.font = self.style + ' ' + self.size + 'px ' + self.family;
                self.context.fillStyle = self.color;
            };

            var instance = {
                GetPosition : () => { return root.utils.InstanceCopy(self.position); },
                SetPosition : (position) => {
                    if(position.X != undefined) { self.position.X = position.X; };
                    if(position.Y != undefined) { self.position.Y = position.Y; };
                },

                GetStyle : () => { return self.style; },
                SetStyle : (style) => { self.style = style; },

                GetSize : () => { return self.size; },
                SetSize : (size) => { self.size = size; },
                
                GetMeasure : (word) => {
                    self.Assemble();
                    return { Width : self.context.measureText(word).width, Height : instance.GetSize().mul(0.818) };
                },

                Write : (word) => {
                    self.Assemble();
                    self.context.fillText(word, self.position.X, self.position.Y);
                    self.position.X = self.position.X.add(instance.GetMeasure(word).Width);
                }
            };

            return instance;
        }
    };
})(this.latex);
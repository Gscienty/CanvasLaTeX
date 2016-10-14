((root) => {
    'use strict';
    root.buf = {
        CreateBuf : () => {
            var self = {};
            self.queue = [];

            var instance = {
                OutQueue : () => { return self.queue.shift(); },
                Count : () => { return self.queue.length; },
                HeadBlock : ()  => { return self.queue[0]; },
                InQueue : (block) => { self.queue.push(block); },
                GetWidth : (cursor) => {
                    var result = 0;
                    self.queue.each((instance) => { result = result.add(instance.GetWidth(cursor)); });
                    return result;
                },
                GetHeight : (cursor) => {
                    var result = 0;
                    self.queue.each((instance) => { result = Math.max(result, instance.GetHeight(cursor)); });
                    return result;
                },
                TransferText : (text) => {
                    var word = text;
                    while(word.length > 0){
                        var tuple = ((alpha) => {
                            var block = root.blocks.get((name, instance) => { return name != 'simple' && instance.Test && instance.Test(alpha); });
                            return (block === null ? root.blocks.simple : block).Build(alpha);
                        })(word);
                        word = tuple.Remainder;
                        instance.InQueue(tuple.Instance);
                    };
                    return instance;
                },
                Render : (cursor) => {
                    const position = cursor.GetPosition();
                    self.queue.each((instance) => {
                        cursor.SetPosition({ Y : position.Y });
                        instance.Render(cursor);
                    });
                    cursor.SetPosition({ Y : position.Y });
                }
            };

            return instance;
        }
    };

})(this.latex);
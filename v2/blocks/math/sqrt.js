((root) => {
    'use strict';

    root.blocks.sqrt = {
        GetInstance : (n, buf) => {
            var self = {};
            self.n = n;
            self.buf = buf;
            self.innerVerticalSpacing = 0.1;
            self.smallRatio = 0.7;

            var instance = {
                Name : 'sqrt',
                GetWidth : (cursor) => {
                    const member = cursor.GetSize();
                    cursor.SetSize(member.mul(self.smallRatio));
                    var result = cursor.GetMeasure(self.n).Width;
                    cursor.SetSize(member);
                }
            };

            return instance;
        }
    };
})(this.latex);
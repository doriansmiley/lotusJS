'use strict';

/* jasmine specs for controllers go here */
describe('FileTest', function() {

  describe('Lotus.File', function(){

    it('should test default File values', function() {
        var model = new Lotus.File();
        var fileObj = {};
        model.name = 'test';//String
        model.percentLoaded = 50;//int
        model.thumbnail = 'someURL';//String
        model.state = Lotus.File.LOAD;//String
        model.type = 'image/jpg';//String
        model.fileObj = fileObj;//String
        expect(model.name).toBe('test');
        expect(model.percentLoaded).toBe(50);
        expect(model.thumbnail).toBe('someURL');
        expect(model.type).toBe('image/jpg');
        expect(model.state).toBe(Lotus.File.LOAD);
        expect(model.fileObj == fileObj).toBe(true);
    });

  });
});

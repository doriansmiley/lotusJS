'use strict';

/* jasmine specs for controllers go here */
describe('FileViewTest', function() {

  describe('Lotus.FileView', function(){

    it('should test default FileView values', function() {
        var component = new Lotus.FileView();
        var element = document.createElement('div');
        document.body.appendChild(element);
        element.innerHTML = '<div>' +
            '<label data-skin-part="fileLabel">File Label</label>' +
            '<label data-skin-part="fileTypeLabel">File Type</label>' +
            '<div data-skin-part="progressBar" style="background-color: red"></div>' +
            '<button data-skin-part="cancelBtn">Cancel</button>' +
            '<button data-skin-part="clearBtn">Clear</button>' +
            '<div data-skin-part="statusIndicator">' +
                '<img data-skin-part="loadIndicator"/>' +
                '<img data-skin-part="errorIndicator"/>' +
                '<img data-skin-part="progressIndicator"/>' +
                '<img data-skin-part="pendingIndicator"/>' +
                '<img data-skin-part="abortIndicator"/>' +
            '</div>' +
            '<img data-skin-part="thumbnail"/>' +
            '</div>';
        component.element = element;
        component.id = '1234';
        var model = new Lotus.File();
        model.type = 'jpg';
        model.name = 'myFile.jpg';
        model.percentLoaded = 0;
        model.thumbnail = 'someThumbPath';
        model.state = Lotus.File.PENDING;
        component.model = model;
        component.init();
        expect( component.element === element ).toBe( true );
        expect( component.model === model ).toBe( true );
        expect( component.id ).toBe( '1234' );
        expect( component.fileLabel === element.querySelector('[data-skin-part=fileLabel]') ).toBe( true );
        expect( component.fileTypeLabel === element.querySelector('[data-skin-part=fileTypeLabel]') ).toBe( true );
        expect( component.progressBar === element.querySelector('[data-skin-part=progressBar]') ).toBe( true );
        expect( component.cancelBtn === element.querySelector('[data-skin-part=cancelBtn]') ).toBe( true );
        expect( component.clearBtn === element.querySelector('[data-skin-part=clearBtn]') ).toBe( true );
        expect( component.statusIndicator === element.querySelector('[data-skin-part=statusIndicator]') ).toBe( true );
        //the following elements were removed based on the model's status, so they should be defined but are not a child of the element
        expect( component.loadIndicator ).toBeDefined();
        expect( component.errorIndicator ).toBeDefined();
        expect( component.progressIndicator ).toBeDefined();
        //end
        expect( component.pendingIndicator === element.querySelector('[data-skin-part=pendingIndicator]') ).toBe( true );
        expect( component.thumbnail === element.querySelector('[data-skin-part=thumbnail]') ).toBe( true );
        expect( element.querySelector('[data-skin-part=statusIndicator]').childNodes.length ).toBe( 1 );
        expect( element.querySelector('[data-skin-part=statusIndicator]').firstChild == element.querySelector('[data-skin-part=pendingIndicator]') ).toBe( true );
        expect( element.querySelector('[data-skin-part=progressBar]').style.width ).toBe( '0px' );
        model.state = Lotus.File.ABORT;
        expect( element.querySelector('[data-skin-part=statusIndicator]').firstChild == element.querySelector('[data-skin-part=abortIndicator]') ).toBe( true );
        model.state = Lotus.File.LOAD;
        expect( element.querySelector('[data-skin-part=statusIndicator]').firstChild == element.querySelector('[data-skin-part=loadIndicator]') ).toBe( true );
        model.state = Lotus.File.ERROR;
        expect( element.querySelector('[data-skin-part=statusIndicator]').firstChild == element.querySelector('[data-skin-part=errorIndicator]') ).toBe( true );
        model.state = Lotus.File.PROGRESS;
        expect( element.querySelector('[data-skin-part=statusIndicator]').firstChild == element.querySelector('[data-skin-part=progressIndicator]') ).toBe( true );
        component.destroy();
        expect( component.element === null ).toBe( true );
        expect( component.model === null ).toBe( true );
        expect( component.id ).toBe( null );
    });

  });
});

'use strict';

/* jasmine specs for controllers go here */
describe('FileCollectionViewTest', function() {

  describe('Lotus.DragDropFileCollectionView', function(){

    it('should test default DragDropFileCollectionView values', function() {
        var component = new Lotus.DragDropFileCollectionView();
        var element = document.createElement('div');
        element.setAttribute('data-attribute-item-view', 'Lotus.FileView');
        document.body.appendChild(element);
        element.innerHTML = '<input type="file" id="fileElem" multiple accept="image/*" style="display:none" data-skin-part="fileInput"/>' +
            '<a href="#" id="fileSelect" data-skin-part="selectBtn">Select some files</a>' +
            '<div data-skin-part="collectionContainer">' +
                '<div data-skin-part="itemTemplate">' +
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
                    '<img data-skin-part="thumbnail"/>' +
                '</div>' +
            '</div>';
        var collectionContainer = element.querySelector('[data-skin-part=collectionContainer]');
        var itemTemplate = element.querySelector('[data-skin-part=itemTemplate]');
        var selectBtn = element.querySelector('[data-skin-part=selectBtn]');
        var fileInput = element.querySelector('[data-skin-part=fileInput]');
        component.element = element;
        component.id = '1234';
        component.init();
        expect( component.element === element ).toBe( true );
        expect( component.id ).toBe( '1234' );
        expect( component.collectionContainer === collectionContainer ).toBe( true );
        expect( component.itemTemplate === itemTemplate ).toBe( true );
        expect( component.selectBtn === selectBtn ).toBe( true );
        expect( component.fileInput === fileInput ).toBe( true );
        expect( component.itemView === 'Lotus.FileView' ).toBe( true );
        expect( component.createChildView() instanceof Lotus.FileView ).toBe( true );
        component.collection.addItem( new Lotus.File() );
        component.collection.addItem( new Lotus.File() );
        component.collection.addItem( new Lotus.File() );
        component.collection.addItem( new Lotus.File() );
        expect( component.collection.length ).toBe( 4 );
        expect( component.collectionContainer.childNodes.length ).toBe( 4 );
        component.collection.removeItemAt(2);
        expect( component.collection.length ).toBe( 3 );
        expect( component.collectionContainer.childNodes.length ).toBe( 3 );
        expect( component.childViews.length ).toBe( 3 );
        component.collection.clear();
        expect( component.collection.length ).toBe( 0 );
        expect( component.collectionContainer.childNodes.length ).toBe( 0 );
        expect( component.childViews.length ).toBe( 0 );
        component.collection.addAll([new Lotus.File(),new Lotus.File(),new Lotus.File()]);
        expect( component.collection.length ).toBe( 3 );
        expect( component.collectionContainer.childNodes.length ).toBe( 3 );
        expect( component.childViews.length ).toBe( 3 );
        component.destroy();
        expect( component.element === null ).toBe( true );
        expect( component.id ).toBe( null );
        expect( component.collection ).toBe( null );
        expect( component.collectionContainer ).toBe( null );
        expect( component.childViews ).toBe( null );
    });

  });
});

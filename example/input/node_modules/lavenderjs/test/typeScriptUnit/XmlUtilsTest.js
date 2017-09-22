/**
 * Created by dsmiley on 7/11/17.
 */
describe('Lavender.XmlUtils', function(){

    it('Testing Lavender.XmlUtils', function() {
        var document = Lavender.XmlUtils.createXMLDocument('<SpiDataExport/>');
        var testXML = document.createElement('LayoutBookMap');
        testXML.setAttribute('dtdVersion', '2.8.0');
        expect(Lavender.XmlUtils.getXmlStringFromElement(testXML) ).toBe('<LayoutBookMap dtdVersion="2.8.0"/>');
    });

});
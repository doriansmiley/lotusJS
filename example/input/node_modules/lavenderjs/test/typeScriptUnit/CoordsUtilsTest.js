/**
 * Created by dsmiley on 5/19/17.
 */
describe('Lavender.CoordsUtils', function(){

    it('Testing Lavender.CoordsUtils', function() {
        try{
            if(module && module.exports){
                return;
            }
        }catch(e){
            if(e){
                var newDiv = document.createElement("div");
                var newContent = document.createTextNode("Hi there and greetings!");
                newDiv.appendChild(newContent); //add the text node to the newly created div.

                document.body.appendChild(newDiv);
                var globalToLocal = Lavender.CoordsUtils.globalToLocal(newDiv, 100, 100);
                console.log(JSON.stringify(globalToLocal));
                expect(globalToLocal.top).toBe(92);
                expect(globalToLocal.left).toBe(92);
            }
        }
    });

});
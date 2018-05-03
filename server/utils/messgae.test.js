const expect=require('expect');
const {generateMessage}=require('./message');

describe('generateMessage',()=>{
    it('should generate the correct message object',()=>{
        const res=generateMessage('Abel',"New Text");
        expect(res.from).toBe('Abel');
        expect(res.text).toBe('New Text');
        expect(res.createdAt).toBeA('number');
    })
})
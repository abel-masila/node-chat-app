const expect=require('expect');
const {generateMessage,generateLocationMessage}=require('./message');

describe('generateMessage',()=>{
    it('should generate the correct message object',()=>{
        const res=generateMessage('Abel',"New Text");
        expect(res.from).toBe('Abel');
        expect(res.text).toBe('New Text');
        expect(res.createdAt).toBeA('number');
    });
});
describe('generateLocationMessage',()=>{
    it('should generate correct location object',()=>{
        const url="https://www.google.com/maps?q=1,1";
        const res=generateLocationMessage('Abel', 1,1);
        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({from:'Abel',url});
    });
});
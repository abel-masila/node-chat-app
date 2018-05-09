const expect=require('expect');
const {Users}=require('./users');

describe('addUser method test',()=>{
    var users;
    beforeEach(()=>{
      users=new Users();
      users.users=[{
          id:'1',
          name:"Mike",
          room:"JS"
      },{
        id:'2',
        name:"Ben",
        room:"Java"
      },{
        id:'3',
        name:"Lee",
        room:"JS"
      }];
    });
    it('should add new user',()=>{
        const users=new Users();
        const user= {
            id: '1',
            name:"Abel",
            room:"Socket.io"
        };
        const res=users.addUser(user.id,user.name,user.room);
        expect(users.users).toEqual([user]);
        //expect(res).toInclude(user);
    });
    it('should return names for JS room',()=>{
        const userList=users.getUserList('JS');
        expect(userList).toEqual(['Mike','Lee']);
    });
    it('should return names for Java room',()=>{
        const userList=users.getUserList('Java');
        expect(userList).toEqual(['Ben']);
    });
    it('should find user',()=>{
        const userId='1';
        const user=users.getUser(userId);
        expect(user.id).toBe(userId);
    });
    it('should not find user',()=>{
        const userId='90';
        const user=users.getUser(userId);
        expect(user).toNotExist();
    });
    it('should remove a user',()=>{
        const userId='1';
        const user=users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });
    it('should not remove a user',()=>{
        const userId='900';
        const user=users.removeUser(userId);
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });
});
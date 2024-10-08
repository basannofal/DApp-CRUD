// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;


contract crud {

    uint nextId = 0;
    struct user{
        uint uid;
        string name;
        uint age;
    }    

    user[] public users;

    constructor() {
        nextId = 1;
    }

    function createUser(string memory name, uint age) public returns (string memory ){
        users.push(user(nextId, name, age));
        nextId++;
        return (name);
    }

    function getUser(uint id) public view returns (user memory){
        for(uint i=0; i<users.length; i++){
            if(users[i].uid == id){
                return users[i];
            }
        }

        revert("No member found");
    }

    function getUsers() public view returns (user[] memory){
        return users;
    } 

    function updateUser(string memory name, uint age, uint id ) public returns (bool){
         for(uint i=0; i<users.length; i++){
            if(users[i].uid == id){
                users[i].name = name;
                users[i].age = age;
                return true;
            }
        }
        return false;
    }

    function deleteUser(uint id ) public returns (bool){
        for(uint i=0; i<users.length; i++){
            if(users[i].uid == id){
                delete users[i];
                return true;
            }
        }
        return false;
    }

}
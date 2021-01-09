
let data = {
    test1: { username: "test1", password: "testone", acno: 1001, balance: 50000, history: [] },
    test2: { username: "test2", password: "testtwo", acno: 1002, balance: 5000, history: [] },
    test3: { username: "test3", password: "testthree", acno: 1003, balance: 6000, history: [] },
    test4: { username: "test4", password: "testfour", acno: 1005, balance: 10000, history: [] }
}
let currentUser;
function getUsers() {
    return data;
}


function addUser(username, password, acno) {
    data[username] = { username, password, acno, history: [], balance: 0 }; // setting new user details , new user details will store to data object
}
function setCurrentUser(usname) {
    currentUser = usname;
}

module.exports = {
    // getUsers: ()=> {
    //   return data;  
    // }
    getUsers:getUsers,// property:function name
    addUser:addUser,
    setCurrentUser:setCurrentUser
}



//Jan 1st 1970 00:00 UTC
// const date=new Date();
// console.log(date.getMonth());

const moment=require('moment');

// const date=moment();
// date.add(10,'year').subtract(10,'months');
// console.log(date.format('MMM Do, YYYY '));

const newDate=moment();
console.log(newDate.format('h:mm a'));
const createdAt=132;

const date=moment(createdAt)
console.log(date.format('MMM Do, YYYY'));
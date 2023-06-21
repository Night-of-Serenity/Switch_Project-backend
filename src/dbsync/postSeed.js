const { Post } = require("../models");

const userSeed = async () => {
  const postData = [
    {
      userId: 1,
      textcontent: "mrwc4OXPdf",
      imageUrl: "http://dummyimage.com/137x100.png/ff4444/ffffff",
    },
    {
      userId: 2,
      textcontent: "E5VJVC406q",
      imageUrl: "http://dummyimage.com/237x100.png/dddddd/000000",
    },
    {
      userId: 3,
      textcontent: "SYWJcGYbFQ",
      imageUrl: "http://dummyimage.com/179x100.png/cc0000/ffffff",
    },
    {
      userId: 4,
      textcontent: "9Qri4VPIOj",
      imageUrl: "http://dummyimage.com/217x100.png/dddddd/000000",
    },
    {
      userId: 5,
      textcontent: "nlh76vrW5f",
      imageUrl: "http://dummyimage.com/130x100.png/5fa2dd/ffffff",
    },
    {
      userId: 6,
      textcontent: "9bfinvDOkL",
      imageUrl: "http://dummyimage.com/245x100.png/ff4444/ffffff",
    },
    {
      userId: 7,
      textcontent: "IokygopxBM",
      imageUrl: "http://dummyimage.com/236x100.png/ff4444/ffffff",
    },
    {
      userId: 8,
      textcontent: "7fR0gnuB6J",
      imageUrl: "http://dummyimage.com/161x100.png/5fa2dd/ffffff",
    },
    {
      userId: 9,
      textcontent: "3l089PwA4x",
      imageUrl: "http://dummyimage.com/182x100.png/dddddd/000000",
    },
    {
      userId: 10,
      textcontent: "0O2WB825K5",
      imageUrl: "http://dummyimage.com/193x100.png/cc0000/ffffff",
    },
    {
      userId: 11,
      textcontent: "54VHiIhWgE",
      imageUrl: "http://dummyimage.com/118x100.png/5fa2dd/ffffff",
    },
    {
      userId: 12,
      textcontent: "T24O99395J",
      imageUrl: "http://dummyimage.com/126x100.png/5fa2dd/ffffff",
    },
    {
      userId: 13,
      textcontent: "xjIVuX098q",
      imageUrl: "http://dummyimage.com/162x100.png/cc0000/ffffff",
    },
    {
      userId: 14,
      textcontent: "96si7kN367",
      imageUrl: "http://dummyimage.com/191x100.png/5fa2dd/ffffff",
    },
    {
      userId: 15,
      textcontent: "1E6fEPG5XG",
      imageUrl: "http://dummyimage.com/227x100.png/cc0000/ffffff",
    },
    {
      userId: 16,
      textcontent: "Lep4SUL8p6",
      imageUrl: "http://dummyimage.com/170x100.png/5fa2dd/ffffff",
    },
    {
      userId: 17,
      textcontent: "QyVRexZDwu",
      imageUrl: "http://dummyimage.com/130x100.png/dddddd/000000",
    },
    {
      userId: 18,
      textcontent: "Nzx4olo3um",
      imageUrl: "http://dummyimage.com/116x100.png/ff4444/ffffff",
    },
    {
      userId: 19,
      textcontent: "125AGE5v8L",
      imageUrl: "http://dummyimage.com/101x100.png/cc0000/ffffff",
    },
    {
      userId: 20,
      textcontent: "vv72qOZK7J",
      imageUrl: "http://dummyimage.com/106x100.png/dddddd/000000",
    },
  ];

  let res = await Post.bulkCreate(postData);
  // console.log(res);
  // process.exit(0);
};
// userSeed();

module.exports = userSeed;

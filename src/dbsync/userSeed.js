const { User } = require("../models");
require("dotenv").config();
const bcryptService = require("../services/bcryptService");

const userSeed = async () => {
  const userData = [
    {
      id: 1,
      username: "jboij0",
      firstName: "Jilleen",
      lastName: "Boij",
      email: "jboij0@cbslocal.com",
      coverImageUrl: "http://dummyimage.com/210x100.png/5fa2dd/ffffff",
    },
    {
      id: 2,
      username: "lshortall1",
      firstName: "Luz",
      lastName: "Shortall",
      email: "lshortall1@cbslocal.com",
      coverImageUrl: "http://dummyimage.com/110x100.png/cc0000/ffffff",
    },
    {
      id: 3,
      username: "echeeld2",
      firstName: "Eilis",
      lastName: "Cheeld",
      email: "echeeld2@behance.net",
      coverImageUrl: "http://dummyimage.com/187x100.png/dddddd/000000",
    },
    {
      id: 4,
      username: "crudinger3",
      firstName: "Cordula",
      lastName: "Rudinger",
      email: "crudinger3@vistaprint.com",
      coverImageUrl: "http://dummyimage.com/101x100.png/5fa2dd/ffffff",
    },
    {
      id: 5,
      username: "aayer4",
      firstName: "Aloisia",
      lastName: "Ayer",
      email: "aayer4@wordpress.com",
      coverImageUrl: "http://dummyimage.com/162x100.png/cc0000/ffffff",
    },
    {
      id: 6,
      username: "mchapell5",
      firstName: "Marcia",
      lastName: "Chapell",
      email: "mchapell5@adobe.com",
      coverImageUrl: "http://dummyimage.com/199x100.png/cc0000/ffffff",
    },
    {
      id: 7,
      username: "gbruinemann6",
      firstName: "Godwin",
      lastName: "Bruinemann",
      email: "gbruinemann6@yolasite.com",
      coverImageUrl: "http://dummyimage.com/243x100.png/dddddd/000000",
    },
    {
      id: 8,
      username: "xtrasler7",
      firstName: "Xerxes",
      lastName: "Trasler",
      email: "xtrasler7@upenn.edu",
      coverImageUrl: "http://dummyimage.com/174x100.png/5fa2dd/ffffff",
    },
    {
      id: 9,
      username: "platter8",
      firstName: "Pris",
      lastName: "Latter",
      email: "platter8@xinhuanet.com",
      coverImageUrl: "http://dummyimage.com/120x100.png/5fa2dd/ffffff",
    },
    {
      id: 10,
      username: "vregus9",
      firstName: "Vincent",
      lastName: "Regus",
      email: "vregus9@engadget.com",
      coverImageUrl: "http://dummyimage.com/172x100.png/ff4444/ffffff",
    },
    {
      id: 11,
      username: "jshalcrasa",
      firstName: "Jeannie",
      lastName: "Shalcras",
      email: "jshalcrasa@123-reg.co.uk",
      coverImageUrl: "http://dummyimage.com/130x100.png/ff4444/ffffff",
    },
    {
      id: 12,
      username: "btitchardb",
      firstName: "Braden",
      lastName: "Titchard",
      email: "btitchardb@freewebs.com",
      coverImageUrl: "http://dummyimage.com/223x100.png/5fa2dd/ffffff",
    },
    {
      id: 13,
      username: "oparramorec",
      firstName: "Osmund",
      lastName: "Parramore",
      email: "oparramorec@boston.com",
      coverImageUrl: "http://dummyimage.com/186x100.png/dddddd/000000",
    },
    {
      id: 14,
      username: "kthickpennyd",
      firstName: "Kennith",
      lastName: "Thickpenny",
      email: "kthickpennyd@narod.ru",
      coverImageUrl: "http://dummyimage.com/160x100.png/5fa2dd/ffffff",
    },
    {
      id: 15,
      username: "ehierse",
      firstName: "Emalia",
      lastName: "Hiers",
      email: "ehierse@over-blog.com",
      coverImageUrl: "http://dummyimage.com/218x100.png/cc0000/ffffff",
    },
    {
      id: 16,
      username: "mocorrf",
      firstName: "Malvina",
      lastName: "O'Corr",
      email: "mocorrf@youtube.com",
      coverImageUrl: "http://dummyimage.com/141x100.png/5fa2dd/ffffff",
    },
    {
      id: 17,
      username: "htimperleyg",
      firstName: "Helga",
      lastName: "Timperley",
      email: "htimperleyg@shop-pro.jp",
      coverImageUrl: "http://dummyimage.com/227x100.png/dddddd/000000",
    },
    {
      id: 18,
      username: "lcaukillh",
      firstName: "Lion",
      lastName: "Caukill",
      email: "lcaukillh@smugmug.com",
      coverImageUrl: "http://dummyimage.com/191x100.png/cc0000/ffffff",
    },
    {
      id: 19,
      username: "brubinovi",
      firstName: "Barbette",
      lastName: "Rubinov",
      email: "brubinovi@google.com.hk",
      coverImageUrl: "http://dummyimage.com/200x100.png/ff4444/ffffff",
    },
    {
      id: 20,
      username: "wpepineauxj",
      firstName: "Wilma",
      lastName: "Pepineaux",
      email: "wpepineauxj@census.gov",
      coverImageUrl: "http://dummyimage.com/239x100.png/dddddd/000000",
    },
  ];

  const addPassword = async (user) => {
    const hashPassword = await bcryptService.hash(
      "12345678",
      process.env.HASH_SALT
    );
    return { ...user, password: hashPassword };
  };

  let newUserDataPromise = userData.map(async (user) => {
    return addPassword(user);
  });

  const newUserData = await Promise.all(newUserDataPromise);

  let res = await User.bulkCreate(newUserData);
  console.log(res);
  process.exit(0);
};
userSeed();

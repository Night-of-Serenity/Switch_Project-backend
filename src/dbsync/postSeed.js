const { Post } = require("../models");

const userSeed = async () => {
    const postData = [
        {
            userId: 1,
            textcontent: "WetJM68YrT",
            imageUrl: "http://dummyimage.com/174x100.png/cc0000/ffffff",
        },
        {
            userId: 2,
            textcontent: "JK4sy79W3U",
            imageUrl: "http://dummyimage.com/107x100.png/cc0000/ffffff",
        },
        {
            userId: 3,
            textcontent: "bG395i91My",
            imageUrl: "http://dummyimage.com/182x100.png/cc0000/ffffff",
        },
        {
            userId: 4,
            textcontent: "8MM0FPXeNC",
            imageUrl: "http://dummyimage.com/121x100.png/dddddd/000000",
        },
        {
            userId: 5,
            textcontent: "8E1DAOw14c",
            imageUrl: "http://dummyimage.com/216x100.png/ff4444/ffffff",
        },
        {
            userId: 6,
            textcontent: "qrRSe2N2u1",
            imageUrl: "http://dummyimage.com/237x100.png/5fa2dd/ffffff",
        },
        {
            userId: 7,
            textcontent: "7U3rjh18ER",
            imageUrl: "http://dummyimage.com/144x100.png/dddddd/000000",
        },
        {
            userId: 8,
            textcontent: "0QzvJYe58P",
            imageUrl: "http://dummyimage.com/216x100.png/dddddd/000000",
        },
        {
            userId: 9,
            textcontent: "8nmT4vORBC",
            imageUrl: "http://dummyimage.com/135x100.png/5fa2dd/ffffff",
        },
        {
            userId: 10,
            textcontent: "r8cSg5M60Q",
            imageUrl: "http://dummyimage.com/154x100.png/dddddd/000000",
        },
        {
            userId: 11,
            textcontent: "arH4JZiH8E",
            imageUrl: "http://dummyimage.com/113x100.png/5fa2dd/ffffff",
        },
        {
            userId: 12,
            textcontent: "oUb5cix26k",
            imageUrl: "http://dummyimage.com/130x100.png/cc0000/ffffff",
        },
        {
            userId: 13,
            textcontent: "1iOQ1vvr9Q",
            imageUrl: "http://dummyimage.com/151x100.png/ff4444/ffffff",
        },
        {
            userId: 14,
            textcontent: "2Jpxq70Asg",
            imageUrl: "http://dummyimage.com/192x100.png/5fa2dd/ffffff",
        },
        {
            userId: 15,
            textcontent: "A6j9Wgj52N",
            imageUrl: "http://dummyimage.com/133x100.png/dddddd/000000",
        },
        {
            userId: 16,
            textcontent: "a14tvxtTYI",
            imageUrl: "http://dummyimage.com/168x100.png/dddddd/000000",
        },
        {
            userId: 17,
            textcontent: "o7C89HOLpU",
            imageUrl: "http://dummyimage.com/180x100.png/5fa2dd/ffffff",
        },
        {
            userId: 18,
            textcontent: "S44Eq0w067",
            imageUrl: "http://dummyimage.com/122x100.png/ff4444/ffffff",
        },
        {
            userId: 19,
            textcontent: "Jfx6y6Q2P4",
            imageUrl: "http://dummyimage.com/127x100.png/ff4444/ffffff",
        },
        {
            userId: 20,
            textcontent: "6fFLE92f6a",
            imageUrl: "http://dummyimage.com/191x100.png/dddddd/000000",
        },
        {
            userId: 21,
            textcontent: "UY0mY58EA3",
            imageUrl: "http://dummyimage.com/157x100.png/cc0000/ffffff",
        },
        {
            userId: 22,
            textcontent: "1m0r86t650",
            imageUrl: "http://dummyimage.com/232x100.png/ff4444/ffffff",
        },
        {
            userId: 23,
            textcontent: "hl3Sz8DIve",
            imageUrl: "http://dummyimage.com/164x100.png/5fa2dd/ffffff",
        },
        {
            userId: 24,
            textcontent: "20Xc7Jry71",
            imageUrl: "http://dummyimage.com/150x100.png/cc0000/ffffff",
        },
        {
            userId: 25,
            textcontent: "p3V6fhphaa",
            imageUrl: "http://dummyimage.com/183x100.png/5fa2dd/ffffff",
        },
        {
            userId: 26,
            textcontent: "VN9FpNe2Nm",
            imageUrl: "http://dummyimage.com/128x100.png/cc0000/ffffff",
        },
        {
            userId: 27,
            textcontent: "sUk3ElRg75",
            imageUrl: "http://dummyimage.com/156x100.png/cc0000/ffffff",
        },
        {
            userId: 28,
            textcontent: "EuyDk49I87",
            imageUrl: "http://dummyimage.com/240x100.png/ff4444/ffffff",
        },
        {
            userId: 29,
            textcontent: "0428z3q7jG",
            imageUrl: "http://dummyimage.com/220x100.png/dddddd/000000",
        },
        {
            userId: 30,
            textcontent: "9wgb4K7z8d",
            imageUrl: "http://dummyimage.com/240x100.png/cc0000/ffffff",
        },
        {
            userId: 31,
            textcontent: "sd9h7Dr8Sh",
            imageUrl: "http://dummyimage.com/219x100.png/cc0000/ffffff",
        },
        {
            userId: 32,
            textcontent: "OV4N8dZgv6",
            imageUrl: "http://dummyimage.com/195x100.png/5fa2dd/ffffff",
        },
        {
            userId: 33,
            textcontent: "O12WphbKPH",
            imageUrl: "http://dummyimage.com/213x100.png/ff4444/ffffff",
        },
        {
            userId: 34,
            textcontent: "H3polK85Wk",
            imageUrl: "http://dummyimage.com/181x100.png/cc0000/ffffff",
        },
        {
            userId: 35,
            textcontent: "DY8rRO8A57",
            imageUrl: "http://dummyimage.com/200x100.png/cc0000/ffffff",
        },
        {
            userId: 36,
            textcontent: "T96r3w7CBS",
            imageUrl: "http://dummyimage.com/182x100.png/ff4444/ffffff",
        },
        {
            userId: 37,
            textcontent: "6yWAj8Gd94",
            imageUrl: "http://dummyimage.com/172x100.png/ff4444/ffffff",
        },
        {
            userId: 38,
            textcontent: "1W7oc20RJs",
            imageUrl: "http://dummyimage.com/115x100.png/cc0000/ffffff",
        },
        {
            userId: 39,
            textcontent: "R53K2z0062",
            imageUrl: "http://dummyimage.com/161x100.png/dddddd/000000",
        },
        {
            userId: 40,
            textcontent: "ftF253dGIK",
            imageUrl: "http://dummyimage.com/210x100.png/ff4444/ffffff",
        },
        {
            userId: 41,
            textcontent: "jBJxrjWv7W",
            imageUrl: "http://dummyimage.com/219x100.png/cc0000/ffffff",
        },
        {
            userId: 42,
            textcontent: "KXEKt4eLVq",
            imageUrl: "http://dummyimage.com/178x100.png/ff4444/ffffff",
        },
        {
            userId: 43,
            textcontent: "cZFxFOBDta",
            imageUrl: "http://dummyimage.com/214x100.png/ff4444/ffffff",
        },
        {
            userId: 44,
            textcontent: "jBVD5wlvNH",
            imageUrl: "http://dummyimage.com/191x100.png/cc0000/ffffff",
        },
        {
            userId: 45,
            textcontent: "aU01xLqfIo",
            imageUrl: "http://dummyimage.com/154x100.png/ff4444/ffffff",
        },
        {
            userId: 46,
            textcontent: "EC5ea5Y5kC",
            imageUrl: "http://dummyimage.com/152x100.png/cc0000/ffffff",
        },
        {
            userId: 47,
            textcontent: "2Gnu249EIT",
            imageUrl: "http://dummyimage.com/110x100.png/dddddd/000000",
        },
        {
            userId: 48,
            textcontent: "a385fx93jQ",
            imageUrl: "http://dummyimage.com/116x100.png/5fa2dd/ffffff",
        },
        {
            userId: 49,
            textcontent: "0g9L1q4G6N",
            imageUrl: "http://dummyimage.com/188x100.png/dddddd/000000",
        },
        {
            userId: 50,
            textcontent: "vcOHKhr069",
            imageUrl: "http://dummyimage.com/192x100.png/dddddd/000000",
        },
        {
            userId: 51,
            textcontent: "m328487H38",
            imageUrl: "http://dummyimage.com/250x100.png/5fa2dd/ffffff",
        },
        {
            userId: 52,
            textcontent: "hA620gq4x4",
            imageUrl: "http://dummyimage.com/138x100.png/dddddd/000000",
        },
        {
            userId: 53,
            textcontent: "h98hTsRQt9",
            imageUrl: "http://dummyimage.com/119x100.png/5fa2dd/ffffff",
        },
        {
            userId: 54,
            textcontent: "hT7uUQ4egS",
            imageUrl: "http://dummyimage.com/227x100.png/cc0000/ffffff",
        },
        {
            userId: 55,
            textcontent: "2T11bNe6db",
            imageUrl: "http://dummyimage.com/107x100.png/cc0000/ffffff",
        },
        {
            userId: 56,
            textcontent: "W4bCqq9NF2",
            imageUrl: "http://dummyimage.com/210x100.png/cc0000/ffffff",
        },
        {
            userId: 57,
            textcontent: "rymC4JywFn",
            imageUrl: "http://dummyimage.com/185x100.png/dddddd/000000",
        },
        {
            userId: 58,
            textcontent: "T9g0wk9QWn",
            imageUrl: "http://dummyimage.com/167x100.png/dddddd/000000",
        },
        {
            userId: 59,
            textcontent: "f6vuxVVP87",
            imageUrl: "http://dummyimage.com/116x100.png/dddddd/000000",
        },
        {
            userId: 60,
            textcontent: "g7176U3FP5",
            imageUrl: "http://dummyimage.com/188x100.png/cc0000/ffffff",
        },
        {
            userId: 61,
            textcontent: "svvReHiwF5",
            imageUrl: "http://dummyimage.com/142x100.png/dddddd/000000",
        },
        {
            userId: 62,
            textcontent: "W8v6S8j6Mj",
            imageUrl: "http://dummyimage.com/113x100.png/ff4444/ffffff",
        },
        {
            userId: 63,
            textcontent: "17HAJJqw27",
            imageUrl: "http://dummyimage.com/215x100.png/5fa2dd/ffffff",
        },
        {
            userId: 64,
            textcontent: "TJpKUXA818",
            imageUrl: "http://dummyimage.com/214x100.png/dddddd/000000",
        },
        {
            userId: 65,
            textcontent: "fnhZvCliP9",
            imageUrl: "http://dummyimage.com/196x100.png/ff4444/ffffff",
        },
        {
            userId: 66,
            textcontent: "88nYfpPx3S",
            imageUrl: "http://dummyimage.com/131x100.png/5fa2dd/ffffff",
        },
        {
            userId: 67,
            textcontent: "Oz3Crr4r3f",
            imageUrl: "http://dummyimage.com/133x100.png/dddddd/000000",
        },
        {
            userId: 68,
            textcontent: "JS8prD1Cbb",
            imageUrl: "http://dummyimage.com/216x100.png/ff4444/ffffff",
        },
        {
            userId: 69,
            textcontent: "0XF88V5kFd",
            imageUrl: "http://dummyimage.com/207x100.png/5fa2dd/ffffff",
        },
        {
            userId: 70,
            textcontent: "HP92368D7m",
            imageUrl: "http://dummyimage.com/192x100.png/ff4444/ffffff",
        },
        { userId: 71, textcontent: "uF6YtHv7Ko" },
        { userId: 72, textcontent: "jeJpDMri56" },
        { userId: 73, textcontent: "f591W0026r" },
        { userId: 74, textcontent: "8cD1F87Bji" },
        { userId: 75, textcontent: "QN865nhEx2" },
        { userId: 76, textcontent: "8e8isE82lN" },
        { userId: 77, textcontent: "i4QVE6l636" },
        { userId: 78, textcontent: "gq09fnanm2" },
        { userId: 79, textcontent: "q1YeFTAFu4" },
        { userId: 80, textcontent: "6cCD96YI49" },
        { userId: 81, textcontent: "VnOnmDu9K8" },
        { userId: 82, textcontent: "waJN1SgSyd" },
        { userId: 83, textcontent: "l9cZ1Yj959" },
        { userId: 84, textcontent: "s94zRN5fSx" },
        { userId: 85, textcontent: "6R4poD4qcJ" },
        { userId: 86, textcontent: "ddb26LjpZF" },
        { userId: 87, textcontent: "0WuUvXceq3" },
        { userId: 88, textcontent: "1627QT733h" },
        { userId: 89, textcontent: "0NXAn5aL97" },
        { userId: 90, textcontent: "pSLhUe04B2" },
        { userId: 91, textcontent: "8csX0GCwq5" },
        { userId: 92, textcontent: "03psh6k500" },
        { userId: 93, textcontent: "jo00e7Cf04" },
        { userId: 94, textcontent: "dT9fP9gT4F" },
        { userId: 95, textcontent: "yreJHS33Y7" },
        { userId: 96, textcontent: "sY6jUXQRRU" },
        { userId: 97, textcontent: "Nvbt799J8C" },
        { userId: 98, textcontent: "I8fx7iO3Vk" },
        { userId: 99, textcontent: "b6e3GX287V" },
        { userId: 100, textcontent: "YcrEI5SSHP" },
    ];

    let res = await Post.bulkCreate(postData);
    // console.log(res);
    // process.exit(0);
};
// userSeed();

module.exports = userSeed;

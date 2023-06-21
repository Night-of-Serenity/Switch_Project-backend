const { User } = require("../models");
require("dotenv").config();
const bcryptService = require("../services/bcryptService");

const userSeed = async () => {
  const userData = [
    {
      id: 1,
      username: "cleghorn0",
      firstName: "Cash",
      lastName: "Leghorn",
      email: "cleghorn0@theatlantic.com",
    },
    {
      id: 2,
      username: "jparlet1",
      firstName: "Julianne",
      lastName: "Parlet",
      email: "jparlet1@cargocollective.com",
    },
    {
      id: 3,
      username: "hshadwick2",
      firstName: "Holly",
      lastName: "Shadwick",
      email: "hshadwick2@cnn.com",
    },
    {
      id: 4,
      username: "rtroutbeck3",
      firstName: "Reiko",
      lastName: "Troutbeck",
      email: "rtroutbeck3@dagondesign.com",
    },
    {
      id: 5,
      username: "okrzysztof4",
      firstName: "Ofella",
      lastName: "Krzysztof",
      email: "okrzysztof4@theatlantic.com",
    },
    {
      id: 6,
      username: "jhorrell5",
      firstName: "Joyous",
      lastName: "Horrell",
      email: "jhorrell5@weather.com",
    },
    {
      id: 7,
      username: "hgilkison6",
      firstName: "Hermie",
      lastName: "Gilkison",
      email: "hgilkison6@icio.us",
    },
    {
      id: 8,
      username: "adurdy7",
      firstName: "Alfredo",
      lastName: "Durdy",
      email: "adurdy7@bing.com",
    },
    {
      id: 9,
      username: "cmatusiak8",
      firstName: "Cullie",
      lastName: "Matusiak",
      email: "cmatusiak8@dell.com",
    },
    {
      id: 10,
      username: "smaude9",
      firstName: "Sheilah",
      lastName: "Maude",
      email: "smaude9@ucla.edu",
    },
    {
      id: 11,
      username: "rpenburtona",
      firstName: "Roselin",
      lastName: "Penburton",
      email: "rpenburtona@homestead.com",
    },
    {
      id: 12,
      username: "mjakucewiczb",
      firstName: "Mallory",
      lastName: "Jakucewicz",
      email: "mjakucewiczb@scientificamerican.com",
    },
    {
      id: 13,
      username: "arodolfic",
      firstName: "Anni",
      lastName: "Rodolfi",
      email: "arodolfic@cisco.com",
    },
    {
      id: 14,
      username: "edubarryd",
      firstName: "Eamon",
      lastName: "Du Barry",
      email: "edubarryd@psu.edu",
    },
    {
      id: 15,
      username: "elambertinie",
      firstName: "Elnar",
      lastName: "Lambertini",
      email: "elambertinie@admin.ch",
    },
    {
      id: 16,
      username: "bhumphersonf",
      firstName: "Ban",
      lastName: "Humpherson",
      email: "bhumphersonf@tinypic.com",
    },
    {
      id: 17,
      username: "jwhiffing",
      firstName: "Joyann",
      lastName: "Whiffin",
      email: "jwhiffing@usgs.gov",
    },
    {
      id: 18,
      username: "bcarradiceh",
      firstName: "Brannon",
      lastName: "Carradice",
      email: "bcarradiceh@comsenz.com",
    },
    {
      id: 19,
      username: "ebatyi",
      firstName: "Elayne",
      lastName: "Baty",
      email: "ebatyi@mediafire.com",
    },
    {
      id: 20,
      username: "bplattsj",
      firstName: "Bronny",
      lastName: "Platts",
      email: "bplattsj@toplist.cz",
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

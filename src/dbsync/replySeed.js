const { Reply } = require("../models")

const userSeed = async () => {
    const replyData = [
        {
            postId: 1,
            userId: 1,
            textcontent: "Duis at velit eu est congue elementum.",
            imageUrl: "http://dummyimage.com/127x100.png/cc0000/ffffff",
        },
        {
            postId: 2,
            userId: 2,
            textcontent:
                "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.",
            imageUrl: "http://dummyimage.com/164x100.png/dddddd/000000",
        },
        {
            postId: 3,
            userId: 3,
            textcontent: "Donec posuere metus vitae ipsum. Aliquam non mauris.",
            imageUrl: "http://dummyimage.com/117x100.png/cc0000/ffffff",
        },
        {
            postId: 4,
            userId: 4,
            textcontent:
                "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.",
            imageUrl: "http://dummyimage.com/140x100.png/ff4444/ffffff",
        },
        {
            postId: 5,
            userId: 5,
            textcontent: "Sed ante.",
            imageUrl: "http://dummyimage.com/128x100.png/5fa2dd/ffffff",
        },
        {
            postId: 6,
            userId: 6,
            textcontent: "Donec posuere metus vitae ipsum. Aliquam non mauris.",
            imageUrl: "http://dummyimage.com/135x100.png/5fa2dd/ffffff",
        },
        {
            postId: 7,
            userId: 7,
            textcontent: "Nulla suscipit ligula in lacus.",
            imageUrl: "http://dummyimage.com/100x100.png/ff4444/ffffff",
        },
        {
            postId: 8,
            userId: 8,
            textcontent: "Mauris ullamcorper purus sit amet nulla.",
            imageUrl: "http://dummyimage.com/220x100.png/dddddd/000000",
        },
        {
            postId: 9,
            userId: 9,
            textcontent:
                "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.",
            imageUrl: "http://dummyimage.com/194x100.png/dddddd/000000",
        },
        {
            postId: 10,
            userId: 10,
            textcontent:
                "Sed accumsan felis. Ut at dolor quis odio consequat varius.",
            imageUrl: "http://dummyimage.com/101x100.png/ff4444/ffffff",
        },
        {
            postId: 11,
            userId: 11,
            textcontent:
                "Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.",
            imageUrl: "http://dummyimage.com/228x100.png/5fa2dd/ffffff",
        },
        {
            postId: 12,
            userId: 12,
            textcontent: "Phasellus sit amet erat.",
            imageUrl: "http://dummyimage.com/204x100.png/5fa2dd/ffffff",
        },
        {
            postId: 13,
            userId: 13,
            textcontent: "Maecenas rhoncus aliquam lacus.",
            imageUrl: "http://dummyimage.com/140x100.png/cc0000/ffffff",
        },
        {
            postId: 14,
            userId: 14,
            textcontent: "In hac habitasse platea dictumst.",
            imageUrl: "http://dummyimage.com/185x100.png/ff4444/ffffff",
        },
        {
            postId: 15,
            userId: 15,
            textcontent: "Morbi porttitor lorem id ligula.",
            imageUrl: "http://dummyimage.com/248x100.png/cc0000/ffffff",
        },
        {
            postId: 16,
            userId: 16,
            textcontent: "Proin risus. Praesent lectus.",
            imageUrl: "http://dummyimage.com/157x100.png/dddddd/000000",
        },
        {
            postId: 17,
            userId: 17,
            textcontent: "Aliquam sit amet diam in magna bibendum imperdiet.",
            imageUrl: "http://dummyimage.com/116x100.png/dddddd/000000",
        },
        {
            postId: 18,
            userId: 18,
            textcontent:
                "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.",
            imageUrl: "http://dummyimage.com/168x100.png/5fa2dd/ffffff",
        },
        {
            postId: 19,
            userId: 19,
            textcontent: "Aliquam erat volutpat.",
            imageUrl: "http://dummyimage.com/179x100.png/dddddd/000000",
        },
        {
            postId: 20,
            userId: 20,
            textcontent:
                "Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.",
            imageUrl: "http://dummyimage.com/190x100.png/5fa2dd/ffffff",
        },
    ]

    await Reply.bulkCreate(replyData)
    // process.exit(0)
}

// userSeed()

module.exports = userSeed

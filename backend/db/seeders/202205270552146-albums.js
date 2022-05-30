module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Albums', [
      {
        title: 'Samurai Champloo Music Record: Departure',
        releaseDate: '2004-06-23',
        imagePath:"https://m.media-amazon.com/images/I/61X2ffoFa1L.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
       title: "Kaleidoscope",
        releaseDate: "2011-06-29",
        imagePath:"https://t2.genius.com/unsafe/288x288/https%3A%2F%2Fimages.genius.com%2Fcb0f5e64e099c757a91cc7b0bdafe8b7.1000x1000x1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
       title: "Ultra Blue",
        releaseDate: "2006-06-14",
        imagePath:"https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/Hikaru_Utada_-_Ultra_Blue.png/220px-Hikaru_Utada_-_Ultra_Blue.png",
        createdAt: new Date(),
        updatedAt: new Date(),

      },


    ], {});
  },

  down: (queryInterface, Sequelize) => {
  }

}

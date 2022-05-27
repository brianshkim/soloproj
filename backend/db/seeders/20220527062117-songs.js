module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [
      {
        title: 'Shiki No Uta',
        releaseDate: '2004-06-23',
        artist: "Nujabes",
        imagePath:"https://m.media-amazon.com/images/I/61X2ffoFa1L.jpg",
        user_id: 1,
        albumName: "Samurai Champloo Music Record: Departure",
        createdAt: new Date(),
        updatedAt: new Date(),

      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
  }

}

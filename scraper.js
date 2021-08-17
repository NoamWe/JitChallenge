const trending = require('trending-github');

// trending('weekly', 'javascript')
//   .then(repos => console.log(repos));

  async function scrape(){
      const result =  await trending('weekly', 'javascript')
      return result
  }

  module.exports = {
      scrape
  }
const fetch = require('node-fetch');
require('dotenv').config();

class MovieHelper {
  static async retrieveMovieFromIMDB(id) {
    if (!id) return false;
    else {
      const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.IMDB_API_KEY}`
        }
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json)

        const { adult, id, overview, release_date, title } = json;
        const movie_info = { adult, id, overview, release_date, title };
        return movie_info;
      } catch (err) {
        console.error('error:' + err);
        return null;
      }
    }
  }
}

module.exports = MovieHelper;

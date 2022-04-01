const axios = require('axios').default;
module.exports = async function search(req, res) {
  const { terms } = req.query;
  const termsArray = terms.split(',');
  const shouldQuery = [];
  termsArray.forEach((term) => {
    shouldQuery.push({ term: { build: term } });
  });
  const fullQuery = {
    size: 20,
    query: {
      bool: {
        should: shouldQuery,
      },
    },
  };
  try {
    const response = await axios.request({
      method: 'post',
      url: 'http://localhost:9200/cocktail/_search',
      data: fullQuery,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    const results = _.get(response.data, 'hits.hits', []).map(
        (r) => r._source
    );
    console.log(results);
    return res.json(results);
  } catch (e) {
    console.log(e.response.data);
  }
};

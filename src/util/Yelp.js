const apiKey = "";
const apiUrl = "https://api.yelp.com/v3";
const yelp = {
  search(term, location, sortBy) {
    const businessesEndpoint = "/businesses/";
    const requestParams = `search?term=${term}&location=${location}&sort_by=${sortBy}`;
    const urlToFetch = `${apiUrl}${businessesEndpoint}${requestParams}`;
    const bypassCORSRestriction = "https://cors-anywhere.herokuapp.com/";
    return fetch(`${bypassCORSRestriction}${urlToFetch}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map((business) => {
            console.log(business);
            return {
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zip_code,
              category: business.categories[0].title,
              rating: business.rating,
              reviewCount: business.review_count,
            };
          });
        }
      });
  },
};

export default yelp;

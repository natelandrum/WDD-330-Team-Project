const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  let response = res.json();
  if (!res.ok) {
    throw {name: "serviceError", message: response};
  } 
}

export default class ExternalServices {
  constructor() {
  }
  async getData(category) {
    return await fetch(`${baseURL}products/search/${category}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }
  async findProductById(id) {
    return await fetch(`${baseURL}product/${id}`)
    .then(convertToJson)
    .then((data) => data.Result);
  }
  async checkout(dataObject) {
    return await fetch(`${baseURL}checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObject),
    }).then(convertToJson);
  }
}

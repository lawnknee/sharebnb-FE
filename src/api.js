import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class SharebnbApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    // const headers = { Authorization: `Bearer ${Sharebnb.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Registering a new user. */
  static async register(user) {
    let res = await this.request(`auth/register`, user, "post");
    return res.token
  }

  /** Get token after successful login. */
  static async login(email, password) {
    let res = await this.request(`auth/token`, { email, password}, "post");
    return res.token;
  }

  /** Get a user. */
  static async getUser(id) {
    let res = await this.request(`users/${id}`);
    return res.user;
  }

  /** Get all listings. (TODO: optional search term of listing title). */

  static async getListings() {
    let res = await this.request(`listings`);
    return res.listings;
  }

  /** Get a listing by id. */
  static async getListing(id) {
    let res = await this.request(`listings/${id}`);
    return res.listing;
  }

  /** Post a new listing. */
  static async createListing(data) {
    console.log("data in SharebnbApi:", data);

    let res = await axios.post(`${BASE_URL}/listings`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return res.listing;
  }
}

export default SharebnbApi;
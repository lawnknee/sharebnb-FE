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
    const headers = { Authorization: `Bearer ${SharebnbApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
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
    return res.token;
  }

  /** Get token after successful login. */
  static async login(username, password) {
    let res = await this.request(`auth/login`, { username, password }, "post");
    return res.token;
  }

  /** Get a user. */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get all listings. */
  static async getListings() {
    let res = await this.request(`listings`);
    return res.listings;
  }

  /** Get all listings filtered by location. */
  static async getListingsBySearch(location) {
    let res = await this.request(`listings?location=${location}`);
    return res.listings;
  }

  /** Get a listing by id. */
  static async getListing(id) {
    let res = await this.request(`listings/${id}`);
    return res.listing;
  }

  /** Post a new listing.
   * Requires additional header for Content-Type of multipart/form-data.
   */
  static async createListing(data) {
    let res = await axios.post(`${BASE_URL}/listings`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.listing;
  }

  /** Send a message. */
  static async sendMessage({ text, username, toUser }) {
    await this.request(
      `users/${username}/messages/${toUser}`,
      { text },
      "post"
    );
  }

  /** Get all messages sent to a user. */
  static async getMessages(username) {
    let res = await this.request(`users/${username}/messages`);
    return res.users;
  }

  /** Get conversation messages between logged in user and other user. */
  static async getConversation(currentUser, otherUser) {
    let res = await this.request(`users/${currentUser}/messages/${otherUser}`);
    console.log(res);
    return res.messages;
  }
}

export default SharebnbApi;

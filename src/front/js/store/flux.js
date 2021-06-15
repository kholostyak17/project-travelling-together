import jwt_decode from "jwt-decode";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: {},
			traveler: {},
			base_url: "https://3001-crimson-platypus-ghaewqxg.ws-eu09.gitpod.io/",
			profilePicture: "https://img.icons8.com/bubbles/2x/user-male.png",
			trips: [],
			trip: [],
			posts: [],
			post_by_id: [],
			shared_trips: []
		},
		actions: {
			getUser: () => {
				fetch(getStore().base_url.concat("api/profile/", localStorage.getItem("tokenID")))
					.then(function(response) {
						if (!response.ok) {
							throw Error("I can't load user!");
						}
						return response.json();
						console.log(response);
					})
					.then(function(responseAsJson) {
						setStore({ user: responseAsJson });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},

			getUpdate: credentials => {
				const token = localStorage.getItem("token");
				const tokenID = localStorage.getItem("tokenID");
				const redirectToProfile = () => {
					if (localStorage.getItem("tokenID") != null) {
						location.replace("./user/".concat(localStorage.getItem("tokenID")));
					}
				};
				fetch(getStore().base_url.concat("api/settings/", localStorage.getItem("tokenID")), {
					method: "PATCH",
					body: credentials,

					headers: {
						"Sec-Fetch-Mode": "no-cors",
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`
					}
				})
					.then(function(response) {
						if (!response.ok) {
							throw Error("I can't update this traveler!");
						}
						return response.json();
						console.log(response);
					})
					.then(function(responseAsJson) {
						setStore({ user: responseAsJson });
						redirectToProfile();
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			getDelete: () => {
				const token = localStorage.getItem("token");
				const tokenID = localStorage.getItem("tokenID");
				const redirectToHome = () => {
					localStorage.clear(), location.replace("./");
				};
				fetch(getStore().base_url.concat("api/settings/", localStorage.getItem("tokenID")), {
					method: "DELETE",
					headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
				})
					.then(function(response) {
						if (!response.ok) {
							throw Error("I can't delete this traveler!");
						}
						return response.json();
						console.log(response);
					})
					.then(function(responseAsJson) {
						redirectToHome();
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},

			getLogin: credentials => {
				const tokenDecode = token => {
					let decoded = jwt_decode(token);
					return decoded;
				};

				const setTravelerFromToken = token => {
					localStorage.setItem("tokenID", token.sub.id);
					localStorage.setItem("tokenName", token.sub.name);
				};

				const redirectToProfile = () => {
					if (localStorage.getItem("tokenID") != null) {
						location.replace("./user/".concat(localStorage.getItem("tokenID")));
					}
				};

				fetch(getStore().base_url.concat("api/login"), {
					method: "POST",
					body: credentials,
					headers: { "Content-Type": "application/json" }
				})
					.then(function(response) {
						if (!response.ok) {
							throw Error("I can't get login!");
						}
						return response.json();
					})
					.then(function(responseAsJson) {
						localStorage.setItem("token", responseAsJson);
						const tokenDecoded = tokenDecode(responseAsJson);
						setTravelerFromToken(tokenDecoded);
						redirectToProfile();
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},

			getRegister: credentials => {
				const tokenDecode = token => {
					let decoded = jwt_decode(token);
					return decoded;
				};
				const setTravelerFromToken = token => {
					localStorage.setItem("tokenID", token.sub.id);
					localStorage.setItem("tokenName", token.sub.name);
				};
				const redirectToProfile = () => {
					if (localStorage.getItem("tokenID") != null) {
						location.replace("./user/".concat(localStorage.getItem("tokenID")));
					}
				};
				fetch(getStore().base_url.concat("api/register"), {
					method: "POST",
					headers: new Headers({
						"Content-Type": "application/json",
						"Sec-Fetch-Mode": "no-cors"
					}),
					body: credentials
				})
					.then(function(response) {
						console.log(response);
						if (!response.ok) {
							throw Error("I can't register this traveler!");
						}
						return response.json();
					})
					.then(function(responseAsJson) {
						localStorage.setItem("token", responseAsJson);
						const tokenDecoded = tokenDecode(responseAsJson);
						setTravelerFromToken(tokenDecoded);
						redirectToProfile();
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			getTrips: () => {
				fetch(getStore().base_url.concat("api/trips"), {
					method: "GET",
					headers: new Headers({ "Content-Type": "application/json", "Sec-Fetch-Mode": "no-cors" })
				})
					.then(function(response) {
						if (!response.ok) {
							throw Error("I can't load Trip!");
						}
						return response.json();
					})
					.then(function(responseAsJson) {
						setStore({ trips: responseAsJson });
						console.log(responseAsJson);
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			getTrip: id => {
				fetch(getStore().base_url.concat("api/trips/", id), {
					method: "GET",
					headers: new Headers({ "Content-Type": "application/json", "Sec-Fetch-Mode": "no-cors" })
				})
					.then(function(response) {
						if (!response.ok) {
							throw Error("I can't load Trip!");
						}
						return response.json();
					})
					.then(function(responseAsJson) {
						setStore({ trip: responseAsJson });
						console.log(responseAsJson);
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			getPosts: () => {
				fetch(getStore().base_url.concat("api/blog/"), {
					method: "GET",
					headers: new Headers({ "Content-Type": "application/json", "Sec-Fetch-Mode": "no-cors" })
				})
					.then(function(response) {
						if (!response.ok) {
							throw Error("I can't load Traveler!");
						}
						return response.json();
					})
					.then(function(responseAsJson) {
						setStore({ posts: responseAsJson });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			getPost: id => {
				fetchfetch(getStore().base_url.concat("api/blog/", id), {
					method: "GET",
					headers: new Headers({ "Content-Type": "application/json", "Sec-Fetch-Mode": "no-cors" })
				})
					.then(function(response) {
						if (!response.ok) {
							throw Error("I can't load Traveler!");
						}
						return response.json();
					})
					.then(function(responseAsJson) {
						setStore({ post_by_id: responseAsJson });
						console.log(responseAsJson);
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			getNewTrip: credentials => {
				const token = localStorage.getItem("token");
				const tokenID = localStorage.getItem("tokenID");
				const redirectToTrips = () => {
					location.replace("./trips/");
				};
				fetch(getStore().base_url.concat("api/newtrip/", localStorage.getItem("tokenID")), {
					method: "POST",
					body: credentials,
					headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
				})
					.then(function(response) {
						if (!response.ok) {
							throw Error("I can't register this trip!");
						}
						return response.json();
						console.log(response);
					})
					.then(function(responseAsJson) {
						setStore({ trips: responseAsJson });
						redirectToTrips();
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			getSharedTrip: id_trip => {
				console.log(id_trip);
				const token = localStorage.getItem("token");
				const tokenID = localStorage.getItem("tokenID");
				const redirectToTrips = () => {
					location.replace("./trips/");
				};
				fetch(getStore().base_url.concat("api/traveler/", tokenID, "/trip/", id_trip), {
					method: "POST",
					headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
				})
					.then(function(response) {
						if (!response.ok) {
							throw Error("I can't share this trip!");
						}
						return response.json();
						console.log(response);
					})
					.then(function(responseAsJson) {
						setStore({ shared_trips: responseAsJson });
					})
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			}
		}
	};
};
export default getState;

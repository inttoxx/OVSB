import { createStore } from "vuex";

export default createStore({
	state: {
		currentUser: {
			id: null,
			admin: null,
			data: {},
		},
		users: [],
		activities: [],
		categories: [],
		comments: [],
	},
	mutations: {
		setUser(state, users) {
			state.users = users;
		},
		setActivities(state, activities) {
			state.activities = activities;
		},
		setCategories(state, categories) {
			state.categories = categories;
		},
		setComments(state, comments) {
			state.comments = comments;
		},
	},
	actions: {
		async fetchUsers({ commit }) {
			const queryUsers = await fetch("https://api-ovsb.herokuapp.com/users", {
				headers: {
					Authorization: localStorage.getItem("user"),
				},
			});
			const users = await queryUsers.json();
			commit("setUser", users.users);
		},

		async fetchActivities({ commit }) {
			const queryActivities = await fetch("https://api-ovsb.herokuapp.com/activities");
			const activities = await queryActivities.json();
			commit("setActivities", activities.activities);
		},

		async fetchCategories({ commit }) {
			const queryCategories = await fetch("https://api-ovsb.herokuapp.com/categories");
			const categories = await queryCategories.json();
			commit("setCategories", categories.categories);
		},

		async fetchComments({ commit }) {
			var requestOptions = {
				method: "GET",
				headers: {
					Authorization: localStorage.getItem("user"),
				},
				redirect: "follow",
			};
			const queryComments = await fetch("https://api-ovsb.herokuapp.com/comments", requestOptions);
			const comments = await queryComments.json();
			commit("setComments", comments.comments);
		},

		async login({ dispatch, state }, { email, password }) {
			var requestOptions = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
				redirect: "follow",
			};

			fetch("https://api-ovsb.herokuapp.com/login", requestOptions)
				.then((response) => response.json())
				.then((result) => {
					state.currentUser.token = "Bearer " + result.access_token;
					localStorage.setItem("user", "Bearer " + result.access_token);
				})
				.then(() => dispatch('setCurrentUser'))
				.catch((error) => console.log("error", error));
		},

		async setCurrentUser({ state }) {
			var requestOptions = {
				method: "GET",
				headers: {
					Authorization: localStorage.getItem("user"),
				},
				redirect: "follow",
			};

			const request = await fetch("https://api-ovsb.herokuapp.com/me", requestOptions);
			const user = await request.json();
			state.currentUser.admin = await user.admin;
			state.currentUser.id = await user.id;
			const searchUser = await fetch(
				"https://api-ovsb.herokuapp.com/users/" + state.currentUser?.id,
				{
					method: "GET",
					headers: {
						Authorization: localStorage.getItem("user"),
						"Content-Type": "application/json",
					},
				}
			);
			const result = await searchUser.json();
			state.currentUser.data = await result.user;
			localStorage.setItem("admin", result.user.admin);
		},

		async logout({ state }) {
			state.currentUser.id = null;
			state.currentUser.admin = null;
			state.currentUser.data = {};
			localStorage.clear();
		},

		async newUser({ dispatch }, formData) {
			var requestOptions = {
				method: "POST",
				body: formData,
			};
			fetch("https://api-ovsb.herokuapp.com/users", requestOptions)
				.then((response) => response.json())
				.then(() => dispatch("fetchUsers"))
				.catch((error) => console.log("error", error));
		},

		async updateUser(
			{ dispatch },
			{ _id, firstname, lastname, gender, birthdate, description, email, admin }
		) {
			var requestOptions = {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("user"),
				},
				body: JSON.stringify({
					firstname: firstname,
					lastname: lastname,
					gender: gender,
					birthdate: birthdate,
					description: description,
					email: email,
					admin: admin,
				}),
				redirect: "follow",
			};
			fetch("https://api-ovsb.herokuapp.com/users/" + _id, requestOptions)
				.then((response) => response.json())
				.then(() => dispatch("fetchUsers"))
				.catch((error) => console.log("error", error));
		},

		async updatePassword({ dispatch }, { _id, password }) {
			var requestOptions = {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("user"),
				},
				body: JSON.stringify({
					password: password,
				}),
				redirect: "follow",
			};
			fetch("https://api-ovsb.herokuapp.com/users/" + _id, requestOptions)
				.then((response) => response.json())
				.then(() => dispatch("fetchUsers"))
				.catch((error) => console.log("error", error));
		},

		async updatePicture_extension({ dispatch }, { _id, formData }) {
			var requestOptions = {
				method: "PATCH",
				headers: {
					Authorization: localStorage.getItem("user"),
				},
				body: formData,
			};
			fetch("https://api-ovsb.herokuapp.com/users/" + _id, requestOptions)
				.then((response) => response.json())
				.then(() => dispatch("fetchUsers"))
				.catch((error) => console.log("error", error));
		},

		async deleteUser({ dispatch }, id) {
			var requestOptions = {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("user"),
				},
			};
			fetch("https://api-ovsb.herokuapp.com/users/" + id, requestOptions)
				.then(() => dispatch("fetchUsers"))
				.catch((error) => console.log("error", error));
		},

		async newActivity(
			{ dispatch },
			{ title, description, category_id, date, time, duration, user_id }
		) {
			var requestOptions = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("user"),
				},
				body: JSON.stringify({
					title: title,
					description: description,
					category_id: category_id,
					date: date,
					time: time,
					duration: duration,
					user_id: user_id,
				}),
				redirect: "follow",
			};
			fetch("https://api-ovsb.herokuapp.com/activities", requestOptions)
				.then((response) => response.json())
				.then(() => dispatch("fetchActivities"))
				.catch((error) => console.log("error", error));
		},

		async updateActivity(
			{ dispatch },
			{ _id, title, description, category_id, date, time, duration, user_id}
		) {
			var requestOptions = {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("user"),
				},
				body: JSON.stringify({
					title: title,
					description: description,
					category_id: category_id,
					date: date,
					time: time,
					duration: duration,
					user_id: user_id
				}),
				redirect: "follow",
			};
			fetch("https://api-ovsb.herokuapp.com/activities/" + _id, requestOptions)
				.then((response) => response.json())
				.then(() => dispatch("fetchActivities"))
				.catch((error) => console.log("error", error));
		},

		async deleteActivity({ dispatch }, _id) {
			var requestOptions = {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("user"),
				},
			};
			fetch("https://api-ovsb.herokuapp.com/activities/" + _id, requestOptions)
				.then(() => dispatch("fetchActivities"))
				.catch((error) => console.log("error", error));
		},

		async newCategory({ dispatch }, { category_name }) {
			var requestOptions = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("user"),
				},
				body: JSON.stringify({
					category_name: category_name,
				}),
				redirect: "follow",
			};
			fetch("https://api-ovsb.herokuapp.com/categories", requestOptions)
				.then((response) => response.json())
				.then(() => dispatch("fetchCategories"))
				.catch((error) => console.log("error", error));
		},

		async updateCategory({ dispatch }, { _id, category_name }) {
			var requestOptions = {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("user"),
				},
				body: JSON.stringify({
					category_name: category_name,
				}),
				redirect: "follow",
			};
			fetch("https://api-ovsb.herokuapp.com/categories/" + _id, requestOptions)
				.then((response) => response.json())
				.then(() => dispatch("fetchCategories"))
				.catch((error) => console.log("error", error));
		},

		async deleteCategory({ dispatch }, _id) {
			var requestOptions = {
				method: "DELETE",
				redirect: "follow",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("user"),
				},
			};
			fetch("https://api-ovsb.herokuapp.com/categories/" + _id, requestOptions)
				.then(() => dispatch("fetchCategories"))
				.catch((error) => console.log("error", error));
		},

		async newComment({ dispatch }, { user_id, activity_id, comment }) {
			var requestOptions = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("user"),
				},
				body: JSON.stringify({
					user_id: user_id,
					activity_id: activity_id,
					comment: comment,
				}),
				redirect: "follow",
			};
			fetch("https://api-ovsb.herokuapp.com/comments", requestOptions)
				.then((response) => response.json())
				.then(() => dispatch("fetchComments"))
				.catch((error) => console.log("error", error));
		},

		async updateComment({ dispatch }, { _id, comment }) {
			var requestOptions = {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("user"),
				},
				body: JSON.stringify({
					comment: comment,
				}),
				redirect: "follow",
			};
			fetch("https://api-ovsb.herokuapp.com/comments/" + _id, requestOptions)
				.then((response) => response.json())
				.then(() => dispatch("fetchComments"))
				.catch((error) => console.log("error", error));
		},

		async deleteComment({ dispatch }, _id) {
			var requestOptions = {
				method: "DELETE",
				redirect: "follow",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("user"),
				},
			};
			fetch("https://api-ovsb.herokuapp.com/comments/" + _id, requestOptions)
				.then(() => dispatch("fetchComments"))
				.catch((error) => console.log("error", error));
		},
	},
	getters: {
		getUserByEmail: (state) => (email) => {
			return state.users.find((user) => user.email === email);
		},
		getUserById: (state) => (id) => {
			return state.users.find((user) => user._id === id);
		},
		getActivityById: (state) => (id) => {
			return state.activities.find((activity) => activity._id === id);
		},
		getActivityByUser: (state) => (user_id) => {
			return state.activities.filter(
				(activity) => activity.user_id === user_id
			);
		},
		getCategoryById: (state) => (category_id) => {
			return state.categories.find((category) => category._id === category_id);
		},
		getActivitiesByCategory: (state) => (category_id) => {
			return state.activities.filter(
				(activity) => activity.category_id === category_id
			);
		},
		getCommentsByActivity: (state) => (activity_id) => {
			return state.comments.filter(
				(comment) => comment.activity_id === activity_id
			);
		},
		getCommentsByUser: (state) => (user_id) => {
			return state.comments.filter((comment) => comment.user_id === user_id);
		},

		async admin() {
			var requestOptions = {
				method: "GET",
				headers: {
					Authorization: localStorage.getItem("user"),
				},
				redirect: "follow",
			};
			const request = await fetch("http://localhost:3000", requestOptions);
			const user = await request.json();
			return user.admin === 1;
		},
	},
	modules: {},
});

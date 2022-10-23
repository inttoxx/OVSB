import { createRouter, createWebHistory } from 'vue-router'
import activities from '../components/HelloWorld.vue'
import admin from '../components/admin/adminCenter.vue'
import NewActivity from '../components/NewActivity.vue'
import CRUDUsers from '../components/admin/CRUDUsers.vue'
import CRUDCategories from '../components/admin/CRUDCategories.vue'
import CRUDActivities from '../components/admin/CRUDActivities.vue'
import CRUDComments from '../components/admin/CRUDComments.vue'
import LoginComp from '../components/LoginComp.vue'
import RegisterComp from '../components/RegisterComp.vue'
import EspacePerso from '../components/EspacePerso.vue'
import Activity from '../components/ActivitySingle.vue'
import EditProfile from '../components/EditProfile.vue'

const routes = [
	{
		name: 'home',
		path: '/',
		component: activities,
	},
	{
		name: 'activity',
		path: '/activity/:id',
		component: Activity,
		beforeEnter: () => {
			if (!localStorage.getItem('user')) {
				this.$router.push({ name: 'login' })
			}
		}
	},
	{
		name: 'login',
		path: '/login',
		component: LoginComp,
		beforeEnter: () => {
			if (localStorage.getItem('user')) {
				this.$router.push({ name: 'home' })
			}
		}
	},
	{
		name: 'register',
		path: '/register',
		component: RegisterComp,
		beforeEnter: () => {
			if (localStorage.getItem('user')) {
				this.$router.push({ name: 'home' })
			}
		}
	},
	{
		name: 'newActivity',
		path: '/newActivity',
		component: NewActivity,
		beforeEnter: () => {
			if (!localStorage.getItem('user')) {
				this.$router.push({ name: 'login' })
			}
		}
	},
	{
		name: 'admin',
		path: '/admin',
		component: admin,
		beforeEnter: () => {
			if (!localStorage.getItem('user')) {
				this.$router.push({ name: 'login' })
			}if (!localStorage.getItem('admin') === 1) {
				this.$router.push({ name: 'espacePerso' })
			}
			if (!localStorage.getItem("admin") === 1) {
				this.$router.push({ name: "espacePerso" });
			}
		}
	},
	{
		name: 'CRUDUsers',
		path: '/admin/users',
		component: CRUDUsers,
		beforeEnter: () => {
			if (!localStorage.getItem('user')) {
				this.$router.push({ name: 'login' })
			}if (!localStorage.getItem('admin') === 1) {
				this.$router.push({ name: 'espacePerso' })
			}
			if (!localStorage.getItem("admin") === 1) {
				this.$router.push({ name: "espacePerso" });
			}
		}
	},
	{
		name: 'CRUDActivities',
		path: '/admin/activities',
		component: CRUDActivities,
		beforeEnter: () => {
			if (!localStorage.getItem('user')) {
				this.$router.push({ name: 'login' })
			}if (!localStorage.getItem('admin') === 1) {
				this.$router.push({ name: 'espacePerso' })
			}
			if (!localStorage.getItem("admin") === 1) {
				this.$router.push({ name: "espacePerso" });
			}
		}
	},
	{
		name: 'CRUDCategories',
		path: '/admin/categories',
		component: CRUDCategories,
		beforeEnter: () => {
			if (!localStorage.getItem('user')) {
				this.$router.push({ name: 'login' })
			}if (!localStorage.getItem('admin') === 1) {
				this.$router.push({ name: 'espacePerso' })
			}
			if (!localStorage.getItem("admin") === 1) {
				this.$router.push({ name: "espacePerso" });
			}
		}
	},
	{
		name: 'CRUDComments',
		path: '/admin/comments',
		component: CRUDComments,
		beforeEnter: () => {
			if (!localStorage.getItem('user')) {
				this.$router.push({ name: 'login' })
			}if (!localStorage.getItem('admin') === 1) {
				this.$router.push({ name: 'espacePerso' })
			}
			if (!localStorage.getItem("admin") === 1) {
				this.$router.push({ name: "espacePerso" });
			}
		}
	},
	{
		name: 'espacePerso',
		path: '/monCompte',
		component: EspacePerso,
		beforeEnter: () => {
			if (!localStorage.getItem('user')) {
				this.$router.push({ name: 'login' })
			}
		}
	},
	{
		name: 'editProfile',
		path: '/monCompte/edit',
		component: EditProfile,
		beforeEnter: () => {
			if (!localStorage.getItem('user')) {
				this.$router.push({ name: 'login' })
			}
		}
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
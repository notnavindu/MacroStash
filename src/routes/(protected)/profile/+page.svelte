<script lang="ts">
	import { firebaseAuthStore } from '$stores/auth.store';
	// import { testProfile } from '$utils/api/user.util';
	import { getAuth, signOut } from 'firebase/auth';

	let name: string;

	// const onTestClick = async () => {
	// 	// let { user } = await testProfile();
	// 	name = user.name;
	// };

	// const logOut = () => {
	// 	signOut(getAuth());
	// };
</script>

<!-- {JSON.stringify($firebaseAuthStore?.user?.email)}
<br />
<button class="p-2 bg-black text-white" on:click={onTestClick}>Test API route</button>

<div>Name from decoded token: {name}</div>

<button class="p-2 bg-black text-white" on:click={logOut}>Log out</button> -->

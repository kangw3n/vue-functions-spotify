<template>
  <nav class="navbar navbar-inverse">
	<div class="container">
		<div class="navbar-header">
            <router-link class="navbar-brand" to="/" exact>Vue 3.0 Spotify</router-link>
		</div>
		<div id="navbar" class="collapse navbar-collapse">
			<ul class="nav navbar-nav">
				<li>
                    <router-link to="/" exact>Home</router-link>
				</li>
                <li>
                    <router-link to="/about">About</router-link>
                </li>
			</ul>
		</div>
	</div>
</nav>
</template>

<script>
export default {

}
</script>

<style>

</style>
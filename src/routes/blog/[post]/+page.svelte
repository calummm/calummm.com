<script>
	export let data;
</script>

<article>
	FROM SLUG
	<h1>{data.meta.title}</h1>

	<p>Published: {data.meta.date}</p>

	{@html data.PostContent}

	<!-- <data.Post />
	<data.Content /> -->

	<slot>
		<!-- the mdsvex content will be slotted in here -->
	</slot>
</article>

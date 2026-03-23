<!-- Main page for the notalex.sh OSINT Utility Stack -->
<script lang="ts">
	import '../app.css';
	import { bookmarks, getTotalLinks, getDomain, getFavicon, getInitials, type Link, type Category, type Subcategory } from '$lib/data';

	let search = $state('');
	let activeCategory = $state<string | null>(null);
	let showScrollTop = $state(false);
	let searchInput = $state<HTMLInputElement | null>(null);

	const totalLinks = getTotalLinks();

	// Returns all links from a category including nested subcategory links
	function getCategoryLinks(cat: Category): { link: Link; subcategory?: string }[] {
		if (cat.links) return cat.links.map((link) => ({ link }));
		if (cat.subcategories) {
			return cat.subcategories.flatMap((sub) =>
				sub.links.map((link) => ({ link, subcategory: sub.name }))
			);
		}
		return [];
	}

	// Checks if a link matches the current search query against name, desc, domain, and category
	function matchesSearch(link: Link, category: string, subcategory?: string): boolean {
		if (!search) return true;
		const q = search.toLowerCase();
		const haystack = `${link.name} ${link.desc} ${getDomain(link.url)} ${category} ${subcategory || ''}`.toLowerCase();
		return haystack.includes(q);
	}

	// Counts visible links in a category after search filtering
	function visibleCount(cat: Category): number {
		return getCategoryLinks(cat).filter(({ link, subcategory }) =>
			matchesSearch(link, cat.category, subcategory)
		).length;
	}

	// Counts visible links in a subcategory after search filtering
	function subVisibleCount(sub: Subcategory, category: string): number {
		return sub.links.filter((link) => matchesSearch(link, category, sub.name)).length;
	}

	const filteredTotal = $derived(
		bookmarks.reduce((sum, cat) => sum + visibleCount(cat), 0)
	);

	// Selects a category filter and clears any active search
	function selectCategory(cat: string | null) {
		activeCategory = cat;
		if (search) search = '';
	}

	// Handles keyboard shortcuts for search focus and clear
	function handleKeydown(e: KeyboardEvent) {
		if (e.key === '/' && document.activeElement !== searchInput) {
			e.preventDefault();
			searchInput?.focus();
		}
		if (e.key === 'Escape') {
			search = '';
			searchInput?.blur();
		}
	}

	// Updates back-to-top button visibility based on scroll position
	function handleScroll() {
		showScrollTop = window.scrollY > 500;
	}

	// Scrolls the page back to the top with smooth animation
	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:window onkeydown={handleKeydown} onscroll={handleScroll} />

<div class="mx-auto max-w-[1200px] px-6">
	<header class="flex flex-wrap items-baseline justify-between gap-2 pt-12 pb-6">
		<div>
			<h1 class="text-2xl font-semibold tracking-tight text-[var(--text)]">notalex.sh OSINT Utility Stack</h1>
			<p class="mt-1 text-xs text-[var(--text-tertiary)]">
				by <a href="https://notalex.sh/" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] no-underline hover:underline">notalex.sh</a>
				&middot;
				<a href="https://eyrie.notalex.sh/" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] no-underline hover:underline">Project Eyrie</a>
			</p>
		</div>
		<div class="flex flex-col items-end gap-1.5">
			<span class="text-sm text-[var(--text-tertiary)]">{totalLinks} bookmarks</span>
			<a
				href="https://marksmith.notalex.sh/"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-[0.7rem] font-medium text-[var(--text-secondary)] no-underline transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
			>
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
				Make your own
			</a>
		</div>
	</header>

	<div class="sticky top-0 z-50 border-b border-transparent bg-[var(--bg)] py-4" class:border-b-[var(--border)]={showScrollTop}>
		<input
			type="text"
			bind:value={search}
			bind:this={searchInput}
			placeholder="Search bookmarks..."
			autocomplete="off"
			spellcheck="false"
			class="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-2.5 pr-4 pl-10 text-sm text-[var(--text)] outline-none transition-all focus:border-[var(--accent)] focus:ring-3 focus:ring-[var(--accent-light)]"
			style="background-image: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23aeaeb2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'/%3E%3C/svg%3E&quot;); background-repeat: no-repeat; background-position: 0.8rem center; background-size: 16px;"
			oninput={() => { activeCategory = null; }}
		/>
		<div class="mt-2 flex items-center justify-between text-xs text-[var(--text-tertiary)]">
			<span>{filteredTotal === totalLinks ? `${totalLinks} bookmarks` : `${filteredTotal} of ${totalLinks} bookmarks`}</span>
			<span>Press <kbd class="rounded border border-[var(--border)] bg-[var(--tag-bg)] px-1.5 py-0.5 font-mono text-[0.65rem] text-[var(--tag-text)]">/</kbd> to search, <kbd class="rounded border border-[var(--border)] bg-[var(--tag-bg)] px-1.5 py-0.5 font-mono text-[0.65rem] text-[var(--tag-text)]">esc</kbd> to clear</span>
		</div>
	</div>

	<nav class="flex flex-wrap gap-1.5 py-4">
		<button
			class="rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all {activeCategory === null ? 'border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]' : 'border-[var(--border)] bg-transparent text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:bg-[var(--surface)] hover:text-[var(--text)]'}"
			onclick={() => selectCategory(null)}
		>All</button>
		{#each bookmarks as cat}
			<button
				class="rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all {activeCategory === cat.category ? 'border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]' : 'border-[var(--border)] bg-transparent text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:bg-[var(--surface)] hover:text-[var(--text)]'}"
				onclick={() => selectCategory(cat.category)}
			>{cat.category}</button>
		{/each}
	</nav>

	<main class="pb-16">
		{#each bookmarks as cat}
			{@const count = visibleCount(cat)}
			{#if count > 0 && (activeCategory === null || activeCategory === cat.category)}
				<section class="mb-10">
					<div class="mb-3 flex items-center gap-2.5">
						<h2 class="text-sm font-semibold text-[var(--text)]">{cat.category}</h2>
						<span class="rounded-full bg-[var(--tag-bg)] px-2 py-0.5 text-[0.7rem] font-medium text-[var(--text-tertiary)]">{count}</span>
					</div>

					{#if cat.subcategories}
						{#each cat.subcategories as sub}
							{@const subCount = subVisibleCount(sub, cat.category)}
							{#if subCount > 0}
								<div class="mb-5">
									<h3 class="mb-1.5 pl-0.5 text-[0.72rem] font-medium text-[var(--text-secondary)] opacity-70">{sub.name}</h3>
									<div class="grid grid-cols-1 gap-2 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
										{#each sub.links as link}
											{#if matchesSearch(link, cat.category, sub.name)}
												{@render tile(link)}
											{/if}
										{/each}
									</div>
								</div>
							{/if}
						{/each}
					{:else if cat.links}
						<div class="grid grid-cols-1 gap-2 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
							{#each cat.links as link}
								{#if matchesSearch(link, cat.category)}
									{@render tile(link)}
								{/if}
							{/each}
						</div>
					{/if}
				</section>
			{/if}
		{/each}

		{#if filteredTotal === 0}
			<p class="py-16 text-center text-sm text-[var(--text-tertiary)]">No bookmarks found</p>
		{/if}
	</main>
</div>

{#if showScrollTop}
	<button
		onclick={scrollToTop}
		class="fixed right-6 bottom-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--text-secondary)] shadow-md transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
	>&uarr; Back to top</button>
{/if}

{#snippet tile(link: Link)}
	{@const faviconUrl = getFavicon(link.url)}
	<a
		href={link.url}
		target="_blank"
		rel="noopener noreferrer"
		class="group relative flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 no-underline transition-all hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)] hover:shadow-sm"
	>
		<div class="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[var(--tag-bg)] max-sm:hidden">
			{#if faviconUrl}
				<img src={faviconUrl} alt="" loading="lazy" class="h-[18px] w-[18px] object-contain" onerror={(e: Event) => { const el = e.target as HTMLImageElement; el.style.display = 'none'; el.nextElementSibling?.classList.remove('hidden'); }} />
				<span class="hidden font-mono text-[0.7rem] font-semibold text-[var(--text-tertiary)] uppercase">{getInitials(link.name)}</span>
			{:else}
				<span class="font-mono text-[0.7rem] font-semibold text-[var(--text-tertiary)] uppercase">{getInitials(link.name)}</span>
			{/if}
		</div>
		<div class="min-w-0 flex-1">
			<div class="truncate text-[0.8rem] font-medium text-[var(--text)] group-hover:text-[var(--accent)]">{link.name}</div>
			<div class="truncate text-[0.7rem] text-[var(--text-secondary)]">{link.desc}</div>
		</div>
		<span class="shrink-0 text-xs text-[var(--text-tertiary)] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">&rsaquo;</span>
		{#if link.tag}
			<span class="absolute top-1.5 right-2 rounded bg-[var(--tag-bg)] px-1.5 py-0.5 text-[0.55rem] font-medium tracking-wide text-[var(--tag-text)] uppercase">{link.tag}</span>
		{/if}
	</a>
{/snippet}

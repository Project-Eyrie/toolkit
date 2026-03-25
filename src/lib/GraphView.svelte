<!-- Interactive horizontal tree graph visualization of OSINT bookmark categories -->
<script lang="ts">
	import { type Category } from '$lib/data';

	interface Props {
		bookmarks: Category[];
	}

	interface TreeNode {
		id: string;
		label: string;
		level: number;
		x: number;
		y: number;
		parentId: string | null;
		url?: string;
		hasChildren: boolean;
		tag?: string;
	}

	let { bookmarks }: Props = $props();
	let expanded = $state(new Set<string>(['root']));
	let containerEl = $state<HTMLDivElement | null>(null);
	let hoveredNode = $state<string | null>(null);
	let zoom = $state(1);
	let panX = $state(0);
	let panY = $state(0);
	let isPanning = $state(false);
	let panStart = $state({ x: 0, y: 0 });
	let smoothPan = $state(false);
	let prevNodeIds = new Set<string>();
	let hiddenNodes = $state(new Set<string>());

	// Centers the view on first mount
	$effect(() => {
		if (containerEl) {
			setTimeout(() => resetView(), 50);
		}
	});

	// Hides newly added nodes briefly so existing nodes can settle first
	$effect(() => {
		const currentIds = new Set(layout.nodes.map(n => n.id));
		const newIds = new Set<string>();
		for (const id of currentIds) {
			if (!prevNodeIds.has(id)) newIds.add(id);
		}
		prevNodeIds = currentIds;

		if (newIds.size > 0) {
			hiddenNodes = newIds;
			setTimeout(() => { hiddenNodes = new Set(); }, 300);
		}
	});

	const NODE_RADIUS = 6;
	const COL_WIDTH = 280;
	const ROW_HEIGHT = 28;

	// Toggles a node's expanded/collapsed state or opens leaf URLs
	function handleNodeClick(node: TreeNode) {
		if (node.url) {
			window.open(node.url, '_blank', 'noopener,noreferrer');
			return;
		}
		if (!node.hasChildren) return;
		const next = new Set(expanded);
		const isExpanding = !next.has(node.id);
		if (isExpanding) {
			next.add(node.id);
		} else {
			for (const key of next) {
				if (key === node.id || key.startsWith(node.id + '/')) next.delete(key);
			}
		}
		expanded = next;

		setTimeout(() => panToNode(node.id), 50);
	}

	// Smoothly pans the view to center the children of a given node
	function panToNode(nodeId: string) {
		if (!containerEl) return;
		const children = layout.nodes.filter(n => n.parentId === nodeId);
		if (children.length === 0) return;
		const centerX = children.reduce((s, n) => s + n.x, 0) / children.length;
		const centerY = children.reduce((s, n) => s + n.y, 0) / children.length;
		const rect = containerEl.getBoundingClientRect();
		smoothPan = true;
		panX = rect.width / 2 - centerX * zoom - 20;
		panY = rect.height / 2 - centerY * zoom - 40;
		setTimeout(() => { smoothPan = false; }, 500);
	}

	// Computes horizontal tree layout with nodes positioned in columns by depth
	function computeLayout(): { nodes: TreeNode[]; edges: { fromId: string; toId: string }[] } {
		const nodes: TreeNode[] = [];
		const edges: { fromId: string; toId: string }[] = [];
		let yOffset = 0;

		function layoutChildren(parentId: string, children: { id: string; label: string; level: number; url?: string; hasChildren: boolean; tag?: string; childrenFn?: () => any[] }[]) {
			const childIds: string[] = [];

			for (const child of children) {
				const node: TreeNode = {
					id: child.id, label: child.label, level: child.level,
					x: child.level * COL_WIDTH + 60, y: 0,
					parentId, url: child.url, hasChildren: child.hasChildren, tag: child.tag,
				};

				if (expanded.has(child.id) && child.childrenFn) {
					nodes.push(node);
					childIds.push(child.id);
					layoutChildren(child.id, child.childrenFn());
				} else {
					node.y = yOffset * ROW_HEIGHT;
					yOffset++;
					nodes.push(node);
					childIds.push(child.id);
				}
			}

			for (const childId of childIds) {
				const child = nodes.find(n => n.id === childId)!;
				if (child.y === 0 && expanded.has(child.id)) {
					const descendants = nodes.filter(n => n.parentId === child.id);
					if (descendants.length > 0) {
						child.y = (Math.min(...descendants.map(n => n.y)) + Math.max(...descendants.map(n => n.y))) / 2;
					} else {
						child.y = yOffset * ROW_HEIGHT;
						yOffset++;
					}
				}
				edges.push({ fromId: parentId, toId: childId });
			}
		}

		const catChildren = bookmarks.map(cat => ({
			id: cat.category, label: cat.category, level: 1, hasChildren: true,
			childrenFn: () => {
				if (cat.subcategories) {
					return cat.subcategories.map(sub => ({
						id: `${cat.category}/${sub.name}`, label: sub.name, level: 2, hasChildren: true,
						childrenFn: () => sub.links.map(link => ({
							id: `${cat.category}/${sub.name}/${link.name}`, label: link.name, level: 3,
							url: link.url, hasChildren: false, tag: link.tag,
						})),
					}));
				} else if (cat.links) {
					return cat.links.map(link => ({
						id: `${cat.category}/${link.name}`, label: link.name, level: 2,
						url: link.url, hasChildren: false, tag: link.tag,
					}));
				}
				return [];
			},
		}));

		const rootNode: TreeNode = { id: 'root', label: 'OSINT Toolkit', level: 0, x: 60, y: 0, parentId: null, hasChildren: true };
		nodes.push(rootNode);
		layoutChildren('root', catChildren);

		const allY = nodes.filter(n => n.id !== 'root').map(n => n.y);
		if (allY.length > 0) rootNode.y = (Math.min(...allY) + Math.max(...allY)) / 2;

		return { nodes, edges };
	}

	const layout = $derived(computeLayout());
	const nodeMap = $derived(new Map(layout.nodes.map(n => [n.id, n])));
	const svgHeight = $derived(Math.max(600, (layout.nodes.length + 2) * ROW_HEIGHT));
	const svgWidth = $derived(Math.max(800, 5 * COL_WIDTH));

	// Handles mouse wheel zoom
	function handleWheel(e: WheelEvent) {
		e.preventDefault();
		zoom = Math.max(0.3, Math.min(2, zoom * (e.deltaY > 0 ? 0.95 : 1.05)));
	}

	// Starts pan on pointer down
	function handlePointerDown(e: PointerEvent) {
		if ((e.target as HTMLElement).closest('.graph-node')) return;
		isPanning = true;
		panStart = { x: e.clientX - panX, y: e.clientY - panY };
	}

	// Updates pan position during drag
	function handlePointerMove(e: PointerEvent) {
		if (!isPanning) return;
		panX = e.clientX - panStart.x;
		panY = e.clientY - panStart.y;
	}

	// Ends pan on pointer up
	function handlePointerUp() {
		isPanning = false;
	}

	// Resets zoom and pan to center the root node in the viewport
	function resetView(animate = false) {
		if (animate) smoothPan = true;
		zoom = 1;
		const root = layout.nodes.find(n => n.id === 'root');
		if (root && containerEl) {
			const rect = containerEl.getBoundingClientRect();
			panX = rect.width / 2 - root.x - 20;
			panY = rect.height / 2 - root.y - 40;
		} else {
			panX = 0;
			panY = 0;
		}
		if (animate) setTimeout(() => { smoothPan = false; }, 500);
	}

	// Generates an SVG path for a curved connector between two points
	function edgePath(from: TreeNode, to: TreeNode): string {
		const midX = (from.x + to.x) / 2;
		return `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="graph-container relative w-full overflow-hidden"
	style="height: calc(100vh - 130px);"
	bind:this={containerEl}
	onwheel={handleWheel}
	onpointerdown={handlePointerDown}
	onpointermove={handlePointerMove}
	onpointerup={handlePointerUp}
	onpointerleave={handlePointerUp}
	style:cursor={isPanning ? 'grabbing' : 'grab'}
>
	<svg width={svgWidth * zoom + Math.abs(panX) + 500} height={svgHeight * zoom + Math.abs(panY) + 500} class="block">
		<g transform="translate({panX + 20},{panY + 40}) scale({zoom})" style={smoothPan ? 'transition: transform 400ms cubic-bezier(0.4, 0, 0.2, 1);' : ''}>
			{#each layout.edges as edge (`${edge.fromId}->${edge.toId}`)}
				{@const from = nodeMap.get(edge.fromId)}
				{@const to = nodeMap.get(edge.toId)}
				{#if from && to}
					<path
						class="graph-edge"
						d={edgePath(from, to)}
						fill="none"
						stroke="var(--border)"
						stroke-width="1.5"
						opacity={hiddenNodes.has(edge.toId) ? 0 : 0.6}
					/>
				{/if}
			{/each}

			{#each layout.nodes as node (node.id)}
				{@const isHovered = hoveredNode === node.id}
				{@const isExpanded = expanded.has(node.id)}
				{@const isHidden = hiddenNodes.has(node.id)}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<g
					class="graph-node"
					transform="translate({node.x},{node.y})"
					opacity={isHidden ? 0 : 1}
					onclick={() => handleNodeClick(node)}
					onpointerenter={() => hoveredNode = node.id}
					onpointerleave={() => hoveredNode = null}
				>
					<circle
						cx={0} cy={0} r={NODE_RADIUS}
						fill={node.level === 0 ? 'var(--accent)' : isExpanded ? 'var(--accent)' : 'var(--surface)'}
						stroke={isHovered ? 'var(--accent)' : 'var(--border)'}
						stroke-width="1.5"
					/>

					{#if node.level === 0}
						<text x={-14} y={4} text-anchor="end"
							fill={isHovered ? 'var(--accent)' : 'var(--text)'}
							font-size="13" font-family="'JetBrains Mono', monospace" font-weight="600"
						>{node.label}</text>
					{:else}
						<text x={NODE_RADIUS + 8} y={4} text-anchor="start"
							fill={isHovered ? 'var(--accent)' : node.url ? 'var(--text-secondary)' : 'var(--text)'}
							font-size={node.level === 1 ? '12' : node.level === 2 ? '11' : '10'}
							font-family="'JetBrains Mono', monospace"
							font-weight={node.level <= 1 ? '500' : '400'}
						>{node.label}</text>

						{#if node.tag}
							<text
								x={NODE_RADIUS + 8 + node.label.length * (node.level === 1 ? 7.2 : node.level === 2 ? 6.6 : 6) + 8}
								y={4} text-anchor="start" fill="var(--accent)"
								font-size="9" font-family="'JetBrains Mono', monospace"
							>(R)</text>
						{/if}
					{/if}
				</g>
			{/each}
		</g>
	</svg>

	<style>
		.graph-container {
			animation: graphFadeIn 500ms ease-out both;
		}
		.graph-node {
			cursor: pointer;
			transition: transform 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease;
		}
		.graph-edge {
			transition: d 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease;
		}
		@keyframes graphFadeIn {
			from { opacity: 0; transform: scale(0.97); }
			to { opacity: 1; transform: scale(1); }
		}
	</style>

	<div class="absolute right-4 bottom-4 flex gap-1.5">
		<button onclick={() => zoom = Math.min(2, zoom * 1.2)} class="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs text-[var(--text-secondary)] shadow-sm hover:border-[var(--accent)] hover:text-[var(--accent)]">+</button>
		<button onclick={() => zoom = Math.max(0.3, zoom * 0.8)} class="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs text-[var(--text-secondary)] shadow-sm hover:border-[var(--accent)] hover:text-[var(--accent)]">−</button>
		<button onclick={() => resetView(true)} class="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs text-[var(--text-secondary)] shadow-sm hover:border-[var(--accent)] hover:text-[var(--accent)]">Reset</button>
	</div>
</div>

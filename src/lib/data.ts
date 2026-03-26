// Types and parser for Netscape bookmark HTML format

export interface Link {
	name: string;
	desc: string;
	url: string;
	tag?: string;
}

export interface Subcategory {
	name: string;
	links: Link[];
}

export interface Category {
	category: string;
	links?: Link[];
	subcategories?: Subcategory[];
}

// Parses a Netscape bookmark HTML file into structured categories
export function parseNetscapeBookmarks(html: string): Category[] {
	const categories: Category[] = [];
	const lines = html.split('\n');

	let depth = 0;
	let currentCategory: Category | null = null;
	let currentSubcategory: Subcategory | null = null;
	for (const line of lines) {
		const trimmed = line.trim();

		if (trimmed.startsWith('<DL>')) {
			depth++;
			continue;
		}
		if (trimmed.startsWith('</DL>')) {
			if (depth === 3 && currentCategory) {
				categories.push(currentCategory);
				currentCategory = null;
				currentSubcategory = null;
			} else if (depth === 4) {
				currentSubcategory = null;
			}
			depth--;
			continue;
		}

		const h3Match = trimmed.match(/<H3[^>]*>(.*?)<\/H3>/i);
		if (h3Match) {
			const name = decodeHTML(h3Match[1]);
			if (depth === 2) {
				currentCategory = { category: name };
			} else if (depth === 3 && currentCategory) {
				if (!currentCategory.subcategories) currentCategory.subcategories = [];
				currentSubcategory = { name, links: [] };
				currentCategory.subcategories.push(currentSubcategory);
			}
			continue;
		}

		const aMatch = trimmed.match(/<A HREF="([^"]*)"[^>]*>(.*?)<\/A>/i);
		if (aMatch) {
			const [, url, rawTitle] = aMatch;
			const title = decodeHTML(rawTitle);
			const { name, desc, tag } = parseLinkTitle(title);
			const link: Link = { name, url, desc };
			if (tag) link.tag = tag;

			if (currentSubcategory) {
				currentSubcategory.links.push(link);
			} else if (currentCategory) {
				if (!currentCategory.links) currentCategory.links = [];
				currentCategory.links.push(link);
			}
			continue;
		}
	}

	return categories;
}

// Extracts name, description, and account tag from a bookmark title string
function parseLinkTitle(title: string): { name: string; desc: string; tag?: string } {
	let tag: string | undefined;
	let text = title;

	const tagMatch = text.match(/\s*\[Account Required\]\s*$/i);
	if (tagMatch) {
		tag = 'account';
		text = text.slice(0, -tagMatch[0].length);
	}

	const dashIndex = text.indexOf(' - ');
	if (dashIndex !== -1) {
		return { name: text.slice(0, dashIndex).trim(), desc: text.slice(dashIndex + 3).trim(), tag };
	}
	return { name: text.trim(), desc: '', tag };
}

// Decodes basic HTML entities
function decodeHTML(str: string): string {
	return str
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'");
}

// Returns the total number of links across all categories
export function getTotalLinks(bookmarks: Category[]): number {
	let total = 0;
	for (const cat of bookmarks) {
		if (cat.links) total += cat.links.length;
		if (cat.subcategories) {
			for (const sub of cat.subcategories) total += sub.links.length;
		}
	}
	return total;
}

// Extracts the domain from a URL, stripping the www prefix
export function getDomain(url: string): string {
	try {
		return new URL(url).hostname.replace('www.', '');
	} catch {
		return '';
	}
}

// Returns the Google favicon URL for a given bookmark URL
export function getFavicon(url: string): string | null {
	const domain = getDomain(url);
	if (!domain) return null;
	return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
}

// Returns the first two initials from a name string
export function getInitials(name: string): string {
	return name
		.split(' ')
		.map((w) => w[0])
		.join('')
		.substring(0, 2);
}

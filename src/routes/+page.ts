// Loads and parses the Netscape bookmark file for the page
import { parseNetscapeBookmarks, parseLastModified } from '$lib/data';

// Fetches toolkit.html and returns parsed bookmark categories and metadata
export async function load({ fetch }) {
	const res = await fetch('/toolkit.html');
	const html = await res.text();
	return { bookmarks: parseNetscapeBookmarks(html), lastModified: parseLastModified(html) };
}

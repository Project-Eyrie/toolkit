// Loads and parses the Netscape bookmark file for the page
import { parseNetscapeBookmarks } from '$lib/data';

// Fetches toolkit.html and returns parsed bookmark categories
export async function load({ fetch }) {
	const res = await fetch('/toolkit.html');
	const html = await res.text();
	return { bookmarks: parseNetscapeBookmarks(html) };
}

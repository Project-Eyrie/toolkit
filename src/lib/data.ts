// Bookmark data definitions and the complete OSINT utility collection

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

export const bookmarks: Category[] = [
	{
		category: 'Search & Discovery',
		links: [
			{ name: 'Google', desc: 'Web search engine', url: 'https://www.google.com/' },
			{ name: 'Google Advanced Search', desc: 'Granular search parameters', url: 'https://www.google.com/advanced_search' },
			{ name: 'Google Dorking Cheatsheet', desc: 'Advanced search operators guide', url: 'https://gist.github.com/sundowndev/283efaddbcf896ab405488330d1bbc06' },
			{ name: 'Google Scholar', desc: 'Academic research papers', url: 'https://scholar.google.com.au/' },
			{ name: 'DuckDuckGo', desc: 'Privacy-focused search', url: 'https://duckduckgo.com/' },
			{ name: 'Bing', desc: 'Microsoft web search', url: 'https://www.bing.com/' },
			{ name: 'Yandex', desc: 'Russian web search engine', url: 'https://yandex.com/' },
			{ name: 'Baidu', desc: 'Chinese web search engine', url: 'https://www.baidu.com/' },
			{ name: 'All The Internet', desc: 'Multi-engine search aggregator', url: 'https://www.alltheinternet.com/' }
		]
	},
	{
		category: 'Image Analysis',
		links: [
			{ name: 'Google Images', desc: 'Reverse image search', url: 'https://images.google.com/' },
			{ name: 'TinEye', desc: 'Reverse image search engine', url: 'https://tineye.com/' },
			{ name: 'Lucid', desc: 'OSINT image analysis tool', url: 'https://lucid.notalex.sh/' },
			{ name: 'Bing Images', desc: 'Visual search & reverse lookup', url: 'https://www.bing.com/images?' },
			{ name: 'Yandex Images', desc: 'Reverse image search', url: 'https://yandex.com/images' },
			{ name: 'Forensically', desc: 'Photo forensics toolkit', url: 'https://29a.ch/photo-forensics/' },
			{ name: 'ImgOps', desc: 'Image search aggregator', url: 'https://imgops.com/' },
			{ name: 'Remini', desc: 'AI image enhancement', url: 'https://app.remini.ai/' },
			{ name: 'RootAbout', desc: 'Archive image search', url: 'https://rootabout.com/' },
			{ name: 'Lunapic', desc: 'Online image editor', url: 'https://www1.lunapic.com/editor/' },
			{ name: 'Pixoate', desc: 'Photo filter effects', url: 'https://pixoate.com/photo-effects' }
		]
	},
	{
		category: 'Geolocation & Mapping',
		links: [
			{ name: 'Google Maps', desc: 'Map & satellite view', url: 'https://www.google.com/maps' },
			{ name: 'Google Earth', desc: '3D satellite imagery', url: 'https://earth.google.com/web/' },
			{ name: 'Scatter', desc: 'Investigative mapping tool', url: 'https://scatter.notalex.sh/' },
			{ name: 'OpenStreetMap', desc: 'Community-driven maps', url: 'https://www.openstreetmap.org/' },
			{ name: 'Satellites Pro', desc: 'Satellite map viewer', url: 'https://satellites.pro/' },
			{ name: 'MapChecking', desc: 'Crowd size estimator', url: 'https://www.mapchecking.com/' },
			{ name: 'DualMaps', desc: 'Synchronized dual map views', url: 'https://data.mapchannels.com/dualmaps8/map.htm' },
			{ name: 'Overpass Turbo', desc: 'OSM query builder', url: 'https://overpass-turbo.eu/index.html' },
			{ name: 'Telstra Payphones', desc: 'AU payphone locator', url: 'https://www.telstra.com.au/find-us?search=payphone' },
			{ name: 'RFNSA', desc: 'AU cell tower search', url: 'https://www.rfnsa.com.au/home' },
			{ name: 'OpenInfraMap', desc: 'Infrastructure mapping', url: 'https://openinframap.org/#5.25/-26.982/125.525' },
			{ name: 'Emergency WA', desc: 'WA emergency info', url: 'https://www.emergency.wa.gov.au/' },
			{ name: 'WiGLE', desc: 'Wi-Fi network map', url: 'https://wigle.net/' },
			{ name: 'KartaView', desc: 'Crowdsourced street view', url: 'https://kartaview.org/map/' },
			{ name: 'F4 Map', desc: '3D map viewer', url: 'https://demo.f4map.com/' },
			{ name: 'OpenSeaMap', desc: 'Nautical charts', url: 'https://map.openseamap.org/' },
			{ name: 'Wayback Imagery', desc: 'Historical satellite images', url: 'http://livingatlas.arcgis.com/wayback/' },
			{ name: 'Shadow Finder', desc: 'Shadow-based time analysis', url: 'https://colab.research.google.com/github/Bellingcat/ShadowFinder/blob/main/ShadowFinderColab.ipynb' },
			{ name: 'Coordinate Converter', desc: 'Geographic unit converter', url: 'https://rcn.montana.edu/resources/Converter.aspx' }
		]
	},
	{
		category: 'Email Intelligence',
		links: [
			{ name: 'Epieos', desc: 'Email intelligence search', url: 'https://epieos.com/' },
			{ name: 'Have I Been Pwned', desc: 'Email breach checker', url: 'https://haveibeenpwned.com/' },
			{ name: 'MailCraft', desc: 'Email variation generator', url: 'https://mailcraft.notalex.sh/' },
			{ name: 'MXToolbox', desc: 'Email DNS record lookup', url: 'https://mxtoolbox.com/' },
			{ name: 'Ashley Madison Breach', desc: 'Breach data search', url: 'https://ashley.cynic.al/' },
			{ name: 'Hunter.io', desc: 'Company email finder', url: 'https://hunter.io/', tag: 'account' },
			{ name: 'Voila Norbert', desc: 'Company email finder', url: 'https://www.voilanorbert.com/', tag: 'account' },
			{ name: 'Trace Email', desc: 'Email header analysis', url: 'https://whatismyipaddress.com/trace-email' },
			{ name: 'Email Permutator', desc: 'Email variation generator', url: 'http://metricsparrow.com/toolkit/email-permutator/' },
			{ name: 'Email Format', desc: 'Company email patterns', url: 'https://www.email-format.com/' },
			{ name: 'CanIBeSpoofed', desc: 'Email spoofing test', url: 'https://caniphish.com/free-phishing-tools/email-spoofing-test' }
		]
	},
	{
		category: 'Username Search',
		links: [
			{ name: 'WhatsMyName', desc: 'Username search across platforms', url: 'https://whatsmyname.app/' },
			{ name: 'NameChk', desc: 'Username availability checker', url: 'https://namechk.com/' },
			{ name: 'IDCrawl', desc: 'Username search engine', url: 'https://www.idcrawl.com/username-search' },
			{ name: 'Instant Username', desc: 'Username availability search', url: 'https://instantusername.com/#/' },
			{ name: 'NameCheckup', desc: 'Username & social media search', url: 'https://namecheckup.com/' }
		]
	},
	{
		category: 'Social Media Intelligence',
		subcategories: [
			{
				name: 'Instagram',
				links: [
					{ name: 'Imginn', desc: 'Anonymous profile viewer', url: 'https://imginn.com/' },
					{ name: 'AnonyIG', desc: 'Anonymous profile viewer', url: 'https://anonyig.com/en/instagram-profile-viewer/' },
					{ name: 'Dolphin Radar', desc: 'Anonymous profile viewer', url: 'https://www.dolphinradar.com/web-viewer-for-instagram' },
					{ name: 'StorySaver', desc: 'Story downloader', url: 'https://www.storysaver.net/' },
					{ name: 'ExportGram', desc: 'Comment exporter', url: 'https://exportgram.net/' },
					{ name: 'InstaHunt', desc: 'Location-based search', url: 'https://instahunt.huntintel.io/', tag: 'account' },
					{ name: 'Inflact Analyzer', desc: 'Profile analytics', url: 'https://inflact.com/tools/profile-analyzer/' },
					{ name: 'IG User ID Finder', desc: 'Find user IDs', url: 'https://www.codeofaninja.com/tools/find-instagram-user-id/' }
				]
			},
			{
				name: 'WhatsApp',
				links: [
					{ name: '2Chat Checker', desc: 'Profile & image viewer', url: 'https://2chat.co/tools/whatsapp-checker' },
					{ name: 'Check Leaked', desc: 'Profile & image viewer', url: 'https://whatsapp.checkleaked.cc/' }
				]
			},
			{
				name: 'Facebook',
				links: [
					{ name: 'fb2pfp', desc: 'Profile photo downloader', url: 'https://fb2pfp.notalex.sh/' },
					{ name: 'fb2id', desc: 'User ID finder', url: 'https://fb2id.notalex.sh/' },
					{ name: 'FDown', desc: 'Video downloader', url: 'https://fdown.net/' },
					{ name: 'SOWSearch', desc: 'Query builder', url: 'https://sowsearch.info/' },
					{ name: 'Faceb', desc: 'Profile viewer', url: 'https://faceb.com/profile-viewer/' },
					{ name: 'Lookup-ID', desc: 'User ID finder', url: 'https://lookup-id.com/#' },
					{ name: 'HaveIBeenZuckered', desc: 'Breach data search', url: 'https://haveibeenzuckered.com/' },
					{ name: 'DownEV', desc: 'Profile photo viewer', url: 'https://downev.com/profileviewer.html' }
				]
			},
			{
				name: 'Telegram',
				links: [
					{ name: 'Lyzem', desc: 'Telegram search tool', url: 'https://lyzem.com/' },
					{ name: 'TeleSearch', desc: 'Channel finder', url: 'https://telesearch.me/' }
				]
			},
			{
				name: 'YouTube',
				links: [
					{ name: 'CNV Downloader', desc: 'Video downloader', url: 'https://cnvmp3.com/v53' },
					{ name: 'Geofind', desc: 'Location finder for videos', url: 'https://mattw.io/youtube-geofind/' },
					{ name: 'Unlisted Videos', desc: 'Search unlisted content', url: 'https://unlistedvideos.com/' },
					{ name: 'YTComment', desc: 'Comment search tool', url: 'https://ytcomment.kmcat.uk/' },
					{ name: 'Filmot', desc: 'Archive search', url: 'https://filmot.com/channelsearch/Nativlang' },
					{ name: 'Deleted Video Finder', desc: 'Recover deleted videos', url: 'https://findyoutubevideo.thetechrobo.ca/' },
					{ name: 'PreserveTube', desc: 'Video preservation', url: 'https://preservetube.com/' }
				]
			},
			{
				name: 'TikTok',
				links: [
					{ name: 'Timestamp Tool', desc: 'Extract post timestamps', url: 'https://bellingcat.github.io/tiktok-timestamp/' },
					{ name: 'UrleBird', desc: 'Profile viewer', url: 'https://urlebird.com/' },
					{ name: 'Mavekite', desc: 'Profile analyzer', url: 'https://mavekite.com/' },
					{ name: 'Claptools', desc: 'Profile viewer', url: 'https://claptools.com/tiktok-profile-viewer/' }
				]
			},
			{
				name: 'Reddit',
				links: [
					{ name: 'RedTrail', desc: 'Archive search & analysis', url: 'https://redtrail.notalex.sh/' },
					{ name: 'Arctic Shift', desc: 'Archive search', url: 'https://arctic-shift.photon-reddit.com/search/' },
					{ name: 'PullPush', desc: 'Archive search', url: 'https://search.pullpush.io/' }
				]
			},
			{
				name: 'Twitter/X',
				links: [
					{ name: 'Wayback Tweets', desc: 'Archive search', url: 'https://waybacktweets.streamlit.app/' },
					{ name: 'Nitter', desc: 'Alt frontend, no account', url: 'https://nitter.net/' },
					{ name: 'X OSINT Guide', desc: 'Advanced search techniques', url: 'https://hackers-arise.com/twitter-x-strategic-osint-techniques/' },
					{ name: 'BirdHunt', desc: 'Location-based search', url: 'https://birdhunt.huntintel.io/', tag: 'account' }
				]
			},
			{
				name: 'Snapchat',
				links: [
					{ name: 'Backmoji', desc: 'Historical bitmoji search', url: 'https://backmoji.myosint.training/' },
					{ name: 'Snap Maps', desc: 'Location activity map', url: 'https://maps.snapchat.com', tag: 'account' }
				]
			},
			{
				name: '4Chan',
				links: [
					{ name: '4chansearch', desc: 'Archive search', url: 'https://4chansearch.com/' },
					{ name: '4plebs', desc: 'Board archive', url: 'https://4plebs.org/' }
				]
			},
			{
				name: 'Gaming Platforms',
				links: [
					{ name: 'Xbox Gamertag', desc: 'Gamertag search', url: 'https://xboxgamertag.com/' },
					{ name: 'NameMC', desc: 'Minecraft username history', url: 'https://namemc.com/' },
					{ name: 'PSN Profiles', desc: 'PlayStation profile search', url: 'https://psnprofiles.com/' },
					{ name: 'Steam Reveal', desc: 'Steam user search', url: 'https://steam-reveal.vercel.app/' }
				]
			},
			{
				name: 'GitHub',
				links: [
					{ name: 'Kraken', desc: 'Email finder from username', url: 'https://kraken.notalex.sh/' },
					{ name: 'GitHub ID Finder', desc: 'User ID lookup', url: 'https://caius.github.io/github_id/' },
					{ name: 'grep.app', desc: 'Code search engine', url: 'https://grep.app/' }
				]
			},
			{
				name: 'Discord',
				links: [
					{ name: 'DiscordLeaks', desc: 'Leaked message search', url: 'https://discordleaks.unicornriot.ninja/discord/server/' }
				]
			},
			{
				name: 'Other Platforms',
				links: [
					{ name: 'Tinder Search', desc: 'Username lookup', url: 'https://www.gotinder.com/@username' },
					{ name: 'AdobeRecon', desc: 'Email registration check', url: 'https://adoberecon.notalex.sh/' },
					{ name: 'SpotifyRecon', desc: 'Email registration check', url: 'https://spotifyrecon.notalex.sh/' },
					{ name: 'Export Comments', desc: 'Cross-platform comment export', url: 'https://exportcomments.com/' },
					{ name: 'DDoSecrets', desc: 'Historical breach data', url: 'https://search.ddosecrets.org/data/' }
				]
			}
		]
	},
	{
		category: 'Domain & Network Intelligence',
		links: [
			{ name: 'Shodan', desc: 'Internet-connected device search', url: 'https://www.shodan.io/' },
			{ name: 'Censys', desc: 'Internet asset search & analysis', url: 'https://search.censys.io/' },
			{ name: 'Talos Intelligence', desc: 'IP/domain reputation', url: 'https://talosintelligence.com/reputation_center' },
			{ name: 'Whoxy', desc: 'WHOIS search', url: 'https://www.whoxy.com/' },
			{ name: 'IP-API', desc: 'IP geolocation lookup', url: 'https://ip-api.com/' },
			{ name: 'MXToolbox SuperTool', desc: 'Domain & IP multi-tool', url: 'https://mxtoolbox.com/SuperTool.aspx' },
			{ name: 'ViewDNS', desc: 'Reverse IP lookup', url: 'https://viewdns.info/reverseip/' },
			{ name: 'AbuseIPDB', desc: 'IP reputation database', url: 'https://www.abuseipdb.com/' },
			{ name: 'DNSDumpster', desc: 'DNS reconnaissance', url: 'https://dnsdumpster.com/' },
			{ name: 'Domain Dossier', desc: 'Domain investigation toolkit', url: 'https://centralops.net/co/DomainDossier.aspx' },
			{ name: 'WhatCMS', desc: 'CMS detection', url: 'https://whatcms.org/' },
			{ name: 'VirusTotal', desc: 'Domain/IP/file reputation', url: 'https://www.virustotal.com/gui/' },
			{ name: 'Netlas', desc: 'Internet asset search', url: 'https://app.netlas.io/host/' },
			{ name: 'DNS History', desc: 'Historical DNS records', url: 'https://dnshistory.org/' },
			{ name: 'Unfurl', desc: 'URL visualiser & parser', url: 'https://dfir.blog/unfurl/' },
			{ name: 'Favihash', desc: 'Favicon-based search', url: 'https://www.favihash.com/' },
			{ name: 'Criminal IP', desc: 'Internet asset search', url: 'https://www.criminalip.io/', tag: 'account' },
			{ name: 'WhoisFreaks', desc: 'Historical WHOIS lookup', url: 'https://whoisfreaks.com/tools/whois/history/lookup' }
		]
	},
	{
		category: 'People & Identity Search',
		links: [
			{ name: 'Person Lookup', desc: 'Australian people search', url: 'https://personlookup.com.au/' },
			{ name: 'FaceCheck', desc: 'Face image search', url: 'https://facecheck.id/' },
			{ name: 'PimEyes', desc: 'Face recognition search', url: 'https://pimeyes.com/' },
			{ name: 'White Pages AU', desc: 'Australian directory', url: 'https://www.whitepages.com.au/' },
			{ name: 'Webmii', desc: 'People search engine', url: 'https://webmii.com/' },
			{ name: 'Name Variant Search', desc: 'Name variation generator', url: 'https://bellingcat.github.io/name-variant-search/#gsc.tab=0' },
			{ name: 'Recruitin', desc: 'LinkedIn X-ray search', url: 'https://recruitin.net/' }
		]
	},
	{
		category: 'Phone Number Intelligence',
		links: [
			{ name: 'Truecaller', desc: 'Caller ID service', url: 'https://www.truecaller.com/', tag: 'account' },
			{ name: 'Emobile Tracker', desc: 'Phone number tracker', url: 'https://www.emobiletracker.com/' },
			{ name: 'Free Carrier Lookup', desc: 'Carrier identification', url: 'https://freecarrierlookup.com/' },
			{ name: 'Reverse Australia', desc: 'Australian number lookup', url: 'https://www.reverseaustralia.com/' },
			{ name: 'IMEI Info', desc: 'IMEI calculator & checker', url: 'https://www.imei.info/calc/' },
			{ name: 'MCC-MNC', desc: 'Identify IMSI origins', url: 'https://mcc-mnc.com/#database' }
		]
	},
	{
		category: 'Web Archiving & Preservation',
		links: [
			{ name: 'Wayback Machine', desc: 'Internet web archive', url: 'https://archive.org/' },
			{ name: 'Archive.is', desc: 'Web snapshot archive', url: 'https://archive.is/' },
			{ name: 'CachedView', desc: 'Cache source aggregator', url: 'https://cachedviews.com/' }
		]
	},
	{
		category: 'Transportation & Tracking',
		links: [
			{ name: 'MarineTraffic', desc: 'Live vessel tracking', url: 'https://www.marinetraffic.com/en/ais/home/' },
			{ name: 'FlightRadar24', desc: 'Live aircraft tracking', url: 'https://www.flightradar24.com/' },
			{ name: 'Maritime Database', desc: 'Vessel search & info', url: 'https://www.maritime-database.com/' },
			{ name: 'OpenRailwayMap', desc: 'Railway infrastructure map', url: 'https://www.openrailwaymap.org/' },
			{ name: 'Transperth', desc: 'Perth transport search', url: 'https://www.transperth.wa.gov.au/journey-planner/stops-near-you' },
			{ name: 'TransWA System Map', desc: 'WA transport map', url: 'https://www.transwa.wa.gov.au/Portals/0/Transwa%20System%20Map%20(all%20stations).pdf?ver=HCf1WJQsFK9vilBTqkZH9Q%3D%3D' }
		]
	},
	{
		category: 'Australian Vehicle Registration',
		links: [
			{ name: 'NSW Rego Check', desc: 'Service NSW', url: 'https://check-registration.service.nsw.gov.au/frc?isLoginRequired=true' },
			{ name: 'VIC Rego Check', desc: 'VicRoads', url: 'https://www.vicroads.vic.gov.au/registration/buy-sell-or-transfer-a-vehicle/check-vehicle-registration/vehicle-registration-enquiry' },
			{ name: 'QLD Rego Check', desc: 'Transport QLD', url: 'https://www.service.transport.qld.gov.au/checkrego/application/VehicleSearch.xhtml?dswid=5326' },
			{ name: 'NT Rego Check', desc: 'NT Government', url: 'https://nt.gov.au/driving/rego/existing-nt-registration/rego-check' },
			{ name: 'TAS Rego Check', desc: 'Transport TAS', url: 'https://transport.stgro-2780.saas.squiz.cloud/rego-status/search' },
			{ name: 'SA Rego Check', desc: 'EzyReg SA', url: 'https://account.ezyreg.sa.gov.au/account/check-registration.htm' },
			{ name: 'WA Rego Check', desc: 'WA DoT', url: 'https://online.transport.wa.gov.au/webExternal/' },
			{ name: 'ACT Rego Check', desc: 'Access Canberra', url: 'https://rego.act.gov.au/regosoawicket/public/reg/FindRegistrationPage' }
		]
	},
	{
		category: 'Cryptocurrency & Currency',
		links: [
			{ name: 'Blockchair', desc: 'Blockchain explorer', url: 'https://blockchair.com/' },
			{ name: 'Chainabuse', desc: 'Crypto abuse reports', url: 'https://chainabuse.com/reports' },
			{ name: 'OANDA', desc: 'Historical currency converter', url: 'https://www.oanda.com/currency-converter/en/?from=EUR&to=USD&amount=1' },
			{ name: 'CommBank FX', desc: 'Foreign exchange rates', url: 'https://www.commbank.com.au/international/foreign-exchange-rates.html' }
		]
	},
	{
		category: 'Business & Corporate Intelligence',
		links: [
			{ name: 'OpenCorporates', desc: 'Global company search', url: 'https://opencorporates.com/' },
			{ name: 'ASIC', desc: 'AU company & business search', url: 'https://asic.gov.au/' },
			{ name: 'ABR', desc: 'ABN lookup', url: 'https://abr.business.gov.au/' },
			{ name: 'Offshore Leaks', desc: 'ICIJ company/officer search', url: 'https://offshoreleaks.icij.org/' },
			{ name: 'BBB', desc: 'Business reviews', url: 'https://www.bbb.org/' }
		]
	},
	{
		category: 'Utilities & Tools',
		links: [
			{ name: 'Cobalt', desc: 'Universal media downloader', url: 'https://cobalt.tools/' },
			{ name: 'CyberChef', desc: 'Data analysis & conversion', url: 'https://gchq.github.io/CyberChef/' },
			{ name: 'Google Translate', desc: 'Language translation', url: 'https://translate.google.com/' },
			{ name: 'Bureau of Meteorology', desc: 'Australian weather data', url: 'https://www.bom.gov.au/' },
			{ name: 'Dehashed', desc: 'Breach & credential search', url: 'https://dehashed.com/', tag: 'account' },
			{ name: 'OSINT Leak', desc: 'Breach data search', url: 'https://osintleak.com/', tag: 'account' },
			{ name: 'Hidden Wiki', desc: 'Dark web directory', url: 'https://thehiddenwiki.org/' },
			{ name: 'Trove', desc: 'Australian library search', url: 'https://trove.nla.gov.au/' },
			{ name: 'OneLook', desc: 'Reverse dictionary', url: 'https://www.onelook.com/reverse-dictionary.shtml' },
			{ name: 'ChatGPT', desc: 'AI assistant', url: 'https://chatgpt.com/' },
			{ name: 'Marksmith', desc: 'Bookmark builder tool', url: 'https://marksmith.notalex.sh/' }
		]
	},
	{
		category: 'OSINT Resources & Guides',
		links: [
			{ name: 'Bookmarklets', desc: 'OSINT bookmarklets collection', url: 'https://bookmarklets.notalex.sh/' },
			{ name: 'Hatless1der', desc: 'OSINT blog & guides', url: 'https://hatless1der.com/' },
			{ name: 'Nixintel', desc: 'OSINT resource list', url: 'https://start.me/p/rx6Qj8/nixintel-s-osint-resource-list' },
			{ name: 'OSINT Framework', desc: 'Tool directory', url: 'https://osintframework.com/' },
			{ name: 'Awesome OSINT', desc: 'GitHub collection', url: 'https://github.com/jivoi/awesome-osint' },
			{ name: 'Bellingcat Toolkit', desc: 'Investigation toolkit', url: 'https://bellingcat.gitbook.io/toolkit' },
			{ name: 'IntelTechniques', desc: 'OSINT resources & tools', url: 'https://inteltechniques.com/' },
			{ name: 'Project Eyrie', desc: 'OSINT blog', url: 'https://eyrie.notalex.sh/' }
		]
	}
];

// Returns the total number of links across all categories
export function getTotalLinks(): number {
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

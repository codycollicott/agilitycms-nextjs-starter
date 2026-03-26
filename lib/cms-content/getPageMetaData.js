import ReactHtmlParser from "html-react-parser"

export const getPageMetaData = (agilityPage) => {

	const metaHTML = agilityPage.page?.seo?.metaHTML

	// setup and parse additional header markup
	let additionalHeaderMarkup = null
	if (metaHTML) {
		additionalHeaderMarkup = ReactHtmlParser(metaHTML)
	}

	let metadata = {
		title: agilityPage.sitemapNode?.title,
		description: agilityPage.page?.seo?.metaDescription,
		keywords: agilityPage.page?.seo?.metaKeywords,
	}

	return metadata

}
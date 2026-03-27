import { getHeaderContent } from "./getHeaderContent"
import ReactHtmlParser from "html-react-parser"
import { getContentItem } from "lib/cms/getContentItem"

export const resolveAgilityMetaData = async ({ agilityData, locale, sitemap, isDevelopmentMode, isPreview, parent }) => {


	const header = await getHeaderContent({ locale, sitemap })
	const ogImages = (await parent).openGraph?.images || []

	//#region *** resolve open graph stuff from dynamic pages ***
	if (agilityData.sitemapNode.contentID !== undefined
		&& agilityData.sitemapNode.contentID > 0) {

		//get the content item for this dynamic page
		try {
			const contentItem = await getContentItem({
				contentID: agilityData.sitemapNode.contentID,
				languageCode: locale,
				locale
			})

			if (contentItem.properties.definitionName === "Post") {
				/* *** Posts MetaData *** */
				const image = contentItem.fields["image"]

				if (image) {
					ogImages.push({
						url: `${image.url}?format=auto&w=1200`,
						alt: image.label
					})
				}
			} else {
				//TODO: handle other dynamic pages types here!
			}

		} catch (error) {
			console.warn("Could not resolve open graph meta data from dynamic page contentID:", agilityData.sitemapNode.contentID, error)
		}
	}
	//#endregion

	//#region *** resolve the "additional" meta tags ***
	let metaHTML = agilityData.page?.seo?.metaHTML

	let otherMetaData = {}

	if (metaHTML) {
		const additionalHeaderMarkup = ReactHtmlParser(metaHTML)
		const handleMetaTag = (item) => {
			if (!item.type) return
			//check if this is a meta tag and add it to the otherMetaData if so
			if (item.type === "meta") {
				const metaTag = item.props
				if (metaTag && metaTag.property && metaTag.content) {

					//special case for og:image
					if (metaTag.property === "og:image") {
						ogImages.push({
							url: metaTag.content
						})
					} else {
						otherMetaData[metaTag.property] = metaTag.content
					}

					return
				}
			}
			console.warn("Could not output tag in Additional Header Markup", item)
		}

		if (typeof additionalHeaderMarkup === "string") {
			console.warn("Could not parse additional meta tags from Agility CMS")
		} else if (Array.isArray(additionalHeaderMarkup)) {
			//array of meta tags
			additionalHeaderMarkup.forEach((item) => handleMetaTag(item));
		} else {
			//single meta tag
			handleMetaTag(additionalHeaderMarkup)
		}
	}
	//#endregion



	const metaData = {
		metadataBase: new URL('https://preview-tests-nov-2023.vercel.app'),
		title: `${agilityData.page?.seo?.metaDescription || agilityData.sitemapNode?.title || "Oxford Brand"}`,
		description: agilityData.page?.seo?.metaDescription,
		keywords: agilityData.page?.seo?.metaKeywords,
		openGraph: {
			images: ogImages,
		},

		generator: `Agility CMS`,
		other: otherMetaData

	}

	return metaData



}
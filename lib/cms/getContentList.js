import getAgilitySDK from "lib/cms/getAgilitySDK"

export const getContentList = async (params) => {


	const agilitySDK = await getAgilitySDK()

	agilitySDK.config.fetchConfig = {
		next: {
			tags: [`agility-content-${params.referenceName}-${params.languageCode || params.locale}`],
			revalidate: 60,
		},
	}

	return await agilitySDK.getContentList(params)

}
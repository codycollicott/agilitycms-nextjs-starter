import { UnloadedModuleProps } from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"

interface IHeading {
  title: string,
  subline: string
}

const ContentHeading = async ({ module, languageCode }: UnloadedModuleProps) => {
  const { fields, contentID } = await getContentItem<IHeading>({
    contentID: module.contentid,
    languageCode,
  })
	
  return (
		<div className="relative py-12" data-agility-component={contentID}>
			<h4 data-agility-field={"title"} className="mb-8"> {fields.title} </h4>
			<div className="w-3/4">
				<p className="text-gray-600"> {fields?.subline} </p>
			</div>
		</div>
  )
}

export default ContentHeading

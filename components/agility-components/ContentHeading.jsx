import { UnloadedModuleProps } from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"

const ContentHeading = async ({ module, languageCode }) => {
  const { fields, contentID } = await getContentItem({
    contentID: module.contentid,
    languageCode,
  })
	if (fields?.image) return (
    <div className=""> <img className="w-full" src={fields?.image?.url} /> </div>
  )
  return (
    <div className="bg-black px-12 py-16 mb-8">
      <h2 className="text-white"> {fields.title} </h2>
    </div>
  )
}

export default ContentHeading

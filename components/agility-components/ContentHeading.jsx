import { UnloadedModuleProps } from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"

const ContentHeading = async ({ module, languageCode }) => {
  const { fields, contentID } = await getContentItem({
    contentID: module.contentid,
    languageCode,
  })
	if (fields?.image) return (
    <div className="h-[312px] bg-cover bg-center w-full" style={{backgroundImage:`url('${fields?.image?.url}')`} }> </div>
  )
  return (
    <div style={{backgroundImage:'url(/banner.jpg)'}} className="bg-cover bg-right px-8 py-12 md:py-16 mb-8">
      <h2 className="text-white"> {fields.title} </h2>
    </div>
  )
}

export default ContentHeading

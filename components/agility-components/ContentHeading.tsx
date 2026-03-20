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
    <div className="bg-black px-12 py-16 mb-8">
      <h2 className="text-white"> {fields.title} </h2>
    </div>
  )
}

export default ContentHeading

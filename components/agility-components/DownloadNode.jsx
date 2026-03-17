import { getContentItem } from "lib/cms/getContentItem"
import { renderHTML } from "@agility/nextjs"
import { CgSoftwareDownload, CgArrowRight } from "react-icons/cg"
import Link from "next/link"
const DownloadNode = async ({ module, languageCode }) => {
  
  const { fields, contentID } = await getContentItem({
    contentID: module.contentid,
    languageCode,
  })
  console.log(fields)
  return (
		<div style={{ width: `${fields?.nodeWidth}%` }} className="relative mt-20" data-agility-component={contentID}>
      <div className="mb-4 mb-8 mb-12 hidden"></div>
			
			<h4 className={`mb-${fields?.titleSpacingBottom}`}> {fields?.title} </h4>
			{fields?.subTitle && (
				<h4 className={`mb-${fields?.subTitleSpacingBottom} text-gray-600`}> {fields?.subTitle}</h4>
			)}
      <div
        data-agility-field="textblob"
        data-agility-html
        className="text-gray-600"
        dangerouslySetInnerHTML={renderHTML(fields?.content)}
      ></div>
      {!!(fields?.downloadLabel || fields?.navigationLabel) && (
        <div className="flex items-center mt-6">
          {fields?.downloadLabel && (
            <div className="border border-black px-6 py-2 rounded-md flex mr-6">
              <p className="text-sm mr-4">{fields?.downloadLabel}</p>
              <CgSoftwareDownload className="w-4" />
            </div>
          )}
          {fields?.navigationLabel && (
            <Link href={fields?.navigationURL || ''}>
              <div className="flex items-center">
                <p className="text-xl mr-4">{fields?.navigationLabel}</p>
                <div className="border border-black w-8 h-8 rounded-full flex items-center justify-center">
                  <CgArrowRight className="w-4" />
                </div>
              </div>
            </Link>
          )}
        </div>
      )}
		</div>
  )
}

export default DownloadNode

import { getContentItem } from "lib/cms/getContentItem"
import { renderHTML } from "@agility/nextjs"
import Link from "next/link"
import { StyledText, RichStyledText } from "../../components/common/text/helper"
const DownloadNode = async ({ module, languageCode }) => {
  
  const { fields, contentID } = await getContentItem({
    contentID: module.contentid,
    languageCode,
  })
  return (
		<div id={fields?.navigationID || ''} className={`w-full md:w-3/4 xl:w-[${fields?.nodeWidth}%] pl-8 md:pl-20 pr-8 md:pr-4 relative mt-16 md:mt-20`} data-agility-component={contentID}>
      <div className="mb-4 md:w-[33%] md:w-[66%] md:w-[50%] md:w-[75%] mb-8 mb-12 hidden"></div>
			<StyledText 
        weight={fields?.titleFontStyle}
				color={fields?.titleColor} 
				content={fields?.title} 
				style={fields?.titleStyle}
				spacingBottom={fields?.titleSpacingBottom}
			/>
			{fields?.subTitle && (
				<h4 className={`mb-${fields?.subTitleSpacingBottom} text-gray-600`}> {fields?.subTitle}</h4>
			)}
      <div
        data-agility-field="textblob"
        data-agility-html
        className="text-gray-600 download-node-content"
        dangerouslySetInnerHTML={renderHTML(fields?.content)}
      ></div>
      {(fields?.hasBorder == 'true' && fields?.downloadLabel) && (
        <div className="flex">
          <Link target="_blank" href={fields?.downloadURL || ''}>
            <div className="border border-black px-6 py-2 rounded-md flex mr-6">
              <p className="text-sm mr-4">{fields?.downloadLabel}</p>
              <img src={`/button_${fields?.icon}.svg`} className="w-4" />
            </div>
          </Link>
        </div>
      )}
      {(fields?.downloadLabel && (!fields?.hasBorder || fields?.hasBorder == 'false')) && (
        <Link href={fields?.downloadURL || ''}>
          <div className="flex items-center">
            <StyledText 
              weight={fields?.labelFontWeight}
              color='black' 
              content={fields?.downloadLabel} 
              style={fields?.labelStyle}
            />
            <div className="w-8 ml-4">
              <img className='w-full' src={`/button_${fields?.icon}.svg`} />
            </div>
          </div>
        </Link>
      )}
		</div>
  )
}

export default DownloadNode

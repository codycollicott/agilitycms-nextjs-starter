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
		<div id={fields?.navigationID || ''} className={`w-full xl:w-[${fields?.nodeWidth}%] pl-8 xl:pl-20 pr-8 md:pr-4 relative mt-12 md:mt-20`} data-agility-component={contentID}>
      <div className="mb-4 mb-8 mb-12 hidden"></div>
			<StyledText 
        weight={fields?.titleFontStyle}
				color={fields?.titleColor} 
				content={fields?.title} 
				style={fields?.titleStyle}
				spacingBottom={fields?.titleSpacingBottom}
			/>
      {fields?.titleBorderBottom == 'true' && (
        <div className={`mb-${fields?.titleSpacingBottom} h-[2px] bg-black w-full`}> </div>
      )}
			{fields?.subTitle && (
				<h4 className={`mb-${fields?.subTitleSpacingBottom} text-[#666]`}> {fields?.subTitle}</h4>
			)}
      <div
        data-agility-field="textblob"
        data-agility-html
        className="text-[#666] download-node-content"
        dangerouslySetInnerHTML={renderHTML(fields?.content)}
      ></div>
      {(fields?.hasBorder == 'true' && fields?.downloadLabel) && (
        <div className="flex">
          <Link target="_blank" href={fields?.downloadURL || ''}>
            <div className="border group hover:bg-black border-black px-6 py-2 rounded-md flex mr-6 ">
              <p className="text-sm group-hover:text-white mr-4">{fields?.downloadLabel}</p>
              <img src={`/button_${fields?.icon}.svg`} className="w-4 block group-hover:hidden" />
              <img src={`/button_${fields?.icon}_filled.svg`} className="w-4 hidden group-hover:block" />
            </div>
          </Link>
        </div>
      )}
      {(fields?.downloadLabel && (!fields?.hasBorder || fields?.hasBorder == 'false')) && (
        <Link target="_blank" href={fields?.downloadURL || ''}>
          <div className="flex items-center group">
            <StyledText 
              weight={fields?.labelFontWeight}
              color='black' 
              content={fields?.downloadLabel} 
              style={fields?.labelStyle}
            />
            <div className="w-8 ml-4">
              <img className='w-full block group-hover:hidden' src={`/button_${fields?.icon}.svg`} />
              <img className='w-full hidden group-hover:block' src={`/button_${fields?.icon}_filled.svg`} />
            </div>
          </div>
        </Link>
      )}
		</div>
  )
}

export default DownloadNode

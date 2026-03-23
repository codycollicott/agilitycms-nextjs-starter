import { getContentItem } from "lib/cms/getContentItem"
import { StyledText, RichStyledText } from "../common/text/helper"
const ImageNode = async ({ module, languageCode }) => {
  
  const { fields, contentID } = await getContentItem({
    contentID: module.contentid,
    languageCode,
  })
  console.log(fields)
  return (
		<div id={fields?.navigationID || ''} className="pl-20 pr-4 relative mt-20" data-agility-component={contentID}>
      {(fields?.hideTitle !== 'true') && (
        <StyledText 
          weight={fields?.titleFontWeight}
          color={fields?.titleColor} 
          content={fields?.title} 
          style={fields?.titleStyle}
          spacingBottom={fields?.titleSpacingBottom}
        />
      )}
      {fields?.titleBorderBottom == 'true' && (
        <div className={`mb-${fields?.titleSpacingBottom} h-[2px] bg-black w-full`}> </div>
      )}
      <RichStyledText 
        color={fields?.contentColor} 
        content={fields?.content} 
        spacingBottom={fields?.contentSpacingBottom}
      />
			<img src={fields?.imageBackup?.url} />
      {fields?.imageDisclaimer && (
        <p className="mt-2"> {fields?.imageDisclaimer} </p>
      )}
      
		</div>
  )
}

export default ImageNode

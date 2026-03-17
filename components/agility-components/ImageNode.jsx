import { getContentItem } from "lib/cms/getContentItem"
import { StyledText, RichStyledText } from "../common/text/helper"
const ImageNode = async ({ module, languageCode }) => {
  
  const { fields, contentID } = await getContentItem({
    contentID: module.contentid,
    languageCode,
  })
  console.log(fields)
  return (
		<div className="relative mt-20" data-agility-component={contentID}>
      {(fields?.title && fields?.hideTitle !== 'true') && (
        <StyledText 
          color={fields?.titleColor} 
          content={fields?.title} 
          style={fields?.titleStyle}
          spacingBottom={fields?.titleSpacingBottom}
        />
      )}
      <RichStyledText 
        color={fields?.contentColor} 
        content={fields?.content} 
        spacingBottom={fields?.contentSpacingBottom}
      />
			<img src={fields?.imageBackup?.url} />
		</div>
  )
}

export default ImageNode

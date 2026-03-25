import { getContentItem } from "lib/cms/getContentItem"
import { StyledText, RichStyledText } from "../common/text/helper"
import Link from "next/link"
const ImageNode = async ({ module, languageCode }) => {
  
  const { fields, contentID } = await getContentItem({
    contentID: module.contentid,
    languageCode,
  })
  
  const ImageWrapLink = ({children}) => {
    if (fields?.imageURL) {
      return (<Link href={fields?.imageURL || ''}> {children}</Link>)
    }
    return <span>{children}</span>
  }

  const GetImage = () => {
    if (fields?.image) {
      const rawImage = JSON.parse(fields?.image);
      return  <ImageWrapLink> <img src={rawImage?.url} />  </ImageWrapLink>
    }
    return <ImageWrapLink> <img src={fields?.imageBackup?.url} />  </ImageWrapLink>
  }
  
  return (
		<div id={fields?.navigationID || ''} className="pl-8 xl:pl-20 pr-8 md:pr-4 relative mt-12 md:mt-20" data-agility-component={contentID}>
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
			<GetImage />
      {fields?.imageDisclaimer && (
        <p className="mt-2"> {fields?.imageDisclaimer} </p>
      )}
      
		</div>
  )
}

export default ImageNode

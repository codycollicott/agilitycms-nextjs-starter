"use client"
import { renderHTML } from "@agility/nextjs"
import { StyledText, RichStyledText } from "./text/helper"
const TextNode = ({ node, grid, index }) => {

	if (!node) {
		return (
			<header className="relative p-8 text-center">
				<p className="text-gray-400 font-bold">No Header Available</p>
			</header>
		)
	}
  const GetImage = () => {
    if (!node?.fields?.image && !node?.fields?.backupImage) return
    if (node?.fields?.title == 'Purpose') {
      console.log(node?.fields?.backupImage?.url)
    }
    if (node?.fields?.image) {

      const rawImage = JSON.parse(node?.fields?.image);
      if (node?.fields?.imageFixedHeight) {
        return <div style={{backgroundImage:rawImage?.url, height: `${node?.fields?.imageFixedHeight}px`}} />
      }
      return  <img src={rawImage?.url} />
    }
    if (node?.fields?.imageFixedHeight) {
      return <div style={{backgroundImage:`url(${node?.fields?.backupImage?.url})`, height: `${node?.fields?.imageFixedHeight}px`}} className="bg-cover bg-center" />
    }
    return <img src={node?.fields?.backupImage?.url} />
  }
  if (node?.fields?.title == 'Example 2 with Legend Style') {
    console.log(node?.fields)
  }
	return (
		<div className={`${grid?.hasBorder == "true" && 'border-l-1 border-black pl-4'}`}>
			{node?.fields?.imagePosition == 'aboveTitle' && (
        <div className="mb-4"><GetImage /></div>
			)}
			{grid?.isNumbered == "true" && (
				<StyledText 
          weight={node?.fields?.TitleFontWeight} 
					color={node?.fields?.titleColor} 
					content={`${index + 1}.`} 
					style={node?.fields?.titleStyle}
          spacing={node?.fields?.titleSpacingBottom}
				/>
			)}
      {node?.fields?.hideTitle !== 'true' && (
        <StyledText 
          weight={node?.fields?.titleFontWeight} 
          color={node?.fields?.titleColor} 
          content={node?.fields?.title} 
          style={node?.fields?.titleStyle}
          spacingBottom={node?.fields?.titleSpacingBottom}
        />
      )}
      {node?.fields?.titleBorderBottom == 'true' && (
        <div className={`mb-${node?.fields?.titleSpacingBottom} h-[2px] bg-black w-full`}> </div>
      )}
      {node?.fields?.imagePosition != 'aboveTitle' && (
        <GetImage />
      )}
      <RichStyledText 
        color={node?.fields?.subTitleColor} 
        content={node?.fields?.subTitle} 
        style={node?.fields?.subTitleStyle}
      />
      
      
      <RichStyledText 
				color={node?.fields?.contentColor} 
				content={node?.fields?.content} 
				style={node?.fields?.contentStyle}
			/>
      
		</div>
	)
}

export default TextNode
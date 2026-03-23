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
  
	return (
		<div className={`${grid?.hasBorder == "true" && 'border-l-1 border-black pl-2'}`}>
			{node?.fields?.backupImage?.url && (
        <div className="h-[200px] bg-center bg-cover mb-4" style={{backgroundImage: `url(${node?.fields?.backupImage?.url})`}}>
				  
        </div>
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
			<StyledText 
        weight={node?.fields?.titleFontWeight} 
				color={node?.fields?.titleColor} 
				content={node?.fields?.title} 
				style={node?.fields?.titleStyle}
				spacingBottom={node?.fields?.titleSpacingBottom}
			/>

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
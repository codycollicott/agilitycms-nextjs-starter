import { UnloadedModuleProps, renderHTML } from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"
import TextNode from "../common/TextNode"
import ColorSwatch from "../common/ColorSwatch"
import QANode from '../common/QANode'
import MasonryGrid from "../common/MasonryGrid"
import { StyledText } from "../../components/common/text/helper"

const Grid = async ({ module, languageCode }) => {
  const { fields, contentID } = await getContentItem({
    contentID: module.contentid,
    languageCode,
  })
  
  return (
		<div id={fields?.navigationID || ''} className="pl-8 md:pl-20 pr-8 md:pr-4 relative mt-16 md:mt-20" data-agility-component={contentID}>
			<div className="md:grid-cols-4 md:grid-cols-5 md:grid-cols-3 md:grid-cols-2 text-sm hidden"></div>
      {fields?.hideTitle !== 'true' && (
        <StyledText 
          weight={fields?.titleFontWeight}
          color={fields?.titleColor} 
          style={fields?.titleStyle}
          content={fields?.title}
          spacingBottom={fields?.titleSpacingBottom}
        />
      )}
      {fields?.titleBorderBottom == 'true' && (
        <div className={`mb-${fields?.titleSpacingBottom} h-[2px] bg-black w-full`}> </div>
      )}
      {fields?.subTitle && (
        <div
          className={`text-gray-600 mb-${fields?.subTitleSpacingBottom}`}
          dangerouslySetInnerHTML={renderHTML(fields?.subTitle)}
        ></div>
      )}
      {fields?.masonlayout == 'true' ? (
        <MasonryGrid items={fields?.nodes} />
      ) : (
        <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-${fields?.gridcolumns} gap-8`}>
          {fields?.nodes?.map((node, index) => {
            if (node?.fields?.nodeType == "textImage") return <TextNode index={index} grid={fields} node={node} /> 
            if (node?.fields?.nodeType == "color") return <ColorSwatch  node={node} /> 
            if (node?.fields?.nodeType == "qa") return <QANode node={node} /> 
            return <div> </div>
          })}
        </div>
      )}
		</div>
  )
}

export default Grid

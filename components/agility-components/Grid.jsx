import { UnloadedModuleProps, renderHTML } from "@agility/nextjs"
import { getContentItem } from "lib/cms/getContentItem"
import TextNode from "../common/TextNode"
import ColorSwatch from "../common/ColorSwatch"
import MasonryGrid from "../common/MasonryGrid"
import { StyledText } from "../../components/common/text/helper"

const Grid = async ({ module, languageCode }) => {
  const { fields, contentID } = await getContentItem({
    contentID: module.contentid,
    languageCode,
  })
  console.log(fields)
  return (
		<div className="relative mt-20" data-agility-component={contentID}>
			<div className="grid-cols-4 grid-cols-5 grid-cols-3 grid-cols-2 text-sm hidden"></div>
      {fields?.HideTitle !== true && (
        <StyledText 
          color={fields?.titleColor} 
          style={fields?.titleStyle}
          content={fields?.title}
          spacingBottom={fields?.titleSpacingBottom}
        />
      )}
      <div
        className={`text-gray-600 mb-${fields?.subTitleSpacingBottom}`}
        dangerouslySetInnerHTML={renderHTML(fields?.subTitle)}
      ></div>
      {fields?.masonlayout == 'true' ? (
        <MasonryGrid items={fields?.nodes} />
      ) : (
        <div className={`grid grid-cols-${fields?.gridcolumns} gap-8`}>
          {fields?.nodes?.map((node, index) => {
            console.log(node)
            if (node?.fields?.nodeType == "textImage") return <TextNode index={index} grid={fields} node={node} /> 
            if (node?.fields?.nodeType == "color") return <ColorSwatch node={node} /> 
            return <div> </div>
          })}
        </div>
      )}
		</div>
  )
}

export default Grid

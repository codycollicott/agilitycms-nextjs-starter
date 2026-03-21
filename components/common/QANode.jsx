"use client"
import { renderHTML } from "@agility/nextjs"
import { StyledText } from "./text/helper"

const QANode = ({ node, grid, index }) => {

  if (!node) {
    return (
      <header className="relative p-8 text-center">
        <p className="text-gray-400 font-bold">No Header Available</p>
      </header>
    )
  }
  
  const items = node?.fields?.qAItems
    .split(/<\/p>/)
    .map(item => item.replace(/<p>/, "").trim())
    .filter(Boolean);


  return (
    <div>
      {node?.fields?.hideTitle !== 'true' && (
        <StyledText 
          color={node?.fields?.titleColor} 
          style={node?.fields?.titleStyle}
          content={node?.fields?.title}
          spacingBottom={node?.fields?.titleSpacingBottom}
        />
      )}
      {node?.fields?.titleBorderBottom == 'true' && (
        <div className={`mb-${node?.fields?.titleSpacingBottom} h-[2px] bg-black w-full`}> </div>
      )}
      {items?.map(item => (
        <div className="flex mb-4 items-start "> 
          <img className="w-[20px] mr-4" src='/check.svg' />
          <p className="w-5/6 text-gray-600"> 
            <div className={`text-gray-600`} dangerouslySetInnerHTML={renderHTML(item)} ></div>
          </p>
        </div>
      ))}
    </div>
  )
}

export default QANode
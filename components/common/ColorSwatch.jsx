"use client"
import { StyledText } from "../../components/common/text/helper"
const ColorSwatch = ({ node, height='auto' }) => {

	if (!node) {
		return (
			<header className="relative p-8 text-center">
				<p className="text-gray-400 font-bold">No Header Available</p>
			</header>
		)
	}
  const colorNodeHeight = () => {
    console.log(height)
    if (node?.fields?.colorHeight == 'square') {
      return 'h-32'
    }
    if (height !== 'auto') {
      return `${height}`
    }
    return 'min-h-[235px]'
  }
  const colorNodeStyle = (type) => {
    if (type == 'true') {
      return { borderLeft: `12px solid #${node?.fields?.hexcode}` }
    }
    return { backgroundColor: `#${node?.fields?.hexcode}` }
  }
  
  const getTextColor = (colorByNode) => {
    if (colorByNode == 'black') return 'text-black'
    if (colorByNode == 'white') return 'text-white'
    return 'text-gray-600'
  }

	return (
		<div 
      className={` ${node?.fields?.colorHasStroke ? 'border border-1 border-[#666]' : ''} ${colorNodeHeight()} p-4 flex flex-col justify-between`} 
      style={colorNodeStyle(node?.fields?.displayAsBorder)}
    >
      <div>
        <StyledText 
          color={node?.fields?.titleColor} 
          spacingBottom={node?.fields?.titleSpacingBottom} 
          style={node?.fields?.titleStyle} 
          content={node?.fields?.title} 
        />
        {node?.fields?.colorSubTitle && (
          <p className={`${getTextColor(node?.fields?.colorSwatchSubTitleColor)} text-xl mb-4`}> {node?.fields?.colorSubTitle}</p>
        )}
        {node?.fields?.showsecondarycolorcodes !== 'false' && (
          <div className="flex">
            <p className={`${getTextColor(node?.fields?.secondaryColorCodeColor)} w-1/4`}> RGB </p>
            <p className={`${getTextColor(node?.fields?.secondaryColorCodeColor)}`}> {node?.fields?.rGBcode} </p>
          </div>
        )}
        {node?.fields?.hideHex !== 'true' && (
          <div className="flex">
            <p className={`${getTextColor(node?.fields?.secondaryColorCodeColor)} w-1/4`}> HEX </p>
            <p className={`${getTextColor(node?.fields?.secondaryColorCodeColor)}`}> {node?.fields?.hexcode}</p>
          </div>
        )}
        {node?.fields?.showsecondarycolorcodes !== 'false' && (
          <div> 
            <div className="flex">
              <p className={`${getTextColor(node?.fields?.secondaryColorCodeColor)} w-1/4`}> CMYK </p>
              <p className={`${getTextColor(node?.fields?.secondaryColorCodeColor)} `}> {node?.fields?.cMYKcode} </p>
            </div>
            {node?.fields?.pMSCode && (
              <div className="flex">
                <p className={`${getTextColor(node?.fields?.secondaryColorCodeColor)} w-1/4`}> PMS </p>
                <p className={`${getTextColor(node?.fields?.secondaryColorCodeColor)}`}> {node?.fields?.pMSCode} </p>
              </div>
            )}
          </div>
        )}
      </div>
      {node?.fields?.logoBackup?.url && (
        <div className="flex">
          <img src={node?.fields?.logoBackup?.url} />
        </div>
      )}
		</div>
	)
}

export default ColorSwatch
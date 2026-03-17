"use client"

const ColorSwatch = ({ node, height='auto' }) => {
	if (!node) {
		return (
			<header className="relative p-8 text-center">
				<p className="text-gray-400 font-bold">No Header Available</p>
			</header>
		)
	}
  const colorNodeStyle = (type) => {
    if (type == 'true') {
      return { borderLeft: `12px solid #${node?.fields?.hexcode}` }
    }
    return { backgroundColor: `#${node?.fields?.hexcode}` }
  }
  if (node?.fields?.title == 'White Text') {
    console.log(node?.fields)
  }
  const getTextColor = (colorByNode) => {
    if (colorByNode == 'black') return 'text-black'
    if (colorByNode == 'white') return 'text-white'
    return 'text-gray-600'
  }
	return (
		<div className={` ${height == 'auto' ? 'min-h-[235px]' : height} p-4 flex flex-col justify-between`} style={colorNodeStyle(node?.fields?.displayAsBorder)}>
      <div>
        <p className={`${node?.fields?.colorSubTitle ? 'mb-0' : 'mb-4'} ${getTextColor(node?.fields?.titleColor)} text-xl`}> 
          {node?.fields?.title}
        </p>
        {node?.fields?.colorSubTitle && (
          <p className={`${getTextColor(node?.fields?.colorSwatchSubTitleColor)} text-xl mb-4`}> {node?.fields?.colorSubTitle}</p>
        )}
        {node?.fields?.hideHex !== 'true' && (
          <div className="flex">
            <p className={`${getTextColor(node?.fields?.secondaryColorCodeColor)} w-1/4`}> HEX </p>
            <p className={`${getTextColor(node?.fields?.colorLabelColor)}`}> {node?.fields?.hexcode}</p>
          </div>
        )}
        {node?.fields?.showsecondarycolorcodes !== 'false' && (
          <div> 
        
            <div className="flex">
              <p className={`${getTextColor(node?.fields?.colorLabelColor)} w-1/4`}> RGB </p>
              <p className={`${getTextColor(node?.fields?.colorLabelColor)}`}> {node?.fields?.rGBcode} </p>
            </div>
            <div className="flex">
              <p className={`${getTextColor(node?.fields?.colorLabelColor)} w-1/4`}> CMYK </p>
              <p className={`${getTextColor(node?.fields?.colorLabelColor)} `}> {node?.fields?.cMYKcode} </p>
            </div>
            {node?.fields?.pMSCode && (
              <div className="flex">
                <p className={`${getTextColor(node?.fields?.colorLabelColor)} w-1/4`}> PMS </p>
                <p className={`${getTextColor(node?.fields?.colorLabelColor)}`}> {node?.fields?.pMSCode} </p>
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
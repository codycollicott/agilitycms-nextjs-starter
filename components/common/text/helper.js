import { UnloadedModuleProps, renderHTML } from "@agility/nextjs"

export const StyledText = ({style, weight, color, content, spacingBottom}) => {
	//const textColor = color == 'grey' ? 'gray-500' : 'black'
	let textColor;
  const fontweight = weight ? `font-weight-${weight}` : ''
  switch (color) {
    case 'gray':
      textColor = "gray-600";
      break;
    case 'grey':
      textColor = "gray-600";
      break;
    case 'white':
      textColor = "white";
      break;
    default:
      textColor = "black";
  }


	switch(style) {
		case 'h1':
			return (<h1 className={`${fontweight} text-${textColor} mb-${spacingBottom}`}> {content} </h1>)
		case 'h2':
			return (<h2 className={`${fontweight} text-${textColor} mb-${spacingBottom}`}> {content} </h2>)
		case 'h3':
			return (<h3 className={`${fontweight} text-${textColor} mb-${spacingBottom}`}> {content} </h3>)
		case 'h4':
			return (<h4 className={`${fontweight} text-${textColor} mb-${spacingBottom}`}> {content} </h4>) 
		case 'h5':
			return (<h5 className={`${fontweight} text-${textColor} mb-${spacingBottom}`}> {content} </h5>)
		case 'h6':
			return (<h6 className={`${fontweight} text-${textColor} mb-${spacingBottom}`}> {content} </h6>)
		case 'p':
			return (<p className={`${fontweight} text-${textColor} mb-2`}> {content} </p>)
		case 'p-sm':
			return (<p className={`${fontweight} text-${textColor} mb-${spacingBottom} text-sm`}> {content} </p>)
		default:
			return (<h4 className={`${fontweight} default text-${textColor} mb-${spacingBottom}`}> {content} </h4>)
	}
}

export const RichStyledText = ({style, color, content}) => {
	const textColor = color == 'gray' ? 'gray-500' : 'black'
	return(
		<div
			data-agility-field="textblob"
			data-agility-html
			className={`text-${textColor} ${style}`}
			dangerouslySetInnerHTML={renderHTML(content)}
		></div>
	)
}
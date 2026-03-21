import { UnloadedModuleProps, renderHTML } from "@agility/nextjs"

export const StyledText = ({style, color, content, spacingBottom}) => {
	//const textColor = color == 'grey' ? 'gray-500' : 'black'
	let textColor;

  switch (color) {
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
			return (<h1 className={`text-${textColor} mb-${spacingBottom}`}> {content} </h1>)
		case 'h2':
			return (<h2 className={`text-${textColor} mb-${spacingBottom}`}> {content} </h2>)
		case 'h3':
			return (<h3 className={`text-${textColor} mb-${spacingBottom}`}> {content} </h3>)
		case 'h4':
			return (<h4 className={`text-${textColor} mb-${spacingBottom}`}> {content} </h4>) 
		case 'h5':
			return (<h5 className={`text-${textColor} mb-${spacingBottom}`}> {content} </h5>)
		case 'h6':
			return (<h6 className={`text-${textColor} mb-${spacingBottom}`}> {content} </h6>)
		case 'p':
			return (<p className={`text-${textColor} mb-2`}> {content} </p>)
		case 'p-sm':
			return (<p className={`text-${textColor} text-sm`}> {content} </p>)
		default:
			return (<h4 className={`default text-${textColor} mb-${spacingBottom}`}> {content} </h4>)
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
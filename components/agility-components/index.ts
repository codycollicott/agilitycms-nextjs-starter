import RichTextArea from "./RichTextArea";
import NoComponentFound from "./NoComponentFound";
import ContentHeading from "./ContentHeading";
import Grid from "./Grid";
import DownloadNode from "./DownloadNode"
import ImageNode from "./ImageNode"
// All of the Agility Page Module Components that are in use in this site need to be imported into this index file.
// Place Page Modules in allModules array below, passing in a name and the component.

const allModules = [
	{ name: "BrandContentHeading", module: ContentHeading},
	{ name: "BrandGridComponent", module: Grid},
	{ name: "RichTextArea", module: RichTextArea },
	{ name: "BrandDownloadComponent", module: DownloadNode },
  { name: "BrandImageComponent", module: ImageNode }
];

/**
 * Get the Agility Component/Module by name.
 * If the component is not found, a default component will be returned.
 * @param moduleName
 * @returns
 */
export const getModule = (moduleName: string): any | null => {
  console.log('Module name:')
  console.log(moduleName)
	if (!moduleName) return null;
	const obj = allModules.find(
		(m) => m.name.toLowerCase() === moduleName.toLowerCase()
	);
	if (!obj) return NoComponentFound;
	return obj.module
};

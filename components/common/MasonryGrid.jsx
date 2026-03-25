import ColorSwatch from "./ColorSwatch";
const MasonryGrid = ({
  items,
  containerHeight = "h-auto",
  gap = "gap-4",
}) => {
	
  const chunkedItems = [];
  for (let i = 0; i < items.length; i += 6) {
    chunkedItems.push(items.slice(i, i + 6));
  }

  return (
    <>
      {chunkedItems.map((chunk, i) => {
        const col1 = chunk[0];
        const col2 = chunk.slice(1, 4);
        const col3 = chunk.slice(4, 6);

        return (
          <div
            key={i}
            className={`grid grid-cols-1 xl:grid-cols-3 ${gap} ${containerHeight} mb-6`}
          >
            {/* Column 1 */}
            <div>
              {col1 && (
                <ColorSwatch height="h-[235px] xl:h-full" node={col1} />
              )}
            </div>

            {/* Column 2 */}
            <div className="grid grid-rows-3 xl:grid-rows-3 gap-6">
              {col2.map((item, idx) => (
                <ColorSwatch height="h-[235px]" node={item} />
              ))}
            </div>

            {/* Column 3 */}
            <div className="grid grid-rows-2 xl:grid-rows-3 gap-6">
              {col3[0] && (
								<ColorSwatch height="h-[235px] xl:h-auto row-span-auto md:row-span-1" node={col3[0]} />
              )}
              {col3[1] && (
                <ColorSwatch height="h-[235px] xl:h-auto row-span-auto md:row-span-2" node={col3[1]} />
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MasonryGrid;
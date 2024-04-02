import PlayingGridField from "./playing-grid-field";

const PlayingGrid = () => {

  const playingFields = [1, 2, 3, 4, 5, 6, 7, 8, 9];


  return (
          <div className="h-full w-full grid grid-cols-3 grid-rows-3 gap-1">
            {playingFields.map((p) => (
              <PlayingGridField key={p} gridId={p} />
            ))}
          </div>
  );
};

export default PlayingGrid;

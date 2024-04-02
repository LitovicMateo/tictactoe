import { useContext } from "react"
import { PlayerContext } from "../../context/players-context"

const Scoreboard = () => {

  const playerCtx = useContext(PlayerContext)

  return (
    <div className="flex justify-center itece w-fit mx-auto py-8">
        <div className="flex justify-center items-center gap-6 px-6 py-2  w-fit rounded-full">
          <img src={`./characters/${playerCtx.playerOne.character}.png`} className="aspect-square h-[80px]"  />
          <span className="text-[#CF9500] text-4xl font-bold">{playerCtx.playerOne.score}</span>
        </div>
        <div className="flex flex-row-reverse justify-center items-center gap-6 px-6 py-2  w-fit rounded-full">
          <img src={`./characters/${playerCtx.playerTwo.character}.png`} className="aspect-square h-[80px]"  />
          <span className="text-[#CF9500] text-4xl font-bold">{playerCtx.playerTwo.score}</span>
        </div>

    </div>
  )
}

export default Scoreboard
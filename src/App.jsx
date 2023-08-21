import { useState } from "react";

const App = () => {
  const [player, setPlayer] = useState(true);
  const [winnerMsg, setWinnerMsg] = useState('');
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const checkWiner = () => {
    const btns = document.querySelectorAll(".btns .btn");
    const conditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2],
    ];
    conditions.forEach((c) => {
      if (
        btns[c[0]].innerHTML !== "" &&
        btns[c[1]].innerHTML !== "" &&
        btns[c[2]].innerHTML &&
        btns[c[0]].innerHTML === btns[c[1]].innerHTML &&
        btns[c[0]].innerHTML === btns[c[2]].innerHTML
      ) {
        setWinnerMsg(`${player ? "X" : "O"} Is Winner`);
        btns.forEach(btn => {
          btn.disabled = true
          btn.style.backgroundColor = "rgb(30 41 59)"
          btn.style.color = "rgb(248 250 252)"
        });
        c.forEach(i => {
          btns[i].style.backgroundColor = "#f62c09"
          btns[i].style.color = "rgb(248 250 252)"
        });
        player ? setX(x+1) : setY(y+1);
      }
    });
  };

  const checkDraw = () => {
    const btns = document.querySelectorAll(".btns .btn");
    const check = () => {
      for (let i = 0; i < btns.length; i++) {
        if (btns[i].innerHTML === '' || btns[i].disabled) {
          return false
        }
      }
      return true
    }
    if (check()) {
      setWinnerMsg("Draw")
      btns.forEach(btn => {
        btn.disabled = true;
        btn.style.backgroundColor = "rgb(30 41 59)"
        btn.style.color = "rgb(248 250 252)"
      })
    }
  }

  const restartTheGame = () => {
    setWinnerMsg('')
    document.querySelectorAll(".btns .btn").forEach(btn => {
      btn.disabled = false;
      btn.innerHTML = ''
      btn.style.backgroundColor = ""
      btn.style.color = ""
    })
  }

  const play = (event) => {
    if (event.target.innerHTML === "") {
      event.target.innerHTML = player ? "X" : "O";
      setPlayer(!player);
      checkWiner();
    }
    checkDraw();
  };

  return (
    <div className="h-screen bg-slate-500 text-slate-50 flex justify-center items-center py-10">
      <div className="box flex flex-col w-full h-[550px] mx-5 bg-slate-50 sm:w-96 sm:mx-0 text-slate-800 rounded-lg shadow-lg">
        <h1 align="center" className="font-bold p-3 text-2xl">
          {winnerMsg ? `${winnerMsg}` : `${player ? "X" : "O"} is playing now`}
          
        </h1>
        <p className="flex justify-between px-10 py-5">
          <span className="bg-slate-500 rounded-md w-24 p-2 font-semibold text-slate-50 text-center">
            X
            <span className="block rounded-md bg-slate-50 text-slate-800 w-full">
              {x}
            </span>
          </span>
          <b className="text-3xl">vs</b>
          <span className="bg-slate-500 rounded-md w-24 p-2 font-semibold text-slate-50 text-center">
            O
            <span className="block rounded-md bg-slate-50 text-slate-800 w-full">
            {y}
            </span>
          </span>
        </p>
        <div className="btns flex-1 bg-slate-500 m-5 mt-0 mb-0 rounded-md">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((d) => (
            <button className="btn" key={d} onClick={(e) => play(e)}></button>
          ))}
        </div>
        <button className="bg-slate-500 px-11 py-2 m-5 rounded-md text-slate-50 text-lg font-semibold transition-all hover:bg-slate-600" onClick={restartTheGame}>Restart The Game</button>
      </div>
    </div>
  );
};

export default App;

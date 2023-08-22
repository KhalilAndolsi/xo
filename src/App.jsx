import { useState } from "react";

const App = () => {
  const [player, setPlayer] = useState(true);
  const [bot, setBot] = useState(false);
  const [winnerMsg, setWinnerMsg] = useState("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

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
        setWinnerMsg(`${btns[c[0]].innerHTML} Is Winner`);
        btns.forEach((btn) => {
          btn.disabled = true;
          btn.style.backgroundColor = "rgb(30 41 59)";
          btn.style.color = "rgb(248 250 252)";
        });
        c.forEach((i) => {
          btns[i].style.backgroundColor = "#f62c09";
          btns[i].style.color = "rgb(248 250 252)";
        });
        btns[c[0]].innerHTML === "X" ? setX(x + 1) : setY(y + 1);
      }
    });
  };

  const checkDraw = () => {
    const btns = document.querySelectorAll(".btns .btn");
    const check = () => {
      for (let i = 0; i < btns.length; i++) {
        if (btns[i].innerHTML === "" || btns[i].disabled) {
          return false;
        }
      }
      return true;
    };
    if (check()) {
      setWinnerMsg("Draw");
      btns.forEach((btn) => {
        btn.disabled = true;
        btn.style.backgroundColor = "rgb(30 41 59)";
        btn.style.color = "rgb(248 250 252)";
      });
    }
  };

  const restartTheGame = () => {
    setWinnerMsg("");
    document.querySelectorAll(".btns .btn").forEach((btn) => {
      btn.disabled = false;
      btn.innerHTML = "";
      btn.style.backgroundColor = "";
      btn.style.color = "";
    });
    setPlayer(true)
  };

  const botPlayer = () => {
    const btns = [...document.querySelectorAll(".btns .btn")].filter(
      (btn) => btn.innerHTML === ""
    );
    if (btns) {
      var randomNum = Math.floor(Math.random() * btns.length);
      if (btns[randomNum]) {
        btns[randomNum].innerHTML = player ? "O" : "X";
        checkWiner();
        checkDraw();
        setPlayer(player);
      }
    }
  };

  const play = (event) => {
    if (event.target.innerHTML === "") {
      event.target.innerHTML = player ? "X" : "O";
      setPlayer(!player);
      checkWiner();
      if (bot) {
        botPlayer();
      }
    }
    checkDraw();
  };

  return (
    <div className="h-screen bg-slate-500 text-slate-50 flex justify-center items-center py-10">
      <div className="box overflow-hidden relative flex flex-col w-full h-[550px] mx-5 bg-slate-50 sm:w-96 sm:mx-0 text-slate-800 rounded-lg shadow-lg">
        <button
          type="button"
          className={`bot bg-slate-400 m-1 p-2 rounded-full transition-all`}
          onClick={() => setBot(!bot)}
        >
          <svg
            className={`${bot ? "fill-slate-800" : "fill-slate-500"}`}
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M27.41 14.5088C27.1575 13.8988 26.6163 13.7525 26.25 13.7175V10C26.25 8.62125 25.1288 7.5 23.75 7.5H16.25V5.7625C16.6313 5.42 16.875 4.9275 16.875 4.375C16.875 3.87772 16.6775 3.40081 16.3258 3.04917C15.9742 2.69754 15.4973 2.5 15 2.5C14.5027 2.5 14.0258 2.69754 13.6742 3.04917C13.3225 3.40081 13.125 3.87772 13.125 4.375C13.125 4.9275 13.3688 5.42 13.75 5.7625V7.5H6.25C4.87125 7.5 3.75 8.62125 3.75 10V13.7462L3.6475 13.7538C3.33247 13.7765 3.03772 13.9177 2.82252 14.1489C2.60733 14.3801 2.48763 14.6841 2.4875 15V17.5C2.4875 17.8315 2.6192 18.1495 2.85362 18.3839C3.08804 18.6183 3.40598 18.75 3.7375 18.75H3.75V25C3.75 26.3788 4.87125 27.5 6.25 27.5H23.75C25.1288 27.5 26.25 26.3788 26.25 25V18.75C26.5815 18.75 26.8995 18.6183 27.1339 18.3839C27.3683 18.1495 27.5 17.8315 27.5 17.5V15.0775C27.5144 14.8835 27.4836 14.6888 27.41 14.5088ZM6.25 25V10H23.75L23.7513 14.995L23.75 15V17.5L23.7513 17.5063L23.7525 25H6.25Z" />
            <path d="M10.625 17.5C11.6605 17.5 12.5 16.3807 12.5 15C12.5 13.6193 11.6605 12.5 10.625 12.5C9.58947 12.5 8.75 13.6193 8.75 15C8.75 16.3807 9.58947 17.5 10.625 17.5Z" />
            <path d="M19.375 17.5C20.4105 17.5 21.25 16.3807 21.25 15C21.25 13.6193 20.4105 12.5 19.375 12.5C18.3395 12.5 17.5 13.6193 17.5 15C17.5 16.3807 18.3395 17.5 19.375 17.5Z" />
            <path d="M10 20H20V22.5H10V20Z" />
          </svg>
        </button>
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
        <button
          className="bg-slate-500 px-11 py-2 m-5 rounded-md text-slate-50 text-lg font-semibold transition-all hover:bg-slate-600"
          onClick={restartTheGame}
        >
          Restart The Game
        </button>
      </div>
    </div>
  );
};

export default App;
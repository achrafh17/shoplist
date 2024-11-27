import logo from "./logo.svg";
import "./App.css";
import { useRef, useState } from "react";

function App() {
  const [list, setlist] = useState([]);
  const [number, setnumber] = useState(0);
  const inputref = useRef();

  const addlist = (event) => {
    const text = inputref.current.value;
    const item = { text, nombre: 0, completed: false };
    if (event.key === "Enter") {
      if (text !== "") setlist([...list, item]);
      inputref.current.value = "";
    }
  };

  const addlistbutton = () => {
    const text = inputref.current.value;
    const item = { text, nombre: 0, completed: false };
    if (text !== "") setlist([...list, item]);
    inputref.current.value = "";
  };
  const addnumber = (index) => {
    const newlist = list.map((item, i) => {
      if (i === index)
        return {
          ...item,
          nombre: item.nombre + 1,
        };
      return item;
    });
    setlist(newlist);
  };
  const decrement = (index) => {
    const newlist = list.map((item, i) => {
      if (i === index)
        return {
          ...item,
          nombre: item.nombre - 1,
        };
      return item;
    });
    setlist(newlist);
  };

  const handllecompleted = (index) => {
    const newlist = list.map((item, i) => {
      if (i == index) return { ...item, completed: !item.completed };
      return item;
    });
    setlist(newlist);
  };
  const del = (index) => {
    const newlist = list.filter((_, i) => index !== i);
    setlist(newlist);
  };

  const clear = () => {
    const newlist = list.filter(() => false);
    setlist(newlist);
  };
  const delteCompleted = () => {
    const newlist = list.filter((item) => !item.completed);
    setlist(newlist);
  };
  return (
    <body>
      <section>
        <h1>Listes de courses</h1>
        <div>
          <input ref={inputref} onKeyDown={addlist} type="text" />
          <button onClick={addlistbutton}>ajouter</button>
        </div>
        <div>
          <h1 onClick={() => clear()}>clear</h1>
          <h1 onClick={delteCompleted}>Delete Completed</h1>
          <ul>
            {list.map((item, index) => {
              return (
                <li key={index} className={item.completed ? "done" : ""}>
                  {item.text}{" "}
                  <div className="adddecrementbuttons">
                    <button onClick={() => decrement(index)}>-</button>
                    <p
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      {item.nombre}
                    </p>
                    <button onClick={() => addnumber(index)}>+</button>
                    <button onClick={() => handllecompleted(index)}>
                      comp
                    </button>
                    <button onClick={() => del(index)}>del</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </body>
  );
}

export default App;

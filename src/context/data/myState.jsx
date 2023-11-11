import MyContext from "./myContext";

function myState(props) {
  const state = {
    name: "Faiz",
    rollNumber: 123,
  };

  return (
    <MyContext.Provider value={state}>{props.children}</MyContext.Provider>
  );
}

export default myState;

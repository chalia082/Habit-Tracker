import { useEffect } from "react";
import HabitList from "./controllers/HabitList"
import { initialHabits } from "./reducers/habitReducer"; 
import { useDispatch } from "react-redux";

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialHabits())
  }, [])

  console.log('App.jsx');
  return (
    <div>
      <h1>Hello world</h1>
      <HabitList />
    </div>

    
  )
}

export default App
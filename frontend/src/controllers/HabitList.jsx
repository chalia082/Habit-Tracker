import { useSelector } from "react-redux"
import HabitForm from "./HabitForm"
 

const Habit = ({habit}) => {
    return (
        <div>
            <div>
              title: {habit.title}
            </div>
            <div>
              description: {habit.description}
            </div>
            <div>
              category: {habit.category}
            </div>
        </div>
    )
}

const HabitList = () => {
    const habits = useSelector(state => state.habits)
    return (
        <div>
            <HabitForm />
            {habits.map(habit => 
                <Habit 
                  key={habit.id}
                  habit={habit}
                />   
            )}
        </div>
    )
}

export default HabitList
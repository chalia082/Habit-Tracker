import { useSelector } from "react-redux" 

const Habit = ({habit}) => {
    return (
        <div>
            {habit.title}
            {habit.description}
            {habit.category}
        </div>
    )
}

const HabitList = () => {
    const habits = useSelector(state => state.habits)
    return (
        <div>
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
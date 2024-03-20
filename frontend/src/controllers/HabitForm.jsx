import { useRef, useState } from "react"
import Togglable from "./Togglable"
import { useDispatch } from "react-redux"
import { createHabit } from "../reducers/habitReducer"



const HabitForm = ({ createHabit }) => {
    const [habits, setHabits] = useState([])
    const [newtitle, setNewTitle] = useState('')
    const [newdescription, setNewDescription] = useState('')
    const [newcategory, setNewCategory] = useState('')
    const [newfrequency, setNewFrequency] = useState('')
    const [newtarget, setNewTarget] = useState('')
    const [newstartDate, setNewStartDate] = useState('')
    const [newendDate, setNewEndDate] = useState('')
    const [newreminders, setNewReminders] = useState('')

    const addHabit = (event) => {
        event.preventDefault()

        createHabit({
            title: newtitle,
            description: newdescription,
            category: newcategory,
            frequency: newfrequency,
            target: newtarget,
            startDate: newstartDate,
            endDate: newendDate,
            reminders: newreminders || false,
            id: habits.length + 1
        })
        setNewTitle('')
        setNewDescription('')
        setNewCategory('')
        setNewFrequency('')
        setNewTarget('')
        setNewStartDate('')
        setNewEndDate('')
        setNewReminders('')
    }

    return (
        <form onSubmit={addHabit}>
          <h3>Add new Habit</h3>

          title:
            <input
                value={newtitle}
                onChange={({ target }) => setNewTitle(target.value)} />
            <br />
            description:
            <input
                value={newdescription}
                onChange={({ target }) => setNewDescription(target.value)} />
            <br />
            category:
            <input
                value={newcategory}
                onChange={({ target }) => setNewCategory(target.value)} />
            <br />
            frequency:
            <input
                value={newfrequency}
                onChange={({ target }) => setNewFrequency(target.value)} />
            <br />
            target:
            <input
                value={newtarget}
                onChange={({ target }) => setNewTarget(target.value)} />
            <br />
            startDate:
            <input
                value={newstartDate}
                onChange={({ target }) => setNewStartDate(target.value)} />
            <br />

            endDate:
            <input
                value={newendDate}
                onChange={({ target }) => setNewEndDate(target.value)} />
            <br />
            reminders:
            <input
                value={newreminders}
                onChange={({ target }) => setNewReminders(target.value)} />
            <br />
            <button type="submit">save</button>
        </form>
    )
}

const habitForm = () => {
    const habitFormRef = useRef()
    const dispatch = useDispatch()

    const addHabit = (habitObject) => {
        habitFormRef.current.toggleVisibility()
        dispatch(createHabit(habitObject))
    }

    return (
        <Togglable buttonLabel='add new habit' ref={habitFormRef}>
          <HabitForm createHabit={addHabit} />
        </Togglable>
    )
}

export default habitForm
import axios from 'axios';


const Calender=()=>{

    const date = new Date()
    const year=date.getFullYear()
    const monthDays = [31 , 28 , 31, 30 , 31, 30, 31, 31, 30, 31, 30, 31]
    const monthNames = ["January" ,"February" , "March" ,"April" ,"May","June","July","August","September", "October","November","December"]
    if(year%4 === 0){
        monthDays[1]=29
    }
    const noOfDaysInMonth = monthDays[date.getMonth()]
    const month = monthNames[date.getMonth()]
    const taarik=date.getDate()

    const getCalender = async()=>{
        const response = await axios("/Route",{

        })
    }

    const block=()=>{
        return(<>
        <div className="calender-block">
            <div className="calender-date"></div>
            <div className="calender-event"></div>
        </div>
        </>)
    }

    return(<>
    <h1>{month}, {year}</h1>
    <div className="calender-block-wrapper">

    </div>
    </>)
}
export default Calender

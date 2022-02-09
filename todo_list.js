

let tasks = document.getElementById('task_list');

let des = document.getElementById('task_description_input');
let due_date = document.getElementById('duedate_input');
let due_time = document.getElementById('duetime_input');
let btn = document.getElementById('add_task');


addTask('Buy breakfast', new Date().getTime());
addTask('Go to movies🎬');

btn.addEventListener('click', (e) => {
    console.log(due_date.value,due_time.value);
    var re = dateAndTimeToTimestamp(due_date,due_time);
    console.log(re);

    addTask(des.value,re);
    des.value = '';
})

des.addEventListener('keydown', function(event){
    if (event.keyCode == 13) {
        addTask(des.value,dateAndTimeToTimestamp(due_date,due_time));
        des.value = '';
    }
})

function addTask(description, dueTime){
    
    let li_new=document.createElement("li");
    li_new.innerHTML = description;
    
    let btn_new = document.createElement("button");
    btn_new.setAttribute('class','btn btn-sm btn-outline-danger done');
    btn_new.setAttribute('type','button');
    btn_new.innerHTML = 'Done';

    if (dueTime){
        let date = new Date(dueTime).toLocaleString();
        // let date = new Date(parseInt(dueTime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
        console.log(date);

        let span_new = document.createElement("span");
        span_new.innerHTML = 'due '+date;
        span_new.setAttribute("class","due");

        li_new.appendChild(span_new);
    }
    
    li_new.appendChild(btn_new);
    tasks.appendChild(li_new);

    btn_new.addEventListener('click', (e) => {
        li_new.remove();
    })
}

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}
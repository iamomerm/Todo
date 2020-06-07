console.log('%cWelcome to Todo!', 'background: #7CFC00; color: black');

//Update Tasks Title
function UpdateTasksCounter()
{
	let TasksCounter = (Object.entries(localStorage)).length; /* Retrieve all Local Storage Data */ 

	document.getElementById('TaskList').innerText = 'Tasks (' + TasksCounter + ')'; /* Modify Title */

	if (TasksCounter == 0) { document.getElementById('TaskTableColumns').style.display = 'none'; /* Hide Tables Columns */ }

	else { document.getElementById('TaskTableColumns').style.display = ''; /* Show Tables Columns */ }
}

//local Storage Handler
function LocalStorageHandler(Data, Action)
{
    //Error Codes:
    //0 = Executed Successfully
    //-1 = General Execution Error / Invalid Input or Action
    //-2 = [Get - Data Not Found]
    //-3 = [Set - Data Parameter is Not an Object Type]
    //-4 = [Set - Object Already Exists]
    //Data Parameter: [Get, DEL - The Parameter can be a Keyword or an Object], [Set/Push - The parameter must be an Object Type], [DEL - The Parameter can have any Value]

    //Actions:
    //Get = Get Local Storage Entry Value as a String
    //Set = Create a New Local Storage Entry
    //Push = Overwrite an Existing Entry
    //Del = Remove an Entry
    //Clr = Remove all Existing Entries in the Local Storage

	//Get Data
	if (Action.toUpperCase() == 'GET')
	{
		let Key = Data;

		//Object Handling
		if (typeof(Data) == 'object') { Key = Object.keys(Data)[0]; }

		if (Key == undefined) { return -1; }

		let GetData = localStorage.getItem(Key); /* Return Local Storage Entry Value as a String */

		if (GetData == undefined) { return -2; } /* Data Not Found */

		else { return GetData; } /* Data Found */
	}

	//Set or Push Data
	else if ((Action.toUpperCase() == 'SET') || (Action.toUpperCase() == 'PUSH'))
	{
		//Object Handling
		if (typeof(Data) != 'object') { return -3; }

		let Key = Object.keys(Data)[0];

		let Value = Object.values(Data)[0];
		
		if (Action.toUpperCase() == 'SET')
		{
			let DataGuard = LocalStorageHandler(Key, 'GET');

			if ((DataGuard != - 2) && (DataGuard != 1)) { alert('A task with the same mame already exists!'); return -4; }
		}

		if ((Key != '') && (Value != '')) { localStorage.setItem(Key, Value); return 0; }

		return -1; /* Key or Value is Undefined */
	}

	//Remove Data
	else if (Action.toUpperCase() == 'DEL')
	{
		let Key = Data;

		//Object Handling
		if (typeof(Data) == 'object') { Key = Object.keys(Data)[0]; }

		if (Key == undefined) { return -1; }

		localStorage.removeItem(Key);

		return 0;
	}

	else if (Action.toUpperCase() == 'CLR') { localStorage.clear(); return 0; }

	else { return -1; }
}

//Urgency Handler
let GlobalUrgecny = 'Low';

function UrgencyHandler(Urgency)
{
	switch(Urgency)
	{
		case 'Low':
			//Low - Adjust Font Weight
			document.getElementById('LowUrgencyBtn').style.fontWeight = '600';
			document.getElementById('LowUrgencyBtn').style.border = '1.5px solid';
			document.getElementById('LowUrgencyBtn').style.borderRadius = '7.5%';

			document.getElementById('MidUrgencyBtn').style.fontWeight = '300';
			document.getElementById('MidUrgencyBtn').style.border = '0px';
			document.getElementById('MidUrgencyBtn').style.borderRadius = '0%';

			document.getElementById('HighUrgencyBtn').style.fontWeight = '300';
			document.getElementById('HighUrgencyBtn').style.border = '0px';
			document.getElementById('HighUrgencyBtn').style.borderRadius = '0%';

			GlobalUrgecny = 'Low'; /* Set Global Urgency */

			break;

		case 'Medium':
			//Medium - Adjust Font Weight
			document.getElementById('LowUrgencyBtn').style.fontWeight = '300';
			document.getElementById('LowUrgencyBtn').style.border = '0px';
			document.getElementById('LowUrgencyBtn').style.borderRadius = '0%';

			document.getElementById('MidUrgencyBtn').style.fontWeight = '600';
			document.getElementById('MidUrgencyBtn').style.border = '1.5px solid';
			document.getElementById('MidUrgencyBtn').style.borderRadius = '7.5%';

			document.getElementById('HighUrgencyBtn').style.fontWeight = '300';
			document.getElementById('HighUrgencyBtn').style.border = '0px';
			document.getElementById('HighUrgencyBtn').style.borderRadius = '0%';

			GlobalUrgecny = 'Medium'; /* Set Global Urgency */

			break;

		case 'High':
			//High - Adjust Font Weight
			document.getElementById('LowUrgencyBtn').style.fontWeight = '300';
			document.getElementById('LowUrgencyBtn').style.border = '0px';
			document.getElementById('LowUrgencyBtn').style.borderRadius = '0%';

			document.getElementById('MidUrgencyBtn').style.fontWeight = '300';
			document.getElementById('MidUrgencyBtn').style.border = '0px';
			document.getElementById('MidUrgencyBtn').style.borderRadius = '0%';

			document.getElementById('HighUrgencyBtn').style.fontWeight = '600';
			document.getElementById('HighUrgencyBtn').style.border = '1.5px solid';
			document.getElementById('HighUrgencyBtn').style.borderRadius = '7.5%';

			GlobalUrgecny = 'High'; /* Set Global Urgency */

			break;

		default:
			/* Pass */
	}
}

document.getElementById('LowUrgencyBtn').click(); /* Default Mode = Low */

//New Task Section Show / Hide
let GlobalNewTaskState = 0;

function ShowHideNewTask()
{
	//Hide
	if (GlobalNewTaskState == 0)
	{
		document.getElementById('NewTaskTitle').style.textDecoration = 'line-through'; /* Line Through Enable */

		document.getElementById('Urgency').style.display = 'none'; /* Hide New Task Urgency */

		document.getElementById('Properties').style.display = 'none'; /* Hide New Task Properties */

		document.getElementById('CreateBtn').style.display = 'none'; /* Hide New Task Create Button */

		document.getElementById('UrgencyTitle').style.display = 'none'; /* Hide New Task Urgency Title */

		document.getElementById('PropertiesTitle').style.display = 'none'; /* Hide New Task Properties Title */

		GlobalNewTaskState = 1;
	}

	//Show
	else if (GlobalNewTaskState == 1)
	{
		document.getElementById('NewTaskTitle').style.textDecoration = 'none'; /* Line Through Disable */

		document.getElementById('Urgency').style.display = ''; /* Show New Task Urgency */

		document.getElementById('Properties').style.display = ''; /* Show New Task Properties */

		document.getElementById('CreateBtn').style.display = ''; /* Show New Task Create Button */

		document.getElementById('UrgencyTitle').style.display = ''; /* Show New Task Urgency Title */

		document.getElementById('PropertiesTitle').style.display = ''; /* Show New Task Properties Title */

		GlobalNewTaskState = 0;
	}
}

//Task Functions (Complete, Restore, Remove, Update)
function CompleteTask(Task)
{
	//Modify Style
	document.getElementById(Task).style.textDecoration = 'line-through';

	document.getElementById(Task).style.color = 'grey';

	document.getElementById(Task).onmouseover = function() { document.getElementById(Task).style.background = 'white'; }

	//Modify Local Storge Entry
	let TaskData = LocalStorageHandler(Task, 'GET');

	//Entry Validation
	if ((TaskData != - 2) && (TaskData != 1))
	{
		let OriginDataObject = JSON.parse(TaskData); /* Serialization */
		
		let TaskName = OriginDataObject.Name;
		
		OriginDataObject.Status = 'Completed';
		
		let SerialObject = JSON.stringify(OriginDataObject); /* Deserialization */
		
		let DataObject = { [TaskName]: SerialObject }; 

		LocalStorageHandler(DataObject, 'PUSH'); /* Update Task Status as Completed */
	}

	console.log('Task (' + Task + ') Completed!');
}

function RestoreTask(Task)
{
	//Get Local Storge Entry
	let TaskData = LocalStorageHandler(Task, 'GET');

	//Entry Validation
	if ((TaskData != - 2) && (TaskData != 1))
	{
		let OriginDataObject = JSON.parse(TaskData); /* Serialization */

		OriginDataObject.Status = 'Unfinished';
		
		let TaskName = OriginDataObject.Name;
		
		let OriginTaskUrgency = OriginDataObject.Urgency;
		
		let SerialObject = JSON.stringify(OriginDataObject); /* Deserialization */
		
		let DataObject = { [TaskName]: SerialObject }; 
		
		LocalStorageHandler(DataObject, 'PUSH'); /* Update Task Status as Unfinished */

		//Modify Style
		document.getElementById(Task).style.textDecoration = '';

		document.getElementById(Task).style.color = 'black';

		switch (OriginTaskUrgency)
		{
			case 'Low':
				document.getElementById(Task).onmouseover = function() { document.getElementById(Task).style.background = '#b2ffb2'; }
				
				document.getElementById(Task).onmouseout = function() { document.getElementById(Task).style.background = ''; }
				
				break;

			case 'Medium':
				document.getElementById(Task).onmouseover = function() { document.getElementById(Task).style.background = '#ffffb2'; }
				
				document.getElementById(Task).onmouseout = function() { document.getElementById(Task).style.background = ''; }
				break;

			case 'High':
				document.getElementById(Task).onmouseover = function() { document.getElementById(Task).style.background = '#ffb2b2'; }
				
				document.getElementById(Task).onmouseout = function() { document.getElementById(Task).style.background = ''; }

				break;

			default:
			/* Pass */
		}
	}

	console.log('Task (' + Task + ') Restored!');
}

function RemoveTask(Task)
{
	let LSHRemovStatus = LocalStorageHandler(Task, 'DEL'); /* Remove From Local Storage */

	if (LSHRemovStatus == 0) 
	{
		document.getElementById(Task).innerHTML = ''; /* Remove all Child Elements */

		document.getElementById(Task).remove(); /* Remove Task */

		console.log('Task (' + Task + ') Removed!');

		UpdateTasksCounter();
	}
}

function UpdateTask(Task)
{
	//Modify Local Storge Entry
	let OriginTaskData = LocalStorageHandler(Task, 'GET');

	//Entry Validation
	if ((OriginTaskData != - 2) && (OriginTaskData != 1))
	{
		//Get Local Storage Entry Properties (Original Data)    

		let OriginDataObject = JSON.parse(OriginTaskData); /* Serialization */
		
		let OriginStatus = OriginDataObject.Status;

		let TaskName = document.getElementById(Task).childNodes[0].innerText; /* Task Name */

		let TaskDesc = document.getElementById(Task).childNodes[1].innerText; /* Task Description */
		
		let TaskUrgency = document.getElementById(Task).childNodes[2].innerText; /* Task Urgency */

		let TaskDL = document.getElementById(Task).childNodes[3].innerText; /* Task Deadline */
			  
		//Conditions
		let UpdateErrors = 0;

		let UrgencyLevels = ['Low', 'Medium', 'High'];

		if (TaskName.length > 12) { alert('Task name exceeded the maximum (' + TaskName.length  + '/12)!'); UpdateErrors = 1; } /* Task Name Length Check */

		if (TaskDesc.length > 60) { alert('Task description exceeded the maximum (' + TaskDesc.length  + '/60)!'); UpdateErrors = 1; } /* Task Description Length Check */
		
		if (UrgencyLevels.includes(TaskUrgency) == false) { alert('Invalid task urgency (Low, Medium, High)!'); UpdateErrors = 1; } /* Urgency Check */
		
		if ((isNaN(Date.parse(TaskDL))) && (TaskDL != '')) { alert('Invalid task deadline (yyyy-mm-dd)!'); UpdateErrors = 1; } /* Deadline Check */

		/* Prevent Task Override */
		let DataGuard = LocalStorageHandler(TaskName, 'GET');

		if (((DataGuard != - 2) && (DataGuard != 1)) && (TaskName != Task)) { alert('A task with the same name already exists!'); UpdateErrors = 1; }

		//Update
		if (UpdateErrors == 0)
		{            
			RemoveTask(Task); /* Remove Old Task */
			
			CreateTask(TaskName, TaskDesc, TaskUrgency, TaskDL, OriginStatus, 'TaskUpdater'); /* Create New Task */

			console.log('Task (' + Task + ') Updated!');
		}

		//Reverse Changes
		else
		{
			document.getElementById(Task).childNodes[0].innerText = OriginDataObject.Name; /* Task Name */

			document.getElementById(Task).childNodes[1].innerText = OriginDataObject.Desc; /* Task Description */

			document.getElementById(Task).childNodes[2].innerText = OriginDataObject.Urgency; /* Task Urgency */

			document.getElementById(Task).childNodes[3].innerText = OriginDataObject.DL; /* Task Deadline */
		}
	}
}

//Create New Task
function CreateTask(TaskName, TaskDesc, Urgency, TaskDL, TaskStatus, Caller)
{
	let Injection = 0;

	let TaskUrgency = GlobalUrgecny;

	if (Urgency != 'Global') { TaskUrgency = Urgency; } /* The Parameter Value is Determined by the Caller */

	let NewDataObject = { Name: TaskName, Desc: TaskDesc, Urgency: TaskUrgency, DL: TaskDL, Status: TaskStatus };

	let NewSerialObject = JSON.stringify(NewDataObject);
	
	let DataObject = { [TaskName]: NewSerialObject }; /* Data Object for Local Storage */

	if (Caller != 'DataLoader') { Injection = LocalStorageHandler(DataObject, 'SET'); /* Set Data */ } /* Only When Called From HTML Form (Prevents Local Storage Double Push) */

	//Local Storage Injection Validation
	if (Injection == 0)
	{
		//HTML Update
		let TaskTable = document.getElementById('TaskTable').childNodes[3];

		let NewTask = document.createElement('tr');

		NewTask.className = 'TableTrs'; /* Set Class */

		NewTask.id = TaskName; /* Set ID */
		
		//Completed Task Style
		if (TaskStatus == 'Completed') 
		{ 
			NewTask.style.textDecoration = 'line-through'; 

			NewTask.style.color = 'grey';        
			
			NewTask.onmouseover = function() { NewTask.style.background = 'white'; } 
		}

		else
		{
			//New Task Hover Color
			switch (TaskUrgency)
			{
				case 'Low':
					//Low - Mouse Hover
					NewTask.onmouseover = function() { NewTask.style.background = '#b2ffb2'; }

					NewTask.onmouseout = function() { NewTask.style.background = ''; }

					break;

				case 'Medium':
					//Medium - Mouse Hover
					NewTask.onmouseover = function() { NewTask.style.background = '#ffffb2'; }

					NewTask.onmouseout = function() { NewTask.style.background = ''; }

					break;

				case 'High':
					//High - Mouse Hover
					NewTask.onmouseover = function() { NewTask.style.background = '#ffb2b2'; }

					NewTask.onmouseout = function() { NewTask.style.background = ''; }

					break;

				default:
					/* Pass */
			}
		}

		TaskTable.appendChild(NewTask);

		let NewTableRow = TaskTable.lastElementChild;

		//Task Name
		let TaskNameTD = document.createElement('td');

		TaskNameTD.innerHTML = TaskName;    
		
		TaskNameTD.style.padding = '5px';

		TaskNameTD.contentEditable = 'true'; /* Enable Edit */

		NewTableRow.appendChild(TaskNameTD);

		//Task Description
		let TaskDescTD = document.createElement('td');

		TaskDescTD.innerHTML = TaskDesc;
		
		TaskDescTD.contentEditable = 'true'; /* Enable Edit */
		
		TaskDescTD.style.padding = '5px';

		NewTableRow.appendChild(TaskDescTD);

		//Task Urgency
		let TaskUrgencyTD = document.createElement('td');

		TaskUrgencyTD.innerHTML = TaskUrgency;
		
		TaskUrgencyTD.contentEditable = 'true'; /* Enable Edit */

		NewTableRow.appendChild(TaskUrgencyTD);

		//Task Dead Line
		let TaskDLTD = document.createElement('td');

		TaskDLTD.innerHTML = TaskDL;
		
		TaskDLTD.contentEditable = 'true'; /* Enable Edit */

		TaskDLTD.style.padding = '5px';

		NewTableRow.appendChild(TaskDLTD);

		//Complete Task
		let TaskCompleteTD = document.createElement('td');

		TaskCompleteTD.innerHTML = 'Complete';

		TaskCompleteTD.className = 'TaskActions';

		TaskCompleteTD.title = 'Complete Task';

		TaskCompleteTD.onclick = function() { CompleteTask(TaskName) };

		TaskCompleteTD.style.padding = '5px';

		NewTableRow.appendChild(TaskCompleteTD);

		//Restore Task
		let TaskRestoreTD = document.createElement('td');

		TaskRestoreTD.innerHTML = 'Restore';

		TaskRestoreTD.className = 'TaskActions';

		TaskRestoreTD.title = 'Restore Task';

		TaskRestoreTD.onclick = function() { RestoreTask(TaskName) };  /* OnClick Function */
		
		TaskRestoreTD.style.padding= '5px';

		NewTableRow.appendChild(TaskRestoreTD);
		
		//Update Task
		let TaskUpdateTD = document.createElement('td');

		TaskUpdateTD.innerHTML = 'Update';

		TaskUpdateTD.className = 'TaskActions';

		TaskUpdateTD.title = 'Update Task';

		TaskUpdateTD.onclick = function() { UpdateTask(TaskName) };

		TaskUpdateTD.style.padding = '5px';

		NewTableRow.appendChild(TaskUpdateTD);
		
		//Remove Task
		let TaskRemoveTD = document.createElement('td');

		TaskRemoveTD.innerHTML = 'Remove';

		TaskRemoveTD.className = 'TaskActions';

		TaskRemoveTD.title = 'Remove Task';

		TaskRemoveTD.onclick = function() { RemoveTask(TaskName) };

		TaskRemoveTD.style.padding = '5px';

		NewTableRow.appendChild(TaskRemoveTD);

		/*
		//Image
		let RemoveIMG = document.createElement('img');

		RemoveIMG.src = './Images/Img001.jpg';

		TaskRemoveTD.appendChild(RemoveIMG);
		 */

		UpdateTasksCounter(); /* Update Tasks Counter */
	}
}

//Load Data - Feed Table
function LoadData()
{
	let DataArray = Object.entries(localStorage); /* Retrieve all Local Storage Data */	
	
	//Feed Tasks Table
	for (let Index = 0; Index < DataArray.length; Index++)
	{
		let TaskName = DataArray[Index][0];

		let TaskProperties = DataArray[Index][1];
		
		let TaskPropertiesObject = JSON.parse(TaskProperties);

		CreateTask(TaskPropertiesObject.Name, TaskPropertiesObject.Desc, TaskPropertiesObject.Urgency, TaskPropertiesObject.DL, TaskPropertiesObject.Status, 'DataLoader'); /* Create a Table Row & Local Storage Entry */
	}

	UpdateTasksCounter(); /* Update Tasks Counter */
}

LoadData();
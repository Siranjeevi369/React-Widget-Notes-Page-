import React, { useEffect, useState,useRef,createContext,useContext  } from 'react';

import './App.css'

import {
  Container,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Tooltip
} from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CustomField from './componets/CustomField';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
// import dateFormatesIN from './componets/CustomField';

import { Margin } from '@mui/icons-material';

import moment from 'moment-timezone';
import EditIcon from './componets/EditIcon';
// const NotesPageContext = createContext();

// import Pageload from './componets/Pageload';


function NotesPage(props) {

  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);

  const [state ,setState] = useState('');
  const [allDetails, setAllDetails] = useState([])
  const [Parent_name, setParent_name] = useState('');
  const [reload, setreload] = useState(0);
  const [actualDate,setActualDate] = useState('')
  const [cuUserId,setCuUserId] = useState('');
  // const [ownerId, setOwnerId] = useState('')
  // const [time_format, setTimeFormat] = useState('');
  // const [noteContent, setNoteContent] = useState([]);
  const mapArrayData = [];
  
  var timestamp1;
  var timestamp2;

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const timeString = "2024-04-27T23:12:31+05:30";

        // Convert to JavaScript Date object
        const date = moment(timeString).toDate();

        // Format date into different formats
        const formattedDate1 = moment(date).format('YYYY-MM-DD');
        var time_format ;
        var addTimeFormats ;
        var Org_name;
  //-------------------------------- use effect to fetch all data from notes -------------------
  useEffect(() => {

         console.log("testdata1");

          

         //============== get Current user for current user Email , Current user ID, Current User Name ============================

     window.ZOHO.CRM.CONFIG.getCurrentUser().then(async function(data){
              // console.log("Current User",data.users[0]);
              // console.log("User Role",data.users[0].role.name);
              // console.log("Current user",data.users[0]);
              // console.log("Current id",data.users[0].id);
              // currentUserEmail = data.users[0].email;
              // setCuID(data.users[0].id);
              // setCurrentUserEmail(data.users[0].email);

              // currentUserName = data.users[0].full_name;
              // console.log("getCurrentUser");


        //========== Match current user id to get date and time format =============

            window.ZOHO.CRM.API.getUser({ID:data.users[0].id})
            .then(function(Cdata){

                  window.ZOHO.CRM.CONFIG.getOrgInfo().then(function(Orgdata){
                    console.log("Org info" ,Orgdata.org[0].domain_name);

                    Org_name = Orgdata.org[0].domain_name;
              
              
                console.log("Current User record",Cdata)
                time_format=Cdata.users[0].time_format;
                setCuUserId(Cdata.users[0].id);

                // setDateFormates(Cdata.users[0].date_format)
              //  timeFormates = Cdata.users[0].time_format


                                      //============================== get All Notes data =========================================

                                      window.ZOHO.CRM.API.getRelatedRecords({ Entity: props.data.Entity, RecordID: props.data.EntityId, RelatedList: "Notes", page: 1, per_page: 200 })
                                      .then(function (data) {
                                        
                                        console.log("Realated Records data ",data);
                              
                                    //    data.data.forEach((element) => (  
                                    //      mapArrayData.push({Note_Content: element.Note_Content,Note_Title:element.Note_Title, Modified_Time:element.Modified_Time, name: element.Owner.name, $se_module: element.$se_module
                                      //  ,Parent_name:element.Parent_Id.name })
                                        
                                    //   ));
                                  
                              
                                        for (let i = 0; i < data.data.length; i++) {
                                        //text += cars[i] + "<br>";
                              
                                        const timestamp = "2024-04-27T13:00:41+05:30";
                              
                                        const timestamp2 = data.data[i].Modified_Time;
                              
                              
                                        const timeString = data.data[i].Modified_Time;
                                        const date = new Date(timeString);
                                        
                                        // Convert to 24-hour format
                                        const hours24 = date.getHours();
                                        const minutes24 = date.getMinutes();
                                        const time24 = `${hours24 < 10 ? '0' : ''}${hours24}:${minutes24 < 10 ? '0' : ''}${minutes24}`;
                                        
                                        // Convert to 12-hour format
                                        const hours12 = hours24 % 12 || 12; // Convert 0 to 12
                                        const period = hours24 < 12 ? 'AM' : 'PM';
                                        const time12 = `${hours12 < 10 ? '0' : ''}${hours12}:${minutes24 < 10 ? '0' : ''}${minutes24} ${period}`;
                                        
                                        // console.log("Time in 24-hour format:", time24);
                                        // console.log("Time in 12-hour format:", time12);
                                        
                                        if(time_format == 'HH:mm'){
                                          addTimeFormats = time24;
                                        }
                                        else{
                                          addTimeFormats = time12;
                                        }
                              
                              
                              
                                        // Parse the time string into a Date object
                                        const time = new Date(timestamp2);
                              
                                        // Subtract the time
                                        const currentTime = new Date(); // Current time
                                        const differenceInSeconds = currentTime - time;
                              
                                        
                              
                                      const monthIndex = time.getMonth();
                                      const monthName = monthNames[monthIndex];
                              
                                      // Get date
                                      const day = time.getDate();
                              
                                  
                                        //========================================== Note added time logic ===============================
                              
                                      var actual_hours = Math.floor(differenceInSeconds/3600000);
                                      var actual_minutes = Math.floor(differenceInSeconds/60000);
                                      var actual_date = `${monthName} ${day}`;
                                      setActualDate(actual_date);
                                      var currentTimeData;
                                      var downloadUrl
                                      if(actual_minutes == 0)
                                      { 
                                        currentTimeData = 'now';
                                      }
                                      else if(actual_minutes < 60)
                                      {
                                        currentTimeData = `${actual_minutes} mins .ago`;
                                      }
                                      else if(actual_hours == 0){
                                        currentTimeData = `${actual_minutes} mins .ago`;
                                      }
                                      else if(actual_hours < 60){
                                        currentTimeData =`${actual_hours} hrs .ago` ;
                                      }
                                      else{
                                        currentTimeData = `${actual_date} .ago`;
                                      }
                                      if ( data.data[i].$attachments == null) {
                                        downloadUrl = '';
                                      }
                                      else{
                                        var fileId = data.data[i].$attachments[0].$file_id
                                        var name = data.data[i].$attachments[0].File_Name
                                        var Creator_id = data.data[i].$attachments[0].Created_By.id
                                        var Parent_Id = data.data[i].Parent_Id.id;
                                        var nId = data.data[i].id;
                                        var mod = data.data[i].$se_module;
                                        if(Org_name == "org60018094468"){
                                        downloadUrl = `https://crm.zoho.in/crm/${Org_name}/ViewImage?fileId=${fileId}&name=${name}&downLoadMode=default&creatorId=${Creator_id}&parentId=${Parent_Id}&nId=${nId}&module=${mod}`
                                        }else{
                                          downloadUrl = `https://crmsandbox.zoho.in/crm/${Org_name}/ViewImage?fileId=${fileId}&name=${name}&downLoadMode=default&creatorId=${Creator_id}&parentId=${Parent_Id}&nId=${nId}&module=${mod}`
                                        
                                        }
                                      }
                                     
                                        
                                        mapArrayData.push({Note_Content: data.data[i].Note_Content, Note_Title:data.data[i].Note_Title, Modified_Time:currentTimeData, name: data.data[i].Owner.name, $se_module: data.data[i].$se_module
                                          ,Parent_name:data.data[i].Parent_Id.name, Record_id:data.data[i].id, Time_format:addTimeFormats, Attachment_details:data.data[i].$attachments, downloadUrl:downloadUrl, OwnerId:data.data[i].Owner.id
                                        })
                                      }
                              
                              
                              
                                        setAllDetails(mapArrayData,...allDetails);
                                              
                                        
                                        setAllNotes(data.data)
                              
                                        // setAllDetails({Note_Content:data.data[0].Note_Content});
                              
                                        
                                      })

                      })


              })



            });

        console.log("time_format ",time_format);




        ZOHO.CRM.API.getRecord({Entity:props.data.Entity,RecordID:props.data.EntityId})
        .then(function(data){
            console.log("getRecords1",data);
            setParent_name(data.data[0].Name);
        })

  },[reload]);


  //===================================== Reload note list component  =======================================
  
  const handleAddNote = () => {
    // if (newNote.trim() !== '') {
    //   setNotes((prevNotes) => [...prevNotes, newNote.trim()]);
      
    // }
    setreload(reload+1);
 

    console.log("called handleAddNote");

      


    // window.ZOHO.embeddedApp.on("PageLoad", async (data) => {

    
      // notes.map(note => (
          

      // ---------------------------------------- Add notes  --------------------------


    // window.ZOHO.CRM.API.addNotes({ Entity: props.data.Entity, RecordID: props.data.EntityId
    //     , Title: "Notes Title", Content: newNote }).then(function (data) {
    //     console.log(data);
    //     setState(data.data[0].code)
    //     // console.log("state",data.data[0].code);
     

    //     //-------------------------------- add array data ---------------------------------

    //     if(data.data[0].code === 'SUCCESS'){

    //     // window.ZOHO.CRM.API.getRelatedRecords({ Entity: props.data.Entity, RecordID: props.data.EntityId, RelatedList: "Notes", page: 1, per_page: 200 })
    //     // .then(function (data) {
          
    //     //   console.log(data);
          
    //       // var dataLen = data.data.length;

    //       var currentData = data.data[0].details;


    //     var mapCurrentData = {Note_Content: newNote, Modified_Time:currentData.Modified_Time, name: currentData.Created_By.name, $se_module:props.data.Entity,Parent_name:Parent_name }
          
    //     // allDetails.unshift(mapCurrentData);

    //     // let newnoteData = {mapCurrentData,...allDetails};

    //     setAllDetails([mapCurrentData , ...allDetails]);
        // console.log("allDetails 1",allDetails);

    //       console.log('mapCurrentData ',mapCurrentData);
    //       // setAllNotes(data.data)
    //     // })

    //   }
    //     // console.log("state",state);

    // })

    
    // console.log("props 2",props);
    

  

    setNewNote('');
    setNewNote('0');
  };

  console.log("props 2",props);
  
  // console.log(" import dateFormatesIN",dateFormatesIN);
  // const inputRef = useRef(null);


  // var handleFocusState = false;
  // const handleFocus = () => {
    
  //         console.log("Edit Clicked");

  //         // inputRef.current.focus();
  //     // handleFocusState = true;
  // };
  // const inputRef = useRef(null);

  // const focusInput = () => {

  //   inputRef.current.focus();

  // };

  //====================== hover item =====================
  const [hoveredItem, setHoveredItem] = useState(null);
  const [recid,setRecId] = useState('');
  // Sample data
  // const listItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];  

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  console.log("hoveredItem ",hoveredItem);
  var HoverDate_Date_and_Time = `${actualDate} ${hoveredItem}`

  //======================== Onclick to get current record id ====================

    // const getCurrentRecordId = (recData) => {
      
    // }

  //======================== Call another component function ======================
  const childRef = useRef(null);

  const callChildFunction = (recData) => {
    console.log("childRef",childRef);
    
    setRecId(recData)
    console.log("recid",recData);
    if(childRef.current){
      childRef.current.handleFocus(recData);
    }

  }

  


  return (

    <>
      
       
      {/* <NotesPageContext.Provider value={handleAddNote}>
          <CustomField />
      </NotesPageContext.Provider> */}
    
      <Container>
        <Paper style={{ padding: 16 }}>
          {/* <h2>Notes</h2> */}


          {/* <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={3}
            variant="standard"
            fullWidth
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          ></TextField> */}
          <CustomField data={props} handleAddNote={handleAddNote} ref={childRef} allDetails={allDetails}/>
          {/* <Button
            variant="contained"
            color="primary"
            onClick={handleAddNote}
            style={{ marginTop: 8 }}
          >
            Save
          </Button> */}

          <List>

            {allDetails.map((note, index) => (
              <>
              {/*console.log(index,"=====",note)*/}
              <div>
                  <ListItem key={index}>


                    {/* <ListItemText primary={`${note.$se_module} - ${note.Parent_name} . ${note.Modified_Time} ago by ${note.name}`} style={{ paddingLeft: 50 }} > */}
                    <ListItemText primary={note.Note_Title}/>
                    
                  
                    

                  </ListItem>
                </div>
                <div>
                  <ListItem key={index}>

                    <ListItemIcon>
                      <Avatar alt="Profile" src="https://www2.deloitte.com/content/dam/Deloitte/nl/Images/promo_images/deloitte-nl-cm-digital-human-promo.jpg" />

                    </ListItemIcon>
                    <ListItemText primary={note.Note_Content} />
                  


                  </ListItem>
                </div>
                <ListItem>
                {note.Attachment_details == null ? <span></span> :<Box sx={{ Width: 100 ,alignContent:'center'}}>
                           <Card variant="outlined"> <a href={note.downloadUrl}  target="_blank">{note.Attachment_details[0].File_Name}</a></Card>
                              {/* <a href="http://"  rel="noopener noreferrer"></a> */}
                  </Box> }
                  
                    {/* <ListItemText primary={"hgbfd"}/> */}
                    {/* <Box sx={{ minWidth: 100}}>
                            <Card variant="outlined">{note.Attachment_details == null ? '' : note.Attachment_details[0].File_Name}</Card>
                  </Box> */}
                  {/* {console.log("Attachment_details note page",note.Attachment_details)} */}

                  </ListItem>
                <div>
                  <ListItem key={index}>


                    {/* <ListItemText primary={`${note.$se_module} - ${note.Parent_name} . ${note.Modified_Time} ago by ${note.name}`} style={{ paddingLeft: 50 }} > */}
                    <ListItemText>
                      <div style={{ display: 'flex', alignItems: 'center'}}>
                        
                      {note.$se_module}-
                      <a href={`https://crmsandbox.zoho.in/crm/uat1o/tab/CustomModule104/${props.data.EntityId}`} target="_blank">{note.Parent_name}- </a> 
                      <Tooltip title={HoverDate_Date_and_Time} placement="bottom-start">
                      <AccessTimeFilledIcon 
                      onMouseEnter={() => handleMouseEnter(note.Time_format)}   
                      onMouseLeave={handleMouseLeave} 
                      /></Tooltip>{note.Modified_Time}{note.OwnerId == cuUserId ? <div style={{marginLeft:450}}><span><EditIcon onClick={() => callChildFunction(note.Record_id)}/></span></div> : <></>}
                       
                      </div>
                    
                    </ListItemText>
                    

                  </ListItem>
                </div>
                <hr />
              </>
            ))}
          </List>

        </Paper>
      </Container>
    </>
  )
}

// export const useNotesPageContext = () => useContext(NotesPageContext);

export default NotesPage

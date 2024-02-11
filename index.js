root = document.getElementById('root')

function Selection(data){
    
    let MyForm = document.createElement('form')
    MyForm.id = "HeadForm"
    MyForm.name = "myForm"

    let select = document.createElement('select')
    select.className = "LocationSelector"  
    select.name = "location"

    let room_selection = document.createElement('select')  
    room_selection.className = "RoomSelection" 
    room_selection.name = "room"

    let S = document.createElement('input')
    S.className = "S"
    S.name = 'S'

    let max_floor = document.createElement('select')
    let main_floor = document.createElement('select')

    max_floor.className = "FloorSelection"  
    main_floor.className = "FloorSelection"  
    max_floor.name = "maxfloor"
    main_floor.name = "mainfloor"

    let S_label = document.createElement("span")
    S_label.className = 'labels'
    S_label.innerText = "Surface"

    let label_max_floor = document.createElement("span")
    label_max_floor.className = 'labels'
    label_max_floor.innerText = "Max floor of building"

    let label_locetion = document.createElement("span")
    label_locetion.className = 'labels'
    label_locetion.innerText = "Building location"  

    let label_main_floor = document.createElement("span")
    label_main_floor.className = 'labels'
    label_main_floor.innerText = "Main floor of building"

    let label_room = document.createElement("span")
    label_room.className = 'labels'
    label_room.innerText = "How many rooms"  

    MyForm.appendChild(label_locetion)
    for(let i = 0; i < data["lcoation"].length; i++ ){  
        
        op = document.createElement('option')
        op.value = data["lcoation"][i]  
        op.text = data["lcoation"][i]  
        select.appendChild(op)
    }
    MyForm.appendChild(select)
    MyForm.appendChild(S_label)
    MyForm.appendChild(S)
    
    MyForm.appendChild(label_max_floor)
    for(i = 0; i < 15; i++){
        
        floor_op = document.createElement('option')
        floor_op.value = i
        floor_op.text = i     
        max_floor.appendChild(floor_op)
    }
    MyForm.appendChild(max_floor)
    MyForm.appendChild(label_main_floor)

    for(i = 0; i < 15; i++){

        floor_op = document.createElement('option')
        main_floor_op = document.createElement('option')
        floor_op.value = i
        floor_op.text = i
        main_floor_op.value = i
        main_floor_op.text = i

        main_floor.appendChild(main_floor_op)
    }
    MyForm.appendChild(main_floor)
    
    MyForm.appendChild(label_room)
    for(i = 1; i < 5; i++){
        
        room_op = document.createElement('option')
        room_op.value = i
        room_op.text = i
        room_selection.appendChild(room_op)
    } 
    MyForm.appendChild(room_selection)
    
    let submitButton = document.createElement('button');

    
    submitButton.type = 'button'; 
    submitButton.innerHTML = 'Submit';

    submitButton.addEventListener('click',getFormData_Predict)


    MyForm.appendChild(submitButton)
    let priceTextP = document.createElement('p')
    priceTextP.id = 'price'
    root.appendChild(priceTextP)
    root.appendChild(MyForm)
}

function MainDraw(){

    fetch('http://127.0.0.1:8080/main',{
        method:'GET'
    }).then(
        res => res.json()
    ).then(data => { 
        // console.log(data)
        Selection(data)
    })
}


function getFormData_Predict(){

   let  Yerevan_administrative_districts_ls =  {
        "Դավիթաշեն" : 0,
        "Աջափնյակ": 1,
        "Արաբկիր" : 2, 
        "Ավան" : 4,
        "Էրեբունի" : 5, 
        "Քանաքեռ-Զեյթուն": 6, 
        "Կենտրոն" : 7,
        "Մալաթիա-Սեբաստիա" : 8,
        "Նոր Նորք": 9,
        "Շենգավիթ": 10
    } 

    let getForm = document.forms["myForm"]
    let locationFormData = getForm["location"].value
    let maxFloorFormData = getForm["maxfloor"].value
    let mainFloorFormData = getForm["mainfloor"].value
    let roomFromdData = getForm["room"].value
    let SFromdData = getForm["S"].value

    


    let sentObj = {
        "location":Yerevan_administrative_districts_ls[locationFormData],
        "maxfloor": Number(maxFloorFormData),
        "mainfloor": Number(mainFloorFormData),
        "room": Number(roomFromdData),
        "s" : Number(SFromdData)
    }

    jsonString = JSON.stringify(sentObj)
    
    appUrel = 'http://127.0.0.1:8080/predict'
    
    fetch(appUrel, 
        { 
        //   mode: 'no-cors',
            method: 'post',
            headers: {
                'Accept': 'application/json',
            },
             body: jsonString
          },5000)
          .then(res => {
             return res.json()
          }).then(obj =>{DrawPrice(obj['price'])})
          }
    
        



        
function DrawPrice(price){
   
    let price_P =document.getElementById('price')
    price_P .innerText = `Home price is ${price}`
    
}




MainDraw()



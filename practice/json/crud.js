
var courseApi='http://localhost:3000/courses';

function start(){
    getCourses(rendercourses);
    handleCreateform();
}
start();
function getCourses(callback){
    fetch(courseApi)
    .then(function(response){
        return response.json();
    })
    .then(callback);
}
function rendercourses(courses){
    var listcourses=document.querySelector('#list-courses');
    var htmls=courses.map(function(course){
        return `
        <li class="course-item-${course.id}">
        <h4>${course.name}</h4>
        <p>${course.description}</p>
        <button onclick=deletecourse(${course.id})>xoa</button>
        <button onclick="editcourse(${course.id},'${course.name}','${course.description}')">sua</button>
        </li>
        `;
    })
    listcourses.innerHTML=htmls.join('');
}
function creatcourse(data,callback){
    var options={
        method:'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }
    };
    fetch(courseApi,options)
    .then(function(response){
        response.json();
    })
    .then(callback);
}
function editcourse(id,name,description){
    var name_c=document.querySelector('input[name="name"]');
    var desc_c=document.querySelector('input[name="description"]');
    name_c.value=name;
    desc_c.value=description;
    var savebtn=document.getElementById('create_btn');
    savebtn.innerHTML='Save';
    savebtn.onclick=function(){
        var data={
            name:name_c.value,
            description:desc_c.value,
        }
        var options={
            method:'PATCH',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        fetch(courseApi+'/'+id,options)
        .then(response=>{
            response.json();
        })
        .then(function(){
            getCourses();
        })
    }
    
}
function deletecourse(id){
    var options={
        method:'DELETE',
        headers: {
            "Content-Type": "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
    }
    fetch(courseApi+'/'+id,options)
    .then(function(response){
        response.json();
    })
    .then(function(){
        var courseitem=document.querySelector('.course-item-'+id)
        if(courseitem){
            courseitem.remove();
        }
    });
}
function handleCreateform(){
    //event listener
    // console.log('thanh cong');
    var createbtn=document.querySelector('#create_btn');
    createbtn.onclick= function(){
        var name=document.querySelector('input[name="name"]')
        var description=document.querySelector('input[name="description"]')
        console.log(name);
        console.log(description);
        var formdata={
            name: name.value,
            description: description.value,
        }
        
        creatcourse(formdata,function(){
            getCourses(rendercourses);
        });

    }
}

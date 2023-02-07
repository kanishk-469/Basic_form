const c =console.log.bind(this);
const fetchButton =window.document.getElementById('available-posts').childNodes[1];
// console.dir(fetchButton);
const selectedFile = document.getElementById('input-file');
const listsElement =document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form =window.document.querySelector('#new-post form');
const postList =document.querySelector('ul');

// c(form);

// const sendHttpRequest = (method,url,data = null)=>{}

const fetchAllData =()=>{
fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
// .then(response => response.text())
// .then(response => response.blob())
.then(response =>{
  const listOfPosts =response; 
  for(const post of listOfPosts){
    const postEl = document.importNode(postTemplate.content,true);
    postEl.querySelector('h2').textContent = post.title.toUpperCase();
    postEl.querySelector('p').textContent = post.body;
    postEl.querySelector('li').id =post.id;
    listsElement.append(postEl);
   
  }
  
})
.catch(err => {
  console.log(err);
  throw new Error('Something went Wrong...!!!!')
})
}

const formSubmitHandler =(event) =>{
  event.preventDefault();
 let title = event.currentTarget.querySelector('#title').value;
 let content = event.currentTarget.querySelector('#content').value;
 c(title, content);
 
//  const fd = new FormData(form);     // FormData format 
 // //  fd.append('title', title);
 // //  fd.append('body', content);
//  fd.append('userId', Math.random());

 fetch('https://jsonplaceholder.typicode.com/posts',{
  method: 'POST',
  // body: fd,
  body: JSON.stringify({
     title: title,
     body: content,
     userId : Math.random(),
  }),
  headers: {
     'Content-type' : 'application/json; charset=UTF-8'
  },
 })
 .then(response => c(response.json()))
 .catch(err => c(err))
  document.querySelector('#title').value ='';
  document.querySelector('#content').value ='';

}

// window.addEventListener('load', fetchAllData)
fetchButton.addEventListener('click', fetchAllData)
form.addEventListener('submit', function(event){
  formSubmitHandler(event);
})
postList.addEventListener('click', event =>{
  if(event.target.tagName === 'BUTTON'){
    const postId = event.target.closest('li').id;
    // const postId = document.querySelector('li').id; not possible

    c(postId);
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`,{
        method: 'DELETE'
      })
      .catch(err => console.log(err))
  }
})

selectedFile.addEventListener("change", handleFiles, false);
function handleFiles() {
  const fileList = this.files;  /* can work with the file list */
  const numFiles = fileList.length;
  c(numFiles);
}
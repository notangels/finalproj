function createElemWithText(nameOfElToBeCreated = "p", textContentOfCreatedEl = "", className = ""){
        let newlyCreatedElWithText = document.createElement(nameOfElToBeCreated);
        newlyCreatedElWithText.textContent = textContentOfCreatedEl;
        newlyCreatedElWithText.className = className;
        return newlyCreatedElWithText;
};

function createSelectOptions(users){
  if(users === undefined || users === null){
  return undefined
};
  
let optionArray = []

for(const user of users){
  var opt = document.createElement('option');
  opt.value = user.id;
  opt.innerHTML = user.name;
  optionArray.push(opt)
  }
  return optionArray
};

function toggleCommentSection(postId){
  if (!postId){
    return undefined;
  } else{
      let section = document.querySelector(`section[data-post-id="${postId}"]`);
        if (section){
        section.classList.toggle('hide');
        return section;
      }
    }
    return null;
};

function toggleCommentButton (postID){
  if (!postID){
    return undefined;
  }
  const btnSelectedEl = document.querySelector(`button[data-post-id = "${postID}"`);
  if (btnSelectedEl != null) {
    btnSelectedEl.textContent === "Show Comments" ? (btnSelectedEl.textContent = "Hide Comments") : (btnSelectedEl.textContent = "Show Comments");
  }
  return btnSelectedEl;
};

function deleteChildElements(parentElement){
  if(!parentElement){
    return undefined;
  }
  let child = parentElement.lastElementChild;
  while (child){
      parentElement.removeChild(child);
      child = parentElement.lastElementChild;
  }
  return parentElement;
};

const addButtonListeners = function(){
  const buttons = document.querySelectorAll("main")[0].querySelectorAll('button');
  if (buttons.length > 0) {
      buttons.forEach( (button) => {
          const postID = button.dataset.postId;
          button.addEventListener("click", function(){
              toggleComments(postID);
          })
      })
  }
  return buttons;
};

const removeButtonListeners = function(){
  const buttons = document.querySelectorAll("main")[0].querySelectorAll('button');
  if (buttons.length > 0) {
      buttons.forEach( (button) => {
          const postID = button.dataset.postId;
          button.removeEventListener("click", function(){
              toggleComments(postID);
          })
      })
  }
  return buttons;
};

function createComments(comments){
        if (!comments){
          return undefined;}
      let frag = document.createDocumentFragment();
      for (let i = 0; i < comments.length; i++) 
      {
        var comment = comments[i];
        let article = document.createElement("article");
        let h3 = createElemWithText('h3', comment.name);
        let p1 = createElemWithText('p', comment.body);
        let p2 = createElemWithText('p', `From: ${comment.email}`);
        article.appendChild(h3);
        article.appendChild(p1);
        article.appendChild(p2);
        frag.appendChild(article);
      }
      return frag;
};

function populateSelectMenu(users){
  if (!users) return;
  let menu = document.querySelector("#selectMenu");
  let options = createSelectOptions(users);
  for (let i = 0; i < options.length; i++) {
      let option = options[i];
      menu.append(option);
  }
  return menu;
};

let getUsers = async() => {
      let retrieve;
      try {
          retrieve = await fetch("https://jsonplaceholder.typicode.com/users");
      }
      catch (error) {
          console.log(error);
      }
      return await retrieve.json();
};

let getUserPosts = async(userId) => {
      if (!userId) return;
      let retrieve;
      try {
          retrieve = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
      }
      catch (error) {
          console.log(error);
      }
      return retrieve.json();
}; 

let getUser = async(userId) => {
      if (!userId) return;
      let retrieve;
      try {
          retrieve = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      }
      catch (error) {
          console.log(error);
      }
      return retrieve.json();
};

let getPostComments = async(userId) => {
      if (!userId) return;
      let retrieve;
      try {
          retrieve = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      }
      catch (error) {
          console.log(error);
      }
      return retrieve.json();
};

let displayComments = async(postId) => {
      if (!postId) return;
};

let createPosts = async(postId) => {
      if (!postId) return;
};

const displayPosts = async (posts) => {
  let myMain = document.querySelector("main");
  let element = (posts) ? await createPosts : document.querySelector("main p");
  myMain.append(element);
  return element;
};

function toggleComments(event, postId){
  if (!event || !postId){
      return undefined;
  }
  event.target.listener = true;
  let section  = toggleCommentSection(postId);
  let button = toggleCommentButton(postId);
  return [section, button];
};

const refreshPosts = async (posts) => {
  if (!posts){
      return undefined;
  }
  let buttons = removeButtonListeners();
  let myMain = deleteChildElements(document.querySelector("main"));
  let fragment = await displayPosts();
  let button = addButtonListeners();
  return [buttons, myMain, fragment, button];
};

const selectMenuChangeEventHandler = async (e) => {
  if (!event || !event){
      return undefined;
  }
};

const initPage = async() => {
  let users = await getUsers();
  let select = populateSelectMenu(users);
  return [users, select];
};

function initApp(){
  initPage();
  let select = document.getElementById("selectMenu");
  select.addEventListener("change", selectMenuChangeEventHandler, false);
};

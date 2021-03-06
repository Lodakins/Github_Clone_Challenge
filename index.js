let topHeaderImage = document.querySelector('#header-img');
let profilePics = document.querySelector('#profile-pics');
let fullname = document.querySelector("#fullname");
let sfullname = document.querySelector("#sfullname");
let bio = document.querySelector("#profile-bio");
let login = document.querySelector('#login');
let slogin = document.querySelector('#slogin'); //sprofile-bio 
let sprofilebio = document.querySelector('#sprofile-bio');
let profileSmall = document.querySelector('#profile-pics-small');
let profileid = document.querySelector('#profile-id');
let sidebarpropic = document.querySelector('#sidebarpropic');
let profilepics1 = document.querySelector('#profile-pics1'); 
let proid = document.querySelector('#proid'); //followStar
let followStar = document.querySelector('#followStar');
let followers = document.querySelector('#followers'); //
let following = document.querySelector('#following');


let url="";
let token="";

fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json',"Authorization": "bearer " + token },
  body: JSON.stringify({  query: "query { viewer { login avatarUrl bio name following{totalCount} followers{totalCount} starredRepositories{totalCount}  repositories(first:20){ nodes { name description forkCount url stargazerCount updatedAt isFork parent{name url forkCount owner{login}} languages(first:1){ nodes {name color} } } } }}"}),
})
  .then(res => res.json())
  .then(res => {

      let response = res.data;
      console.log(response);
      topHeaderImage.setAttribute("src",response.viewer.avatarUrl);
      profilePics.setAttribute("src",response.viewer.avatarUrl);
      profileSmall.setAttribute("src",response.viewer.avatarUrl);
      sidebarpropic.setAttribute("src",response.viewer.avatarUrl);
      profilepics1.setAttribute("src",response.viewer.avatarUrl)
      fullname.textContent=response.viewer.name;
      sfullname.textContent=response.viewer.name;
      bio.textContent= response.viewer.bio;
      sprofilebio.textContent= response.viewer.bio;
      login.textContent= response.viewer.login;
      slogin.textContent= response.viewer.login;
      profileid.textContent= response.viewer.login;
      proid.textContent= response.viewer.login;
      followers.textContent= response.viewer.followers.totalCount;
      following.textContent= response.viewer.following.totalCount; //starredRepositories
      followStar.textContent= response.viewer.starredRepositories.totalCount;
      displayRepodata(response.viewer.repositories.nodes);
    }).catch((err) => {
      console.log(err);
  });

  //hide and show menu bar
  let hamburger = document.querySelector('#hamburger');
  let slider= document.querySelector('#s-top-header-slider');

  hamburger.addEventListener("click",function(e){
      e.preventDefault();
    slider.classList.toggle("d-none");
  })


window.addEventListener("scroll",function(e){

      if(this.scrollY > 100){
        document.querySelector("#navigation-section").classList.add("fixed");
        document.querySelector('#nav-prof').classList.remove("d-none1");
      }else{
        document.querySelector("#navigation-section").classList.remove("fixed");
        document.querySelector('#nav-prof').classList.add("d-none1");
      }
     
});

//   description: "30 Day Vanilla JS Challenge"
//   forkCount: 0
//   languages:
//   nodes: Array(1)
//   0:
//   color: "#e34c26"
//   name: "HTML"
//   __proto__: Object
//   length: 1
//   __proto__: Array(0)
//   __proto__: Object
//   name: "JavaScript30"
//   stargazerCount: 0
//   updatedAt: "2019-08-01T23:33:22Z"
  function displayRepodata(data){
      let html=``;
      for(item of data){
           html+=`
           <div class="d-flex repo-card">
            <div class="d-lg-12 mb-sm-1">
              <h2 class="reponame"><a href="${item.url}" target="_blank">${item.name} </a></h2>
            </div>
            <div class="d-lg-12">
              ${item.isFork ? `<span class="fork">Forked from 
              <a href="${item.parent.url}" class="muted-link">${item.parent.owner.login + '/'+item.parent.name}</a>
            </span>`:""}
            </div>
           <div class="d-lg-9">
               <div class="d-flex">
                   <div class="d-sm-12  d-lg-12">
                       <p class="m-t-10 repo-desc"> ${item.description==null?"":item.description} </p>
                   </div>
                   <div class="d-sm-3 d-lg-2 m-t-10">
                      <p class="repo-details"><span class="language-color"
                       style="background-color: ${item.languages.nodes.length == 0 ?"" 
                        : item.languages.nodes[0].color }"></span> ${item.languages.nodes.length == 0 ?"":item.languages.nodes[0].name} </p>
                   </div> 
                   <div class="d-sm-2 d-lg-2 m-t-10">
                       <p class="repo-details"> <i class="fa fa-star"></i>${item.stargazerCount}</p>
                   </div>
                   <div class="d-sm-3 d-lg-2 m-t-10">
                       <p class="repo-details"> <i class="fa fa-code-branch"></i>${item.isFork ? item.parent.forkCount :item.forkCount}</p>
                   </div>
                   <div class="d-sm-4 d-lg-3 m-t-10">
                       <p class="repo-details">Updated on ${modifyDate(item.updatedAt)}</p>
                   </div>
               </div>
           </div>
           <div class="d-lg-3" style="text-align: right;">
               <button class="repo-star-btn"><svg class="octicon octicon-star" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>Star</button>
           </div>
        </div>
          `;
      }

      document.querySelector('#repo-listing').innerHTML=html;
  }


  /*
    @Function  function to format date.
    @param{String dateFormate}
    @return {String eg. 1 Oct}
  */

  function modifyDate(date){

    let dat= new Date(date);
     let monthArray =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        let month = monthArray[dat.getMonth()];
        let day = dat.getDate();

        return day+" "+month;
  }

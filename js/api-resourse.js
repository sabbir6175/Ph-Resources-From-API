
// time count
function getTimeString(time){
    const hour = parseInt(time /3600);
    let remaining = time % 3600;
    const minute = parseInt(remaining / 60);
    remaining = remaining % 60;
    return `${hour} hour ${minute} minutes ${remaining} second`;
}

//Create loadCategories in the button
const loadCategories = () => {
  // console.log('loadCategories1');
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error))
};
// video display show that function in the called
const loadVideoCategories = (searchText="") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayVideoCategories(data.videos))
    .catch((error) => console.log(error))
};
//upper three button click show data
 const clickLoadVideo = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        // const activeButton = document.getElementById(`btn-${id}`) //button active hocce na 
        // activeButton.classList.add('active')
        displayVideoCategories(data.category)
    })
    .catch((error) => console.log(error))
}
// click button and show modal and show video information
const loadDetailsBtn = async (videoId) => {
    console.log(videoId);
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri)
    const data = await res.json()
    displayDetails(data.video)
};
const displayDetails = (video) => {
    console.log(video);
    const detailsContainer = document.getElementById("modal-content")
    detailsContainer.innerHTML =`
      <img src=${video.thumbnail}/>
      <P class="mt-3 text-justify font-normal ">${video.description}</p>
    
    `


    // document.getElementById("showModalData").click();
    // way-2
    document.getElementById("customModal").showModal();

}

//display show displayCategories in the button
const displayCategories = (categories) => {   //array function use
  const categoriesButton = document.getElementById("button-show-api");
  categories.forEach((items) => {
    console.log(items);

    //create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    
    <button id="btn-${items.category_id} " onclick="clickLoadVideo(${items.category_id})" class = "btn category-btn">
    ${items.category}
    </button>

    `;
    categoriesButton.append(buttonContainer);
  });
};

//part 2 display show video
const displayVideoCategories = (videos) => {
   const videoContainer = document.getElementById('video')
   videoContainer.innerHTML = ""; //button click and video category show
   //condition use for the button
   if(videos.length == 0){
    videoContainer.classList.remove('grid')
    videoContainer.innerHTML = `
        <div class="min-h-72 flex flex-col justify-center items-center " >
            <img src="img/Icon.png">
            <h2 class=" text-center text-2xl mt-4 font-bold">Oops!!Sorry, There is no </br> Content here</h2>
        </div>
    `
   }else{
    videoContainer.classList.add('grid')
   }

    videos.forEach((video) => {
        // console.log(video);
        //api called the video
        const card = document.createElement('div');
        card.classList = 'card card-compact'
        card.innerHTML = `
        <figure class = " h-[200px] relative">
            <img class = " w-full h-full object-cover"
            src= ${video.thumbnail}
            alt="Shoes" />
            ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1" >${getTimeString(video.others.posted_date)} </span>`}
            
        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div>
                <img class = " w-10 h-10 rounded-full object-cover" src= ${video.authors[0].profile_picture}>
            </div>
            <div>
                <h2 class=" font-bold">${video.title} </h2>
                <div class ="flex items-center gap-2">
                    <h2>${video.authors[0].profile_name} </h2>
                    ${video.authors[0].verified === true ? '<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png">' : ""}
                </div>
                  <button onclick="loadDetailsBtn('${video.video_id}')" class="btn btn-sm btn-warning">details</button>
            </div>
        </div>
        `;
        videoContainer.append(card)
    })
};

document.getElementById("search-input").addEventListener("keyup", (e) => {
   loadVideoCategories(e.target.value);
})

//call the function all data
loadCategories();
loadVideoCategories();

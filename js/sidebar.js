// Toggle class active when click on navbar
const sidebarTitleEl = document.getElementById('sidebar-title');
let isHiddenLesson = true;
const sidebarEl = document.getElementById('sidebar');
const lessonList = document.getElementById('lessonList');
lessonList.style.display = "none";
sidebarTitleEl.addEventListener('click', function () {
    sidebarEl.classList.toggle('active');
    if(isHiddenLesson){
        isHiddenLesson = !isHiddenLesson;
        lessonList.style.display = "block";
    }else{
        isHiddenLesson = !isHiddenLesson;
        lessonList.style.display = "none";
    }
});
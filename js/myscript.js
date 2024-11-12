document.addEventListener("DOMContentLoaded", () => {
    const chapterList = document.getElementById('chapterList');
    const videoFrame = document.getElementById('videoFrame');
    const descriptionFrame = document.getElementById('descriptionFrame');
    const toggleListButton = document.getElementById('toggleList');
    const sidebar = document.getElementById('sidebar');
    let isHide = true;
    fetch('./data/lessonsData.json')
        .then(response => response.json())
        .then(data => {
            data.chapters.forEach((chapter, index) => {
                const chapterItem = document.createElement('li');
                const chapterTitle = document.createElement('h3');
                const lessonList = document.createElement('ul');
                lessonList.style.display = 'none';

                chapterTitle.textContent = chapter.title;
                chapterTitle.classList.add('chapter-title');
                chapterItem.appendChild(chapterTitle);

                chapter.lessons.forEach(lesson => {
                    const lessonItem = document.createElement('li');
                    const lessonLink = document.createElement('a');
                    lessonLink.textContent = lesson.title;
                    lessonLink.href = '#';
                    lessonLink.onclick = () => {
                        videoFrame.src = `https://www.youtube.com/embed/${lesson.videoId}`;
                        descriptionFrame.src = lesson.description;
                        sidebar.classList.toggle('active');
                    };
                    lessonItem.appendChild(lessonLink);
                    lessonList.appendChild(lessonItem);
                });

                chapterTitle.onclick = () => {
                    lessonList.style.display = lessonList.style.display === 'none' ? 'block' : 'none';
                };

                chapterItem.appendChild(lessonList);
                chapterList.appendChild(chapterItem);
            });
        });

    toggleListButton.onclick = () => {
        sidebar.classList.toggle('active');
        if(isHide){
            sidebar.style.display = "block";
            isHide = !isHide;
        }else{
            sidebar.style.display = "none";
            isHide = !isHide;
        }
    };
});

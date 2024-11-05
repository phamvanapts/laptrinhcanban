// Hàm để hiển thị danh sách chương và bài học từ JSON
function displayChapters(chapters) {
    const lessonList = document.getElementById("lessonList");

    chapters.forEach(chapter => {
        // Tạo tiêu đề chương
        const chapterTitle = document.createElement("h3");
        chapterTitle.textContent = chapter.title;

        // Tạo danh sách bài học cho mỗi chương và đặt class để ẩn ban đầu
        const chapterLessons = document.createElement("ul");
        chapterLessons.classList.add("lessons-list");

        chapter.lessons.forEach(lesson => {
            const listItem = document.createElement("li");
            listItem.textContent = lesson.title;
            listItem.style.cursor = "pointer";
            listItem.onclick = () => loadVideo(lesson.title, lesson.videoId, lesson.description);
            chapterLessons.appendChild(listItem);
        });

        // Thêm sự kiện nhấp vào tiêu đề chương để ẩn/hiện danh sách bài học
        chapterTitle.onclick = () => {
            const isHidden = chapterLessons.style.display === "none" || chapterLessons.style.display === "";
            chapterLessons.style.display = isHidden ? "block" : "none";
        };

        // Thêm tiêu đề chương và danh sách bài học vào lessonList
        lessonList.appendChild(chapterTitle);
        lessonList.appendChild(chapterLessons);
    });
}

// Hàm để thay đổi video khi nhấp vào bài học
function loadVideo(title, videoId, description) {
    document.getElementById("videoTitle").textContent = title;
    document.getElementById("videoFrame").src = "https://www.youtube.com/embed/" + videoId;
    document.getElementById("videoDescription").src = description;
}

// Tải dữ liệu từ file JSON và hiển thị
fetch("./data/lessonsData.json")
    .then(response => response.json())
    .then(data => {
        displayChapters(data.chapters);
    })
    .catch(error => console.error("Error loading JSON data:", error));

function toggleLessons() {
    const lessonsContainer = document.getElementById("lessonsContainer");
    const video = document.getElementById("videoElement"); // Thay "videoElement" bằng ID của phần tử video của bạn
    
    lessonsContainer.classList.toggle("hidden");

    // Kiểm tra nếu danh sách bài học bị ẩn, áp dụng lớp full-width cho video
    if (lessonsContainer.classList.contains("hidden")) {
        video.classList.add("full-width");
    } else {
        video.classList.remove("full-width");
    }
}
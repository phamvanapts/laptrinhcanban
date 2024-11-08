// Chuyển từ JSON sang CSV chỉ lấy danh sách các liên kết
function convertJSONToCSV(json) {
    const csvArray = [];
    
    // Dòng tiêu đề CSV
    csvArray.push(["Link Docs"]);

    // Duyệt qua các chương và bài học để lấy các liên kết
    json.chapters.forEach(chapter => {
        chapter.lessons.forEach(lesson => {
            // Thêm link vào danh sách
            csvArray.push([lesson.description]);
        });
    });

    // Chuyển mảng thành chuỗi CSV
    return csvArray.map(row => row.join(",")).join("\n");
}

// Đọc dữ liệu từ file JSON và thực hiện chuyển đổi thành CSV
async function fetchData() {
    try {
        const response = await fetch('./data/lessonsData.json');  // Đọc file JSON
        const data = await response.json();  // Phân tích dữ liệu JSON
        return data;
    } catch (error) {
        console.error("Có lỗi khi đọc file JSON:", error);
    }
}

// Tạo file CSV và cho phép tải về
async function downloadCSV() {
    const jsonData = await fetchData();  // Đọc dữ liệu JSON từ file
    if (!jsonData) {
        alert("Không thể tải dữ liệu từ file JSON.");
        return;
    }
    const csv = convertJSONToCSV(jsonData);  // Chuyển JSON thành CSV

    // Tạo Blob chứa dữ liệu CSV với mã hóa UTF-8
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");

    // Tạo liên kết và kích hoạt tải xuống
    if (navigator.msSaveBlob) {  // Dành cho IE
        navigator.msSaveBlob(blob, "lessonLinks.csv");
    } else {
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "lessonLinks.csv");  // Tên file tải xuống
        link.click();
    }
}

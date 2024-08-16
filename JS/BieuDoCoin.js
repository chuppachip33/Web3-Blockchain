
    // // Dữ liệu mẫu cho biểu đồ
    // const marketData = {
    //     labels: ['BTC', 'ETH', 'BNB', 'SOL', 'DOGE'],
    //     datasets: [{
    //         label: 'Giá',
    //         data: [66248, 3488.67, 603.10, 143.84, 0.4108],
    //         backgroundColor: [
    //             'rgba(255, 99, 132, 0.2)',
    //             'rgba(54, 162, 235, 0.2)',
    //             'rgba(255, 206, 86, 0.2)',
    //             'rgba(75, 192, 192, 0.2)',
    //             'rgba(153, 102, 255, 0.2)'
    //         ],
    //         borderColor: [
    //             'rgba(255, 99, 132, 1)',
    //             'rgba(54, 162, 235, 1)',
    //             'rgba(255, 206, 86, 1)',
    //             'rgba(75, 192, 192, 1)',
    //             'rgba(153, 102, 255, 1)'
    //         ],
    //         borderWidth: 1
    //     }]
    // };

    // // Cấu hình biểu đồ
    // const chartOptions = {
    //     scales: {
    //         y: {
    //             beginAtZero: true
    //         }
    //     }
    // };

    // // Khởi tạo biểu đồ
    // var ctx = document.getElementById('marketChart').getContext('2d');
    // var myChart = new Chart(ctx, {
    //     type: 'bar',
    //     data: marketData,
    //     options: chartOptions
    // });


    // Khởi tạo biểu đồ ban đầu (ví dụ sử dụng Chart.js)
// Khởi tạo biểu đồ ban đầu (ví dụ sử dụng Chart.js)
const coinChart = document.getElementById('coinChart').getContext('2d');

// Dữ liệu ban đầu
let coinData = {
    labels: ['BTC', 'ETH', 'BNB', 'SOL', 'DOGE'], // Nhãn trục x
    datasets: [{
        label: 'Giá',
        data: [66248, 3488.67, 603.10, 143.84, 0.4108], // Dữ liệu giá
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Màu nền
        borderColor: 'rgba(255, 99, 132, 1)', // Màu viền
        borderWidth: 1
    }]
};

let marketChart = new Chart(coinChart, {
    type: 'line', // Loại biểu đồ
    data: coinData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Hàm cập nhật giá trị giảm giá ngẫu nhiên
function updateValues() {
    // Lấy dữ liệu hiện tại từ biểu đồ
    let currentData = marketChart.data.datasets[0].data;

    // Cập nhật giá trị của mỗi mục trong dữ liệu
    let updatedData = currentData.map(price => {
        let change = (Math.random() * 20 - 10) / 100; // Thay đổi ngẫu nhiên từ -10% đến +10%
        return price * (1 + change);
    });

    // Cập nhật dữ liệu mới vào biểu đồ
    marketChart.data.datasets[0].data = updatedData;
    marketChart.update();
}

// Cập nhật giá trị mỗi 5 giây
setInterval(updateValues, 1000);



function toggleIconList(id) {
    const iconList = document.getElementById(id);
    iconList.style.display = iconList.style.display === 'none' || iconList.style.display === '' ? 'block' : 'none';
}

function selectIcon(icon, displayId) {
    const iconList = {
        icon1: { name: 'NFT 1', img: '/Images/NFT4.jfif' },
        icon2: { name: 'NFT 2', img: '/Images/NFT7.jfif' },
        icon3: { name: 'NFT 3', img: '/Images/NFT9.jfif' }
    };
    
    const selectedIcon = iconList[icon];
    document.getElementById(displayId).innerHTML = `
        <img src="${selectedIcon.img}" alt="${selectedIcon.name}">
        <span>${selectedIcon.name}</span>
    `;

    // Cập nhật nội dung cho phần tử selected-icon-2
    const selectedIcon2 = document.getElementById('selected-icon-2');
    selectedIcon2.innerHTML = `
        <div class="icon-selector" onclick="confirmConversion()">
            Xác Nhận Chuyển Đổi
        </div>
        <img src="${selectedIcon.img}" alt="${selectedIcon.name}">
        <span>${selectedIcon.name}</span>
    `;

    toggleIconList('icon-list-1');
}

function confirmConversion() {
    // Hiển thị modal và overlay
    const modal = document.getElementById('confirmation-modal');
    const overlay = document.getElementById('overlay');
    modal.style.display = 'block';
    overlay.style.display = 'block';

    // Tạm dừng hiển thị modal và overlay sau 2 giây và ẩn đi
    setTimeout(() => {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    }, 2000);
}

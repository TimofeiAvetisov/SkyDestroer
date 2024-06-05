function createFallingObject() {
    const object = document.createElement('div');
    object.classList.add('falling-object');

    const size = Math.random() * 100 + 20;
    object.style.width = `${size}px`;
    object.style.height = `${size}px`;

    const screenWidth = window.innerWidth;
    const centralAreaWidth = 600;
    const leftOffset = (screenWidth - centralAreaWidth) / 2;

    object.style.left = `${leftOffset + Math.random() * centralAreaWidth}px`;

    const duration = Math.random() * 5 + 3;
    object.style.animationDuration = `${duration}s`;

    document.body.appendChild(object);

    // Удаляем объект после завершения анимации
    setTimeout(() => {
        object.remove();
    }, duration * 1000);
}

// Создание новых объектов каждые 500 миллисекунд
setInterval(createFallingObject, 2000);

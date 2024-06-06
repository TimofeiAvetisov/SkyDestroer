let score = 0;

function isColliding(rect1, rect2) {
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}


function updateCounter() {
    const counterElement = document.getElementById('score');
    counterElement.textContent = score;
}

updateCounter();

function update() {
    // Проверяем коллизии между падающими и летающими объектами
    for (let i = window.meteors.length - 1; i >= 0; i--) {
        const fallingObject = window.meteors[i];
        const rect1 = fallingObject.getBoundingClientRect();

        for (let j = window.bullets.length - 1; j >= 0; j--) {
            const flyingObject = window.bullets[j];
            const rect2 = flyingObject.getBoundingClientRect();

            if (isColliding(rect1, rect2)) {
                console.log("Colliding");
                // Удаляем объекты при коллизии
                fallingObject.remove();
                flyingObject.remove();

                // Удаляем объекты из массивов
                window.meteors.splice(i, 1);
                window.bullets.splice(j, 1);

                score++;
                updateCounter();

                break; // Прерываем внутренний цикл
            }
        }
    }

    for (let i = window.meteors.length -1; i >= 0; i--) {
        const meteor = window.meteors[i];
        const ship = document.getElementById('ship');
        const rect1 = meteor.getBoundingClientRect();
        const rect2 = ship.getBoundingClientRect();
        if (isColliding(rect1, rect2)) {
            score = 0;
            updateCounter();

            meteor.remove();
            window.meteors.splice(i, 1);

        }
    }

    // Обновляем анимацию
    requestAnimationFrame(update);
}

// Начинаем анимацию
update();
document.addEventListener('DOMContentLoaded', () => {
    const ship = document.getElementById('ship');
    const step = 2; // Шаг перемещения в пикселях
    const x_velocity_multiplier = 1;
    const y_velocity_multiplier = 0.5;
    const deceleration = 0.1; // Коэффициент замедления
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const initialLeft = (screenWidth - ship.offsetWidth) / 2;
    const initialTop = screenHeight - ship.offsetHeight - 20; // 20px отступ снизу

    let left = initialLeft;
    let top = initialTop;
    let velocity = { x: 0, y: 0 };
    let moving = { up: false, down: false, left: false, right: false };
    let idleTimeout;
    let isReturning = false; // Флаг для определения возврата
    let keys_pressed = new Set();
    let movingCondition = false;
    console.log("url(\"src_images/shipStatic.png\"");
    const updatePosition = () => {
        if (keys_pressed.size) {
            clearTimeout(idleTimeout);
        }
        if (!isReturning) {
            // Обновление скорости в зависимости от нажатия клавиш
            if (moving.up) velocity.y = -step * y_velocity_multiplier;
            if (moving.down) velocity.y = step * y_velocity_multiplier;
            if (moving.left) velocity.x = -step * x_velocity_multiplier;
            if (moving.right) velocity.x = step * x_velocity_multiplier;
        }

        // Обновление позиции
        left += velocity.x;
        top += velocity.y;

        // Ограничение движения в пределах экрана
        if (left < (screenWidth - 800) / 2) {
            left = (screenWidth - 800) / 2;
            velocity.x = 0;
        }
        if (left > screenWidth - (screenWidth - 800) / 2 - ship.offsetWidth) {
            left = screenWidth - (screenWidth - 800) / 2 - ship.offsetWidth;
            velocity.x = 0;
        }
        if (top < (screenHeight / 16) * 9) {
            top = (screenHeight / 16) * 9;
            velocity.y = 0;
        }
        if (top > screenHeight - ship.offsetHeight - 20) { // 20px отступ снизу
            top = screenHeight - ship.offsetHeight - 20;
            velocity.y = 0;
        }

        // Постепенное уменьшение скорости
        velocity.x *= (1 - deceleration);
        velocity.y *= (1 - deceleration);

        // Остановка при достижении малых значений скорости
        if (Math.abs(velocity.x) < 0.1) velocity.x = 0;
        if (Math.abs(velocity.y) < 0.1) velocity.y = 0;

        ship.style.top = `${top}px`;
        ship.style.left = `${left}px`;

        //console.log(velocity, movingCondition);
        if ((Math.abs(velocity.x) || Math.abs(velocity.y)) && !movingCondition) {
            changeImageMove();
        }
        if ((!Math.abs(velocity.x) && !Math.abs(velocity.y)) && movingCondition) {
            changeImageStatic();
        }
        requestAnimationFrame(updatePosition);
    };

    const move = (event) => {
        clearTimeout(idleTimeout);
        isReturning = false; // Прекращаем возврат при нажатии клавиш
        keys_pressed.add(event.key);
        switch (event.key) {
            case 'W':
                moving.up = true;
                break;
            case 'S':
                moving.down = true;
                break;
            case 'A':
                moving.left = true;
                break;
            case 'D':
                moving.right = true;
                break;
            case 'w':
                moving.up = true;
                break;
            case 's':
                moving.down = true;
                break;
            case 'a':
                moving.left = true;
                break;
            case 'd':
                moving.right = true;
                break;
        }
    };

    const stopMove = (event) => {
        keys_pressed.delete(event.key);
        switch (event.key) {
            case 'W':
                moving.up = false;
                break;
            case 'S':
                moving.down = false;
                break;
            case 'A':
                moving.left = false;
                break;
            case 'D':
                moving.right = false;
                break;
            case 'w':
                moving.up = false;
                break;
            case 's':
                moving.down = false;
                break;
            case 'a':
                moving.left = false;
                break;
            case 'd':
                moving.right = false;
                break;
            
        }
        idleTimeout = setTimeout(() => {
            returnToInitialPosition();
        }, 1000); // 1 second timeout before returning to initial position
    };

    const returnToInitialPosition = () => {
        isReturning = true;
        const returnStep = 1;
        const returnInterval = setInterval(() => {
            const dx = initialLeft - left;
            const dy = initialTop - top;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 1) {
                clearInterval(returnInterval);
                left = initialLeft;
                top = initialTop;
                velocity.x = 0;
                velocity.y = 0;
                isReturning = false;
                ship.style.top = `${top}px`;
                ship.style.left = `${left}px`;
            } else if (!isReturning) {
                clearInterval(returnInterval);
            } else {
                velocity.x = (dx / distance * returnStep);
                velocity.y = (dy / distance * returnStep);

                left += velocity.x;
                top += velocity.y;

                ship.style.top = `${top}px`;
                ship.style.left = `${left}px`;
            }
        }, 16); // Обновление 60 раз в секунду
    };

    const changeImageMove = () => {
        console.log("ChangeImageMoveCalled");
        movingCondition = true;
        changeImageIntermediateMove();
        changeImageMoveTimeout = setTimeout(() =>
            ship.style.backgroundImage = "url(\"src_images/shipMove.png\")", 1000);
    };

    const changeImageIntermediateMove = () => {
        ship.style.backgroundImage = "url(\"src_images/shipIntermediateMove.png\")";
    }
    
    const changeImageStatic = () => {
        console.log("ChangeIamgeStaticCalled");
        movingCondition = false;
        changeImageIntermediateMove();
        changeImageStaticTimout = setTimeout(() => 
            ship.style.backgroundImage = "url(\"src_images/shipStatic.png\")", 500);
    };

    // Устанавливаем начальное положение объекта
    ship.style.top = `${initialTop}px`;
    ship.style.left = `${initialLeft}px`;

    window.addEventListener('keydown', move);
    window.addEventListener('keyup', stopMove);

    requestAnimationFrame(updatePosition);
});

const fireRate = 1000;
const bulletSpeed = 100;
window.bullets = [];


function createBullet() {
    const object = document.createElement('div');
    const ship = document.getElementById('ship');
    const x = parseFloat(ship.style.left);
    const y = parseFloat(ship.style.top);
    const shipWidth = 140;
    const shipHeight = 166;
    console.log(x, y);
    object.classList.add('bullet');

    object.style.width = '20px';
    object.style.height = '50px';

    object.style.left = x + shipWidth / 2 - 10 + 'px';
    object.style.top = y - shipHeight / 2 + 30 + 'px';
    object.style.animationDuration = `1s`;

    document.body.append(object);
    window.bullets.push(object);

    setTimeout(() => {
        const index = window.bullets.indexOf(object);
        if (index > -1) {
            window.bullets.splice(index, 1);
        }
        object.remove();
    }, 1000);
}

setInterval(createBullet, fireRate);
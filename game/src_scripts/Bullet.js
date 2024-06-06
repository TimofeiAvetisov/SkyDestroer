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

    object.style.width = '10px';
    object.style.height = '25px';

    object.style.left = x + shipWidth / 2 - 5 + 'px';
    object.style.top = y - shipHeight / 2 + 60 + 'px';
    object.style.animationDuration = `1s`;

    object.style.backgroundImage = "url(\"src_images/Bullet.png\")";

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
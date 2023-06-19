let globalMousePos = {
    x: undefined,
    y: undefined
};

window.addEventListener('mousemove', (event) => {

    globalMousePos = {
        x: event.clientX,
        y: event.clientY
    };

    console.log(`(${globalMousePos.x}, ${globalMousePos.y})`);
});


document.addEventListener('DOMContentLoaded', function () {
    let navBarHeight = document.querySelector('#nav_bar').offsetHeight;
})
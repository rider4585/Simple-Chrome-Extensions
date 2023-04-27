/**
 * You can find an explanation for this code here - https://dev.to/jashgopani
 */
document.querySelectorAll(".name").forEach((b) => {
    console.log(b);
    b.onmouseleave = (e) => {
      e.target.style.background = "black";
    //   e.target.style.borderImage = null;
    };
  
    b.addEventListener("mousemove", (e) => {
        console.log(e.target);
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left; //x position within the element.
      const y = e.clientY - rect.top; //y position within the element.
      e.target.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px , rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0) 50% )`;
    //   e.target.style.borderImage = `radial-gradient(2% 2% at ${x}px ${y}px ,rgba(255,255,255,0.7),rgba(255,255,255,0.1) ) 1 / 1px / 0px stretch `;
    });
  });
  
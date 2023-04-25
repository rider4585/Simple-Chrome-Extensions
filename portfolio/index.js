document.addEventListener("DOMContentLoaded",function(){
    document.querySelector("body").innerHTML=`<nav id="nav_bar">
    <span id="logo">
      <img id="logo_img" src="./media/images/logo.svg" alt="RB Logo" />
    </span>
    <span id="nav_bar_element">
      <ul id="nav_items">
        <a class="nav_links" href="#home_page">Home</a>
        <a class="nav_links" href="#about_page">About</a>
        <a class="nav_links" href="#projects_page">Projects</a>
        <a class="nav_links" href="#contact_page">Contact</a>
      </ul>
    </span>
  </nav>
  <div id="home_page">
    <div id="quote">
      <span id="forF">
        <p class="normal_cursor" id="born">F</p>
      </span>
      <span id="forA">
        <p class="normal_cursor" id="brush">A</p>
        <p class="normal_cursor" id="brush_copy">A</p>
      </span>
    </div>
  </div>
  <div id="about_page"></div>
  <div id="projects_page"></div>
  <div id="contact_page">
    <div id="contact_background">
      <div id="contact_details">
        <h2 id="contact_me" class="normal_cursor">CONTACT ME</h2>
        <a id="mail_id" href="mailto:ravirajbugge4585@gmail.com"
          >ravirajbugge4585@gmail.com</a
        >
        <a id="phone_no" href="tel: +91 7798476162">+91 7798476162</a>
      </div>
      <div id="social_media">
        <h2 id="follow_me" class="normal_cursor">FOLLOW ME</h2>
        <div id="handle_links">
          <a href="https://www.instagram.com/rider_4585/" target="_blank"
            ><i id="instagram_logo" class="bi bi-instagram"></i
          ></a>
          <a
            href="https://in.linkedin.com/in/raviraj-bugge-68017a21a"
            target="_blank"
            ><i id="linkedin_logo" class="bi bi-linkedin"></i
          ></a>
          <a href="https://github.com/rider4585" target="_blank"
            ><i id="github_logo" class="bi bi-github"></i
          ></a>
        </div>
      </div>
    </div>
    <div id="identity">
      <p id="name">RAVIRAJ&nbspBUGGE&nbsp&nbsp/&nbsp&nbspRIDER4585</p>
    </div>
  </div>`;
})
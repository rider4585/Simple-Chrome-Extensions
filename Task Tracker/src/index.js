$(document).ready(function() {
    $('.nav-link').click(function(e) {
      e.preventDefault();
      $('.nav-link').removeClass('active');
      $(this).addClass('active');
      var content = $('.container');
      if ($(this).text() === 'Tasks') {
        content.html(`
          <h1>Tasks</h1>
          <p>Task list goes here...</p>
        `);
      } else if ($(this).text() === 'Ideas') {
        content.html(`
          <h1>Ideas</h1>
          <p>Idea list goes here...</p>
        `);
      }
    });
  });
  
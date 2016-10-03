$(function () {

  $('.search-button').click(function() {
    var search = $('.search-input').val();
    var value = $('.search-select option:selected').val();
    if (search) {
      searchSpotify('https://api.spotify.com/v1/search?type='+ value + '&q=' + search);
      $('.nav').removeClass('landing');
    }
  })

  $('.search-input, .search-select').keypress(function(e){
    if(e.which == 13){//Enter key pressed
        $('.search-button').click();//Trigger search button click event
    }
  });

  function searchSpotify(url) {
    $.get(url, function(data) {
      renderResults(data);
    });
  }

  function renderResults(data) {
    window.scrollTo(0, 0);
    var elements = $();
    var type = Object.keys(data)[0];

    $('#content').empty();
    if (data[type].items.length) {
      data[type].items.forEach(function(result) {
        elements = elements.add(resultCard(result));
      })

    } else {
      elements = elements.add(error("Nothing was found, please search again"))
    }
    renderButtons(data);

    $('#content').append(elements);
  }

  function renderButtons(data) {
    var buttons = $();
    var type = Object.keys(data)[0];
    $('.paginator').empty();
    if (data[type].previous) {
      buttons = buttons.add(button("Previous", data[type].previous));
    }
    if (data[type].next) {
      buttons = buttons.add(button("Next", data[type].next))
    }
    $('.paginator').append(buttons);
  }

  function error(message) {
    var error = document.createElement('div');
    error.className = "columns"
    error.innerHTML = '<article class="message is-warning column is-half is-offset-one-quarter"><div class="message-header">Error</div><div class="message-body">'+ message + '</div></article>'

    return error;
  }

  function resultCard(result) {
    var card = document.createElement('div');
    card.className = "columns"
    card.innerHTML = '<div class="box artist column is-half is-offset-one-quarter"><a target="blank" href=' + result.external_urls.spotify + '><article class="media"><div class="media-left"><figure class="image is-128x128"><img src=' + (result.images[0] ? result.images[0].url : "http://placehold.it/128x128") +' alt="Image"></figure></div><div class="media-content"><div class="content"><p><strong>' + result.name + '</strong></p></div></div></article></a></div>'

    return card;
  }

  function button(label, href) {
    var button = document.createElement('a');
    button.className = "button is-primary is-outlined";
    button.innerText = label;
    $(button).click(function() {
      searchSpotify(href);
    })
    return button;
  }

});

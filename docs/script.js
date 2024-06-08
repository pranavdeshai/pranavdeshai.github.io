// Enlarge images on click
var images = document.querySelectorAll("img");
images.forEach((image) => {
  image.setAttribute("onclick", "enlarge(event)");
})

function enlarge(event) {
  var image = event.target;
  if (image.classList.contains("clicked")) {
    image.classList.remove("clicked");
  }
  else {
    image.classList.add("clicked");
  }
}

// Breadcrumbs to current deck
var deckEls = document.querySelectorAll('.prettify-deck');

deckEls.forEach((deckEl) => {
  var subDecks = deckEl.innerHTML.split('::').filter(Boolean)
  html = []
  subDecks.forEach((subDeck) => {
    html.push("<div class='prettify-subdeck'>" + "<i class='prettify-deck-icon fa-solid fa-inbox'></i>" + subDeck + '</div>')
  })
  deckEl.innerHTML = html.join("/");
});

// Split hierarchical tags
var tagsEls = document.querySelectorAll(".prettify-tags")
tagsEls.forEach((tagsEl) => {
  var tagsContainerEl = tagsEl.children;
  if (tagsContainerEl.length > 0) {
    var tags = [];
    tagsContainerEl.forEach((tagEl) => {
      tags.push(tagEl.innerHTML);
      tags.forEach((tag) => {
        var childTag = tag.split("::").filter(Boolean);
        tagEl.innerHTML = childTag[childTag.length - 1].trim();
      });
    });
  } else {
    tagsContainerEl = tagsEl;
    var tags = tagsContainerEl.innerHTML.split(/\s/).filter(Boolean);
    var html = "";
    tags.forEach((tag) => {
      var childTag = tag.split("::").filter(Boolean);
      html +=
        "<div class='prettify-tag'>" +
        childTag[childTag.length - 1] +
        "</div>";
    });
    tagsContainerEl.innerHTML = html;
  }
})

// Admonitions
var fields = document.querySelectorAll(".prettify-field");
var re = /```ad-.*?```(<[\s\/]*br[\s\/]*>)*/gms;

var icons = {
  note: "pencil",
  important: "circle-exclamation",
  tip: "lightbulb",
  quote: "quote-left",
};

fields.forEach((field) => {
  var html = field.innerHTML;
  field.innerHTML = html.replace(re, (match) => {
    var adType = match.match(/(?<=```ad-)\w+/gms);
    if (!adType) {
      return match;
    } else {
      adType = adType[0];
    }

    var adTitle = match.match(
      /(?<=```ad-\w+\s).+?(?=<[\s\/]*br>[\s\/]*)/gms,
    );
    adTitle = adTitle
      ? adTitle[0]
      : adType.charAt(0).toUpperCase() + adType.slice(1);

    let adBody = match.match(
      /(?<=```ad-.+?<[\s\/]*br[\s\/]*>).*?(?=```)/gms,
    );
    adBody = adBody[0];

    return `
              <div class="prettify-admonition ${adType}">
                <div class="ad-header">
                  <i class="prettify-icon ad-icon fa-solid fa-${icons[adType]}"></i>
                  <p class="ad-title">${adTitle}</p>
                </div>
                <div class="ad-body">
                  ${adBody}
                </div>
              </div>`;
  });
});

// Load Font Awesome icons
var css = document.createElement('link');
css.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
css.rel = 'stylesheet';
css.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(css);

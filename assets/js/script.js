//=> Hamburger menu functionality
var hamburger = document.getElementById("hamburger"),
  hamMenuOpen = document.querySelector(".menu");
hamburger.addEventListener("click", cross);
//Hambuger functiom to open and close menu
function cross() {
  document.body.classList.toggle("body"); //to stop scrolling when menu open
  hamburger.classList.toggle("activeHam");
  hamMenuOpen.classList.toggle("hamMenuOpen");
}

//=> To see which html page is currently accessing javascript
if (document.URL.includes("index.html")) {
  //set autocomplete => off for location and email
  document.getElementById("location").setAttribute("autocomplete", "off");
  document.getElementById("email").setAttribute("autocomplete", "off");
  var submit = document.getElementById("submit");
  var letters = /^[A-Za-z\s]+$/;

  //=> display default city as mumbai
  document.addEventListener("DOMContentLoaded", function () {
    cardDisplay("mumbai");
  });
  //=> display user submitted city weather information
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    // to get user submitted value
    var location = document.forms["RegForm"]["location"].value;
    //to add fading animation while changing data
    document.querySelector(".weather-body").className += " weather-fade";
    //calling the cardDisplay function to show weather of city
    cardDisplay(location);
    //resetting the form input value
    document.getElementById("location").value = null;
  });

  //=> Function to display weather information on card
  function cardDisplay(location) {
    var node,
      textnode,
      nameValue,
      timestamp,
      time,
      date,
      months,
      month,
      days,
      day,
      humidity,
      wind,
      direction,
      tempValue,
      weatherIcon;
    //to check wether entered data is not empty or incorrect
    if (location.length == 0 || !letters.test(location)) {
      if (!document.querySelector(".errorMsg")) {
        //Give error message
        node = document.createElement("Span");
        textnode = document.createTextNode("Please enter correct city name");
        node.appendChild(textnode);
        node.setAttribute("class", "errorMsg");
        document.getElementById("formBar").appendChild(node);
      }
    } else {
      //Get weather information from openWeather api
      fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        location +
        "&appid=25c893e6cbc877423eb1f6eec8955a6f"
      )
        .then((response) => response.json())
        .then((data) => {
          nameValue = data["name"];
          timestamp = data["dt"];
          time = new Date(parseInt(timestamp) * 1000);
          date = time.getDate();
          months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          month = months[time.getMonth()];
          days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          day = days[time.getDay()];
          humidity = data["main"]["humidity"];
          wind = data["wind"]["speed"];
          direction = data["wind"]["deg"];
          tempValue = (data["main"]["temp"] - 273).toFixed(0);
          weatherIcon = data["weather"][0]["main"];

          //Display weather information on html weather card
          document.querySelector(".day").innerHTML = day;
          document.querySelector(".date").innerHTML = date + " " + month;
          document.querySelector(".location").innerHTML = nameValue;
          document.querySelector(".num").innerHTML =
            tempValue + "<sup>o</sup>C";
          document.querySelector(".humidity").innerHTML = humidity + "%";
          document.querySelector(".wind").innerHTML = wind + "m/sec";
          document.querySelector(".direction").innerHTML =
            direction + " &#7506;";

          var urlSnap; //To load correct weather icon
          switch (weatherIcon) {
            case "Mist":
              urlSnap = "7";
              break;
            case "Smoke":
              urlSnap = "7";
              break;
            case "Haze":
              urlSnap = "7";
              break;
            case "Broken-clouds":
              urlSnap = "3";
              break;
            case "Clouds":
              urlSnap = "5";
              break;
            case "Clear":
              urlSnap = "1";
              break;
            case "Rain":
              urlSnap = "14";
              break;
            case "Thunderstorm":
              urlSnap = "12";
              break;
            case "Drizzle":
              urlSnap = "13";
              break;
            default:
              urlSnap = "1";
          }
          document.getElementById("weather-icon").src =
            "assets/images/icons/icon-" + urlSnap + ".svg";

          document
            .querySelector(".weather-body")
            .classList.remove("weather-fade");

          if (document.querySelector(".errorMsg")) {
            document.querySelector(".errorMsg").remove();
          }
        })
        //To display error message when api fails or the value submitted by user is not equivalent to any city name
        .catch(function (err) {
          if (!document.querySelector(".errorMsg")) {
            node = document.createElement("Span");
            textnode = document.createTextNode(
              "Error fetching the data or incorrect city name"
            );
            node.appendChild(textnode);
            node.setAttribute("class", "errorMsg");
            document.getElementById("formBar").appendChild(node);
          }
        });
    }
  }

  //=> Modal
  var modal = document.getElementById("myModal"),
    span = document.querySelector(".close"),
    video = document.getElementById("myVideo"),
    videoSelect = document.querySelectorAll(".live-camera-cover"),
    spanImg = document.querySelector(".closeImg"),
    imgId = document.getElementById("myModal-img"),
    img = document.getElementById("myImg"),
    imgModal = document.querySelectorAll(".img-modal");

  // Function to display modal image
  imgModal.forEach(imgFunction);
  function imgFunction(item, index) {
    imgModal[index].addEventListener("click", function () {
      var imgSrc = parseInt(index) + 1;
      img.src = "/assets/images/thumb-" + imgSrc + ".jpg";
      imgId.classList.add("modalToggle");
      document.body.classList.add("body");
    });
  }
  // Function to display modal video
  videoSelect.forEach(videoFunction);
  function videoFunction(item, index) {
    videoSelect[index].addEventListener("click", function () {
      item.id;
      if (item.id == "video2" || item.id == "video4") {
        video.src = "assets/videos/video2.mp4";
      } else {
        video.src = "assets/videos/video1.mp4";
      }
      modal.classList.add("modalToggle");
      document.body.classList.add("body");
    });
  }

  //close opened modal
  span.onclick = function () {
    modal.classList.remove("modalToggle");
    document.body.classList.remove("body");
  };
  spanImg.onclick = function () {
    imgId.classList.remove("modalToggle");
    document.body.classList.remove("body");
  };

  // window.onclick = function (event) {
  //   if (event.target == modal) {
  //     modal.style.display = "none";
  //     imgId.style.display = "none";
  //     var element = document.querySelector(".container");
  //     element.classList.remove("modalOpen");
  //     document.body.style.overflow = "auto";
  //   }
  // };
} else if (document.URL.includes("photo.html")) {
  var spanGallery = document.querySelector(".closeGallery"),
    galleryId = document.getElementById("myModal-gallery"),
    gallery = document.getElementById("myGallery"),
    galleryModal = document.querySelectorAll(".gallery-image");

  galleryModal.forEach(galleryFunction);
  //show gallery image clicked as a modal
  function galleryFunction(item, index) {
    galleryModal[index].addEventListener("click", function () {
      gallery.src = "/assets/images/" + this.id + ".jpg";
      galleryId.classList.add("modalToggle");
      document.body.classList.add("body");
    });
  }

  //close opened gallery modal
  spanGallery.onclick = function () {
    galleryId.classList.remove("modalToggle");
    document.body.classList.remove("body");
  };
}



  //=> redirect user to mail client with information filled when user wants to subscribe
  var subscribe = document.getElementById("subscribe");
  subscribe.addEventListener("click", function (e) {
    var body = document.getElementById("email").value,
      emailLetters = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      sub = "Subscribe to Weather Check news letter";
    //to gives error msg if the naming of email is not correct
    if (!emailLetters.test(body)) {
      if (!document.querySelector(".errorMsgEmail")) {
        node = document.createElement("Span");
        textnode = document.createTextNode("Please enter correct email");
        node.appendChild(textnode);
        node.setAttribute("class", "errorMsgEmail");
        document.getElementById("emailBar").appendChild(node);
      }
    } else {
      //Remove error msg if email is correct
      if (document.querySelector(".errorMsgEmail")) {
        document.querySelector(".errorMsgEmail").remove();
      }
      //redirect user to email client in new tab for subscription
      window.open(
        "mailto:weathercheck@example.com?Subject=" +
        encodeURIComponent(sub) +
        "&body=" +
        encodeURIComponent(body)
      );
    }
    //reset the email value in form
    document.getElementById("email").value = null;
    e.preventDefault();
  });

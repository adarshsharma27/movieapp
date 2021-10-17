const appKey = "27095699";

$(window).on('load', function () {
  $.ajax({
    url: `https://www.omdbapi.com/?apikey=${appKey}&s=avengers`,
    method: 'GET',
    success: function (data) {
      $.each(data.Search, function (key, value) {
        let html = ` <div class="col-xl-3 col-md-3 col-sm-12">
                <div class="product-card text-left">
                    <img class="img-responsive" src=${value.Poster}>
                    <div class="product-image-caption">
                        <div class="product-image-txt">
                           <h3>${value.Title}</h3>
                            <p class="decription-1">${value.Year}</p>
                            <a href="#" onclick="movieSelected('${value.imdbID}')"  class="btn btn-primary  my-3">Read More</a>
                        </div>
                    </div>
                </div>
            </div>`
        $('#movies-cards').append(html);

      });
    },
    error: function (error) {
      console.log(error);
    }

  });

});

$('#search').keyup(function (event) {
  $('#movies-cards').html('');
  event.preventDefault();
  searchMovie = $("#search").val();
  $.ajax({
    url: `https://www.omdbapi.com/?apikey=${appKey}&s=${searchMovie}`,
    method: 'GET',
    success: function (data) {
      $.each(data.Search, function (key, value) {
        let html = `<div class="col-xl-3 col-md-3 col-sm-12">
                <div class = "product-card py-4 text-left" >
                    <img class="img-responsive" src=${value.Poster}>
                    <div class="product-image-caption">
                        <div class="product-image-txt">
                           <h3>${value.Title}</h3>
                            <p class="decription-1">${value.Year}</p>
                            <a href="#" onclick="movieSelected('${value.imdbID}')"  class="btn btn-primary  my-3">Read More</a>
                        </div>
                    </div>
                </div>
            </div>`
        $('#movies-cards').append(html);
      });
    },
    error: function (error) {
      console.log(error);
    }

  });
});


function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location.href = "details.html";
  return false;

}


function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  $('.row').html('')
  $.ajax({
    url: `https://www.omdbapi.com/?apikey=${appKey}&i=${movieId}`,
    method: 'GET',
    success: function (value) {
      let html = `  
      <div class="col-md-6 order-md-1 order-2 text-md-left text-center pt-4 ">
          <h4  class="font-weight-light animation"><b>${value.Title}</b></h4>
            <div  class="description py- animation  overflow-hidden">
                <p><strong>Released</strong> : ${value.Released}</p>
                <p><strong>Genre</strong> : ${value.Genre}</p>
                <p><strong>Director</strong> : ${value.Director}</p>
                <p><strong>Writer</strong> : ${value.Writer}</p>
                <p><strong>Actors</strong> : ${value.Actors}</p>
                <p><strong>Plot</strong> : ${value.Plot}</p>
                <p><strong>Ratings</strong> : ${value.imdbRating}</p>
          </div>
          <div class="btns pt-2">
          <a href="https://www.imdb.com/title/${movieId}" class="btn btn-primary" target="_black"> View IMDB</a>
          <a href="index.html"  class="btn btn-primary btn-secondary " target="_black">Go Back To Search</a>
          </div>
        </div>
      <div  class="col-md-6 order-md-2 order-1 text-center p-0 h-100 w-100 ">
        <img  src=${value.Poster}  class="img-fluid">
      </div>`
      $('#details').append(html);

    },
    error: function (error) {
      console.log(error);
    }

  });

}
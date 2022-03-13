function searchMovie () {
    $('#movie-list').html(''); // delete movie yang ada, baru cari movie yang baru
    
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : '4f924cfb',
            's' : $('#search-input').val()
        },
        success: function (result) {
            if (result.Response == "True") {
                let movies = result.Search;
                
                $.each(movies, function(i, data) {
                    $('#movie-list').append
                    (`
                        <div class="card mb-3 ml-2" style="width: 18rem;">
                            <img src="${data.Poster}" class="card-img-top" alt="${data.Title}">
                            <div class="card-body">
                            <h5 class="card-title">${data.Title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                            <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id=${data.imdbID}>Details</a>
                            </div>
                        </div>
                    `)
    
                    $('#search-input').val('');
                })
            } else {
                $('#movie-list').html(`<h1 class="alert alert-primary" role="alert">${result.Error}</h1>`)
            } 
        }
    })
}


$('#search-button').on('click', function () {
    searchMovie();
})

$('#search-input').on('keyup', function (e) {
    if(e.which == 13) {
        searchMovie();
    }
})

$('#movie-list').on('click', '.see-detail', function() {
    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey': '4f924cfb',
            'i': $(this).data('id')
        },
        success: function (movie) {
            if(movie.Response === "True") {
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${movie.Poster}" class="img-fluid" />
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Released: ${movie.Released}</li>
                                    <li class="list-group-item">Genre: ${movie.Genre}</li>
                                    <li class="list-group-item">Director: ${movie.Director}</li>
                                    <li class="list-group-item">Actors: ${movie.Actors}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);

                $('#exampleModalLabel').html(`${movie.Title}`);
            }
        }
    })
})
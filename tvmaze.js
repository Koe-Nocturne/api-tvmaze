/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  let querySelected = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);
  let shows = [];


  for (let index = 0; index < querySelected.data.length; index++) {
    function imageTester() {
      if (querySelected.data[index].show.image === null) {
        return "https://via.placeholder.com/210x295.png?text=No+Image+For+Show";
      }
      else { return querySelected.data[index].show.image.medium; }
    };


    shows.push({
      id: querySelected.data[index].show.id,
      name: querySelected.data[index].show.name,
      summary: `<p>${querySelected.data[index].show.summary}</p>`,
      image: imageTester()
    });



  }
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  return shows;
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <img style="float: left; margin-right: 10px;" src="${show.image}"/>
             <p class="card-text">${show.summary}</p>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch(evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  let episodeObj = await axios.get(`http://api.tvmaze.com/shows/<show id>/episodes`)
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  // TODO: return array-of-episode-info, as described in docstring above
}

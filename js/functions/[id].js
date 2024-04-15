/*
 * blueimp Gallery Demo JS
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global blueimp, $ */
async function onRequest(context) {
  // Contents of context object
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;
  console.log(env);
  console.log(params.code);

  // Flickr image types:
  var imageTypes = [
    // https://www.flickr.com/services/api/misc.urls.html
    'sq', // 75x75
    'q', // 150x150
    't', // 100 on longest side
    's', // 240 on longest side
    'n', // 320 on longest side
    'm', // 500 on longest side
    'z', // 640 on longest side
    'c', // 800 on longest side
    'l', // 1024 on longest side
    'h', // 1600 on longest side
    'k', // 2048 on longest side
    'o' // original dimensions
  ]

  const value = env.img_url.list();
  console.log(value)
  //let res=[]
  //for (let i in value.keys){
    //add to res
    //"metadata":{"TimeStamp":19876541,"ListType":"None","rating_label":"None"}
    //let tmp = {
    //  name: value.keys[i].name,
    //  TimeStamp: value.keys[i].metadata.TimeStamp,
    //  ListType: value.keys[i].metadata.ListType,
    //  rating_label: value.keys[i].metadata.rating_label,
    //}
    //res.push(tmp)
  //}
  const result = JSON.stringify(value.keys);

  var maxWidth = $(document.body).css('max-width')
  var sizes = '(min-width: ' + maxWidth + ') ' + maxWidth + ', 100vw'
  var carouselLinks = []
  var linksContainer = $('#links')
  // Add the demo images as links with thumbnails to the page:
  $.each(result, function (index, photo) {
    var thumbnail = $('<img>')
      .prop('loading', 'lazy')
      .prop('width', '75px')
      .prop('height', '75px')
      .prop('src', photo['name'])
      .prop('alt', photo['Label'])
    var srcset = []
    var url = 'https://tg-graph-69b.pages.dev/file/' + photo['name']
    //$.each(photo['metadata'], function (_, type) {
    //  var url = photo['url_' + type]
    //  var width = photo['width_' + type]
      if (url) {
        srcset.push(url)// + ' ' + width + 'w')
      }
    //})
    srcset = srcset.join(',')
    $('<a></a>')
      .append(thumbnail)
      .prop('title', photo['name'])
      .prop('href', url)
      .attr('data-srcset', srcset)
      .attr('data-gallery', '')
      .appendTo(linksContainer)
    carouselLinks.push({
      title: photo['name'],
      href: url,
      sizes: sizes,
      srcset: srcset
    })
  })
  // Initialize the Gallery as image carousel:
  // eslint-disable-next-line new-cap
  blueimp.Gallery(carouselLinks, {
    container: '#blueimp-image-carousel',
    carousel: true
  })

  // Initialize the Gallery as video carousel:
  // eslint-disable-next-line new-cap
  blueimp.Gallery(
    [
      {
        title: 'Sintel',
        type: 'video',
        sources: [
          {
            type: 'video/webm',
            src:
              'https://upload.wikimedia.org/wikipedia/commons/f/f1/' +
              'Sintel_movie_4K.webm'
          },
          {
            type: 'video/mp4',
            src: 'https://archive.org/download/Sintel/sintel-2048-surround.mp4'
          },
          {
            type: 'video/ogg',
            src: 'https://archive.org/download/Sintel/sintel-2048-stereo.ogv'
          }
        ],
        poster:
          'https://upload.wikimedia.org/wikipedia/commons/d/dc/' +
          'Sintel_1920x1080.png'
      },
      {
        title: 'LES TWINS - An Industry Ahead',
        type: 'text/html',
        youtube: 'zi4CIXpx7Bg'
      },
      {
        title: 'KN1GHT - Last Moon',
        type: 'text/html',
        vimeo: '73686146',
        poster: 'https://secure-a.vimeocdn.com/ts/448/835/448835699_960.jpg'
      }
    ],
    {
      container: '#blueimp-video-carousel',
      carousel: true,
      startSlideshow: false
    }
  )

  $('#fullscreen').change(function () {
    $('#blueimp-gallery').data('fullscreen', this.checked)
  })
}
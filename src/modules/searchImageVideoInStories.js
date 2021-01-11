import forEach from '../helpers/forEach.js'

export default function searchImageVideoInStories(program) {
  let found = false

  /* =====================================
  =            Search in Stories         =
  ===================================== */
  try {
    if (program.regexStoriesURI.test(program.path)) {
      const $root = document.getElementById('react-root')

      const $video = $root.querySelectorAll('video > source')
      const $img = $root.querySelector(program.mediaImageElExpression) || $root.querySelector(program.mediaImageElExpressions.img)

      let story = ''

      if ($video.length > 0) {
        story = $video[0].src
      } else {
        story = $img.src
      }

      if (story) {
        program.setImageLink(story)

        // open image in new tab
        window.open(program.imageLink)
        found = true
        program.foundImage = true
        program.foundByModule = 'searchImageVideoInStories'
      }

      if (found === false) {
        if (program.videos.length > 0) {
          let videoLink = program.videos[0].src
          if (!videoLink && program.videos[0].children) videoLink = program.videos[0].children[0].src

          if (videoLink) {
            // open image in new tab
            window.open(videoLink)
            found = true
            program.foundVideo = true
            program.alertNotInInstagramPost = true // if don't find nothing, alert to open the post
            program.foundByModule = 'searchImageVideoInStories'
          }
        }
      }
    }
  } catch (e) {
    console.error('searchImageVideoInStories()', `[instantgram] ${program.VERSION}`, e)
  }
  /* =====  End of search stories  ======*/
  return found
}

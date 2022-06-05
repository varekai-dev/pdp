const sharp = require('sharp')
const path = require('path')

const folder = 'img'
const inputFile = `./${folder}/avatar.jpg`

const resizeImage = (image, options) => {
  const extension = path.extname(image)
  const imageName = path.basename(image, extension)
  const { width, height } = options

  if (!width || !height) {
    throw new Error('Width and height are required')
  }

  sharp(image)
    .resize(options)
    .toFile(`${folder}/${imageName}_${width}_${height}${extension}`)
    .then(() => {
      console.log('New file created')
    })
    .catch(function (err) {
      console.log(`Error occurred: ${err}`)
    })
}

resizeImage(inputFile, { width: 36, height: 36 })

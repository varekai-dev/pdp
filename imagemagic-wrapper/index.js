const { exec } = require('child_process')
const path = require('path')

const folder = 'img'
const inputFile = `./${folder}/avatar.jpg`

const resizeImage = (image, options) => {
  const imageExtension = path.extname(image)
  const imageName = path.basename(image, imageExtension)
  const { width, height } = options

  if (!width || !height) {
    throw new Error('Width and height are required')
  }

  const size = `${width}x${height}`
  const command = `magick ${inputFile} -resize ${size} ./${folder}/${imageName}_${size}${imageExtension}`

  exec(command, error => {
    if (error) {
      console.log(`error: ${error.message}`)
      return
    }

    console.log('File saved')
  })
}

resizeImage(inputFile, { width: 100, height: 100 })

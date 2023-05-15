import React from 'react'
import PropTypes from 'prop-types'

// Helper function to read file as data URL
const readFileAsDataURL = (file) =>
  new Promise(resolve => {
    const reader = new FileReader()

    reader.onload = (event) => {
      resolve(event.target.result)
    }

    reader.readAsDataURL(file)
  })

// Helper function to resize an image
const resizeImage = (imageURL, canvas, maxHeight) =>
  new Promise(resolve => {
    const image = new Image()

    image.onload = () => {
      const context = canvas.getContext('2d')

      if (image.height > maxHeight) {
        image.width *= maxHeight / image.height
        image.height = maxHeight
      }

      context.clearRect(0, 0, canvas.width, canvas.height)
      canvas.width = image.width
      canvas.height = image.height

      context.drawImage(image, 0, 0, image.width, image.height)

      resolve(canvas.toDataURL('image/jpeg'))
    }

    image.src = imageURL
  })

/**
 * A custom <input> that dynamically reads and resizes image files before
 * submitting them to the server as data URLs. Also, shows a preview of the image.
 */
class ImageInput extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    maxHeight: PropTypes.number
  }

  state = {
    value: ''
  }

  handleFileChange = (event) => {
    const file = event.target.files[0]

    if (file && file.type.match(/^image\//)) {
      // Read file as data URL and resize the image
      readFileAsDataURL(file).then(originalURL => {
        resizeImage(originalURL, this.canvas, this.props.maxHeight).then(url => {
          this.setState({ value: url })
        })
      })
    } else {
      this.setState({ value: '' })
    }
  }

  handleFormReset = () => {
    this.setState({ value: '' })
  }

  componentDidMount() {
    // Create a canvas element and attach event listener for form reset
    this.canvas = document.createElement('canvas')
    this.fileInput.form.addEventListener('reset', this.handleFormReset)
  }

  componentWillUnmount() {
    // Remove event listener when component is unmounted
    this.fileInput.form.removeEventListener('reset', this.handleFormReset)
  }

  render() {
    const { className, name } = this.props
    const { value } = this.state

    const style = {
      position: 'relative'
    }

    if (value) {
      // If value is set, display the image as a background
      style.backgroundImage = `url("${value}")`
      style.backgroundRepeat = 'no-repeat'
      style.backgroundPosition = 'center'
      style.backgroundSize = 'cover'
    }

    return (
      <div className={className} style={style}>
        {/* Hidden input field to store the data URL */}
        <input type="hidden" name={name} value={value} />
        {/* Actual file input element */}
        <input
          ref={node => this.fileInput = node}
          type="file"
          onChange={this.handleFileChange}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0
          }}
        />
      </div>
    )
  }
}

export default ImageInput;

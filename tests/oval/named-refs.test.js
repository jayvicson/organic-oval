describe('named refs', function () {
  require('../env')()

  var oval
  var customTagInstance

  var Tag = function (tagName, root) {
    oval.BaseTag(this, tagName, root)
  }
  Tag.prototype.render = function (createElement) {
    return createElement('div', {},
      createElement('form', {
        'ref': 'childRef'
      })
    )
  }
  before(function () {
    window.document.body.innerHTML = ''
    var plasma = {}
    oval = require('../../index')
    oval.registeredTags = []
    oval.init(plasma)
    oval.registerTag('custom-tag', Tag)
  })

  it('mount and renders', function () {
    var el = document.createElement('custom-tag')
    document.body.appendChild(el)
    var tag = oval.mountAt(el, 'custom-tag')
    expect(tag.refs.childRef).to.exist
    customTagInstance = tag
  })

  it('re-renders', function () {
    customTagInstance.update()
    expect(customTagInstance.refs.childRef).to.exist
  })
})

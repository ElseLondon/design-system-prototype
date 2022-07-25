figma.showUI(`
  <script>
    window.onmessage = async (event) => {
      if (event.data.pluginMessage.type === 'networkRequest') {
        var request = new XMLHttpRequest()
        request.open('GET', 'https://design-system-prototype-server-omxtg5ekfa-ey.a.run.app')
        request.responseType = 'text'
        request.onload = () => {
          window.parent.postMessage({pluginMessage: request.response}, '*')
        };
        request.send()
      }
    }
  </script>`, { visible: false }
);

figma.ui.postMessage({ type: 'networkRequest' })

figma.ui.onmessage = async (msg) => {
  const parsedJson = JSON.parse(msg)
  const { paddingTop, paddingBottom, paddingLeft, paddingRight } = parsedJson

  // console.log('parsedJson:',    parsedJson)
  // console.log('paddingTop:',    paddingTop)
  // console.log('paddingBottom:', paddingBottom)
  // console.log('paddingLeft:',   paddingLeft)
  // console.log('paddingRight:',  paddingRight)

  for (const node of figma.currentPage.selection) {
    if ("paddingBottom" in node) {
    // console.log('paddingBottom present')
      node.paddingBottom = parseInt(paddingBottom)
    }

    if ("paddingLeft" in node) {
    // console.log('paddingLeft present')
      node.paddingLeft = parseInt(paddingLeft)
    }

    if ("paddingRight" in node) {
    // console.log('paddingRight present')
      node.paddingRight = parseInt(paddingRight)
    }

    if ("paddingTop" in node) {
    // console.log('paddingTop present')
      node.paddingTop = parseInt(paddingTop)
    }
    
    console.log('node', node)
    console.log('node.name', node.name)
    console.log('node.id', node.id)
  }

  figma.closePlugin()
}
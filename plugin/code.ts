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
  let paddingTop    = parseInt(parsedJson.paddingTop)
  let paddingBottom = parseInt(parsedJson.paddingBottom)
  let paddingLeft   = parseInt(parsedJson.paddingLeft)
  let paddingRight  = parseInt(parsedJson.paddingRight)

  for (const node of figma.currentPage.selection) {
    const nodeName = node.name.toLowerCase()
    const isNodeSmall = nodeName.includes("small")
    const isNodeLarge = nodeName.includes("large")
    
    if (isNodeSmall) {
      if ("paddingBottom" in node) node.paddingBottom = paddingBottom * 0.5
      if ("paddingLeft" in node)   node.paddingLeft   = paddingLeft * 0.5
      if ("paddingRight" in node)  node.paddingRight  = paddingRight * 0.5
      if ("paddingTop" in node)    node.paddingTop    = paddingTop * 0.5
    }

    if (isNodeLarge) {
      if ("paddingBottom" in node) node.paddingBottom = paddingBottom * 2
      if ("paddingLeft" in node)   node.paddingLeft   = paddingLeft * 2
      if ("paddingRight" in node)  node.paddingRight  = paddingRight * 2
      if ("paddingTop" in node)    node.paddingTop    = paddingTop * 2
    }

    if (!isNodeSmall && !isNodeLarge) {
      if ("paddingBottom" in node) node.paddingBottom = paddingBottom
      if ("paddingLeft" in node)   node.paddingLeft   = paddingLeft
      if ("paddingRight" in node)  node.paddingRight  = paddingRight
      if ("paddingTop" in node)    node.paddingTop    = paddingTop
    }
  }

  figma.closePlugin()
}
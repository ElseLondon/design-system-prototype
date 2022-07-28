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
  </script>`,
  { visible: false }
);

figma.ui.postMessage({ type: 'networkRequest' })

figma.ui.onmessage = async (msg) => {
  const parsedJson = JSON.parse(msg)

  for (const node of figma.currentPage.selection) {
    recurseParentChildren(node, parsedJson)
  }

  figma.closePlugin()
}

function recurseParentChildren(node, parsedJson) {
  for(var i = 0, count = node.children.length; i < count; i++) {
    const nodeName = node.name.toLowerCase()
    const isNodeSmall  = nodeName.includes("--small")
    const isNodeMedium = nodeName.includes("--medium")
    const isNodeLarge  = nodeName.includes("--large")

    if (isNodeSmall)  applyStyling(parsedJson, node, 0.5)
    if (isNodeMedium) applyStyling(parsedJson, node, 1)
    if (isNodeLarge)  applyStyling(parsedJson, node, 2)
    
    recurseParentChildren(node.children[i], parsedJson)
  }
}

function applyStyling(parsedJson, node, multiple) {
  let paddingTop    = parseInt(parsedJson.paddingTop)
  let paddingBottom = parseInt(parsedJson.paddingBottom)
  let paddingLeft   = parseInt(parsedJson.paddingLeft)
  let paddingRight  = parseInt(parsedJson.paddingRight)

  if ("paddingBottom" in node) node.paddingBottom = paddingBottom * multiple
  if ("paddingLeft" in node)   node.paddingLeft   = paddingLeft   * multiple
  if ("paddingRight" in node)  node.paddingRight  = paddingRight  * multiple
  if ("paddingTop" in node)    node.paddingTop    = paddingTop    * multiple
}
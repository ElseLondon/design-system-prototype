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
    console.log('nodeName', nodeName)
    // 
    // 1. Ascertain whether nodeName contains "small" or "large"
    // 2. If so, we have to either *0.5(small) or *2(large) to all values
    // 

    if ("paddingBottom" in node) node.paddingBottom = paddingBottom
    if ("paddingLeft" in node) node.paddingLeft = paddingLeft
    if ("paddingRight" in node) node.paddingRight = paddingRight
    if ("paddingTop" in node) node.paddingTop = paddingTop
  }

  figma.closePlugin()
}
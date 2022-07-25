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

  for (const node of figma.currentPage.selection) {
    const nodeName = node.name.toLowerCase()
    console.log('nodeName', nodeName)

    if ("paddingBottom" in node) node.paddingBottom = parseInt(paddingBottom)
    if ("paddingLeft" in node) node.paddingLeft = parseInt(paddingLeft)
    if ("paddingRight" in node) node.paddingRight = parseInt(paddingRight)
    if ("paddingTop" in node) node.paddingTop = parseInt(paddingTop)
  }

  figma.closePlugin()
}
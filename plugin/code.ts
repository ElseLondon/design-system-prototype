figma.showUI(`
  <script>
    window.onmessage = async (event) => {
      if (event.data.pluginMessage.type === 'networkRequest') {
        var request = new XMLHttpRequest()
        request.open('GET', 'https://design-system-prototype-omxtg5ekfa-ey.a.run.app/')
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
  console.log('msg', msg)

  for (const node of figma.currentPage.selection) {
    if ("paddingBottom" in node) {
    console.log('paddingBottom present')
      node.paddingBottom += 5
    }
    if ("paddingLeft" in node) {
    console.log('paddingLeft present')
      node.paddingLeft += 5
    }
    if ("paddingRight" in node) {
    console.log('paddingRight present')
      node.paddingRight += 5
    }
    if ("paddingTop" in node) {
    console.log('paddingTop present')
      node.paddingTop += 5
    }
    console.log('node', node)
  }

  figma.closePlugin()
}
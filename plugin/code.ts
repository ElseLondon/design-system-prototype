for (const node of figma.currentPage.selection) {
  if ("paddingBottom" in node && node.id === "small") {
   console.log('paddingBottom present')
    node.paddingBottom += 10
  }
  if ("paddingLeft" in node) {
   console.log('paddingLeft present')
    node.paddingLeft += 5
  }
  if ("paddingRight" in node) {
   console.log('paddingRight present')
    node.paddingRight += 10
  }
  if ("paddingTop" in node) {
   console.log('paddingTop present')
    node.paddingTop += 5
  }
  console.log('node', node)
}

figma.closePlugin();

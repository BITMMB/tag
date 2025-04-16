
export const treeConverter=(node, keyPrefix = '0')=> {

  let title = node.tagName;
  if (node.id) {
    title += `#${node.id}`;
  }
  if (node.className) {
    title += `.${node.className.split(' ').join('.')}`;
  }
  if (node.src) {
    title += ` (src: ${node.src})`;
  }
  if (node.href) {
    title += ` (href: ${node.href})`;
  }


  const children = node.children && node.children.length > 0
    ? node.children.map((child, index) => treeConverter(child, `${keyPrefix}-${index}`))
    : [];

  return {
    title,
    key: keyPrefix,
    children,
  };
}

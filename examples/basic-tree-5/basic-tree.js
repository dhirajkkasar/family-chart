import f3 from '../../src/index.js'
import createSvg from "../../src/view/view.svg.js"
import view from "../../src/view/view.js"
import CalculateTree from "../../src/CalculateTree/CalculateTree.js"
import {isAllRelativeDisplayed} from "../../src/handlers/general.js"

fetch("./data.json").then(r => r.json()).then(data => {
  let tree, main_id;

  const svg = createSvg(document.querySelector("#FamilyChart"))

  updateTree({initial: true})

  function updateTree(props) {
    tree = CalculateTree({ data, main_id })
    view(tree, svg, Card(tree, svg, onCardClick), props || {})
  }

  function updateMainId(_main_id) {
    main_id = _main_id
  }

  function onCardClick(e, d) {
    updateMainId(d.data.id)
    updateTree()
  }

})

function Card(tree, svg, onCardClick) {
  return f3.elements.Card({
    svg,
    card_dim: {w:220,h:70,text_x:75,text_y:15,img_w:60,img_h:60,img_x:5,img_y:5},
    card_display: [],

    onCardClick,

    img: true,
    mini_tree: true,
    onMiniTreeClick: onCardClick,

    onCardUpdate
  })

  function onCardUpdate(d) {
    const text = d3.select(this).select('.card-inner .card-text').append('text').attr('transform', `translate(${[75, 15]})`)

    text.append('tspan').attr('dy', 14).text(`${d.data.data["first name"]} ${d.data.data["last name"]}`)
    text.append('tspan').attr('x', 0).attr('dy', 14).attr('font-size', 10).text(d.data.id)
  }
}
